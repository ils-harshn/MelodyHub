import FileResizer from "react-image-file-resizer";

export const resizeImage = (file, newFilename, width=300, height=300, fileFormat="png") => {
    return new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        width,
        height,
        fileFormat,
        100,
        0,
        (resizedImage) => {
          const renamedFile = new File([resizedImage], newFilename + "." + fileFormat, { type: resizedImage.type });
          resolve(renamedFile);
        },
        'file',
        width,
        height,
      );
    });
  };
