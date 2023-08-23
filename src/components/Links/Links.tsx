import { Link } from "react-router-dom";
import { AType } from "./Links.types";
import styles from "./Links.module.css";
import { getClassName } from "../../utils";

const A: React.FC<AType> = ({
  children,
  className = "",
  size = "medium",
  varient = "primary",
  underline = "underline",
  ...props
}) => {
  return (
    <Link
      className={getClassName(
        className,
        styles["link"],
        styles[size],
        styles[varient],
        underline
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default A;
