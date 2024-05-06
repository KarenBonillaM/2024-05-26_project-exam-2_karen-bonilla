import * as yup from "yup";

const mediaSchema = yup.object().shape({
  alt: yup.string(),
  url: yup.string().url("Media URL must be a valid URL"),
});

const locationSchema = yup.object().shape({
  address: yup.string().default("null"),
  city: yup.string().default("null"),
  zip: yup.string().default("null"),
  country: yup.string().default("null"),
  continent: yup.string().default("null"),
  lat: yup.number().default(0),
  lng: yup.number().default(0),
});

const venueSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  media: yup.array().of(mediaSchema),
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Max Guests is required"),
  rating: yup.number().default(0),
  meta: yup.object().shape({
    wifi: yup.boolean().default(false),
    parking: yup.boolean().default(false),
    breakfast: yup.boolean().default(false),
    pets: yup.boolean().default(false),
  }),
  location: locationSchema,
});

export default venueSchema;
