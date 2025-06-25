from django.contrib import admin
from django.urls import path, include
from system.views import protected_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/protected/', protected_view, name='protected'),
]
