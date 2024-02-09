
from django.db import IntegrityError
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from Apps.NovelAPI.models import Profile
from .serializers import UserSerializer, UserDetailsSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from  rest_framework_simplejwt.authentication import  JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class UserDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserDetailsSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user.first_name = serializer.data['first_name']
            user.last_name = serializer.data['last_name']
            user.email = serializer.data['email']
            user.save()
            return Response(serializer.data, status=200)
        return Response(status=400)

@api_view(['POST'])
def register(request):
    try:
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        Profile.objects.create(user=user)
        user.save()
    except IntegrityError:
        return Response({"error": "A user with this username already exists."}, status=400)
    serializer = UserSerializer(user, many=False)
    refresh = RefreshToken.for_user(user)
    return Response({'user': serializer.data, 'refresh': str(refresh), 'access': str(refresh.access_token)})

@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user is not None:
        serializer = UserSerializer(user, many=False)
        token = RefreshToken.for_user(user)
        return Response({'user': serializer.data, 'refresh': str(token), 'access': str(token.access_token)})
    else:
        return {'error': 'Invalid Credentials', 'status': 401}


@api_view(['POST'])
def test(request):
    return Response({'test': 'test'})