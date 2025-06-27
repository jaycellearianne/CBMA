"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Church } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function ChapterPage() {
  const router = useRouter();
  const params = useParams();
  const [chapterData, setChapterData] = useState<any>(null);

  const chaptersData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      image: "/images/chapter/ilochapter.webp",
      description:
        "The Iloilo Chapter is a united fellowship of church leaders and ministers across Iloilo dedicated to spiritual growth, community service, and pastoral support. Committed to the mission of advancing the Gospel, this chapter fosters collaboration, leadership development, and outreach initiatives to uplift both churches and communities in the region. Through regular gatherings, training sessions, and shared ministry efforts, the Iloilo Chapter stands as a strong network of faith, encouragement, and unity.",
    },
  };

  useEffect(() => {
    if (params.slug && typeof params.slug === "string") {
      // Try static data first
      let data = chaptersData[params.slug as keyof typeof chaptersData];

      // If not found, check localStorage
      if (!data && typeof window !== "undefined") {
        const stored = localStorage.getItem("chapters");
        if (stored) {
          const localChapters = JSON.parse(stored);
          data = localChapters[params.slug];
        }
      }

      setChapterData(data || null);
    }
  }, [params.slug]);

  const handleBack = () => {
    router.back();
  };

  const handleViewPastors = () => {
    router.push(`/chapter/${params.slug}/pastors`);
  };

  const handleViewChurches = () => {
    router.push(`/chapter/${params.slug}/churches`);
  };

  const handleViewCircuits = () => {
    router.push(`/chapter/${params.slug}/circuits`);
  };

  if (!chapterData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-black hover:bg-gray-200"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-lg text-gray-500">Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-black hover:bg-gray-200"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="ml-2 text-lg font-semibold text-black">
          {chapterData.name}
        </h2>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-5">
        {/* Image */}
        <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-sm">
          <Image
            src={chapterData.image || "/placeholder.svg"}
            alt={`${chapterData.name} image`}
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {chapterData.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Button
            onClick={handleViewPastors}
            className="h-12 bg-[#6F4E37] hover:bg-[#A67B5B] text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            View Pastors
          </Button>

          <Button
            onClick={handleViewChurches}
            className="h-12 bg-[#6F4E37] hover:bg-[#A67B5B] text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
          >
            <Church className="w-5 h-5" />
            View Churches
          </Button>

          <Button
            onClick={handleViewCircuits}
            className="h-12 bg-[#6F4E37] hover:bg-[#A67B5B] text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
          >
            <Church className="w-5 h-5" />
            View Circuits
          </Button>
        </div>
      </div>
    </div>
  );
}
