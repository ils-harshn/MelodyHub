from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from accounts.models import User

# Create your models here.
class Album(models.Model):
    code = models.CharField(max_length=10, unique=True)
    title = models.CharField(max_length=500, unique=True)
    year = models.IntegerField(validators=[MaxValueValidator(1000, 9999)])
    thumbnail300x300 = models.URLField()
    thumbnail = models.URLField()

    def __str__(self) -> str:
        return self.title

class Song(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    url = models.URLField()
    original_name = models.CharField(max_length=500)

    class Meta:
        ordering = ["title"]

    def __str__(self) -> str:
        return self.original_name

class Artist(models.Model):
    songs = models.ManyToManyField(Song)
    name = models.CharField(max_length=500, unique=True)
    artists_thumbnail = models.URLField()
    artists_thumbnail300x300 = models.URLField()

    def __str__(self) -> str:
        return self.name
    
class Playlist(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    songs = models.ManyToManyField(Song)

    def __str__(self):
        return f"{self.title} ({self.author.email} - {self.id})"