import { Pause, Play } from "../../assests/icons";
import { getClassName } from "../../utils";
import { Loader } from "../Loaders/Loaders";
import styles from "./buttons.module.css";
import { ButtonType, PlayPauseButtonType } from "./buttons.types";

const Button: React.FC<ButtonType> = ({
  children,
  className = "",
  varient = "primary",
  width = "fit",
  textcase = "upper-case",
  Icon,
  RightIcon,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={getClassName(
        className,
        styles["button"],
        styles[varient],
        styles[width],
        textcase
      )}
      {...props}
    >
      {loading ? (
        <Loader size="small" varient="secondary" />
      ) : (
        <>
          {Icon ? <Icon /> : null}
          <div className={styles["button-children"]}>{children}</div>
          {RightIcon ? <RightIcon /> : null}
        </>
      )}
    </button>
  );
};

const PlayPauseButton: React.FC<PlayPauseButtonType> = ({
  className = "",
  varient = "primary",
  playing = false,
  size = "medium",
  ...props
}) => {
  return (
    <button
      className={getClassName(
        className,
        styles["play-pause-button"],
        size,
        varient,
        playing ? "playing" : "pause"
      )}
      {...props}
    >
      {playing ? <Pause /> : <Play />}
    </button>
  );
};

export { Button, PlayPauseButton };
