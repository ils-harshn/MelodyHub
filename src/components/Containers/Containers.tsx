import { getClassName } from "../../utils";
import SongContainerType, {
  ContentContainerType,
  ImageCardContainerType,
  PlaylistCardContainerType,
  SongCardLandscapeContainerType,
} from "./Containers.types";
import styles from "./Containers.module.css";
import { Cross } from "../../assests/icons";

const SongCardContainer: React.FC<SongContainerType> = ({
  className = "",
  children,
  onClick,
  title,
  optionTitle,
  ...props
}) => {
  return (
    <div className={getClassName(className, styles["container"])} {...props}>
      <div className="heading">
        <div>{title}</div>
        {optionTitle ? <div onClick={onClick}>{optionTitle}</div> : null}
      </div>
      <div className={getClassName(styles["song-card-container"])}>
        {children}
      </div>
    </div>
  );
};

export const ContentCardContainer: React.FC<ContentContainerType> = ({
  className = "",
  children,
  onClick,
  title,
  optionTitle,
  ...props
}) => {
  return (
    <div className={getClassName(className, styles["container"])} {...props}>
      <div className="heading">
        <div>{title}</div>
        {optionTitle ? <div onClick={onClick}>{optionTitle}</div> : null}
      </div>
      <div className={getClassName(styles["content-card-container"])}>
        {children}
      </div>
    </div>
  );
};

export const ImageCardContainer: React.FC<ImageCardContainerType> = ({
  className = "",
  children,
  onClick,
  title,
  optionTitle,
  ...props
}) => {
  return (
    <div className={getClassName(className, styles["container"])} {...props}>
      <div className="heading">
        <div>{title}</div>
        {optionTitle ? <div onClick={onClick}>{optionTitle}</div> : null}
      </div>
      <div className={getClassName(styles["image-card-container"])}>
        {children}
      </div>
    </div>
  );
};

export const SongCardLandscapeContainer: React.FC<
  SongCardLandscapeContainerType
> = ({ className = "", children, onClick, title, optionTitle, ...props }) => {
  return (
    <div className={getClassName(className, styles["container"])} {...props}>
      <div className="heading">
        <div className="truncate">{title}</div>
        {optionTitle ? <div onClick={onClick}>{optionTitle}</div> : null}
      </div>
      <div className={getClassName(styles["song-card-landscape-container"])}>
        {children}
      </div>
    </div>
  );
};

export const PlaylistCardContainer: React.FC<PlaylistCardContainerType> = ({
  className = "",
  children,
  onClick,
  title,
  optionTitle,
  onClickClose,
  ...props
}) => {
  return (
    <div
      className={getClassName(styles["playlist-card-container"], className)}
      {...props}
    >
      <div className="heading">
        <div className="truncate">{title}</div>
        <div className="cross-button" onClick={onClickClose}>
          <Cross />
        </div>
      </div>
      <div className={"playlist-card-items"}>{children}</div>
    </div>
  );
};

export default SongCardContainer;
