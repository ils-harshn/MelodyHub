from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('albums/', view=views.AlbumListViewAdmin.as_view()),
    path('create/album/', view=views.AlbumCreateViewAdmin.as_view()),
    path('artists/', view=views.ArtistListViewAdmin.as_view()),
    path('create/artist/', view=views.AritstCreateViewAdmin.as_view()),
    path('genres/', view=views.GenreListViewAdmin.as_view()),
    path('create/genre/', view=views.GenreCreateViewAdmin.as_view()),
    path('create/song/', view=views.SongCreateViewAdmin.as_view()),
    path('create/file/', view=views.FileUploadView.as_view()),
]
