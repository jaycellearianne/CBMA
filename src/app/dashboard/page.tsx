"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Menu, Plus } from "lucide-react";
import NavBar from "../navigation/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChapterPage from "../chapter/[slug]/page";
import ChurchProfile from "../church-profile/page";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [noteText, setNoteText] = useState("");
  const router = useRouter();

  const chapters = [
    {
      id: 1,
      name: "Iloilo Chapter",
      image: "/images/chapter/ilochapter.webp",
      slug: "iloilo-chapter",
    },
    // {
    //   id: 2,
    //   name: "Negros Chapter",
    //   image: "/images/chapter/ilochapter.webp",
    //   slug: "negros-chapter",
    // },
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

  {
    /* Mock data */
  }
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

  const handleChapterClick = (chapterSlug: string) => {
    router.push(`/chapter/${chapterSlug}`);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-white">
        <div className="px-4 py-4 space-y-6">
          {/* Search Bar */}
          <div>
            <Input
              type="text"
              placeholder="Search chapter, church, pastor, circuit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 px-4 bg-gray-100 border-0 rounded-md text-sm placeholder:text-gray-500 focus:ring-black-200 focus:bg-white"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="bg-gray-50 border rounded-lg p-4 space-y-2 absolute z-1">
              {filteredResults.length === 0 ? (
                <p className="text-gray-500 text-sm">No results found.</p>
              ) : (
                filteredResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleResultClick(item.slug)}
                    className="cursor-pointer px-2 py-1 hover:bg-amber-100 rounded-md"
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

          {/* Greeting */}
          <div className="space-y-1">
            <h2 className="text-xl font-medium text-black">Hello, User!</h2>
            <p className="text-gray-600 text-sm">Good Morning</p>
          </div>

          {/* Notes */}
          <div>
            <Textarea
              placeholder="Enter your notes here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full h-20 px-4 py-3 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Chapters */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium text-black">CHAPTERS</h2>
              <Button
                size="sm"
                className="bg-amber-800 hover:bg-amber-900 text-white text-xs px-3 py-1 h-8 rounded"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Chapter
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-7.5">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.slug)}
                  className="rounded-2xl overflow-hidden shadow-xl border border-gray-300 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-full aspect-[16/9] relative">
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
    </div>
  );
}
