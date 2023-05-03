from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('songs/', view=views.SongsListView.as_view(), name="songs-list-with-filter"),
    path('songs/get/<int:id>/', view=views.SongView.as_view(), name="song-detail"),
    path('artists/', view=views.ArtistsListView.as_view(), name="artists-list-with-filter"),
    path('artists/get/<int:id>/', view=views.ArtistView.as_view(), name="artist-detail"),
    path('artists/get/<int:id>/songs/', view=views.ArtistWithSongsView.as_view(), name="artist-detail-with-songs"),
    path('albums/', view=views.AlbumsListView.as_view(), name="albums-list-with-filter"),
    path('albums/get/<int:id>/', view=views.AlbumView.as_view(), name="artist-detail"),
    path('albums/get/<int:id>/songs/', view=views.AlbumWithSongsView.as_view(), name="artist-detail-with-songs"),
]
