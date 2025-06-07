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

  // Mock chapter data - in real app, this would come from an API
  const chaptersData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      image: "/images/chapter/RETROWAVE-OASIS-33331.png",
      description:
        "The Iloilo Chapter is a united fellowship of church leaders and ministers across Iloilo dedicated to spiritual growth, community service, and pastoral support. Committed to the mission of advancing the Gospel, this chapter fosters collaboration, leadership development, and outreach initiatives to uplift both churches and communities in the region. Through regular gatherings, training sessions, and shared ministry efforts, the Iloilo Chapter stands as a strong network of faith, encouragement, and unity.",
    },
    // "negros-chapter": {
    //   name: "Negros Chapter",
    //   image: "/images/chapter/RETROWAVE-OASIS-33331.png",
    //   description:
    //     "The Negros Chapter serves as a vibrant community of church leaders and ministers throughout Negros, focusing on spiritual development, community outreach, and ministerial excellence. This chapter is dedicated to strengthening the body of Christ through collaborative efforts, training programs, and unified mission work that impacts both local churches and the broader community.",
    // },
  };

  useEffect(() => {
    if (params.slug && typeof params.slug === "string") {
      const data = chaptersData[params.slug as keyof typeof chaptersData];
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
      <div className="text-black px-4 py-3 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-black hover:bg-gray-200 mr-15"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        {/* Chapter Title */}
        <h2 className="text-xl font-medium text-black">{chapterData.name}</h2>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-8">
        {/* Chapter Image */}
        <div className="relative h-100 w-full">
          <Image
            src={chapterData.image || "/placeholder.svg"}
            alt={`${chapterData.name} image`}
            fill
            className="object-cover"
          />
        </div>

        {/* Chapter Description */}
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">{chapterData.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-5 grid grid-cols-2 gap-10 flex text-center">
          <Button
            onClick={handleViewPastors}
            className="h-12 bg-amber-800 hover:bg-amber-900 text-white text-base font-medium rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            View Pastors
          </Button>

          <Button
            onClick={handleViewChurches}
            className="h-12 bg-amber-800 hover:bg-amber-900 text-white text-base font-medium rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Church className="w-5 h-5" />
            View Churches
          </Button>
        </div>
      </div>
    </div>
  );
}
