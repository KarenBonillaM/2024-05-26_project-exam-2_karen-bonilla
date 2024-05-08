import * as yup from "yup";

const editUserSchema = yup
  .object({
    bio: yup.string(),
    banner: yup.object().shape({
      alt: yup.string(),
      url: yup.string().url("Banner URL must be a valid URL"),
    }),
    avatar: yup.object().shape({
      alt: yup.string(),
      url: yup.string().url("Avatar URL must be a valid URL"),
    }),
    venueManager: yup.boolean(),
  })
  .required();

export default editUserSchema;
