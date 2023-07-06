import FileResizer from "react-image-file-resizer";

export const resizeImage = (file, newFilename, width=300, height=300, fileFormat="png") => {
    return new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        width, // Specify the desired width
        height, // Specify the desired height
        fileFormat, // Output format (can be JPEG, PNG, or WEBP)
        100, // Image quality (0 to 100)
        0, // Rotation (0, 90, 180, or 270)
        (resizedImage) => {
          const renamedFile = new File([resizedImage], newFilename + "." + fileFormat, { type: resizedImage.type });
          resolve(renamedFile);
        },
        'file', // Output type (base64, blob, or file)
        width,
        height,
      );
    });
  };
