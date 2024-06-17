import React, { useState } from "react";
import Slider from "react-slick";
import useFetch from "../../Hooks/useFetchArray";
import { API_HOLIDAZE_VENUES } from "../../Shared/apis";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import House from "../../images/house.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faUtensils,
  faPaw,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

function Venues() {
  const { venues, isLoading, isError } = useFetch(`${API_HOLIDAZE_VENUES}`);
  const [searchResults, setSearchResults] = useState([]);
  const [isWifiFiltered, setIsWifiFiltered] = useState(false);
  const [isBreakfastFiltered, setIsBreakfastFiltered] = useState(false);
  const [isPetFriendlyFiltered, setIsPetFriendlyFiltered] = useState(false);
  const [isParkingFiltered, setIsParkingFiltered] = useState(false);

  const onButtonClickFilterWifi = () => {
    setIsWifiFiltered(!isWifiFiltered);
  };

  const onButtonClickFilterBreakfast = () => {
    setIsBreakfastFiltered(!isBreakfastFiltered);
  };

  const onButtonClickFilterPetsAllowed = () => {
    setIsPetFriendlyFiltered(!isPetFriendlyFiltered);
  };

  const onButtonClickFilterParking = () => {
    setIsParkingFiltered(!isParkingFiltered);
  };

  const handleSearch = (query) => {
    const queryLower = query.trim().toLowerCase();
    const results = venues.filter((venue) => {
      const name = venue.name ? venue.name.toLowerCase() : "";
      const city = venue.location.city ? venue.location.city.toLowerCase() : "";
      const country = venue.location.country
        ? venue.location.country.toLowerCase()
        : "";

      return (
        name.includes(queryLower) ||
        city.includes(queryLower) ||
        country.includes(queryLower)
      );
    });
    setSearchResults(results);
  };

  const applyFilters = () => {
    let filteredVenues = venues;

    if (isWifiFiltered) {
      filteredVenues = filteredVenues.filter(
        (venue) => venue.meta.wifi === true
      );
    }
    if (isBreakfastFiltered) {
      filteredVenues = filteredVenues.filter(
        (venue) => venue.meta.breakfast === true
      );
    }
    if (isPetFriendlyFiltered) {
      filteredVenues = filteredVenues.filter(
        (venue) => venue.meta.pets === true
      );
    }
    if (isParkingFiltered) {
      filteredVenues = filteredVenues.filter(
        (venue) => venue.meta.parking === true
      );
    }
    return filteredVenues;
  };

  const venuesToDisplay =
    searchResults.length > 0 ? searchResults : applyFilters();

  const SliderArrow = ({ className, style, onClick, position }) => {
    const arrowStyle =
      position === "next"
        ? { ...style, right: "12px" }
        : { ...style, left: "8px", zIndex: "1" };

    return <div className={className} style={arrowStyle} onClick={onClick} />;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidersToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderArrow position="next" />,
    prevArrow: <SliderArrow position="prev" />,
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <section className="home-page-bio my-8 m-auto mx-5">
        <div className="p-4 px-5 py-8 bg-blue-500 text-white h-fit rounded-xl">
          <h2 className="pl-2 pb-2 text-xl text-black font-semibold">
            Amenities
          </h2>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 ">
            <button
              onClick={onButtonClickFilterParking}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                isParkingFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faCar} />
              <p className="text-left">
                Find beautiful places with breakfast included
              </p>
            </button>
            <button
              onClick={onButtonClickFilterBreakfast}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                isBreakfastFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faUtensils} />
              <p className="text-left">
                Find beautiful places with breakfast included
              </p>
            </button>
            <button
              onClick={onButtonClickFilterPetsAllowed}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                isPetFriendlyFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faPaw} />
              <p className="text-left">Have a blast with your best friend</p>
            </button>
            <button
              onClick={onButtonClickFilterWifi}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                isWifiFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faWifi} />
              <p className="text-left">Work remotely in a paradise</p>
            </button>
          </div>
        </div>
      </section>
      <h2 className="p-5 font-medium text-2xl">
        Book your perfect place in your favorite destination
      </h2>
      <section className="venues-container grid grid-cols-4 gap-6 p-4 md:grid-cols-8 lg:grid-cols-12">
        {venuesToDisplay.map((venue) => (
          <div
            key={venue.id}
            className="relative card-venue overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 col-span-4 lg:col-span-3">
            {venue.media && venue.media.length > 1 ? (
              <Slider {...sliderSettings}>
                {venue.media.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      alt={image.alt || "venue image"}
                      className="aspect-video w-full h-52"
                    />
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
                className="aspect-video w-full h-52"
              />
            )}
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-medium text-slate-700">
                  {venue.name}
                </h2>
                <p className="text-slate-400">
                  Price: {venue.price} kr SEK night
                </p>
                <div>{venue.location.city}</div>
                <div>{venue.location.country}</div>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-0">
              <Link to={`/venue/${venue.id}`}>
                <button className="absolute bottom-4 right-4 w-30 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-800 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                  <span>Book now!</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Venues;
