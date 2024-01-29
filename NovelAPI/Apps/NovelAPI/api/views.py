
from Apps.NovelAPI.models import Novel, Chapter
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializers import NovelSerializer, ChapterSerializer, AddChapterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import NotAuthenticated
from rest_framework.views import APIView
@api_view(['GET'])
def get_routes(request):
    routes = [
        "GET /api/novels",
        "POST /api/novels",
        "GET /api/novels/:id",
        "PUT /api/novels/:id",
        "DELETE /api/novels/:id"
        "GET /api/novels/:id/chapters",
    ]
    return Response(routes)


class NovelView(APIView):
    description = "Get, Update or Delete a novel"

    def get(self,request,title):
        try:
            novel = Novel.objects.get(title=title)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=404)
        novel_serializer = NovelSerializer(novel)
        return Response(novel_serializer.data)

    def put(self, request, title):
        try:
            novel = Novel.objects.get(title=title)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=404)
        novel_serializer = NovelSerializer(novel, data=request.data)
        if novel_serializer.is_valid():
            novel_serializer.save()
            return Response(novel_serializer.data)
        return Response(novel_serializer.errors, status=400)

    def delete(self,request,title):
        try:
            novel = Novel.objects.get(title=title)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=404)
        novel.delete()
        return Response({"message": "Novel deleted successfully"}, status=204)

class NovelChapterView(APIView):
    description = "Get or Add a chapter to a novel"
    permission_classes = [IsAuthenticated]
    def get(self,request,title):
        try:
            novel = Novel.objects.get(title=title)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=404)
        chapters = novel.chapter_set.all()
        chapters_serializer = ChapterSerializer(chapters, many=True)
        return Response(chapters_serializer.data)

    def post(self,request,title):
        try:
            novel = Novel.objects.get(title=title)
        except Novel.DoesNotExist:
            return Response({"error": "Novel not found"}, status=404)
        chapter_serializer = AddChapterSerializer(data=request.data)
        if chapter_serializer.is_valid():
            chapter_serializer.save(novel=novel)
            return Response(chapter_serializer.data, status=201)
        return Response(chapter_serializer.errors, status=400)

@api_view(['GET', 'POST'])
def novel_chapters(request, title):
    try:
        novel = Novel.objects.get(title=title)
    except Novel.DoesNotExist:
        return Response({"error": "Novel not found"}, status=404)
    if request.method == 'GET':
        chapters = novel.chapter_set.all()
        chapters_serializer = ChapterSerializer(chapters, many=True)
        return Response(chapters_serializer.data)
    elif request.method == 'POST':
        chapter_serializer = AddChapterSerializer(data=request.data)
        if chapter_serializer.is_valid():
            chapter_serializer.save(novel=novel)
            return Response(chapter_serializer.data, status=201)
        return Response(chapter_serializer.errors, status=400)


@api_view(['POST', 'GET'])
def create_novel(request):
    if request.method == 'GET':
        novels = Novel.objects.all()
        novels_serializer = NovelSerializer(novels, many=True)
        return Response(novels_serializer.data)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            raise NotAuthenticated("authentication credentials were not provided")
        novel_serializer = NovelSerializer(data=request.data)
        if novel_serializer.is_valid():
            novel_serializer.save()
            return Response(novel_serializer.data, status=201)
        return Response(novel_serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE','PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def manage_chapter(request, chapter_id):
    try:
        chapter = Chapter.objects.get(pk=chapter_id)
    except Chapter.DoesNotExist:
        return Response({"error": "Chapter not found"}, status=404)
    if request.method == 'GET':
        chapter_serializer = ChapterSerializer(chapter)
        return Response(chapter_serializer.data)
    elif request.method == 'PUT':
        chapter_serializer = ChapterSerializer(chapter, data=request.data)
        if chapter_serializer.is_valid():
            chapter_serializer.save()
            return Response(chapter_serializer.data)
        return Response(chapter_serializer.errors, status=400)
    elif request.method == 'DELETE':
        chapter.delete()
        return Response({"message": "Chapter deleted successfully"}, status=204)
    elif request.method == 'PATCH':
        chapter_serializer = ChapterSerializer(chapter, data=request.data, partial=True)
        if chapter_serializer.is_valid():
            chapter_serializer.save()
            return Response(chapter_serializer.data)
        return Response(chapter_serializer.errors, status=400)
