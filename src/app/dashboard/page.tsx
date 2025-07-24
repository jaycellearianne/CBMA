"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, BellIcon, Menu, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddChapterModal from "../chapter/addChapterModal";
import MenuOverlay from "./MenuOverlay.";
import Greetings from "./Greetings";

export default function DashboardPage() {
  // MOCK DATA
  const chapters = [
    {
      id: 1,
      name: "Iloilo Chapter",
      image: "/images/chapter/ilochapter.webp",
      slug: "iloilo-chapter",
    },
  ];

  const churches = [
    {
      id: 1,
      name: "Baptist Center Church",
      location: "La Paz, Iloilo",
      chapter: "iloilo-chapter",
    },
    {
      id: 2,
      name: "Malublub Baptist Church",
      location: "Malublub, Badiangan, Iloilo",
      chapter: "iloilo-chapter",
    },
  ];

  const pastors = [
    { id: 1, name: "Arroz, Generoso Jr. C.", chapter: "iloilo-chapter" },
    { id: 2, name: "Mije, Rosendo", chapter: "iloilo-chapter" },
  ];

  const circuits = [
    {
      id: 1,
      name: "Janiuay-Badiangan Circuit",
      location: "Janiuay-Badiangan, Iloilo",
      chapter: "iloilo-chapter",
    },
    {
      id: 2,
      name: "City Wide Circuit",
      location: "Iloilo City, Iloilo",
      chapter: "iloilo-chapter",
    },
  ];

  const [isOpen, setIsOpenAction] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Mock user data
    const mockUser = "John Doe"; // Replace with dynamic user data if available
    setUser(mockUser);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noteText, setNoteText] = useState("");
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenuOverlay, setShowMenuOverlay] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const searchableItems = [
    ...chapters.map((item) => ({
      type: "Chapter",
      name: item.name,
      slug: item.slug,
    })),
    ...churches.map((item) => ({
      type: "Church",
      name: item.name,
      slug: item.chapter,
    })),
    ...pastors.map((item) => ({
      type: "Pastor",
      name: item.name,
      slug: item.chapter,
    })),
    ...circuits.map((item) => ({
      type: "Circuit",
      name: item.name,
      slug: item.chapter,
    })),
  ];

  const filteredResults = searchQuery
    ? searchableItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleResultClick = (slug: string) => {
    router.push(`/chapter/${slug}`);
  };
  const handleChapterClick = (slug: string) => {
    router.push(`/chapter/${slug}`);
  };

  return (
    <div>
      {/* NAV BAR */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Avatar Button */}
          <button
            onClick={() => setShowMenuOverlay(true)}
            className="rounded-full border hover:opacity-80 transition overflow-hidden w-10 h-10"
          >
            <Image
              src="/images/users/img.jpg"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full object-cover w-full h-full"
            />
          </button>

          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={showMenuOverlay}
        onCloseAction={() => setShowMenuOverlay(false)}
        userName={user}
        userEmail="johndoe@example.com" // Replace with dynamic email if available
      />

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-white">
        <div className="px-4 py-6 space-y-6 relative">
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search chapter, church, pastor, circuit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-black-200 focus:bg-white"
          />

          {/* Search Results */}
          {searchQuery && (
            <div className="absolute top-14 left-4 right-4 bg-gray-50 border rounded-lg p-4 space-y-2 z-10">
              {filteredResults.length === 0 ? (
                <p className="text-gray-500 text-sm">No results found.</p>
              ) : (
                filteredResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleResultClick(item.slug)}
                    className="cursor-pointer px-2 py-1 hover:bg-[#A67B5B]/20 rounded-md"
                  >
                    <p className="text-sm font-medium text-black">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">{item.type}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {/* Greeting */}
        <div className="mb-6 px-4">
          <Greetings user={user || ""} />
        </div>

        {/* Chapters Section */}
        <div className="space-y-8 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-black">CHAPTERS</h2>
            {/* Responsive AddChapterModal */}
            <AddChapterModal pastors={pastors} churches={churches} />
          </div>

          <div className="grid grid-cols-2 gap-7.5">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.slug)}
                className="rounded-2xl overflow-hidden shadow-xl border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-full aspect-video relative">
                  <Image
                    src={chapter.image || "/placeholder.svg"}
                    alt={`${chapter.name} thumbnail`}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>
                <div className="bg-white p-4">
                  <span className="text-black text-md font-medium">
                    {chapter.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
