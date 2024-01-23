from django.urls import path
from . import views

urlpatterns = [
    path('', views.reader, name='NovelAPI'),
    path('parameter', views.parameter, name='parameter'),
    path('getNovels', views.get_all, name='getNovels'),
    path('<int:novel_id>/chapters/', views.novel_chapters, name='getChapters')
]
