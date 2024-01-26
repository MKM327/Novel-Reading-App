
from rest_framework.decorators import api_view, authentication_classes
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        user.save()
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    else:
        return Response({'error': 'Invalid Request', 'status': 400})


@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user is not None:
        serializer = UserSerializer(user, many=False)
        token = Token.objects.create(user=user)
        return Response({'user': serializer.data, 'token': token.key})
    else:
        return {'error': 'Invalid Credentials', 'status': 401}
