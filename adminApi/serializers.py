from rest_framework import serializers
from songs.serializers import ArtistNameSerializer
from songs.models import Song, Artist

class SongCompleteSerializer(serializers.ModelSerializer):
    artist_set = ArtistNameSerializer(required=False, many=True)
    
    class Meta:
        model = Song
        fields = "__all__"
        read_only_fields = ["views", "artist_set"]