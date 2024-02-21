from rest_framework.serializers import ModelSerializer
from Apps.NovelAPI.models import Novel, Chapter,Profile


class NovelSerializer(ModelSerializer):
    class Meta:
        model = Novel
        fields = '__all__'


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'


class AddChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['title', 'content']
class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
class FavoriteNovelSerializer(ModelSerializer):
    class Meta:
        model = Novel
        fields=["title","author","likes","dislikes","pub_date"]