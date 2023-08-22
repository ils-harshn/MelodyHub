import { getClassName } from "../../utils";
import ErrorType from "./Error.type";
import styles from "./Error.module.css";

const Error: React.FC<ErrorType> = ({
  children,
  className = "",
  varient = "primary",
  ...props
}) => {
  return (
    <div
      className={getClassName(className, styles["error"], styles[varient])}
      {...props}
    >
      {children}
    </div>
  );
};

export default Error;
