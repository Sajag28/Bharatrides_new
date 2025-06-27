# views.py
import csv, os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Car, CarImage
from .serializers import CarSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from datetime import time
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Car, CarImage, UserImage, UserProfile, TimeSlot, AvailableSlot
from .serializers import CarSerializer
from django.shortcuts import render, redirect
from .forms import BookingForm
from .models import Booking, TimeSlot, Car
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
class CarUploadView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        print("Hitted")
        print("Request data:", request.data)

        # Required fields
        username = request.data.get("username")
        title = request.data.get('title')
        description = request.data.get('description')
        price = request.data.get('price')
        images = request.FILES.getlist('images')

        if len(images) > 10:
            return Response({"error": "You can upload up to 10 images only."}, status=400)

        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"error": "Invalid username"}, status=404)

        # Optional fields with default handling
        brand = request.data.get('brand', 'Unknown')
        model = request.data.get('model', 'Unknown')
        variant = request.data.get('variant', 'Standard')
        year_of_manufacture = request.data.get('year', 2000)
        fuel_type = request.data.get('fuel_type', 'Petrol')
        transmission = request.data.get('transmission', 'Manual')
        engine_capacity_cc = request.data.get('engine_capacity', 1000)
        mileage_kmpl = request.data.get('mileage', 15.0)
        km_driven = request.data.get('kilometers_driven', 0)
        number_of_owners = request.data.get('number_of_owners', 1)
        car_number=request.data.get('car_no', 'Unknown')
        rc_available = request.data.get('rc_available')
        insurance_valid_till = request.data.get('insurance_validity', None)  # Assuming this is a date field
        city = request.data.get('city', 'Unknown')
        pincode = request.data.get('pincode', '000000')

        car = Car.objects.create(
            owner=user,
            title=title,
            description=description,
            price=price,
            brand=brand,
            model=model,
            variant=variant,
            car_number=car_number,
            year_of_manufacture=year_of_manufacture,
            fuel_type=fuel_type,
            transmission=transmission,
            engine_capacity_cc=engine_capacity_cc,
            mileage_kmpl=mileage_kmpl,
            km_driven=km_driven,
            number_of_owners=number_of_owners,

            
            rc_available=rc_available,
            insurance_valid_till=insurance_valid_till,
            
    
            city=city,
            state=request.data.get('state', 'Unknown'),  # Assuming state is also optional
            pincode=pincode
        )

        for img in images:
            CarImage.objects.create(car=car, image=img)

        return Response(CarSerializer(car).data, status=201)



class Userdata(APIView):
    def post(self, request):
     username = request.data.get("username")
     email = request.data.get("email")
     password = request.data.get("password")

     if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already taken"})

     user = User.objects.create_user(username=username, email=email, password=password)
     user_p= UserProfile.objects.create(user=user, phone_number=request.data.get("phone_number"),
                                        address=request.data.get("address"),
                                        aadhar_number=request.data.get("aadhar_number"))
     user_im= UserImage.objects.create(user=user, image=request.FILES.get("image"))
     return JsonResponse({"message": f"User {user.username} created successfully! with aadhar number {user_p.aadhar_number} and image {user_im.image.url}"})
     
 
class CarListByUserView(ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
     email = self.kwargs.get('email')  # from URL
     if email:
        user = User.objects.filter(email=email).first()
        if user:
            return Car.objects.filter(owner=user)
     return Car.objects.none()
 
class SearchCarsView(APIView):
    def post(self,request):
        query= request.data.get('query', '')
        cars = Car.objects.filter(title__icontains=query)
        data = [
        {
            "id": car.id,
            "title": car.title,
            "description": car.description,
            "price": str(car.price),
            "images": [img.image.url for img in car.images.all()] if hasattr(car, 'images') else [],
            "brand": car.brand,
            "model": car.model,
            "variant": car.variant,
            "year_of_manufacture": car.year_of_manufacture,
            "fuel_type": car.fuel_type,
            "transmission": car.transmission,
            "engine_capacity_cc": car.engine_capacity_cc,
            "mileage_kmpl": car.mileage_kmpl,
            "km_driven": car.km_driven,
            "number_of_owners": car.number_of_owners,
            "rc_available": car.rc_available,
            "insurance_valid_till": car.insurance_valid_till,
            "city": car.city,
            "state": car.state,
            "pincode": car.pincode,
            "owner": car.owner.username if car.owner else None,
            "phone_number": car.owner.user_profile.phone_number if hasattr(car.owner, 'user_profile') else None,
            
            # add other fields as needed
        }
        for car in cars
        ]
        print(data)
        return JsonResponse(data, safe=False) 
    
def create_standard_timeslots(request):
    TimeSlot.objects.all().delete()  # Optional: clear old slots
    for hour in range(9, 17):  # 9 AM to 5 PM (last slot: 4–5)
        TimeSlot.objects.get_or_create(
            start_time=time(hour, 0),
            end_time=time(hour + 1, 0)
        )
    return JsonResponse({'status': 'success', 'message': 'Standard hourly time slots created'})
class GenerateAvailableSlots(APIView):
    def get(self, request):
        today = timezone.now().date()
        weekday = today.weekday()
        days_until_monday = (7 - weekday) if weekday > 0 else 0
        next_monday = today + timedelta(days=days_until_monday)

        timeslots = TimeSlot.objects.all()

        # Load cities
        csv_path = "/Users/sajagagrawal/Documents/Projects/Bharatrides_backend/Bhrides_back/used_cars/indian_cities.csv"
        cities = []
        with open(csv_path, newline='', encoding='utf-8') as csvfile:
            for row in csv.reader(csvfile):
                city = row[0].strip()
                if city:
                    cities.append(city)

        slots_created = 0

        for i in range(6):  # Monday to Saturday
            date = next_monday + timedelta(days=i)
            for city in cities:
                for slot in timeslots:
                    _, created = AvailableSlot.objects.get_or_create(
                        city=city,
                        date=date,
                        time_slot=slot
                    )
                    if created:
                        slots_created += 1

        return JsonResponse({
            'status': 'success',
            'message': f'{slots_created} slots created for 50 cities from Monday to Saturday.'
        })
from rest_framework.response import Response
from rest_framework import status  
class BookInspectionSlot(APIView):
    def post(self, request):
        username = request.data.get('username','')
        data = request.data
        car_number = data.get('car_number')
        city = data.get('city')
        date = data.get('date')
        time_slot_id = data.get('time_slot_id')
        user = User.objects.filter(username=username).first()
        try:
            car = Car.objects.get(car_number=car_number, owner=user)
            time_slot = TimeSlot.objects.get(id=time_slot_id)
            available_slot = AvailableSlot.objects.get(city=city, date=date, time_slot=time_slot)

            # Check if already booked
            if Booking.objects.filter(city=city, date=date, time_slot=time_slot).exists():
                return Response({'error': 'This time slot is already booked.'}, status=status.HTTP_409_CONFLICT)
            
            booking = Booking.objects.create(
                user=user,
                car=car,
                city=city,
                date=date,
                time_slot=time_slot
            )
            booking.save()
            # Send email confirmation
            send_mail(
                subject='Inspection Booking Confirmed',
                message=f"Your car inspection is scheduled in {city} on {date} at {time_slot}.",
                from_email='no-reply@bharatrides.in',
                recipient_list=["devbysajag@gmail.com"],
                fail_silently=True
            )

            return Response({'message': 'Slot booked successfully!'}, status=status.HTTP_201_CREATED)

        except Car.DoesNotExist:
            return Response({'error': 'Invalid car selected.'}, status=status.HTTP_400_BAD_REQUEST)
        except TimeSlot.DoesNotExist:
            return Response({'error': 'Invalid time slot.'}, status=status.HTTP_400_BAD_REQUEST)
        except AvailableSlot.DoesNotExist:
            return Response({'error': 'Slot not available for the selected city/date/time.'}, status=status.HTTP_400_BAD_REQUEST)
        
        
class AvailableSlotsByCityDate(APIView):
    def get(self, request):
        city = request.GET.get('city')
        date = request.GET.get('date')

        if not city or not date:
            return Response({'error': 'City and date are required'}, status=400)

        slots = AvailableSlot.objects.filter(city=city, date=date)
        return Response([
            {
                'id': slot.time_slot.id,
                'start_time': slot.time_slot.start_time.strftime('%H:%M'),
                'end_time': slot.time_slot.end_time.strftime('%H:%M')
            } for slot in slots
        ])
        
class UserProfileFromEmail(APIView):
    def get(self, request,email):
        email = email
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            profile = UserProfile.objects.get(user=user)
            car = Car.objects.filter(owner=user).first()

            return Response({
                'username': user.username,
                'user_id': user.id,
                'car_id': car.id if car else None,
                'phone_number': profile.phone_number,
                'address': profile.address,
                'aadhar_number': profile.aadhar_number,
            })

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
class UserImageView(APIView):
      def get(self, request,email):
        email = email
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            user_image = UserImage.objects.get(user=user)
            
            return Response({
                'username': user.username,
                'image_url': user_image.image.url if user_image.image else None,
            })
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except UserImage.DoesNotExist:
            return Response({'error': 'User image not found'}, status=status.HTTP_404_NOT_FOUND)
        