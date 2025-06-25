from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from system.serializers import UserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    serializer = UserSerializer(request.user)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    user = request.user
    print(user)
    return Response({'message': f'Ahoj {user.username}, jsi úspěšně autentizovaný!'})