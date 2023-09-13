import { useMusicPlayerPlaylistData } from "../../hooks/MusicPlayerPlaylistHooks";
import { getClassName } from "../../utils";
import { SongCardLandscape } from "../Cards/Cards";
import styles from "./MusicPlayerPlaylist.module.css";

const MusicPlayerPlaylist: React.FC = () => {
  const { open, currentSong, ...options } = useMusicPlayerPlaylistData();
  return (
    <div
      className={getClassName(
        styles["music-player-playlist"],
        open ? "active" : ""
      )}
    >
      {currentSong ? (
        options.type === undefined &&
        options.index === undefined &&
        options.pageNumber === undefined &&
        options.payload === undefined ? (
          <SongCardLandscape data={currentSong} index={1} />
        ) : (
          <div>Fetch</div>
        )
      ) : (
        <div>No playlist or song selected</div>
      )}
    </div>
  );
};

export default MusicPlayerPlaylist;
