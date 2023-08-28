import { SkeletonType } from "../Loaders/Loaders.types";

type ImageWithLoaderType = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  skeleton?: SkeletonType;
};

export default ImageWithLoaderType;
