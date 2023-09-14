import { getClassName } from "../../utils";
import MusicPlayerType, { MusicOptionType } from "./MusicPlayer.types";
import styles from "./MusicPlayer.module.css";
import { useEffect, useState } from "react";
import { TRIOLOGY_ID } from "../../consts/ids";
import {
  useMusicPlayerData,
  useMusicPlayerDispatch,
} from "../../hooks/MusicPlayerHooks";
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
import {
  useMusicPlayerPlaylistData,
  useMusicPlayerPlaylistDispatch,
} from "../../hooks/MusicPlayerPlaylistHooks";
import {
  useNeutralizeReactionOnSongMutation,
  useReactOnASongMutation,
} from "../../apis/src/queryHooks";
import { useToken } from "../../hooks/TokenHooks";

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
  const { currentSong } = useMusicPlayerPlaylistData();
  const [liked, setLiked] = useState(
    currentSong?.reaction === "like" ? true : false
  );
  const { token } = useToken();
  const { mutate: likeSong, isLoading: liking } = useReactOnASongMutation(
    token,
    {
      onSuccess: () => {
        setLiked(true);
      },
    }
  );

  const { mutate: neutralizeReaction, isLoading: neutralizing } =
    useNeutralizeReactionOnSongMutation(token, {
      onSuccess: () => {
        setLiked(false);
      },
    });

  useEffect(() => {
    setLiked(currentSong?.reaction === "like" ? true : false);
  }, [currentSong]);

  return (
    <div className="block-1">
      <div className="details">
        <div className="title truncate">{currentSong?.original_name}</div>
        <div className="artists truncate">
          {currentSong?.artist_set.map((item) => item.name).join(", ")}
        </div>
        <div className="album truncate">
          {currentSong?.album.title} ({currentSong?.album.year})
        </div>
      </div>
      <div
        className={getClassName("like-button", liked ? "liked" : "")}
        onClick={() => {
          if (!liking && !neutralizing && currentSong) {
            if (liked === false)
              likeSong({
                id: currentSong.id,
                reaction: "like",
              });
            else
              neutralizeReaction({
                id: currentSong.id,
              });
          }
        }}
      >
        {liked ? <Heart /> : <HollowHeart />}
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

const MusicOption: React.FC<MusicOptionType> = ({
  active,
  children,
  onClick,
}) => {
  return (
    <div
      className={getClassName("option", active ? "active" : "deactive")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const MusicPlayerOptions: React.FC = () => {
  const [activeOptionIndex, setActiveOpenIndex] = useState(0);
  const dispatchMusicPlayerPlaylist = useMusicPlayerPlaylistDispatch();

  const handleOptionClick = (index: number) => {
    const activeIndex = activeOptionIndex === index ? 0 : index;
    setActiveOpenIndex(activeIndex);

    // Handle Player Playlist
    dispatchMusicPlayerPlaylist({
      type: "TOGGLE_OPEN",
      payload: { open: activeIndex === 2 },
    });
  };

  return (
    <div className="options">
      <MusicOption
        active={activeOptionIndex === 1}
        onClick={() => handleOptionClick(1)}
      >
        <Mic />
      </MusicOption>

      <MusicOption
        active={activeOptionIndex === 2}
        onClick={() => handleOptionClick(2)}
      >
        <Playlist />
      </MusicOption>

      <MusicOption
        active={activeOptionIndex === 3}
        onClick={() => handleOptionClick(3)}
      >
        <Bars />
      </MusicOption>
      <VolumeOption />
    </div>
  );
};

const MusicPlayerButtons: React.FC = () => {
  const { playing } = useMusicPlayerData();
  const dispatchMusicPlayerOption = useMusicPlayerDispatch();
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
        playing={playing || false}
        varient="secondary"
        className="music-player-play-pause-button"
        onClick={() =>
          dispatchMusicPlayerOption({
            type: "TOGGLE_PLAYING",
            payload: { playing: !playing },
          })
        }
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
  const { currentSong } = useMusicPlayerPlaylistData();

  useEffect(() => {
    const ele = document.getElementById(TRIOLOGY_ID);
    if (ele) {
      ele.style.height = currentSong ? "calc(100vh - 90px)" : "100vh";
    }
  }, [currentSong]);

  return (
    <div
      className={getClassName(
        className,
        styles["music-player"],
        currentSong ? "open" : ""
      )}
    >
      {currentSong ? (
        <>
          <TimerSlider />
          <SongDetails />
          <MusicPlayerButtons />
          <MusicPlayerOptions />
        </>
      ) : null}
    </div>
  );
};

export default MusicPlayer;
