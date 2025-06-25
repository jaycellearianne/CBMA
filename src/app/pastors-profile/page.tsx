"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Tab from "../tabs/tab";

export default function PastorProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pastorId = searchParams.get("id");
  const pastorName = searchParams.get("name");

  const pastorImage = searchParams.get("image");
  const pastorChurch = searchParams.get("church");
  

  const handleBack = () => router.back();

  return (
    <div className="min-h-screen @container mx-auto">
      <div className="fixed w-full">
        {/* Back Button */}
        <div className="fixed bg-[#6F4E37] w-full h-30 z-10 top-0">
          <div className="fixed mt-5 left-2 z-20 p-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-1 text-black hover:bg-gray-200  "
              onClick={handleBack}
              color="white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
        {/* Image, Name, Church */}
        <div className="w-full rounded-t-2xl h-55 z-10 bg-white">
          <div className="relative z-10 w-full flex flex-col items-center rounded p-6 mx-auto mt-16">
            <div className="absolute top-0 left-0 w-full flex flex-col items-center z-10 gap-4">
              {pastorId && pastorImage ? (
                <div className="flex justify-center w-full mt-15 ">
                  <div className="relative w-28 h-28 mt-[-70] border-4 items-center justify-center border-[#6F4E37] rounded-full overflow-hidden mx-auto sm:mx-0">
                    <Image
                      src={pastorImage}
                      alt={`${pastorName ? pastorName : "Church"} image`}
                      fill
                      className="object-cover"
                      priority
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ) : (
                <div className=" relative w-28 h-28 mt-[-70] border-4 border-[#6F4E37] bg-gray-200 flex items-center justify-center rounded-full overflow-scroll mx-auto sm:mx-0">
                  <span className="text-gray-500 text-center">
                    No image available
                  </span>
                </div>
              )}
              <div className="justify-items-center mx-auto flex flex-col">
                <h1 className="text-xl text-center font-bold relative w-full">
                  {pastorName ? pastorName : "No church name provided"}
                </h1>
                <span className="text-base text-center italic text-gray-500 relative w-full mb-2">
                  {pastorChurch ? pastorChurch : "No church name provided"}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full bg-white mt-[-25px]">
          <Tab />
        </div>
      </div>
    </div>
  );
}
