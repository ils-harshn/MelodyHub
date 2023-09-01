import ImageWithLoader from "./ImageWithLoader";
import { ImageWithLoaderWrapper } from "./ImageWithLoader.decorators";

export default {
  title: "Components",
  component: ImageWithLoader,
  decorators: [ImageWithLoaderWrapper],
};

export const ImageLoader = () => (
  <ImageWithLoader src="https://drive.google.com/uc?id=1MjslXO8Qd7m4nRI0IlgAP6nnRCpanVl1&export=download" />
);
