from rest_framework.generics import ListAPIView, RetrieveAPIView
from songs.models import Song, Album, Artist
from songs.serializers import SongSerializer, ArtistSerializer, SongDetailWithoutAritistSerializer, AlbumSerializer, PlaylistNameSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from songs.filters import SongFilterSet, ArtistFilterSet, AlbumFilterSet, PlaylistFilterSet
from rest_framework.permissions import IsAuthenticated


class SongsListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = SongFilterSet


class SongView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_field = "id"


class ArtistsListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ArtistFilterSet


class ArtistWithSongsView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    pagination_class = PageNumberPagination
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        related_objects = instance.songs.all()

        paginator = self.pagination_class()
        paginated_objects = paginator.paginate_queryset(
            related_objects, request)

        serialized_related_objects = SongDetailWithoutAritistSerializer(
            paginated_objects, many=True).data

        serializer = self.get_serializer(instance)
        response_data = serializer.data
        response_data['songs'] = serialized_related_objects

        return paginator.get_paginated_response(response_data)


class ArtistView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    lookup_field = "id"


class AlbumsListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = AlbumFilterSet


class AlbumView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_field = "id"


class AlbumWithSongsView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = PageNumberPagination
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        related_objects = instance.song_set.all()

        paginator = self.pagination_class()
        paginated_objects = paginator.paginate_queryset(
            related_objects, request)

        serialized_related_objects = SongSerializer(
            paginated_objects, many=True).data

        serializer = self.get_serializer(instance)
        response_data = serializer.data
        response_data['songs'] = serialized_related_objects

        return paginator.get_paginated_response(response_data)


class UserPlaylists(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlaylistNameSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PlaylistFilterSet

    def get_queryset(self):
        user = self.request.user
        return user.playlist_set.all()


class PlaylistSongsView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlaylistNameSerializer
    pagination_class = PageNumberPagination
    lookup_field = "id"

    def get_queryset(self):
        return self.request.user.playlist_set.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        related_objects = instance.songs.all()

        paginator = self.pagination_class()
        paginated_objects = paginator.paginate_queryset(
            related_objects, request)

        serialized_related_objects = SongSerializer(
            paginated_objects, many=True).data

        serializer = self.get_serializer(instance)
        response_data = serializer.data
        response_data['songs'] = serialized_related_objects
        return paginator.get_paginated_response(response_data)