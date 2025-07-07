"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ChurchProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const churchId = searchParams.get("id");
  const churchName = searchParams.get("name");
  const churchLocation = searchParams.get("location");
  const churchImage = searchParams.get("image");
  const characterLimit = 500;

  const churchDetails: Record<
    string,
    {
      description: string;
      currentPastor: string;
      yearEstablished: string;
    }
  > = {
    "1": {
      description:
        "Malublub Baptist Church traces its roots back to March 10, 1905, when five early converts—Simeon Mirasol, Paulina Asma, Eulalio Maravilla, Domingo Saloma, and Tranquilino Saloma—gathered under a simple nipa‐hat shelter to worship, following the evangelistic efforts of Dr. Eric Lund and Ebenezer Briggs in Jaro. As their faith and numbers grew, they moved briefly into the home of Calixto Ardiente before local leaders rallied the community to build a larger structure. Under the guidance of their first elected presidents—Calixto Ardiente and later Iladio Mirasol—the congregation began inviting resident and visiting pastors to shepherd the flock. Despite a temporary stall in pastoral leadership and the interruption of World War II under President Manuel Labatorio, Malublub’s ministries emerged stronger in the post‐war era. By 1978, the church was selected to host the Iloilo Kasapulanan, drawing delegates from across the province. In 1980, a more permanent building—skillfully crafted by Solomon Labatorio and local volunteers—was erected, forming the sanctuary that still stands today. Throughout the 1980s and early ’90s, youth outreach flourished: MBC not only hosted the National Youth Camp under the Convention of Philippine Baptist Churches but also called two pastors simultaneously in 1992. By 1991, the church had dedicated a newly constructed parsonage, and six months later installed electric lighting, enabling evening gatherings and special events. In 1994, even challenging weather and muddy roads could not deter MBC from successfully hosting a Janiuay‐Badiangan Circuit Youth Camp. As the new millennium approached, modernization brought fresh challenges: aging facilities prompted a groundbreaking on September 9, 2002, and construction of a new worship center began the following day. Through every season—founding hardship, wartime silence, post‐war expansion, and structural renewal—Malublub Baptist Church has remained steadfast in its mission to proclaim Christ and serve its community.",
      currentPastor: "Generoso C. Arroz Jr.",
      yearEstablished: "1995",
    },
    "2": {
      description:
        "A church dedicated to serving the people with faith and compassion.",
      currentPastor: "Jireh John Francia",
      yearEstablished: "1995",
    },
  };
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
    <div className="min-h-screen mx-auto">
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

      {/* Church Image */}
      <div className="w-full overflow-x-auto md:overflow-x-visible">
        {churchId && churchImage ? (
          <div className="w-full relative aspect-video">
            <Image
              src={churchImage}
              alt={`${churchName ? churchName : "Church"} image`}
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
              {churchId && churchDetails[churchId]
                ? churchDetails[churchId].yearEstablished
                : "No year established for this church"}
            </span>
          </div>

          <h1 className=" text-3xl font-bold relative w-full items-center justify-center">
            {churchName ? churchName : "No church name provided"}
          </h1>
          <div className="items-center inline-flex gap-2 py-1 mb-2">
            <MapPin size={16} />
            <p className="text-gray-500">
              {churchLocation ? churchLocation : "No church location provided"}
            </p>
          </div>
        </div>

        {/* Anniversary & Current Pastor */}
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center w-full mb-5">
          {/* Anniversary */}
          <div className="flex flex-col items-center bg-[#F9F9F9] rounded-lg px-4 sm:px-6 md:px-8 py-3 flex-1 min-w-[140px] max-w-xs w-full max-sm:max-w-full">
            <h3 className="text-sm sm:text-lg md:text-lg text-gray-400 whitespace-nowrap">
              Anniversary
            </h3>
            <span className="text-base sm:text-lg md:text-xl font-semibold mt-1 break-words text-center w-full">
              {churchId && churchDetails[churchId]
                ? new Date().getFullYear() -
                  parseInt(churchDetails[churchId].yearEstablished, 10)
                : "N/A"}{" "}
              years
            </span>
          </div>
          {/* Current pastor */}
          <div className="flex flex-col items-center bg-[#F9F9F9] rounded-lg px-4 sm:px-6 md:px-8 py-3 flex-1 min-w-[140px] max-w-xs w-full max-sm:max-w-full">
            <h3 className="text-sm sm:text-lg md:text-lg text-gray-400 whitespace-nowrap">
              Current Pastor
            </h3>
            <span className="text-base sm:text-lg md:text-xl font-semibold mt-1 break-words text-center w-full">
              {churchId && churchDetails[churchId] ? (
                churchDetails[churchId].currentPastor
              ) : (
                <span className="text-[#A25A29]">N/A</span>
              )}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex relative text-black mb-5">
          {churchId && churchDetails[churchId] ? (
            <HandleCharacterLimit
              description={churchDetails[churchId].description}
            />
          ) : (
            "No description for this church"
          )}
        </div>
        <div className="block md:hidden h-[20px]" />
        <div>
          <p className="text-[#6F4E37] font-semibold text-lg">Pastors:</p>
          {/* put the pastor names here that are associated with this church */}
        </div>
      </div>
    </div>
  );
}
