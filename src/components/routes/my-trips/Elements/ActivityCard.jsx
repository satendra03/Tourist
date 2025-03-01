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

function ActivityCard({activity}) {
  const name = activity?.name;
  
    const [placeDets, setPlaceDets] = useState([]);
    const [photos, setPhotos] = useState("");
    const [Url, setUrl] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
  
    const { trip } = useContext(LogInContext);
    const city = trip?.tripData?.trip?.location;
  
    const getPlaceInfo = async () => {
      const data = {
        textQuery: name + city,
      };
      const result = await getPlaceDetails(data)
        .then((res) => {
            const data = res?.data?.places[0];
          setPlaceDets(data);
          setPhotos(data.photos[0].name);
          setAddress(data.formattedAddress);
          setLocation(data.googleMapsUri);
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
    }, [photos, placeDets]);

    // console.log("Url", Url);
  
    return (
      <Link
        className="w-full"
        target="_blank"
        to={
          location
            ? location
            : `https://www.google.com/maps/search/${activity.name},${city}`
        }
      >
        <Card className="border-foreground/20 p-1 h-full flex flex-col gap-3 hover:scale-105 duration-300">
          <div className="img h-full rounded-lg">
            <img
              src={Url ? Url : "/logo.png"}
              // src={hotel.image_url}
              className="h-80 w-full object-cover"
              alt={name}
            />
          </div>
          <div className="text-content w-full flex items-center gap-3 justify-between flex-col h-full">
            <CardHeader className="w-full">
              <CardTitle className="opacity-90 w-full text-center text-xl font-black text-primary/80 md:text-3xl">
                {activity.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 tracking-wide opacity-90 w-full text-center text-sm text-primary/80 md:text-md">
                {activity.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <div className="hotel-details">
                {/* <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                  ⭐ Rating: {activity.rating}
                </span>{" "} */}
                {/* <br /> */}
                <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                  🕒 Timings: {activity.timings}
                </span>{" "}
                <br />
                <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide">
                  💵 Price: {activity.entry_fee}
                </span>{" "}
                <br />
                <span className="font-medium text-primary/80 opacity-90 text-sm md:text-base tracking-wide line-clamp-1">
                  📍 Location: {address ? address : activity.address}
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }
  

export default ActivityCard