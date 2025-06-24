from django.contrib import admin
from .models import (
    Car, CarImage, UserImage, UserProfile,
    TimeSlot, AvailableSlot, Booking
)

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand', 'model', 'owner', 'year_of_manufacture', 'city', 'price')
    list_filter = ('brand', 'fuel_type', 'city', 'transmission')
    search_fields = ('title', 'brand', 'model', 'owner__username')


@admin.register(CarImage)
class CarImageAdmin(admin.ModelAdmin):
    list_display = ('car', 'image')


@admin.register(UserImage)
class UserImageAdmin(admin.ModelAdmin):
    list_display = ('user', 'image')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'aadhar_number')
    search_fields = ('user__username', 'phone_number')


@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('start_time', 'end_time')
    ordering = ('start_time',)


@admin.register(AvailableSlot)
class AvailableSlotAdmin(admin.ModelAdmin):
    list_display = ('city', 'date', 'time_slot')
    list_filter = ('city', 'date')
    search_fields = ('city',)
    ordering = ('city', 'date', 'time_slot')


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'car', 'city', 'date', 'time_slot', 'created_at')
    list_filter = ('city', 'date', 'time_slot')
    search_fields = ('user__username', 'car__title', 'city')
    ordering = ('-created_at',)
