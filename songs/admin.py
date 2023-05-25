from django.contrib import admin
from .models import Song, Artist, Album, Playlist, SongReaction, Genre

class SongAdmin(admin.ModelAdmin):
    search_fields = ['original_name']

class AlbumAdmin(admin.ModelAdmin):
    search_fields = ['title', 'code']

class ArtistAdmin(admin.ModelAdmin):
    search_fields = ['name']

class GenreAdmin(admin.ModelAdmin):
    search_fields = ['name']

admin.site.register(Song, SongAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Playlist)
admin.site.register(SongReaction)