"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function CircuitProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const circuitId = searchParams.get("id");
  const characterLimit = 500;

  const circuitDetails: Record<
    string,
    {
      name: string;
      location: string;
      image: string;
      yearEstablished: string;
      description: string;
      pastors: string[];
      churches: string[];
    }
  > = {
    "1": {
      name: "Janiuay-Badiangan Circuit",
      location: "Janiuay-Badiangan, Iloilo Province",
      image: "/images/circuit/circuit_mock.jpg",
      yearEstablished: "1905",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac lectus hendrerit, vehicula turpis nec, tincidunt ante. Donec tincidunt ligula et elementum venenatis. Aliquam hendrerit venenatis rutrum. Nullam hendrerit posuere ultrices. Integer euismod vehicula ante nec condimentum. Aliquam ultrices neque urna.",
      pastors: [
        "Arroz, Generoso Jr. C.",
        "Cabuguason, Jerome R.",
        "Vergara, Mark",
        "Yusual, Alvaro",
      ],
      churches: [
        "Malublub Baptist Church",
        "Odiongan Central Baptist Church",
        "Janiuay Evangelical Church Inc.",
      ],
    },
    
    "2": {
      name: "City Wide Circuit",
      location: "Iloilo City, Iloilo Province",
      image: "/images/circuit/circuit_mock.jpg",
      yearEstablished: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac lectus hendrerit, vehicula turpis nec, tincidunt ante. Donec tincidunt ligula et elementum venenatis. Aliquam hendrerit venenatis rutrum. Nullam hendrerit posuere ultrices. Integer euismod vehicula ante nec condimentum. Aliquam ultrices neque urna.",
      pastors: [
        "Francia, Jireh John",
        "Mije, Rosendo"
      ],
      churches: [
        "Baptist Center Church",
      ],
    },
  };

  const circuit = circuitId ? circuitDetails[circuitId] : null;

  const handleBack = () => router.back();

  const HandleCharacterLimit = ({ description }: { description: string }) => {
    const [readMore, setReadMore] = useState(false);
    if (description.length <= characterLimit) {
      return <p className="text-black">{description}</p>;
    }
    return (
      <p className="text-black">
        {readMore ? description : description.slice(0, characterLimit) + "..."}
        <button
          className="text-[#6F4E37] ml-2 underline underline-offset-2"
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Show less" : "Read more"}
        </button>
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <div className="px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="p-1 text-black hover:bg-gray-200 mr-3"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Circuit Image */}
      <div className="w-full overflow-x-auto md:overflow-x-visible">
        {circuitId && circuit && circuit.image ? (
          <div className="w-full h-[200px] relative">
            <Image
              src={circuit.image}
              alt={`${circuit.name ? circuit.name : "Circuit"} image`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>

      {/* Content  */}
      <div className="relative z-10 w-11/12 bg-white rounded-xl shadow-lg p-4 mx-auto mt-[-40px] md:w-full md:static md:translate-x-0 md:bottom-auto md:mt-0 md:shadow-none md:bg-transparent md:p-12 border border-[#3C3C3C]">
        {/* Year Established */}
        <div className="w-full relative rounded-xl">
          <div className="bg-[#FEF3C7] rounded-3xl items-center inline-flex gap-2 px-3 py-1 mb-2">
            <Clock size={16} className="text-[#A25A29]" />
            <span className="bg-[#FEF3C7 text-[#A25A29] flex-row">
              Est.
              {circuitId && circuitDetails[circuitId]
                ? circuitDetails[circuitId].yearEstablished
                : "No year established for this circuit"}
            </span>
          </div>

          <h1 className=" text-3xl font-bold relative w-full items-center justify-center">
            {circuit?.name ? circuit.name : "No circuit name provided"}
          </h1>
          <div className="items-center inline-flex gap-2 py-1 mb-2">
            <MapPin size={16} />
            <p className="text-gray-500">
              {circuit?.location
                ? circuit.location
                : "No circuit location provided"}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="flex relative text-black mb-10">
          {circuitId && circuitDetails[circuitId] ? (
            <HandleCharacterLimit
              description={circuitDetails[circuitId].description}
            />
          ) : (
            "No description for this circuit"
          )}
        </div>

        {/* Pastors */}
        <div className="mb-4">
          <p className="text-[#6F4E37] font-semibold text-lg mb-1">Pastors:</p>
          <div className="bg-[#f9f9f9] rounded-lg p-3 text-sm space-y-1">
            {circuit?.pastors?.map((pastor, idx) => (
              <p key={idx}>{pastor}</p>
            )) || <p>No pastors available</p>}
          </div>
        </div>

        {/* Churches */}
        <div>
          <p className="text-[#6F4E37] font-semibold text-lg mb-1">Churches:</p>
          <div className="bg-[#f9f9f9] rounded-lg p-3 text-sm space-y-1">
            {circuit?.churches?.map((church, idx) => (
              <button
                key={idx}
                className="w-full text-left hover:underline hover:text-blue-700"
              >
                {church}
              </button>
            )) || <p>No churches available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
