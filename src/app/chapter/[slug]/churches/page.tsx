"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChurchesPage() {
  const router = useRouter();
  const params = useParams();
  const [churches, setChurches] = useState<any[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chapterChurchesData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      churches: [
        {
          id: 1,
          name: "Baptist Center Church",
          location: "La Paz, Iloilo City",
          serviceTime: "Sunday 9:00 AM",
          image: "/images/church/church_mock.webp",
        },
        {
          id: 2,
          name: "Malubub Baptist Church",
          location: "Maalubo, Badiangan, Iloilo",
          serviceTime: "Sunday 10:30 AM",
          image: "/images/church/church_mock.webp",
        },
        {
          id: 3,
          name: "CPU University Church",
          location: "Jaro, Iloilo City",
          serviceTime: "Sunday 8:00 AM",
          image: "/images/church/church_mock.webp",
        },
        {
          id: 4,
          name: "Baptist Church of Forward",
          location: "Antique, Badiangan, Iloilo",
          serviceTime: "Sunday 11:00 AM",
          image: "/images/church/church_mock.webp",
        },
        {
          id: 5,
          name: "Odiongan Central Baptist Church",
          location: "Odiongan, Badiangan, Iloilo",
          serviceTime: "Sunday 9:30 AM",
          image: "/images/church/church_mock.webp",
        },
        {
          id: 6,
          name: "Good Hope Baptist Church",
          location: "Badiangan, Iloilo",
          serviceTime: "Sunday 10:00 AM",
          image: "/images/church/church_mock.webp",
        },
      ],
    },
    "negros-chapter": {
      name: "Negros Chapter",
      churches: [
        {
          id: 7,
          name: "Calvary Chapel Negros",
          location: "Bacolod City, Negros Occidental",
          serviceTime: "Sunday 9:30 AM",
          image: "/images/church/church_mock.webp",
        },
      ],
    },
  };

  useEffect(() => {
    if (params.slug && typeof params.slug === "string") {
      const chapterData =
        chapterChurchesData[params.slug as keyof typeof chapterChurchesData];
      if (chapterData) {
        setChurches(chapterData.churches);
        setChapterName(chapterData.name);
      }
    }
  }, [params.slug]);

  const handleBack = () => router.back();

  const filteredChurches = churches.filter((church) =>
    `${church.name} ${church.location}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 py-3 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="p-1 text-black hover:bg-gray-200 mr-3"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-black">
          {chapterName} Churches
        </h1>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <Input
          type="text"
          placeholder="Search churches"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 focus:bg-white"
        />
      </div>

      {/* Churches Grid */}
      <div className="px-4 pb-8">
        {filteredChurches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredChurches.map((church) => (
              <div
                key={church.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={church.image || "/placeholder.svg"}
                    alt={church.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-base font-semibold text-black">
                    {church.name}
                  </h3>
                  <p className="text-xs text-gray-600">{church.location}</p>
                  <p className="text-sm text-amber-700 font-medium">
                    {church.serviceTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center pt-8">
            <p className="text-gray-500">No churches found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
