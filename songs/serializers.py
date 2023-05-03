from rest_framework import serializers
from songs.models import Song, Artist, Album


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = "__all__"

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = "__all__"

class ArtistNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("id", "name", "artists_thumbnail", "artists_thumbnail300x300")

class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(required=True)
    artist_set = ArtistNameSerializer(required=True, many=True)
    
    class Meta:
        model = Song
        fields = "__all__"