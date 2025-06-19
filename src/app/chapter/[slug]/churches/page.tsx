"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Filter, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AddChurchButton from "./AddChurchModal";

export default function ChurchesPage() {
  const router = useRouter();
  const params = useParams();
  const [churches, setChurches] = useState<any[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeFilterCategory, setActiveFilterCategory] = useState<
    FilterCategory | undefined
  >(undefined);
  // const [isOpen, setIsOpen] = useState(false);

  const chapterChurchesData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      churches: [
        {
          id: 1,
          name: "Malublub Baptist Church",
          location: "Zone 1, Malublub, Badiangan, Iloilo",
          serviceTime: "Sunday 9:00 AM",
          image: "/images/church/church_mock.webp",
        },
        {
          id: 2,
          name: "Baptist Center Church",
          location: "La Paz, Iloilo City",
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
          name: "Hillside Evangelical Church",
          location: "Mansilingan, Bacolod City, Negros Occidental",
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

  // const filteredChurches = churches.filter((church) =>
  //   `${church.name} ${church.location}`
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase())
  // );
  type FilterCategory = "name" | "location" | "serviceTime";

  const filterOptions = () => {
    const options = {
      name: new Set<string>(),
      location: new Set<string>(),
      serviceTime: new Set<string>(),
    };

    churches.forEach((church) => {
      options.name.add(church.name);
      options.location.add(church.location);
      options.serviceTime.add(church.serviceTime);
    });

    return options;
  };

  const itemFilterOptions = filterOptions();

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredChurches = churches.filter((church) => {
    if (!activeFilterCategory) {
      if (searchQuery.trim() === "") {
        return true;
      }
      return (
        church.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        church.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        church.serviceTime.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    let matchesFilter = true;
    let matchesSearch = true;

    if (selectedFilters.length > 0) {
      let value = "";
      if (activeFilterCategory === "name") {
        value = church.name;
      } else if (activeFilterCategory === "location") {
        value = church.location;
      } else if (activeFilterCategory === "serviceTime") {
        value = church.serviceTime;
      }
      matchesFilter = selectedFilters.includes(value);
    }

    if (searchQuery.trim() !== "") {
      let value = "";
      if (activeFilterCategory === "name") {
        value = church.name;
      } else if (activeFilterCategory === "location") {
        value = church.location;
      } else if (activeFilterCategory === "serviceTime") {
        value = church.serviceTime;
      }
      matchesSearch = value.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return matchesFilter && matchesSearch;
  });

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
        {/* <h1 className="text-lg font-semibold text-black">
          {chapterName} Churches
        </h1> */}
      </div>

      {/* Search */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search churches"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 focus:bg-white"
        />

        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="flex flex-col items-center justify-center px-2"
        >
          <Filter color="#6F4E37" size={20} className="inline-block" />
          <span className="text-xs font-medium">Filter</span>
        </button>

        {dropdownVisible && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/20"
            onClick={() => setDropdownVisible(false)}
          >
            <div
              className="bg-white w-full max-w-[480px] min-h-[100px] rounded-t-2xl shadow-[0_-2px_24px_rgba(0,0,0,0.10)] relative p-4 pb-8 mx-0
                sm:rounded-2xl sm:max-w-[400px] sm:min-h-[120px] sm:mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-gray-200 rounded mx-auto mb-4" />
              <div className="mb-4">
                <span className="mr-2 font-medium">Filter by:</span>
                {(["name", "location", "serviceTime"] as FilterCategory[]).map(
                  (category) => {
                    const isActive = activeFilterCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => {
                          if (isActive) {
                            setActiveFilterCategory(undefined);
                            setSelectedFilters([]);
                          } else {
                            setActiveFilterCategory(category);
                            setSelectedFilters([]);
                          }
                        }}
                        className={`mr-2 mb-2 px-3 py-1.5 rounded-lg border text-sm transition
                          ${
                            isActive
                              ? "border-[#6F4E37] bg-[#E2DCD7] font-bold text-amber-900"
                              : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }
                        `}
                        type="button"
                      >
                        {category === "serviceTime"
                          ? "Service Time"
                          : category.charAt(0).toUpperCase() +
                            category.slice(1)}
                      </button>
                    );
                  }
                )}
              </div>

              {activeFilterCategory && (
                <div className="mb-2 text-center">
                  <strong className="block mb-2">
                    {activeFilterCategory === "serviceTime"
                      ? "Service Time"
                      : activeFilterCategory.charAt(0).toUpperCase() +
                        activeFilterCategory.slice(1)}
                  </strong>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[...itemFilterOptions[activeFilterCategory]].map(
                      (option) => {
                        const isSelected = selectedFilters.includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => toggleFilter(option)}
                            aria-pressed={isSelected}
                            className={`px-3 py-1.5 rounded-full text-sm border transition
                            ${
                              isSelected
                                ? "border-[#6F4E37] bg-[#E2DCD7] text-amber-900 font-bold"
                                : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }
                          `}
                            type="button"
                          >
                            {option}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
              <button
                onClick={() => setDropdownVisible(false)}
                className="absolute top-3 right-4 bg-transparent border-0 text-2xl cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <X size={14} color="gray" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="flex flex-row px-4 pb-4 items-center justify-between">
        <h1 className="text-lg font-semibold text-black">
          {chapterName} Churches
        </h1>
        <div>
        <AddChurchButton />
        </div>
      
      </div>

      {/* Churches Grid */}
      <div className="px-4 pb-8">
        {filteredChurches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredChurches.map((church) => (
              <div
                key={church.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                onClick={() =>
                  router.push(
                    `/church-profile?id=${church.id}&name=${encodeURIComponent(
                      church.name
                    )}&location=${encodeURIComponent(
                      church.location
                    )}&image=${encodeURIComponent(church.image)}`
                  )
                }
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={church.image || "/placeholder.svg"}
                    alt={church.name}
                    fill
                    className="object-cover"
                    priority
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
