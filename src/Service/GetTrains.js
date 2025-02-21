// import toast from "react-hot-toast";

export const getTrains = async (start, end, date) => {
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
      // toast.error("Internal error");
      console.error(err);
      return [];
    }
  };
  