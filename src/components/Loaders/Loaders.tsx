import { getClassName } from "../../utils";
import { LoaderType } from "./Loaders.types";
import styles from "./Loaders.module.css";

const Loader: React.FC<LoaderType> = ({
  size = "medium",
  varient='primary',
  className = "",
  ...props
}) => {
  return (
    <div
      className={getClassName(
        className,
        styles["loader"],
        styles[size],
        styles[varient],
      )}
      {...props}
    ></div>
  );
};

export { Loader };