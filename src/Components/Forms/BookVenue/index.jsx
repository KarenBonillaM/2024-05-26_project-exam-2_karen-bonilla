import React, { useState, useEffect } from "react";
import newBookingSchema from "../../../Validation/BookVenue";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_HOLIDAZE_BOOKINGS } from "../../../Shared/apis";
import { load } from "../../../Shared/storage";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFetchSingle } from "../../../Hooks/useFetchSingle";
import { API_HOLIDAZE_VENUES } from "../../../Shared/apis";
import { format, addDays, parseISO } from "date-fns";

function BookVenueForm() {
  let { id } = useParams();
  const { data } = useFetchSingle(
    `${API_HOLIDAZE_VENUES}/${id}?_bookings=true`
  );
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(newBookingSchema),
    defaultValues: {
      guests: "",
    },
  });

  useEffect(() => {
    if (data && data.bookings) {
      const bookedDates = data.bookings.reduce((acc, booking) => {
        const dateFrom = parseISO(booking.dateFrom);
        const dateTo = parseISO(booking.dateTo);
        let currentDate = dateFrom;

        while (currentDate <= dateTo) {
          acc.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
        return acc;
      }, []);
      setUnavailableDates(bookedDates);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.price && selectedDates.length === 2) {
      const [start, end] = selectedDates;
      const days = Math.ceil((end, start) / (1000 * 60 * 60 * 24)) + 1;
      setTotalCost(days * data.price);
    }
  }, [selectedDates, data]);

  const onSubmit = async (formData) => {
    try {
      const token = await load("token");
      if (!token) {
        setAlertMessage({ type: "error", text: "User not registered" });
        return;
      }

      const bookingData = {
        dateFrom: selectedDates[0].toISOString(),
        dateTo: selectedDates[1].toISOString(),
        guests: formData.guests,
        venueId: id,
      };

      const response = await fetch(API_HOLIDAZE_BOOKINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "25333fa4-e617-4cfb-a41d-9fd9a59c9f28",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setAlertMessage({ type: "success", text: "Booking successful" });
      } else {
        throw new Error("Failed to book venue");
      }
    } catch (error) {
      setAlertMessage({ type: "error", text: "Failed to book venue" });
    }
  };

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      setSelectedDates(dates);
    }
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(
      (unavailableDate) =>
        format(unavailableDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

  const tileClassName = ({ date }) => {
    return isDateUnavailable(date) ? "bg-gray-400" : "";
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-SE", {
      style: "decimal",
      currency: "SEK",
    }).format(number);
  };

  useEffect(() => {
    if (data) {
      setValue("venueId", data.id);
    }
  }, [data, setValue]);

  return (
    <section className="calendar-container">
      <form
        className="p-4 m-auto rounded bg-white shadow-md shadow-slate-200"
        onSubmit={handleSubmit(onSubmit)}>
        <Calendar
          onChange={handleDateChange}
          formatLongDate={(locale, date) => formatDate(date)}
          value={selectedDates}
          selectRange={true}
          tileClassName={tileClassName}
          tileContent={({ date, view }) =>
            view === "month" && isDateUnavailable(date) ? (
              <div className="bg-gray-300 w-full h-full "></div>
            ) : null
          }
        />
        <div className="bg-gray-300 mt-6 p-2 inline-block">
          Unavailable dates
        </div>
        <div className="mt-3 font-bold text-xl">
          Total: ${formatNumber(totalCost)} SEK{" "}
        </div>
        <div className="relative my-6">
          <div className="pb-5">
            <input
              className="peer relative h-12 w-full rounded border border-slate-200 px-4 text- text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="number"
              placeholder="Number of guests"
              {...register("guests")}
            />
            <label
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-sm text-slate-500 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-blue-500
              peer-required:after:content-['\u00a0*'] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              htmlFor="guests">
              <span className="text-red-400">*</span> Guests:
            </label>
            <p className="text-red-500">{errors.guests?.message}</p>
          </div>
          <button
            className="flex uppercase h-12 w-full m-auto items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
            type="submit">
            Book
          </button>
        </div>
        {alertMessage && (
          <div
            className={`alert w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500 ${
              alertMessage.type === "success"
                ? "bg-emerald-100 text-emerald-500"
                : "bg-red-50 text-red-500"
            }
        `}>
            {alertMessage.text}
          </div>
        )}
      </form>
    </section>
  );
}

export default BookVenueForm;
