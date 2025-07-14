from django.contrib import admin
from django.urls import path, include
from system.views import profile, team_tasks

urlpatterns = [
    path('admin/', admin.site.urls),
    path('profile/', profile, name='profile'),
    path('team/<int:team_id>/tasks/', team_tasks, name='team_tasks'),
]
