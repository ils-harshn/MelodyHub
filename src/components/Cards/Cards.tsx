import { Album, Options } from "../../assests/icons";
import {
  useMusicPlayerData,
  useMusicPlayerDispatch,
} from "../../hooks/MusicPlayerHooks";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import { PlayPauseButton } from "../Buttons/buttons";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import styles from "./Cards.module.css";
import { ContentCardType, SongCardType } from "./Cards.types";

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
          <div className="option-button">
            <Options />
          </div>
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

export default SongCard;
