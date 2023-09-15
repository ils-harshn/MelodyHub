import {
  FilterSongsPayloadType,
  GetAlbumSongsPayload,
  GetArtistSongsPayload,
  GetPlaylistSongsPayloadType,
  OnlyPagePayloadType,
} from "../../apis/src/payload.types";
import { SongType } from "../../apis/src/response.types";
import { useMusicPlayerPlaylistData } from "../../hooks/MusicPlayerPlaylistHooks";
import { getClassName } from "../../utils";
import styles from "./MusicPlayerPlaylist.module.css";
import {
  AlbumSongsList,
  ArtistSongsList,
  FilteredSongsList,
  LikedSongsList,
  PlaylistSongsList,
  SingleSongSelected,
} from "./PlaylistShowers";

const MusicPlayerPlaylist: React.FC = () => {
  const { open, queryKey, currentSong, index, pageNumber, queryPayload } =
    useMusicPlayerPlaylistData();

  let componentToRender;

  switch (queryKey) {
    case "SET_SINGLE_SONG_ACTION":
      componentToRender = <SingleSongSelected song={currentSong as SongType} />;
      break;
    case "FILTERED_SONGS_INFINITE_QUERY":
      componentToRender = (
        <FilteredSongsList
          index={index as number}
          pageNumber={pageNumber as number}
          payload={queryPayload as FilterSongsPayloadType}
        />
      );
      break;
    case "GET_PLAYLIST_SONGS_INFINITE_QUERY":
      componentToRender = (
        <PlaylistSongsList
          index={index as number}
          pageNumber={pageNumber as number}
          payload={queryPayload as GetPlaylistSongsPayloadType}
        />
      );
      break;
    case "GET_ALBUM_SONGS_INFINITE_QUERY":
      componentToRender = (
        <AlbumSongsList
          index={index as number}
          pageNumber={pageNumber as number}
          payload={queryPayload as GetAlbumSongsPayload}
        />
      );
      break;
    case "GET_ARTIST_SONGS_INFINITE_QUERY":
      componentToRender = (
        <ArtistSongsList
          index={index as number}
          pageNumber={pageNumber as number}
          payload={queryPayload as GetArtistSongsPayload}
        />
      );
      break;
    case "GET_LIKED_SONGS":
      componentToRender = (
        <LikedSongsList
          index={index as number}
          pageNumber={pageNumber as number}
          payload={queryPayload as OnlyPagePayloadType}
        />
      );
      break;
    default:
      return null;
  }
  return (
    <div
      className={getClassName(
        styles["music-player-playlist"],
        open ? "active" : "",
        "primary-scroll-bar"
      )}
    >
      {componentToRender}
    </div>
  );
};

export default MusicPlayerPlaylist;
