from django.contrib import admin
from .models import Song, Artist, Album

admin.site.register(Song)
admin.site.register(Album)
admin.site.register(Artist)