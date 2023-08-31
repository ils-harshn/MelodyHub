import { Options } from "../../assests/icons";
import { getClassName } from "../../utils";
import { PlayPauseButton } from "../Buttons/buttons";
import ImageWithLoader from "../ImageWithLoader/ImageWithLoader";
import styles from "./Cards.module.css";

const SongCard: React.FC = () => {
  return (
    <div className={getClassName(styles["song-card"])}>
      <div className="thumbnail">
        <ImageWithLoader
          src="https://drive.google.com/uc?id=15IFPEtrZ9_aZ_a0T1ZeraswlNvElvkb0&export=download"
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
          <div className="song-name truncate">Tum Ho</div>
          <div className="description">
            <div className="album-name truncate">Rockstar (2007)</div>
            <div className="artists-name truncate">
              Udit Narayan, Alka Yagnik, Lata Mangeshker
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
