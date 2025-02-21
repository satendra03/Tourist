import { Button } from "@/components/ui/button";
import { db } from "@/Service/Firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Locationinfo from "../Elements/Locationinfo";
import Hotels from "../Elements/Hotels";
import { LogInContext } from "@/Context/LogInContext/Login";
import Places from "../Elements/Places";
import TravelCost from "../Elements/TravelCost";
import { TrainSchedule } from "../Elements/Train";
import Restaurants from "../Elements/Restaurants";
import { DownloadIcon } from "@radix-ui/react-icons";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { BellRingIcon } from "lucide-react/dist/cjs/lucide-react";
import { AiOutlineLoading } from "react-icons/ai";

function Mytrips() {
  const { tripId } = useParams();
  const { setTrip } = useContext(LogInContext);

  const getTripData = async () => {
    const docRef = doc(db, "Trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      toast.error("No Such Trip");
    }
  };

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const [loading, setLoading] = useState(false);

  const contentRef = useRef(); // Reference to the content to be printed

  const handleSaveAsPDF = async () => {
    const content = contentRef.current;

    if (!content) return;

    try {
      const canvas = await html2canvas(content, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height to maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("output.pdf"); // Download the PDF
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  const print = () => {
    window.print();
    setLoading(false);
  };

  const handlePrint = () => {
    setLoading(true);
    setTimeout(print, 1000); // Simulate network request delay
  };

  return (
    <div ref={contentRef} className="py-2">
      <Locationinfo />
      {/* <div className="w-full justify-center flex items-center">
        <Button
          onClick={handlePrint}
          className="mt-5 py-2 px-4 rounded bg-green-400 hover:bg-green-600"
        >
          {loading ? (
            <AiOutlineLoading className="animate-spin" />
          ) : (
            <>
              {" "}
              Save Offline <DownloadIcon />
            </>
          )}
        </Button>
      </div> */}
      <TravelCost />
      <TrainSchedule></TrainSchedule>
      <Hotels />
      <Restaurants />
      <Places />
    </div>
  );
}

export default Mytrips;
