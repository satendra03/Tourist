import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  TravelPrompt,
  PROMPT,
  SelectBudgetOptions,
  SelectNoOfPersons,
  getStationCodePrompt,
  getFoodPrompt,
} from "../../constants/Options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { chatSession, getFood, getStationCodeCall } from "@/Service/AiModel";

import { LogInContext } from "@/Context/LogInContext/Login";

import { db } from "@/Service/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { getTravelCostDetails } from "@/Service/TravelCostDetails";
import { DatePickerDemo } from "./DatePicker";
import { getTrains } from "@/Service/GetTrains";

function CreateTrip({ createTripPageRef }) {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [startLocation, setstartLocation] = useState();

  const [date, setDate] = useState();
  const [finalDate, setFinalDate] = useState();

  // console.log("Final Date", finalDate);

  function formatDateDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
}

  useEffect(() => {
    // const date = new Date();
    // setDate(formatDateForInput(date));
    if(date) setFinalDate(formatDateForInput(date));
    // console.log("Final Date", finalDate);
  }, [date]);



  // console.log("Date: ", date);
  // console.log("startLocation: ", startLocation);

  const navigate = useNavigate();

  const { user, loginWithPopup, isAuthenticated } = useContext(LogInContext);

  const getTrains = async (start, end, date) => {
    try {
      const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${start}&toStationCode=${end}&dateOfJourney=${date}`;
      
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "irctc1.p.rapidapi.com",
        },
      };
  
      const response = await fetch(url, options);
      const result = await response.json();

      // console.log("Trains are:", result);
      
      return result.data || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const SignIn = async () => {
    loginWithPopup();
  };

  const SaveUser = async () => {
    const User = JSON.parse(localStorage.getItem("User"));
    const id = User?.email;
    await setDoc(doc(db, "Users", id), {
      userName: User?.name,
      userEmail: User?.email,
      userPicture: User?.picture,
      userNickname: User?.nickname,
    });
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem("User", JSON.stringify(user));
      SaveUser();
    }
  }, [user]);

  const SaveTrip = async (TripData, transportCost, stationCodeData, finalDate, trains, foodCost) => {
    const User = JSON.parse(localStorage.getItem("User"));
    const id = Date.now().toString();
    setIsLoading(true);
    await setDoc(doc(db, "Trips", id), {
      tripId: id,
      userSelection: formData,
      tripData: TripData,
      transportCost: transportCost,
      stationCodeData: stationCodeData,
      food: foodCost,
      startDate: finalDate,
      trains: trains,
      userName: User?.name,
      userEmail: User?.email,
    });
    setIsLoading(false);
    // localStorage.setItem("Trip", JSON.stringify(TripData));
    localStorage.setItem(
      "Trip",
      JSON.stringify({
        tripData: TripData,
        food: foodCost,
        transportCost: transportCost,
        stationCodeData: stationCodeData,
        startDate: finalDate,
        trains: trains,
      })
    );
    navigate("/my-trips/" + id);
  };

  const downloadJSON = (data, filename = "trip_details.json") => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTrip = async () => {
    if (!isAuthenticated) {
      toast("Sign In to continue", {
        icon: "⚠️",
      });
      return setIsDialogOpen(true);
    }
    if (
      !formData?.startLocation ||
      // !formData?.startDate ||
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.People ||
      !formData?.Budget
    ) {
      return toast.error("Please fill out every field or select every option.");
    }
    if(!date) {
      return toast.error("as");
    }
    if (formData?.noOfDays > 10) {
      return toast.error("Please enter Trip Days less then 10");
    }
    if (formData?.noOfDays < 1) {
      return toast.error("Invalid number of Days");
    }

    if (formData?.Budget < 0) {
      return toast.error("Invalid Budget");
    }

    const FINAL_PROMPT = PROMPT.replace(/{location}/g, formData?.location)
      .replace(/{noOfDays}/g, formData?.noOfDays)
      .replace(/{People}/g, formData?.People)
      .replace(/{Budget}/g, formData?.Budget);

    const TravelCostPrompt = TravelPrompt.replace(
      /{location}/g,
      formData?.location
    );

    const getStationCodeFinalPrompt = getStationCodePrompt
      .replace(/{src}/g, formData?.startLocation)
      .replace(/{dest}/g, formData?.location);

    const getFoodPromptFinal = getFoodPrompt.replace(/{location}/g, formData?.location)
    .replace(/{Budget}/g, Number(formData?.Budget) * 0.3);



    try {
      const toastId = toast.loading("Generating Trip", {
        icon: "✈️",
      });

      setIsLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const trip = JSON.parse(result.response.text());

      const travelCost = await getTravelCostDetails.sendMessage(
        TravelCostPrompt
      );
      const transportCost = JSON.parse(travelCost.response.text());

      const stationCodes = await getStationCodeCall.sendMessage(
        getStationCodeFinalPrompt
      );
      const stationCodeData = JSON.parse(stationCodes.response.text());

      const trains = await getTrains(stationCodeData.source, stationCodeData.destination, finalDate);
      // console.log("Trains", trains);

      const food = await getFood.sendMessage(getFoodPromptFinal);
      const foodCost = JSON.parse(food.response.text());

      setIsLoading(false);
      SaveTrip(trip, transportCost, stationCodeData, finalDate, trains, foodCost);

      const tripData = { trip, transportCost, stationCodeData, finalDate, trains, foodCost };
      downloadJSON(tripData);

      toast.dismiss(toastId);
      toast.success("Trip Generated Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
      toast.error("Failed to generate trip. Please try again.");
      console.error(error);
    }
  };

  return (
    <div ref={createTripPageRef} className="mt-10 text-center">
      <div className="text">
        <h2 className="text-3xl md:text-5xl font-bold mb-5 flex items-center justify-center">
          <span className="hidden md:block">🚀</span>{" "}
          <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
            Share Your Travel Preferences{" "}
          </span>{" "}
          <span className="hidden md:block">🚀</span>
        </h2>
        <p className="opacity-90 mx-auto text-center text-md md:text-xl font-medium tracking-tight text-primary/80">
          Embark on your dream adventure with just a few simple details. <br />
          <span className="bg-gradient-to-b text-2xl from-blue-400 to-blue-700 bg-clip-text text-center text-transparent">
            EaseMyTrip
          </span>{" "}
          <br /> will curate a personalized itinerary, crafted to match your
          unique preferences!
        </p>
      </div>

      <div className="form mt-14 flex flex-col gap-16 md:gap-20 ">
        <div className="startLocation">
          <h2 className="font-semibold text-lg md:text-xl mb-3 ">
            <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
              From Where we will Start the Advanture?
            </span>{" "}
            🏖️
          </h2>
          <ReactGoogleAutocomplete
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-center"
            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            autoFocus
            onPlaceSelected={(place) => {
              setstartLocation(place);
              handleInputChange("startLocation", place.formatted_address);
            }}
            placeholder="Enter Source Location"
          />
        </div>

        <div className="place">
          <h2 className="font-semibold text-lg md:text-xl mb-3 ">
            <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
              Where do you want to Explore?
            </span>{" "}
            🏖️
          </h2>
          <ReactGoogleAutocomplete
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-center"
            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            onPlaceSelected={(place) => {
              setPlace(place);
              handleInputChange("location", place.formatted_address);
            }}
            placeholder="Enter Destination"
          />
        </div>

        <div className="dayNdate flex items-center justify-between gap-10">
          <div className="day w-full">
            <h2 className="font-semibold text-lg md:text-xl mb-3 ">
              <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
                How long is your Trip?
              </span>{" "}
              🕜
            </h2>
            <Input
              className="text-center"
              placeholder="Ex: 2"
              type="number"
              min="1"
              max="5"
              name="noOfDays"
              required
              onChange={(day) =>
                handleInputChange("noOfDays", day.target.value)
              }
            />
          </div>

          <div className="date w-full">
            <h2 className="font-semibold text-lg md:text-xl mb-3 ">
              <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
                Select Start Date
              </span>{" "}
              📅
            </h2>
            <DatePickerDemo date={date} setDate={setDate}></DatePickerDemo>
          </div>
        </div>

        <div className="budget">
          <h2 className="font-semibold text-lg md:text-xl mb-3 ">
            <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
              {" "}
              What is your Budget?
            </span>{" "}
            💳
          </h2>
          {/* <div className="options grid grid-cols-1 gap-5 md:grid-cols-3"> */}
          {/* {SelectBudgetOptions.map((item) => {
              return (
                <div
                  onClick={(e) => handleInputChange("Budget", item.title)}
                  key={item.id}
                  className={`option cursor-pointer transition-all hover:scale-110 p-4 h-32 flex items-center justify-center flex-col border hover:shadow-foreground/10 hover:shadow-md rounded-lg
                  ${
                    formData?.Budget == item.title &&
                    "border border-foreground/80"
                  }
                  `}
                >
                  <h3 className="font-bold text-[15px] md:font-[18px]">
                    {item.icon} <span className={`
                      ${formData?.Budget == item.title ? 
                      "bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-center text-transparent" :
                      ""}
                      `}>{item.title}</span>
                  </h3>
                  <p className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">{item.desc}</p>
                </div>
              );
            })} */}

          <Input
            className="text-center"
            placeholder="Ex: 5000 (local currency)"
            type="number"
            // min="1000"
            // max="50000"
            name="Budget"
            required
            onChange={(Budget) =>
              handleInputChange("Budget", Budget.target.value)
            }
          />

          {/* </div> */}
        </div>

        <div className="people">
          <h2 className="font-semibold  text-lg md:text-xl mb-3 ">
            <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
              Who are you traveling with?{" "}
            </span>{" "}
            🚗
          </h2>
          <div className="options grid grid-cols-1 gap-5 md:grid-cols-3">
            {SelectNoOfPersons.map((item) => {
              return (
                <div
                  onClick={(e) => handleInputChange("People", item.no)}
                  key={item.id}
                  className={`option cursor-pointer transition-all hover:scale-110 p-4 h-32 flex items-center justify-center flex-col border rounded-lg hover:shadow-foreground/10 hover:shadow-md
                    ${
                      formData?.People == item.no &&
                      "border border-foreground/80"
                    }
                  `}
                >
                  <h3 className="font-bold text-[15px] md:font-[18px]">
                    {item.icon}{" "}
                    <span
                      className={`
                      ${
                        formData?.People == item.no
                          ? "bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-center text-transparent"
                          : ""
                      }
                      `}
                    >
                      {item.title}
                    </span>
                  </h3>
                  <p className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
                    {item.desc}
                  </p>
                  <p className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
                    {item.no}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="create-trip-btn w-full flex items-center justify-center h-32">
        <Button disabled={isLoading} onClick={generateTrip}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            "Let's Go 🌏"
          )}
        </Button>
      </div>

      <Dialog
        className="m-4"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
              {user ? "Thank you for LogIn" : "Sign In to Continue"}
            </DialogTitle>
            <DialogDescription>
              <span className="flex gap-2">
                <span className="text-center w-full opacity-90 mx-auto tracking-tight text-primary/80">
                  {user
                    ? "Logged In Securely to EaseMyTrip with Google Authentication"
                    : "Sign In to EaseMyTrip with Google Authentication Securely"}
                </span>
              </span>
              {user ? (
                ""
              ) : (
                <Button
                  onClick={SignIn}
                  className="w-full mt-5 flex gap-2 items-center justify-center"
                >
                  Sign In with <FcGoogle className="h-5 w-5" />
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose className="w-full">
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
