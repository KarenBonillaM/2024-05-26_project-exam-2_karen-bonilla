import * as yup from "yup";

const mediaSchema = yup.object().shape({
  alt: yup.string(),
  url: yup.string().url("Media URL must be a valid URL"),
});

const locationSchema = yup.object().shape({
  address: yup.string(),
  city: yup.string(),
  zip: yup.string(),
  country: yup.string(),
  continent: yup.string(),
  lat: yup.number(),
  lng: yup.number(),
});

const editVenueSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  media: yup.array().of(mediaSchema),
  price: yup.number().optional(),
  maxGuests: yup.number().optional(),
  rating: yup.number(),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: locationSchema,
});

export default editVenueSchema;
