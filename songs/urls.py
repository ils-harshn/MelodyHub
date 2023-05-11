from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('songs/', view=views.SongsListView.as_view(), name="songs-list-with-filter"),
    path('random/song/', view=views.SongsListView.as_view(), name="get-random-song"),
    path('songs/mostviewed/', view=views.MostViewedSongsView.as_view(), name="songs-list-with-most-viewed"),
    path('songs/liked/', view=views.LikedSongsListView.as_view(), name="liked-songs-list"),
    path('songs/disliked/', view=views.DislikedSongsListView.as_view(), name="disliked-songs-list"),
    path('songs/reaction/<int:song_id>/', view=views.SongReactionManageView.as_view(), name="song-like-and-dislike"),
    path('songs/get/<int:id>/', view=views.SongView.as_view(), name="song-detail"),
    path('artists/', view=views.ArtistsListView.as_view(), name="artists-list-with-filter"),
    path('artists/get/<int:id>/', view=views.ArtistView.as_view(), name="artist-detail"),
    path('artists/get/<int:id>/songs/', view=views.ArtistWithSongsView.as_view(), name="artist-detail-with-songs"),
    path('albums/', view=views.AlbumsListView.as_view(), name="albums-list-with-filter"),
    path('albums/get/<int:id>/', view=views.AlbumView.as_view(), name="artist-detail"),
    path('albums/get/<int:id>/songs/', view=views.AlbumWithSongsView.as_view(), name="artist-detail-with-songs"),
    path('songs/playlists/', view=views.UserPlaylists.as_view(), name="user-playlists-with-filter"),
    path('songs/playlists/create/', view=views.CreatePlaylist.as_view(), name="create-playlist"),
    path('songs/playlists/delete/<int:id>/', view=views.DeletePlaylist.as_view(), name="delete-playlist"),
    path('songs/playlists/get/<int:id>/songs/', view=views.PlaylistSongsView.as_view(), name="user-playlists-with-songs"),
    path('songs/playlists/get/<int:playlist_id>/song/add/<int:song_id>/', view=views.AddSongToPlayList.as_view(), name="add-song-in-playlist"),
    path('songs/playlists/get/<int:playlist_id>/song/delete/<int:song_id>/', view=views.DeleteSongFromPlayList.as_view(), name="delete-song-in-playlist"),
    path('genres/', view=views.GenreListView.as_view(), name="genre-list"),
    path('genres/get/<int:id>/songs/', view=views.GenreSongsView.as_view(), name="genre-song-list"),
]