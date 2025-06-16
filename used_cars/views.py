# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Car, CarImage
from .serializers import CarSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.generics import ListAPIView
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Car, CarImage
from .serializers import CarSerializer

class CarUploadView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        print("Hitted")
        print("Request data:", request.data)  # Debugging line to check incoming data
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        title = request.data.get('title')
        description = request.data.get('description')
        price = request.data.get('price')
        images = request.FILES.getlist('images')  # Get multiple files

        if len(images) > 10:
            return Response({"error": "You can upload up to 10 images only."}, status=400)

        user = User.objects.filter(username=username).first()
        if not user:
            return Response({"error": "Invalid username"}, status=404)

        car = Car.objects.create(
            owner=user,
            title=title,
            description=description,
            price=price
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
     return JsonResponse({"message": f"User {user.username} created successfully!"})
 
 
class CarListByUserView(ListAPIView):
    serializer_class = CarSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
     username = self.kwargs.get('username')  # from URL
     if username:
        user = User.objects.filter(username=username).first()
        if user:
            return Car.objects.filter(owner=user).order_by('-created_at')
     return Car.objects.none()