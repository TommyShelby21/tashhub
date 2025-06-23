from django.urls import path, include

urlpatterns = [
    path('', include('authentication.urls')),
    # jiné url tvého projektu
]
