import * as Yup from "yup"

const MAX_IMAGE_SIZE_IN_MB = 5

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  year: Yup.number()
    .typeError('Year must be a valid number')
    .required('Year is required')
    .test('is-correct-year', 'Invalid year (Please enter year in between 1900 to current year)', (value) => {
      const currentYear = new Date().getFullYear();
      return (value <= currentYear && value >= 1900)
    }),
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
  title: "",
  year: "",
  file: null,
}

export default validationSchema