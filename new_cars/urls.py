from django.urls import path
from .views import recommend_cars_api

urlpatterns = [
    path("api/recommend/", recommend_cars_api, name="recommend_cars_api"),
]
