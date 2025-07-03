"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Tabs from "./tabs";

export default function PastorProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pastorId = searchParams.get("id");
  const pastorName = searchParams.get("name");
  const pastorImage = searchParams.get("image");
  const pastorChurch = searchParams.get("church");

  const handleBack = () => router.back();

  return (
    <div className="min-h-screen bg-[#6F4E37]">
      {/* Header */}
      <div className="px-4 py-3 flex items-center bg-[#6F4E37]">
        <Button
          variant="ghost"
          size="icon"
          className="p-1 text-black hover:bg-gray-200 "
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="w-full bg-white rounded-2xl mt-5 min-h-[calc(100vh-56px)] z-10">
        <div className="relative z-10 w-full flex flex-col items-center rounded p-6 mx-auto mt-16">
          <div className="absolute top-0 left-0 w-full flex flex-col items-center z-10 gap-4">
            {pastorId && pastorImage ? (
              <div className="flex justify-center w-full mt-4 ">
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
              <div className=" relative w-28 h-28 mt-[-70] border-4 border-[#6F4E37] bg-gray-200 flex items-center justify-center rounded-full overflow-hidden mx-auto sm:mx-0">
                <span className="text-gray-500 text-center">
                  No image available
                </span>
              </div>
            )}
            <div className="justify-items-center mx-auto flex flex-col">
              <h1 className=" text-xl text-center font-bold relative w-full">
                {pastorName ? pastorName : "No church name provided"}
              </h1>
              <span className=" text-base text-center italic text-gray-500 relative w-full">
                {pastorChurch ? pastorChurch : "No church name provided"}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-25 ">
          <div className="w-full">
            <Tabs />
          </div>
        </div>
      </div>
    </div>
  );
}
