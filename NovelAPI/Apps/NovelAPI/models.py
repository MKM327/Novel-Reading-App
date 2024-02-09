from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Novel(models.Model):
    title = models.CharField(max_length=50, unique=True)
    author = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    pub_date = models.DateField()
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.title} by {self.author}"


class Chapter(models.Model):
    novel = models.ForeignKey(Novel, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField(null=True, blank=True)
    pub_date = models.DateField()
    read_count = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.title} from {self.novel.title}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Novel ,related_name='favorites', blank=True)
    read = models.ManyToManyField(Chapter, related_name='read', blank=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} Profile"
