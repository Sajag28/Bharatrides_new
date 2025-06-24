# models.py
from django.db import models
from django.contrib.auth.models import User
import os
import csv
from django.conf import settings
from functools import lru_cache
class Car(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Basic Info
    title = models.CharField(max_length=100)
    description = models.TextField()
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    variant = models.CharField(max_length=50, blank=True, null=True)
    year_of_manufacture = models.PositiveIntegerField()
    price= models.IntegerField(default=0)
    car_number = models.CharField(max_length=15,unique=True,default='Unknown')
    # Technical Specs
    brand = models.CharField(max_length=50, default='Unknown')
    model = models.CharField(max_length=50, default='Unknown')
    variant = models.CharField(max_length=50, default='Standard')
    year_of_manufacture = models.PositiveIntegerField(default=2000)
    fuel_type = models.CharField(max_length=20, default='Petrol')
    transmission = models.CharField(max_length=20, default='Manual')
    engine_capacity_cc = models.PositiveIntegerField(default=1000)
    mileage_kmpl = models.FloatField(default=15.0)
    km_driven = models.PositiveIntegerField(default=0)
    number_of_owners = models.PositiveIntegerField(default=1)
    rc_available = models.CharField(default='No',max_length=4)
    insurance_valid_till = models.DateField(null=True, blank=True)
    city = models.CharField(max_length=50, default='Unknown')
    state= models.CharField(max_length=50, default='Unknown')
    pincode = models.CharField(max_length=10, default='000000')
    interested_users=models.IntegerField(default=0)

    def __str__(self):
        return f"{self.title} ({self.year_of_manufacture})"

class CarImage(models.Model):
    car = models.ForeignKey(Car, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='car_images/')

    def __str__(self):
        return f"Image for {self.car.title}"
class UserImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='user_images/')
    
class UserProfile(models.Model):
    user = models.OneToOneField(User,related_name="user_profile", on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    aadhar_number = models.CharField(max_length=12, null=True, blank=True)
    

    def __str__(self):
        return self.user.username

@lru_cache()
def load_city_choices():
    csv_path = os.path.join(settings.BASE_DIR, 'used_cars', 'indian_cities.csv')
    choices = []
    try:
        with open(csv_path, newline='', encoding='utf-8') as csvfile:
            for row in csv.reader(csvfile):
                city = row[0].strip()
                if city:
                    choices.append((city, city))
    except FileNotFoundError:
        choices = [('Unknown', 'Unknown')]  # Fallback
    return choices

CITY_CHOICES = load_city_choices()


    
class TimeSlot(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.start_time.strftime('%I:%M %p')} – {self.end_time.strftime('%I:%M %p')}"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    city = models.CharField(max_length=50)
    date = models.DateField()
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('city', 'date', 'time_slot')  # prevent overbooking

    def __str__(self):
        return f"{self.car} inspection in {self.city} on {self.date} at {self.time_slot}"


class AvailableSlot(models.Model):
    city = models.CharField(max_length=50)
    date = models.DateField()
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('city', 'date', 'time_slot')

    def __str__(self):
        return f"{self.city} - {self.date} - {self.time_slot}"

