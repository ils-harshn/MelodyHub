import { getClassName } from "../../utils";
import MusicPlayerType from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";
import { useEffect } from "react";
import { TRIOLOGY_ID } from "../../consts/ids";
import { useMusicPlayerData } from "../../hooks/MusicPlayerHooks";

const MusicPlayer: React.FC<MusicPlayerType> = ({ className = "" }) => {
  const musicPlayerData = useMusicPlayerData();

  useEffect(() => {
    const ele = document.getElementById(TRIOLOGY_ID);
    if (ele) {
      ele.style.height =
        musicPlayerData.open === true ? "calc(100vh - 90px)" : "100vh";
    }
  }, [musicPlayerData.open]);

  return (
    <div
      className={getClassName(
        className,
        styles["music-player"],
        musicPlayerData.open === true ? "open" : ""
      )}
    >
      {musicPlayerData.data?.id}
    </div>
  );
};

export default MusicPlayer;
