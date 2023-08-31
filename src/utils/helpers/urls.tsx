export const generateURLFromID = (id: string) => {
  const isURL = id.startsWith("http") || id.startsWith("https");

  if (!isURL) {
    // If the ID is not a URL, generate the Google Drive download URL
    return `https://drive.google.com/uc?id=${id}&export=download`;
  } else {
    // If the ID is already a URL, return it as is
    return id;
  }
};
