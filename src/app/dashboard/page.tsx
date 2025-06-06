"use client";

import NavBar from "../navigation/NavBar";
import ChapterCard from "@/components/card/ChapterCard";
import PlusIcon from "@/components/icons/PlusIcon";
import SearchIcon from "@/components/icons/SearchIcon";

export default function Dashboard() {

  // sample data
  const chapterList = [
    {
      id: 1,
      title: "Iloilo",
      image: "/church_01.jpg",
    },
    {
      id: 2,
      title: "Negros",
      image: "/public/church_02.jpeg",
    },
  ];

  
  return (
    <div className="min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="mt-5">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-xl sm:max-w-3xl lg:max-w-5xl">
          {/* Search*/}
          <form className="w-full mb-6">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon color="gray" size={24} />
              </div>
              <input
                type="search"
                id="default-search"
                className="w-full h-[44px] p-4 ps-10 text-sm text-gray-900 rounded-4xl bg-gray-100 border"
                placeholder="Search"
                required
              />
            </div>
          </form>

          {/* User Greetings */}
          <div className="mb-6">
            <p className="text-2xl font-semibold text-[#6F4E37]">Hello User!</p>
            <p className="text-gray-600">Good Morning!</p>
          </div>

          {/* Content Container */}
          <div className="w-full rounded-lg border border-amber-950 bg-white shadow-sm h-[100px]"></div>
        </div>

        {/* Chapters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-[#6F4E37]">Chapters</h1>
            <button
              type="button"
              className="flex items-center gap-2 text-white bg-[#6F4E37] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 sm:px-4 py-2"
            >
              <PlusIcon path="M5 12h14m-7 7V5" color="white" size={24} />
              Add Chapter
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {chapterList.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                title={chapter.title}
                image={chapter.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
