import { Skeleton } from "../Loaders/Loaders";
import { useState } from "react";
import ImageWithLoaderType from "./ImageWithLoader.type";
import { getClassName } from "../../utils";
import styles from "./ImageWithLoader.module.css";
import { useEffect } from "react";

const ImageWithLoader: React.FC<ImageWithLoaderType> = ({
  className = "",
  src,
  alt,
  skeleton = {},
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const { className: skeletonClassName = "", ...skeletonProps } = skeleton;

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded && (
        <Skeleton
          className={getClassName(skeletonClassName)}
          {...skeletonProps}
        />
      )}
      <img
        className={getClassName(
          styles["image-with-loader"],
          className,
          loaded ? "show" : "hide"
        )}
        src={src}
        alt={alt}
        {...props}
        onLoad={handleImageLoad}
      />
    </>
  );
};

export default ImageWithLoader;
