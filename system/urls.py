from django.contrib import admin
from django.urls import path, include
from system.views import profile, team_tasks, add_team_task, team_tasks_update, team_assigned_tasks, available_user_teams, set_user_profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('profile/', profile, name='profile'),
    path('profile/set_user_profile/', set_user_profile, name='set_user_profile'),
    path('available_user_teams/', available_user_teams, name='available_user_teams'),
    path('team/<int:team_id>/tasks/', team_tasks, name='team_tasks'),
    path('team/<int:team_id>/tasks/add/', add_team_task, name='add_team_task'),
    path('team/<int:team_id>/tasks/update/', team_tasks_update, name='team_tasks_update'),
    path('team/<int:team_id>/assigned_tasks/', team_assigned_tasks, name='team_assigned_tasks'),
]
