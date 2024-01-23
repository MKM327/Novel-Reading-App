from django.urls import path

from . import views
urlpatterns = [
    path('', views.get_routes, name='get_routes'),
    path('novels/<str:title>/', views.novel, name='getNovel'),
    path('novels/<str:title>/chapters/', views.novel_chapters, name='getChapters'),
    path('novels/', views.create_novel, name='createNovel'),
    path('chapters/<int:chapter_id>/', views.manage_chapter, name='edit_chapter'),
]