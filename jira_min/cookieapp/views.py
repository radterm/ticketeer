# cookieapp/views.py
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

@api_view(['GET'])
def get_csrf_token(request):
    response = Response({"message": "Set CSRF cookie"})
    response.headers["X-CSRFToken"] = get_token(request)
    return response

@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def login_view(request):
    login(request, request.user)
    return Response({'message': 'User logged in'}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request):
    return Response({'username': request.user.get_username()}, status=status.HTTP_200_OK)

