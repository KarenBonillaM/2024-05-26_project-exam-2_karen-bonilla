import { useFetchSingle } from "../../Hooks/useFetchSingle";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import House from "../../images/house.jpg";

function VenueEdit() {
  let { id } = useParams();
  const { data, isLoading, isError } = useFetchSingle(
    `${API_HOLIDAZE_VENUES}/${id}?_bookings=true`
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  console.log("VENUE DATA", data);

  const bookingsExist = data._count?.bookings > 0;

  console.log("Bookings", bookingsExist);

  return (
    <div
      key={data.id}
      className="venue-container container m-auto py-6 lg:px-20">
      <section className="section-image-venue">
        <div className="venue-image-container">
          <img
            className="h-96 w-full object-fill rounded-lg"
            src={
              data.media && data.media.length > 0 ? data.media[0].url : House
            }
            alt={
              data.media && data.media.length > 0 ? data.media[0].alt : "house"
            }></img>
        </div>
      </section>
      <section className="section-venue-booking grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 pt-8">
        <div className="venue-info-container col-span-4 lg:col-span-12">
          <div>
            <h1 className="text-3xl py-4">{data.name}</h1>
            <ul class="divide-y divide-slate-100 border-b-2 border-red">
              <li class="flex items-start gap-4 px-4 py-3">
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <p class="text-base text-slate-700 ">
                    Price: {data.price} SEK
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-4 px-4 py-3">
                <FontAwesomeIcon icon={faStar} />
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.rating}
                </div>
              </li>
              <li class="flex items-start gap-4 px-4 py-3">
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <div class="text-base text-slate-700">
                    Max guests: {data.maxGuests}
                  </div>
                </div>
              </li>
              <li class="flex items-start gap-4 px-4 py-3">
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <p class="text-base text-slate-700">{data.description}</p>
                </div>
              </li>
              <li class="flex items-start gap-4 px-4 py-3">
                <FontAwesomeIcon icon={faLocationDot} />
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.location.address}
                </div>
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.location.city}
                </div>
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {data.location.country}
                </div>
              </li>
              <li class="flex items-start gap-4 px-4 py-3">
                <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <div class="text-base text-slate-700">
                    Bookings: {data._count.bookings}
                  </div>
                </div>
              </li>
            </ul>
            <section>
              <h2 className="text-xl pt-8 pb-3">Bookings</h2>
              {bookingsExist &&
                data.bookings &&
                data.bookings.map((booking) => (
                  <ul
                    key={booking.id}
                    className="divide-y divide-slate-100 border-b-2 border-red">
                    <li className="flex items-start gap-4 px-4 py-3">
                      <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                        <p>Booking Date from: {booking.dateFrom}</p>
                        <p>Booking Date to: {booking.dateTo}</p>
                        <p>Guests: {booking.guests}</p>
                        <p>Guest name: {booking.customer.name}</p>
                        <p>Guest email: {booking.customer.email}</p>
                      </div>
                    </li>
                  </ul>
                ))}
            </section>

            <ul className="divide-y divide-slate-100 pt-8">
              <h2 className="text-xl pb-3">Amenities</h2>
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faWifi} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.wifi">
                    Wifi
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.wifi}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faCar} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.parking">
                    Parking
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.parking}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>

              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faUtensils} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.breakfast">
                    Breakfast
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.breakfast}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center self-center text-blue-500">
                  <FontAwesomeIcon className="h-6 w-6" icon={faPaw} />
                </div>
                <div className="flex min-h-[2rem] flex-1 flex-col items-start justify-center gap-0 overflow-hidden">
                  <label
                    className="w-full cursor-pointer truncate text-base text-slate-700"
                    htmlFor="meta.pets">
                    Pets
                  </label>
                </div>
                <div className="flex items-center self-center">
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-white transition-colors checked:border-blue-500 checked:bg-blue-500 checked:hover:border-blue-600 checked:hover:bg-blue-600 focus:outline-none checked:focus:border-blue-700 checked:focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                      type="checkbox"
                      checked={data.meta.pets}
                      readOnly
                    />
                    <FontAwesomeIcon
                      className="text-white pointer-events-none absolute top-0 left-0 h-4 w-4 -rotate-90 fill-white stroke-white opacity-0 transition-all duration-300 peer-checked:rotate-0 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                      icon={faCheck}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VenueEdit;
