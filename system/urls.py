from django.contrib import admin
from django.urls import path, include
from system.views import protected_view, profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('protected/', protected_view, name='protected'),
    path('profile/', profile, name='profile'),
]
