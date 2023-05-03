from django_filters import FilterSet, CharFilter, NumberFilter

class SongFilterSet(FilterSet):
    original_name = CharFilter(field_name="original_name", lookup_expr="icontains", label="Song Title")
    album__code = CharFilter(field_name="album__code", lookup_expr="icontains", label="Album Code")
    album__title = CharFilter(field_name="album__title", lookup_expr="icontains", label="Album Title")
    artist__name = CharFilter(field_name="artist__name", lookup_expr="icontains", label="Aritist Name")
    year = NumberFilter(field_name="album__year")