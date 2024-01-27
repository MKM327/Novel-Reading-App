
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        user.save()
        serializer = UserSerializer(user, many=False)
        refresh = RefreshToken.for_user(user)
        return Response({'user': serializer.data, 'refresh': str(refresh), 'access': str(refresh.access_token)})
    else:
        return Response({'error': 'Invalid Request', 'status': 400})


@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user is not None:
        serializer = UserSerializer(user, many=False)
        token = RefreshToken.for_user(user)
        return Response({'user': serializer.data, 'refresh': str(token), 'access': str(token.access_token)})
    else:
        return {'error': 'Invalid Credentials', 'status': 401}
