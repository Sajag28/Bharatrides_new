# urls.py
from django.urls import path
from .views import CarUploadView, Userdata, CarListByUserView, SearchCarsView, GenerateAvailableSlots, AvailableSlotsByCityDate,create_standard_timeslots, UserProfileFromEmail,BookInspectionSlot,UserImageView,UserProfileFromEmail
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('upload-car/', CarUploadView.as_view(), name='upload-car'),
    path('register-user/', Userdata.as_view(), name='register-user'),
    path('cars-by-user/<str:email>/', CarListByUserView.as_view(), name='cars-by-user'),
    path('search-cars/', SearchCarsView.as_view(), name='search-cars'),
    path('generate-available-slots/', GenerateAvailableSlots.as_view(), name='generate-available-slots'),
    path('create-timeslots/', create_standard_timeslots),
    path('book-inspection-slot/', BookInspectionSlot.as_view(), name='book-inspection-slot'),
    path('available-slots/', AvailableSlotsByCityDate.as_view(), name='available-slots'),
    path('user-profile/<str:email>', UserProfileFromEmail.as_view(), name='user-profile'),
    path('user-image/<str:email>', UserImageView.as_view(), name='user-image'),
    path('user-profile-from-email/<str:email>/', UserProfileFromEmail.as_view(), name='user-profile-from-email'),

]
