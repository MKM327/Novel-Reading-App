from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('test/', views.test, name='test')
]