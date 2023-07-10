import * as Yup from "yup"

const MAX_IMAGE_SIZE_IN_MB = 5

const validationSchema = Yup.object({
  name: Yup.string().required("Artist name is required"),
  file: Yup.mixed()
    .required('File is required')
    .test('fileSize', `File size must be less than ${MAX_IMAGE_SIZE_IN_MB} MB`, (value) => {
      if (value) {
        const fileSizeInBytes = value.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        return fileSizeInMB <= MAX_IMAGE_SIZE_IN_MB;
      }
      return true;
    }),
});

export const initialValues = {
  name: "",
  file: null,
}

export default validationSchema