from django.contrib import admin
from .models import Song, Artist, Album, Playlist, SongReaction, Genre, RecentSong
from django import forms


class SongAdminForm(forms.ModelForm):
    artists = forms.ModelMultipleChoiceField(
        queryset=Artist.objects.all(),
        widget=admin.widgets.FilteredSelectMultiple('Artists', False),
        required=False
    )

    class Meta:
        model = Song
        fields = '__all__'

class SongAdmin(admin.ModelAdmin):
    form = SongAdminForm

class AlbumAdmin(admin.ModelAdmin):
    search_fields = ['title', 'code']

class ArtistAdmin(admin.ModelAdmin):
    search_fields = ['name']
    fields = ["name", "artists_thumbnail", "artists_thumbnail300x300"]

class GenreAdmin(admin.ModelAdmin):
    search_fields = ['name']

class RecentSongAdmin(admin.ModelAdmin):
    search_fields = ['user__email']

admin.site.register(Song, SongAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Playlist)
admin.site.register(SongReaction)
admin.site.register(RecentSong, RecentSongAdmin)