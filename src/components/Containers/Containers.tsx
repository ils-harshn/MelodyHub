import { getClassName } from "../../utils";
import SongContainerType from "./Containers.types";
import styles from "./Containers.module.css";

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

export default SongCardContainer;
