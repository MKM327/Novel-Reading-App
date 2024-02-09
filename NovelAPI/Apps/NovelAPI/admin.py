from django.contrib import admin

# Register your models here.

from .models import Novel,Chapter,Profile

admin.site.register(Novel)
admin.site.register(Chapter)
admin.site.register(Profile)