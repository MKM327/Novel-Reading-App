from rest_framework.serializers import ModelSerializer
from Apps.NovelAPI.models import Novel, Chapter


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

