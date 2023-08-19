import { getClassName } from "../../utils";
import { Loader } from "../Loaders/Loaders";
import styles from "./buttons.module.css";
import { ButtonType } from "./buttons.types";

const Button: React.FC<ButtonType> = ({
  children,
  className = "",
  varient = "primary",
  width = "fit",
  textcase="upper-case",
  icon,
  rightIcon,
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
        textcase,
      )}
      {...props}
    >
      {loading ? (
        <Loader size="small" varient="secondary" />
      ) : (
        <>
          {icon}
          <div className={styles["button-children"]}>{children}</div>
          {rightIcon}
        </>
      )}
    </button>
  );
};

export { Button };
