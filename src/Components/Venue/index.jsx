import useFetchVenue from "../../Hooks/useFetchVenue";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faCar,
  faUtensils,
  faPaw,
  faStar,
  faCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import House from "../../images/house.jpg";
import BookVenueForm from "../../Components/Forms/BookVenue";

function Venue() {
  let { id } = useParams();
  const { venue, isLoading, isError } = useFetchVenue(
    `${API_HOLIDAZE_VENUES}/${id}`
  );

  if (isLoading || !venue) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const SliderArrow = ({ className, style, onClick, position }) => {
    const arrowStyle =
      position === "next"
        ? { ...style, right: "10px" }
        : { ...style, left: "10px", zIndex: "1" };

    return <div className={className} style={arrowStyle} onClick={onClick} />;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow position="next" />,
    prevArrow: <SliderArrow position="prev" />,
  };

  return (
    <div
      key={venue.id}
      className="venue-container container m-auto py-6 lg:px-20">
      <section className="section-image-venue">
        <div className="venue-image-container">
          {venue.media && venue.media.length > 1 ? (
            <Slider {...sliderSettings}>
              {venue.media.map((media, index) => (
                <div key={index}>
                  <img
                    className="h-96 w-full object-fill rounded-lg"
                    src={media.url}
                    alt={media.alt || "venue image"}></img>
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={
                venue.media && venue.media.length === 1
                  ? venue.media[0].url
                  : House
              }
              alt={
                venue.media && venue.media.length === 1
                  ? venue.media[0].alt
                  : "house"
              }
              className="
              h-96
              w-full
              object-fill
              rounded-lg"></img>
          )}
        </div>
      </section>
      <section className="overflow-hidden section-venue-booking grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 pt-8 sm:grid">
        <div className="venue-info-container col-span-4 lg:col-span-7">
          <div>
            <h1 className="text-3xl py-4">{venue.name}</h1>
            <ul className="divide-y divide-slate-100 border-b-2 border-red">
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <p className="text-base text-slate-700 ">
                    Price: {venue.price} SEK
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <FontAwesomeIcon icon={faStar} />
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {venue.rating}
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <div className="text-base text-slate-700">
                    Max guests: {venue.maxGuests}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <p className="text-base text-slate-700">
                    {venue.description}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <FontAwesomeIcon icon={faLocationDot} />
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {venue.location.address}
                </div>
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {venue.location.city}
                </div>
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center text-base text-slate-700">
                  {venue.location.country}
                </div>
              </li>
              <li className="flex items-start gap-4 px-4 py-3">
                <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                  <div className="text-base text-slate-700">
                    Bookings: {venue._count.bookings}
                  </div>
                </div>
              </li>
            </ul>

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
                      checked={venue.meta.wifi}
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
                      checked={venue.meta.parking}
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
                      checked={venue.meta.breakfast}
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
                      checked={venue.meta.pets}
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
        <section className="venue-booking-calendar col-span-4 lg:col-span-5 justify-self-center lg:justify-self-end">
          <div>
            <BookVenueForm />
          </div>
        </section>
      </section>
    </div>
  );
}

export default Venue;
