import { Options } from "../../assests/icons";
import { getClassName } from "../../utils";
import { generateURLFromID } from "../../utils/helpers/urls";
import { PlayPauseButton } from "../Buttons/buttons";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import styles from "./Cards.module.css";
import { SongCardType } from "./Cards.types";

const SongCard: React.FC<SongCardType> = ({ data, ...props }) => {
  return (
    <div className={getClassName(styles["song-card"])} {...props}>
      <div className="thumbnail">
        <ImageWithLoader
          src={generateURLFromID(data.album.thumbnail300x300)}
          alt="Loading"
          skeleton={{
            className: "skeleton",
          }}
        />
        <div className="thumbnail-button">
          <PlayPauseButton playing={false} size="medium" />
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

export default SongCard;
