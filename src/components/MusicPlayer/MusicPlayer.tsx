import { getClassName } from "../../utils";
import MusicPlayerType from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";
import { useEffect, useState } from "react";
import { TRIOLOGY_ID } from "../../consts/ids";
import { useMusicPlayerData } from "../../hooks/MusicPlayerHooks";
import { Heart, HollowHeart } from "../../assests/icons";

const TimerSlider: React.FC = () => {
  const [value, setValue] = useState(0);

  const getBackgroundSize = () => {
    return { backgroundSize: `${value}% 100%` };
  };

  return (
    <input
      className="timer-range"
      type="range"
      min={0}
      max={100}
      onChange={(e) => setValue(parseInt(e.target.value) || 0)}
      style={getBackgroundSize()}
      value={value}
    />
  );
};

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
      <TimerSlider />
      <div className="block-1">
        <div className="details">
          <div className="title truncate">Tune Jo Na Kaha</div>
          <div className="artists truncate">Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam</div>
        </div>
        <div className="like-button">
          <HollowHeart />
        </div>
      </div>
      <div className="buttons"></div>
      <div className="options"></div>
    </div>
  );
};

export default MusicPlayer;
