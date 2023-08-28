import { getClassName } from "../../utils";
import { LoaderType, SkeletonType } from "./Loaders.types";
import styles from "./Loaders.module.css";
import Idol from "../Idol/Idol";

export const Loader: React.FC<LoaderType> = ({
  size = "medium",
  varient = "primary",
  className = "",
  ...props
}) => {
  return (
    <div
      className={getClassName(
        className,
        styles["loader"],
        styles[size],
        styles[varient]
      )}
      {...props}
    ></div>
  );
};

const FullPageLoader: React.FC = () => {
  return (
    <div className={getClassName(styles["full-page-loader"])}>
      <div className="container">
        <Idol className="centered-logo" />
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export const Skeleton: React.FC<SkeletonType> = ({ className = "" }) => {
  return <div className={getClassName(styles["skeleton"], className)}></div>;
};

export default FullPageLoader;
