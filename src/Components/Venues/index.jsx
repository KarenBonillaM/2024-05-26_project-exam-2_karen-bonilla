import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import useFetch from "../../Hooks/useFetchArray";
import {
  API_HOLIDAZE_VENUES,
  API_HOLIDAZE_VENUES_SEARCH,
} from "../../Shared/apis";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
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
import BeatLoader from "react-spinners/BeatLoader";

function Venues() {
  const { venues } = useFetch(`${API_HOLIDAZE_VENUES}`);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    isWifiFiltered: false,
    isBreakfastFiltered: false,
    isPetFriendlyFiltered: false,
    isParkingFiltered: false,
  });

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_HOLIDAZE_VENUES_SEARCH}?q=${query}`);
      if (!response.ok) {
        throw new Error("An error occurred while fetching the data");
      }

      const json = await response.json();
      const venuesSearched = json.data;

      if (query === "") {
        setSearchResults(venues);
      } else if (venuesSearched.length === 0) {
        setSearchResults([]);
      } else {
        setSearchResults(venuesSearched);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleFilterToggle = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const applyFilters = (venuesToFilter) => {
    return venuesToFilter.filter((venue) => {
      const meta = venue.meta || {};
      return (
        (!filters.isWifiFiltered || meta.wifi === true) &&
        (!filters.isBreakfastFiltered || meta.breakfast === true) &&
        (!filters.isPetFriendlyFiltered || meta.pets === true) &&
        (!filters.isParkingFiltered || meta.parking === true)
      );
    });
  };

  const venuesToDisplay =
    searchResults.length > 0
      ? applyFilters(searchResults)
      : applyFilters(venues);

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

  const isValidImageUrl = async (url) => {
    try {
      if (!url) return false;

      const response = await fetch(url);
      if (!response.ok) {
        return false;
      }

      const blob = await response.blob();
      return blob.size > 0;
    } catch (error) {
      console.error("Error checking image URL:", error);
      return false;
    }
  };

  const validateImages = async (venues) => {
    const venuesWithValidImages = await Promise.all(
      venues.map(async (venue) => {
        const isValid = await isValidImageUrl(
          venue.media && venue.media.length === 1 ? venue.media[0].url : null
        );
        return {
          ...venue,
          isValidImage: isValid,
        };
      })
    );

    return venuesWithValidImages;
  };

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      const validatedVenues = await validateImages(venues);
      setSearchResults(validatedVenues);
      setIsLoading(false);
    };

    fetchVenues();
  }, [venues]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <section className="home-page-bio my-8 m-auto mx-5">
        {/* Filter buttons */}
        <div className="p-4 px-5 py-8 bg-blue-500 text-white h-fit rounded-xl">
          <h2 className="pl-2 pb-2 text-xl text-black font-semibold">
            Amenities
          </h2>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 ">
            <button
              onClick={() => handleFilterToggle("isParkingFiltered")}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                filters.isParkingFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faCar} />
              <p className="text-left">
                Find beautiful places with breakfast included
              </p>
            </button>
            <button
              onClick={() => handleFilterToggle("isBreakfastFiltered")}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                filters.isBreakfastFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faUtensils} />
              <p className="text-left">
                Find beautiful places with breakfast included
              </p>
            </button>
            <button
              onClick={() => handleFilterToggle("isPetFriendlyFiltered")}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                filters.isPetFriendlyFiltered ? "bg-gray-700" : "bg-blue-800"
              }`}>
              <FontAwesomeIcon className="pr-5 text-4xl" icon={faPaw} />
              <p className="text-left">Have a blast with your best friend</p>
            </button>
            <button
              onClick={() => handleFilterToggle("isWifiFiltered")}
              className={`col-span-4 lg:col-span-3 flex items-center rounded-lg px-5 py-8 cursor-pointer transition-colors duration-300 hover:bg-blue-700 ${
                filters.isWifiFiltered ? "bg-gray-700" : "bg-blue-800"
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

      {isLoading ? (
        <div className="w-full flex m-auto py-24">
          <BeatLoader
            color={"#3B82F6"}
            loading={isLoading}
            size={15}
            className="m-auto"
          />
        </div>
      ) : (
        <section className="venues-container grid grid-cols-4 gap-6 p-4 md:grid-cols-8 lg:grid-cols-12">
          {venuesToDisplay.length === 0 ? (
            <div className="w-full flex m-auto py-24">
              <p className="text-2xl">No venues found</p>
            </div>
          ) : (
            venuesToDisplay.map((venue) => (
              <div
                key={venue.id}
                className="relative card-venue overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 col-span-4 lg:col-span-3">
                {venue.media && venue.media.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {venue.media.map((image, index) => (
                      <div key={index}>
                        {image.url && venue.isValidImage ? (
                          <img
                            src={image.url}
                            alt={image.alt || "venue image"}
                            className="aspect-video w-full h-52"
                          />
                        ) : (
                          <img
                            src={House}
                            alt="house"
                            className="aspect-video w-full h-52"
                          />
                        )}
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={
                      venue.media &&
                      venue.media.length === 1 &&
                      venue.isValidImage
                        ? venue.media[0].url
                        : House
                    }
                    alt={
                      venue.media && venue.media.length === 1
                        ? venue.media[0].alt || "house"
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
            ))
          )}
        </section>
      )}
    </div>
  );
}

export default Venues;
