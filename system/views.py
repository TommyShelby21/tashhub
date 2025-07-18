from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from system.serializers import UserSerializer, TaskSerializer, AssignedTaskSerializer, TeamSerializer, UserProfileSerializer
from system.models import Team, Task, TeamMember, AssignedTask, UserProfile


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user_serializer = UserSerializer(request.user)

    user_profile = UserProfile.objects.get(user=request.user)
    user_profile_serializer = UserProfileSerializer(user_profile)

    return Response({'user': user_serializer.data, 'user_profile': user_profile_serializer.data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def team_tasks(request, team_id):
    team = Team.objects.get(id=team_id)

    tasks = Task.objects.filter(team=team).order_by('name')

    serializer = TaskSerializer(tasks, many=True)

    return Response({'tasks': serializer.data}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_team_task(request, team_id):
    team = Team.objects.get(id=team_id)

    task_name = request.data.get('name')
    task_description = request.data.get('description', '')
    task_users = request.data.get('users', [])

    if not task_name:
        return Response({'error': 'Task name is required'}, status=400)

    task = Task.objects.create(name=task_name, description=task_description, team=team)
    task.team_members.add(*task_users)

    return Response({'message': 'Task created successfully'}, status=201)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def team_tasks_update(request, team_id):
    team = Team.objects.get(id=team_id)

    task_id = request.data.get('taskId')
    task = Task.objects.get(id=task_id)

    team_member_ids = request.data.get('teamMemberIds', [])

    datetime = request.data.get('datetime')
    print(datetime)

    assigned_task, created = AssignedTask.objects.update_or_create(task=task, team=team, defaults={'datetime': datetime})

    return Response({'message': 'Task updated successfully'}, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def team_assigned_tasks(request, team_id):
    team = Team.objects.get(id=team_id)

    tasks = AssignedTask.objects.filter(team=team)

    serializer = AssignedTaskSerializer(tasks, many=True)

    return Response({'assigned_tasks': serializer.data}, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def available_user_teams(request):
    user = request.user

    teams = Team.objects.filter(teammembers__user=user).distinct()

    serializer = TeamSerializer(teams, many=True)

    return Response({'teams': serializer.data}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def set_user_profile(request):
    user = request.user

    user_profile, created = UserProfile.objects.get_or_create(user=user)

    team_id = request.data.get('team')
    print(team_id)
    team = Team.objects.get(id=team_id)
    user_profile.selected_team = team
    user_profile.save()

    return Response({'message': 'User profile updated successfully'}, status=201)
