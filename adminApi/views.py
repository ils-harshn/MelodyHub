from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from songs import models as songs_models
from songs import filters as songs_filters
from songs import serializers as songs_serializers
from django_filters.rest_framework import DjangoFilterBackend
from adminApi import serializers
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload


class AlbumListViewAdmin(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = songs_models.Album.objects.all()
    serializer_class = songs_serializers.AlbumSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_class = songs_filters.AlbumFilterSet

    def filter_queryset(self, queryset):
        return super().filter_queryset(queryset)[:5]


class AlbumCreateViewAdmin(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = songs_serializers.AlbumSerializer


class ArtistListViewAdmin(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = songs_models.Artist.objects.all()
    serializer_class = songs_serializers.ArtistNameSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_class = songs_filters.ArtistFilterSet

    def filter_queryset(self, queryset):
        return super().filter_queryset(queryset)[:5]


class AritstCreateViewAdmin(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = songs_serializers.ArtistNameSerializer


class GenreListViewAdmin(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = songs_models.Genre.objects.all()
    serializer_class = songs_serializers.GenreSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_class = songs_filters.GenreFilterSet

    def filter_queryset(self, queryset):
        return super().filter_queryset(queryset)[:5]


class GenreCreateViewAdmin(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = songs_serializers.GenreSerializer


class SongCreateViewAdmin(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = serializers.SongCompleteSerializer
    

    def create(self, request, *args, **kwargs):
        artist_ids = request.data.get('artists')

        if not isinstance(artist_ids, list):
            return Response(data="Artist Data Invalid", status=status.HTTP_400_BAD_REQUEST)

        try:
            artists = songs_models.Artist.objects.filter(id__in=artist_ids)
            kwargs["artists"] = artists
            if len(artists) != len(artist_ids):
                raise NotFound('Artist not found')
            if (request.data.get("genre") == None or not isinstance(request.data.get("genre"), str)):
                raise NotFound('Genre not found')
        except Exception as err:
            raise NotFound(f'{err}')


        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, kwargs["artists"])
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, artists):
        instance = serializer.save()
        for artist in artists:
            artist.songs.add(instance)
        print(instance, artists)

class FileUploadView(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def post(self, request):
        folder_id = request.data.get("id")
        file = request.FILES['file']
        file_name = file.name

        credentials = service_account.Credentials.from_service_account_file(
            './adminApi/credentials/gcp.json',  # Path to your service account key file
            scopes=['https://www.googleapis.com/auth/drive']
        )
        drive_service = build('drive', 'v3', credentials=credentials)

        file_metadata = {
            'name': file_name,
            'mimeType': file.content_type,
            'parents': [folder_id]
        }

        media = MediaIoBaseUpload(file, mimetype=file.content_type)

        file = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()

        file_id = file.get('id')
        return Response({'file_id': file_id})
