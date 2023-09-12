import { getClassName } from "../../utils";
import MusicPlayerType from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";
import { useEffect, useState } from "react";
import { TRIOLOGY_ID } from "../../consts/ids";
import { useMusicPlayerData } from "../../hooks/MusicPlayerHooks";
import {
  Bars,
  Heart,
  HollowHeart,
  Mic,
  Mute,
  Next,
  Playlist,
  Previous,
  Random,
  Repeat,
  RepeatSingle,
  VolumeFull,
  VolumeLow,
} from "../../assests/icons";
import { PlayPauseButton } from "../Buttons/buttons";

const VolumeOption: React.FC = () => {
  const [value, setValue] = useState(65);

  const getBackgroundSize = () => {
    return { backgroundSize: `${value}% 100%` };
  };

  return (
    <div className="option volume-option">
      {value >= 70 ? <VolumeFull /> : value === 0 ? <Mute /> : <VolumeLow />}
      <input
        className="volmue-range"
        type="range"
        min={0}
        max={100}
        step={1}
        onChange={(e) => setValue(parseInt(e.target.value) || 0)}
        style={getBackgroundSize()}
        value={value}
      />
    </div>
  );
};

const SongDetails: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="block-1">
      <div className="details">
        <div className="title truncate">Tune Jo Na Kaha</div>
        <div className="artists truncate">
          Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam, Pritam,
          Pritam, Pritam, Pritam, Pritam
        </div>
        <div className="album truncate">Ek Tha Tiger (2007)</div>
      </div>
      <div
        className={getClassName("like-button", clicked ? "liked" : "")}
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        {clicked ? <Heart /> : <HollowHeart />}
      </div>
    </div>
  );
};

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
      step={0.02}
      onChange={(e) => setValue(parseInt(e.target.value) || 0)}
      style={getBackgroundSize()}
      value={value}
    />
  );
};

const MusicPlayerOptions: React.FC = () => {
  return (
    <div className="options">
      <div className="option">
        <Mic />
      </div>
      <div className="option">
        <Playlist />
      </div>
      <div className="option">
        <Bars />
      </div>
      <VolumeOption />
    </div>
  );
};

const MusicPlayerButtons: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [repeatState, setRepeatState] = useState(0);
  const [randomActive, setRandomActive] = useState(false);

  return (
    <div className="buttons">
      <button
        className={getClassName(
          "music-button",
          "random-state",
          randomActive === false ? "" : "active"
        )}
        onClick={() =>
          setRandomActive((prev) => {
            setRepeatState(0);
            return !prev;
          })
        }
      >
        <Random />
      </button>
      <button className="music-button previous-button">
        <Previous />
      </button>
      <PlayPauseButton
        size="medium"
        playing={playing}
        varient="secondary"
        className="music-player-play-pause-button"
        onClick={() => setPlaying(!playing)}
      />
      <button className="music-button next-button">
        <Next />
      </button>
      <button
        className={getClassName(
          "music-button",
          "repeat-state",
          repeatState === 0 ? "" : "active"
        )}
        onClick={() =>
          setRepeatState((prev) => {
            setRandomActive(false);
            return (prev + 1) % 3;
          })
        }
      >
        {repeatState === 2 ? <RepeatSingle /> : <Repeat />}
      </button>
    </div>
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
      <SongDetails />
      <MusicPlayerButtons />
      <MusicPlayerOptions />
    </div>
  );
};

export default MusicPlayer;
