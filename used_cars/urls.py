# urls.py
from django.urls import path
from .views import CarUploadView, Userdata, CarListByUserView
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('upload-car/', CarUploadView.as_view(), name='upload-car'),
    path('register-user/', Userdata.as_view(), name='register-user'),
    path('cars-by-user/<str:username>/', CarListByUserView.as_view(), name='cars-by-user'),
]
