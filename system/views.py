from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from system.serializers import UserSerializer, TaskSerializer
from system.models import Team, Task, TeamMember


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    serializer = UserSerializer(request.user)

    return Response(serializer.data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def team_tasks(request, team_id):
    team = Team.objects.get(id=team_id)

    tasks = Task.objects.filter(team=team).order_by('name')

    serializer = TaskSerializer(tasks, many=True)

    return Response({'tasks': serializer.data}, status=200)

