from django.contrib import admin
from system.models import Team, Task, TeamMember
# Register your models here.

admin.site.register(Team)
admin.site.register(Task)
admin.site.register(TeamMember)
