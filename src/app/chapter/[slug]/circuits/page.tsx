"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CircuitsPage() {
  const router = useRouter();
  const params = useParams();
  const [circuits, setCircuits] = useState<any[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chapterCircuitsData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      circuits: [
        {
          id: 1,
          name: "Janiuay-Badiangan Circuit",
          location: "Janiuiay-Badiangan, Iloilo",
          image: "/images/circuit/circuit_mock.jpg",
        },
        {
          id: 2,
          name: "City Wide Circuit",
          location: "Iloilo City, Iloilo",
          image: "/images/circuit/circuit_mock.jpg",
        },
      ],
    },
  };

  useEffect(() => {
    if (params.slug && typeof params.slug === "string") {
      const chapterData =
        chapterCircuitsData[params.slug as keyof typeof chapterCircuitsData];
      if (chapterData) {
        setCircuits(chapterData.circuits);
        setChapterName(chapterData.name);
      }
    }
  }, [params.slug]);

  const handleBack = () => router.back();

  const filteredCircuits = circuits.filter((circuit) =>
    `${circuit.name} ${circuit.location}`
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
          {chapterName} Circuits
        </h1>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <Input
          type="text"
          placeholder="Search circuits"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 focus:bg-white"
        />
      </div>

      {/* Circuits Grid */}
      <div className="px-4 pb-8">
        {filteredCircuits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCircuits.map((circuit) => (
              <div
                key={circuit.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={circuit.image || "/placeholder.svg"}
                    alt={circuit.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-base font-semibold text-black">
                    {circuit.name}
                  </h3>
                  <p className="text-xs text-gray-600">{circuit.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center pt-8">
            <p className="text-gray-500">No circuits found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
