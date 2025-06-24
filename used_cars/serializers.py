# serializers.py
from rest_framework import serializers
from .models import Car, CarImage, UserImage, UserProfile


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ['image']

class CarSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = [
            'id',
            'owner',
            'title',
            'description',
            'brand',
            'model',
            'variant',
            'year_of_manufacture',
            'fuel_type',
            'transmission',
            'engine_capacity_cc',
            'mileage_kmpl',
            'km_driven',
            'number_of_owners',
            'rc_available',
            'insurance_valid_till',
            'price',
            'city',
            'state',
            'pincode',
            
            'images'
        ]
class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ['image']
class UserProfileSerializer(serializers.ModelSerializer):
    user_images = UserImageSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'phone_number', 'address', 'aadhar_number', 'user_images']
        read_only_fields = ['user']  # Assuming user is set automatically