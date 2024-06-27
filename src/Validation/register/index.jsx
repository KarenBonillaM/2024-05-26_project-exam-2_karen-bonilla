import * as yup from "yup";

const registerSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "Your name should be at least 3 character")
      .max(50, "Your name can't be longer than 50 characters")
      .required("Name is required"),
    email: yup
      .string()
      .matches(/^[\w-.]+@(stud\.)?noroff.no$/, "Please enter a valid email")
      .required("Email is required"),
    avatar: yup.object().shape({
      alt: yup.string("Avatar alt must be a string"),
      url: yup.string().url("Avatar URL must be a valid URL"),
    }),
    venueManager: yup.boolean().required("Venue Manager is required"),
    password: yup.string().min(8).required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

export default registerSchema;
