from django.contrib import admin
from .models import Song, Artist, Album, Playlist, SongReaction

admin.site.register(Song)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(Playlist)
admin.site.register(SongReaction)