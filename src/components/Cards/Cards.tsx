import { Album, Options } from "../../assests/icons";
import {
  useMusicPlayerData,
  useMusicPlayerDispatch,
} from "../../hooks/MusicPlayerHooks";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import { PlayPauseButton } from "../Buttons/buttons";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import { FullLoader } from "../Loaders/Loaders";
import styles from "./Cards.module.css";
import {
  ContentCardType,
  ImageCardType,
  LoadMoreCardType,
  OptionPopupType,
  SongCardType,
} from "./Cards.types";

const OptionPopup: React.FC<OptionPopupType> = ({
  data,
  handlePlay,
  isPlaying,
}) => {
  return (
    <div className="option-button">
      <Options />
      <div className="options">
        <div className="option">Add To Playlist</div>
        <div className="option">Add To Queue</div>
        <div className="option" onClick={handlePlay}>
          {isPlaying ? "Pause" : "Play"}
        </div>
      </div>
    </div>
  );
};

const SongCard: React.FC<SongCardType> = ({ data, ...props }) => {
  const dispatch = useMusicPlayerDispatch();
  const musicPlayerData = useMusicPlayerData();

  const handleThumbnailClick = () => {
    dispatch({
      type: "TOGGLE",
      payload: {
        open: true,
        playing:
          musicPlayerData.data?.id === data.id
            ? !musicPlayerData.playing
            : true,
        data: {
          id: data.id,
          album_image_id: data.album.thumbnail,
        },
      },
    });
  };

  return (
    <div
      className={getClassName(
        styles["song-card"],
        musicPlayerData.data?.id === data.id ? "selected" : ""
      )}
      {...props}
    >
      <div className="thumbnail" onClick={handleThumbnailClick}>
        <ImageWithLoader
          src={generateURLFromID(data.album.thumbnail300x300)}
          alt="Loading"
          skeleton={{
            className: "skeleton",
          }}
        />
        <div className={"thumbnail-button"}>
          <PlayPauseButton
            playing={
              musicPlayerData.data?.id === data.id && musicPlayerData.playing
            }
            size="medium"
          />
        </div>
      </div>
      <div className="details">
        <div>
          <div className="song-name truncate">{data.original_name}</div>
          <div className="description">
            <div className="album-name truncate">
              {data.album.title} ({data.album.year})
            </div>
            <div className="artists-name truncate">
              {data.artist_set.map((item) => item.name).join(", ")}
            </div>
          </div>
        </div>
        <div className="listens-and-option">
          <OptionPopup
            data={data}
            handlePlay={handleThumbnailClick}
            isPlaying={
              musicPlayerData.data?.id === data.id && musicPlayerData.playing
            }
          />
          <div>604 Listened</div>
        </div>
      </div>
    </div>
  );
};

export const ContentCard: React.FC<ContentCardType> = ({
  title,
  Icon = Album,
  className = "",
  ...props
}) => {
  return (
    <div className={getClassName(styles["content-card"], className)} {...props}>
      <div className="icon">
        <Icon />
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

export const ImageCard: React.FC<ImageCardType> = ({
  className = "",
  title,
  optionTitle = "",
  src,
  alt = "image",
  ...props
}) => {
  return (
    <div className={getClassName(styles["image-card"], className)} {...props}>
      <ImageWithLoader
        src={src}
        alt={alt}
        skeleton={{
          className: "skeleton",
        }}
      />
      <div className="title">
        <p className="truncate">{title}</p>
      </div>
      <div className="title-bottom">
        <p className="truncate">{optionTitle}</p>
      </div>
    </div>
  );
};

export const LoadMoreCard: React.FC<LoadMoreCardType> = ({
  className = "",
  title,
  isDisabled,
  onClick,
  isLoading,
  ...props
}) => {
  return (
    <div
      className={getClassName(styles["load-more-card"], className)}
      {...props}
      onClick={isDisabled ? undefined : onClick}
    >
      {isLoading ? <FullLoader size="small" /> : <p>{title}</p>}
    </div>
  );
};
export default SongCard;
