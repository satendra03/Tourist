import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";
import { useRefContext } from "@/Context/RefContext/RefContext";


function RestaurantsCard({restaurant}) {
  console.log("Restaurant", restaurant);
const name = restaurant?.name;

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;

  const getPlaceInfo = async () => {
    const data = {
      textQuery: name + city,
    };
    const result = await getPlaceDetails(data)
      .then((res) => {
        setPlaceDets(res.data.places[0]);
        setPhotos(res.data.places[0].photos[0].name);
        setAddress(res.data.places[0].formattedAddress);
        setLocation(res.data.places[0].googleMapsUri);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    trip && getPlaceInfo();
  }, [trip]);

  const getUrl = (name) => {
    return PHOTO_URL.replace("{replace}", name);
  };

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);

  return (
    <Link
      className="w-full"
      target="_blank"
      to={
        location
          ? location
          : `https://www.google.com/maps/search/${restaurant.name},${city}`
      }
    >
      <Card className="border-foreground/20 p-1 h-full flex flex-col gap-3 hover:scale-105 duration-300">
        <div className="img h-full rounded-lg">
          <img
            src={Url || "/logo.png"}
            // src={hotel.image_url}
            className="h-80 w-full object-cover"
            alt={name}
          />
        </div>
        <div className="text-content w-full flex items-center gap-3 justify-between flex-col h-full">
          <CardHeader className="w-full">
            <CardTitle className="opacity-90 w-full text-center text-xl font-black text-primary/80 md:text-3xl">
              {restaurant.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 tracking-wide opacity-90 w-full text-center text-sm text-primary/80 md:text-md">
              {restaurant.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <div className="hotel-details">
              <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                ⭐ Rating: {restaurant.rating}
              </span>{" "}
              <br />
              <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                😋 Type: {restaurant.type}
              </span>{" "}
              <br />
              <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                💵 Price: {restaurant.price_range}
              </span>{" "}
              <br />
              <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide line-clamp-1">
                📍 Location: {address ? address : restaurant.address}
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default RestaurantsCard;