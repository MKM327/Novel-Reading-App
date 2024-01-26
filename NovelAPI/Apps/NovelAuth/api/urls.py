from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token'),
    path('register/', views.register, name='register'),
]