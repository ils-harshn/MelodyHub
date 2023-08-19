import { getClassName } from "../../utils";
import styles from "./buttons.module.css";
import { ButtonType } from "./buttons.types";

const Button: React.FC<ButtonType> = ({
  children,
  className = "",
  varient = "primary",
  width="fit",
  icon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={getClassName(className, styles["button"], styles[varient], styles[width])}
      {...props}
    >
      {icon}
      <div className={styles["button-children"]}>{children}</div>
      {rightIcon}
    </button>
  );
};

export { Button };
