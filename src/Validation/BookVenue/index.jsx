import * as yup from "yup";

const newBookingSchema = yup.object({
  dateFrom: yup.string(),
  dateTo: yup.string(),
  guests: yup
    .number()
    .required("Guests is required")
    .positive("Guests must be a positive number")
    .integer("Guests must be a whole number"),
  venueId: yup.string().required("Venue ID is required"),
});

export default newBookingSchema;
