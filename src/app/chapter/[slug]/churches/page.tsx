"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Filter } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChurchesPage() {
  const router = useRouter();
  const params = useParams();
  const [churches, setChurches] = useState<any[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Chapter-specific churches data with real church images
  const chapterChurchesData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      churches: [
        {
          id: 1,
          name: "Baptist Center Church",
          location: "La Paz, Iloilo City",
          serviceTime: "Sunday 9:00 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 2,
          name: "Malubub Baptist Church",
          location: "Maalubo, Badiangan, Iloilo",
          serviceTime: "Sunday 10:30 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 3,
          name: "CPU University Church",
          location: "Jaro, Iloilo City",
          serviceTime: "Sunday 8:00 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 4,
          name: "Baptist Church of Forward",
          location: "Antique, Badiangan, Iloilo",
          serviceTime: "Sunday 11:00 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 5,
          name: "Odiongan Central Baptist Church",
          location: "Odiongan, Badiangan, Iloilo",
          serviceTime: "Sunday 9:30 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 6,
          name: "Good Hope Baptist Church",
          location: "Badiangan, Iloilo",
          serviceTime: "Sunday 10:00 AM",
          image: "/images/church/88_n.jpg",
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
          image: "/images/church/88_n.jpg",
        },
        {
          id: 8,
          name: "Victory Church Negros",
          location: "Bacolod City, Negros Occidental",
          serviceTime: "Sunday 10:00 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 9,
          name: "Bethel Assembly Negros",
          location: "Dumaguete City, Negros Oriental",
          serviceTime: "Sunday 8:30 AM",
          image: "/images/church/88_n.jpg",
        },
      ],
    },
    "chapter-3": {
      name: "Chapter 3",
      churches: [
        {
          id: 10,
          name: "Cornerstone Church",
          location: "City Center",
          serviceTime: "Sunday 10:00 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 11,
          name: "Lighthouse Fellowship",
          location: "Harbor District",
          serviceTime: "Sunday 9:00 AM",
          image: "/images/church/88_n.jpg",
        },
      ],
    },
    "chapter-4": {
      name: "Chapter 4",
      churches: [
        {
          id: 12,
          name: "River of Life Church",
          location: "Riverside",
          serviceTime: "Sunday 10:30 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 13,
          name: "Abundant Life Church",
          location: "Downtown",
          serviceTime: "Sunday 9:30 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 14,
          name: "Kingdom Church",
          location: "Uptown",
          serviceTime: "Sunday 8:00 AM",
          image: "/images/church/88_n.jpg",
        },
      ],
    },
    "chapter-5": {
      name: "Chapter 5",
      churches: [
        {
          id: 15,
          name: "Harvest Church",
          location: "Agricultural District",
          serviceTime: "Sunday 10:00 AM",
          image: "/images/church/88_n.jpg",
        },
      ],
    },
    "chapter-6": {
      name: "Chapter 6",
      churches: [
        {
          id: 16,
          name: "Unity Church",
          location: "Central District",
          serviceTime: "Sunday 9:00 AM",
          image: "/images/church/88_n.jpg",
        },
        {
          id: 17,
          name: "Restoration Church",
          location: "Heritage District",
          serviceTime: "Sunday 11:00 AM",
          image: "/images/church/88_n.jpg",
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

  const handleBack = () => {
    router.back();
  };

  // Filter churches based on search query
  const filteredChurches = churches.filter(
    (church) =>
      church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      church.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-black px-4 py-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-black hover:bg-gray-200 mr-15"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium">{chapterName} Churches</h1>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-4 py-4 space-y-3 mb-8">
        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 focus:bg-white"
        />
      </div>

      {/* Churches Grid */}
      <div className="px-4 pb-4">
        {filteredChurches.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredChurches.map((churches) => (
              <div
                key={churches.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative h-100 w-full">
                  <Image
                    src={churches.image || "/placeholder.svg"}
                    alt={churches.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-medium text-black mb-1 leading-tight">
                    {churches.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight mb-1">
                    {churches.location}
                  </p>
                  <p className="text-sm text-amber-700 font-medium">
                    {churches.serviceTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No churches found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
