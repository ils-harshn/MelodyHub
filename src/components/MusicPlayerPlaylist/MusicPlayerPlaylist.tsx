import { useMusicPlayerPlaylistData } from "../../hooks/MusicPlayerPlaylistHooks";
import { getClassName } from "../../utils";
import styles from "./MusicPlayerPlaylist.module.css";

const MusicPlayerPlaylist: React.FC = () => {
  const { open } = useMusicPlayerPlaylistData();
  return (
    <div
      className={getClassName(
        styles["music-player-playlist"],
        open ? "active" : ""
      )}
    ></div>
  );
};

export default MusicPlayerPlaylist;
