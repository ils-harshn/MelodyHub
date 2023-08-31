import { getClassName } from "../../utils";
import SongContainerType from "./Containers.types";
import styles from "./Containers.module.css";

const SongCardContainer: React.FC<SongContainerType> = ({
  className = "",
  children,
}) => {
  return (
    <div className={getClassName(styles["song-card-container"], className)}>
      {children}
    </div>
  );
};

export default SongCardContainer;
