from rest_framework.generics import ListAPIView
from songs.models import Song, Album, Artist
from songs.serializers import SongSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from songs.filters import SongFilterSet

class SongsListView(ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = SongFilterSet