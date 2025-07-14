from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, TokenError
from django.conf import settings

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        User.objects.create_user(
            username=serializer.validated_data['email'],
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        return Response({"message": "User created successfully"}, status=201)

    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    password = request.data.get('password')
    username = request.data.get('username')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)

        response = Response()
        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=False,         # nastav na True, pokud máš HTTPS (doporučeno)
            samesite='Lax',
            max_age=15 * 60      # 1 minut platnost tokenu
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,         # nastav na True, pokud máš HTTPS (doporučeno)
            samesite='Lax',
            max_age=7 * 24 * 60 * 60    # 7 dní platnost refresh tokenu
        )
        response.data = {
            'message': 'Login successful',
        }
        return response

    return Response({'error': 'Invalid credentials'}, status=401)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    response = Response()

    response.delete_cookie(
        key='access_token',
        path='/',
        domain=None,
    )
    response.delete_cookie(
        key='refresh_token',
        path='/',
        domain=None,
    )

    response.data = {
        'message': 'Logout successful',
    }

    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    refresh_token = request.COOKIES.get('refresh_token')
    if not refresh_token:
        return Response({'error': 'No refresh token'}, status=400)

    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)

        response = Response({'message': 'Token refreshed'})
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=15 * 60
        )
        return response

    except TokenError as e:
        return Response({'error': 'Invalid refresh token'}, status=401)


