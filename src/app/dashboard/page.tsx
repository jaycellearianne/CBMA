"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Menu, Plus } from "lucide-react";
import NavBar from "../navigation/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [noteText, setNoteText] = useState("");
  const router = useRouter();

  const chapters = [
    {
      id: 1,
      name: "Iloilo Chapter",
      image: "/images/chapter/RETROWAVE-OASIS-33331.png",
      slug: "iloilo-chapter",
    },
  {
    id: 2,
    name: "Negros Chapter",
    image: "/images/chapter/RETROWAVE-OASIS-33331.png",
    slug: "negros-chapter",
  },
  ];

  const handleChapterClick = (chapterSlug: string) => {
    router.push(`/chapter/${chapterSlug}`);
  };

  return (
    <div>
      {/* Dashboard */}
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="px-4 py-4 space-y-6">
          {/* Search Bar */}
          <div>
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-black-200 focus:bg-white"
            />
          </div>

          {/* Greeting Section */}
          <div className="space-y-1">
            {/* should be the user's name */}
            <h2 className="text-xl font-medium text-black">Hello, User!</h2>
            <p className="text-gray-600 text-sm">Good Morning</p>
          </div>

          {/* Note/Text Area */}
          <div>
            <Textarea
              placeholder=""
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full h-20 px-4 py-3 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Chapters Section */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium text-black">CHAPTERS</h2>
              <Button
                size="sm"
                className="bg-amber-800 hover:bg-amber-900 text-white text-xs px-3 py-1 h-8 rounded"
              >
                <Plus className="w-3 h-3" />
                Add Chapter
              </Button>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-2 gap-7.5">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.slug)}
                  className="rounded-2xl overflow-hidden shadow-xl border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="relative h-50 w-full">
                    <Image
                      src={chapter.image || "/placeholder.svg"}
                      alt={`${chapter.name} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-white-700 p-4">
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
    </div>
  );
}
