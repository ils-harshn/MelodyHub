from rest_framework import serializers
from songs.models import Song, Artist, Album, Playlist, SongReaction, Genre
from django.core.exceptions import ObjectDoesNotExist


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = "__all__"

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("id", "name", "artists_thumbnail", "artists_thumbnail300x300")

class ArtistNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("id", "name", "artists_thumbnail", "artists_thumbnail300x300")

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ("id", "name")

class SongSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(required=True)
    artist_set = ArtistNameSerializer(required=True, many=True)
    reaction = serializers.SerializerMethodField()
    genre = GenreSerializer(required=True)
    
    class Meta:
        model = Song
        fields = "__all__"
        read_only_fields = ["views"]

    def get_reaction(self, obj):
        user = self.context['request'].user
        try:
            reaction = user.songreaction_set.get(song_id=obj.id).reaction
        except ObjectDoesNotExist:
            reaction = "neutral"
        return reaction

class SongDetailWithoutAritistSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(required=True)
    reaction = serializers.SerializerMethodField()
    genre = GenreSerializer(required=True)

    class Meta:
        model = Song
        fields = "__all__"
        read_only_fields = ["views"]
    
    def get_reaction(self, obj):
        user = self.context['request'].user
        try:
            reaction = user.songreaction_set.get(song_id=obj.id).reaction
        except ObjectDoesNotExist:
            reaction = "neutral"
        return reaction

class PlaylistNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ("id", "title")

class SongReactionSerializer(serializers.ModelSerializer):
    song_id = serializers.ReadOnlyField(source='song.id')
    user_id = serializers.ReadOnlyField(source='user.id')
    
    class Meta:
        model = SongReaction
        fields = ("reaction", "song_id", "user_id")

class SongSerializerWithoutReaction(serializers.ModelSerializer):
    album = AlbumSerializer(required=True)
    artist_set = ArtistNameSerializer(required=True, many=True)
    genre = GenreSerializer(required=True)
    
    class Meta:
        model = Song
        fields = "__all__"
        read_only_fields = ["views"]

class SongReactionWithSongsSerializer(serializers.ModelSerializer):
    song = SongSerializerWithoutReaction(required=True)
    
    class Meta:
        model = SongReaction
        fields = ("song",)