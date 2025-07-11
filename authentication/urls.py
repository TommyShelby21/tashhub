from django.urls import path
from .views import register, login, logout, refresh_token


urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('token/refresh/', refresh_token, name='refresh_token'),
]
