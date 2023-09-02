from django_filters import FilterSet, CharFilter, NumberFilter

class SongFilterSet(FilterSet):
    original_name = CharFilter(field_name="original_name", lookup_expr="icontains", label="Song Title")
    album__code = CharFilter(field_name="album__code", lookup_expr="icontains", label="Album Code")
    album__title = CharFilter(field_name="album__title", lookup_expr="icontains", label="Album Title")
    artist__name = CharFilter(field_name="artist__name", lookup_expr="icontains", label="Aritist Name")
    year = NumberFilter(field_name="album__year")
    genre = CharFilter(field_name="genre__name", lookup_expr="icontains", label="Genre")

class ArtistFilterSet(FilterSet):
    name = CharFilter(field_name="name", lookup_expr="icontains", label="Artist Name")

class AlbumFilterSet(FilterSet):
    title = CharFilter(field_name="title", lookup_expr="icontains", label="Name")
    code = CharFilter(field_name="code", lookup_expr="icontains", label="Code")
    year = CharFilter(field_name="year", lookup_expr="icontains", label="Year")

class PlaylistFilterSet(FilterSet):
    title = CharFilter(field_name="title", lookup_expr="icontains", label="Playlist Title")

class GenreFilterSet(FilterSet):
    name = CharFilter(field_name="name", lookup_expr="icontains", label="Genre")