from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Novel
from django.views.generic import ListView, DetailView, TemplateView


# Create your views here.


def reader(request):
    return HttpResponse("Hello NovelAPI")


def parameter(request, test):
    return HttpResponse(f"parameter is {test}")


def get_all(request):
    all_novels = Novel.objects.all()


def novel_chapters(request, novel_id):
    novel = Novel.objects.get(pk=novel_id)
    if novel is None:
        return JsonResponse({"error": "Novel not found"})
    all_chapters = novel.chapter_set.all()
    return JsonResponse({"chapters": list(all_chapters.values())})
