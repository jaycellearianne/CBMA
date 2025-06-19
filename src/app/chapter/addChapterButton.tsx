"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import AddChurchButton from "./[slug]/churches/AddChurchButton";

type AddChapterButtonProps = {
  pastors: { id: number; name: string }[];
  churches: { id: number; name: string }[];
  onCancelAction: () => void;
};

export default function AddChapterButton({
  pastors,
  churches,
  onCancelAction,
}: AddChapterButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    chapterName: false,
    description: false,
  });
  const characterLimit = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      chapterName: !chapterName.trim(),
      description: !description.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      const slug = chapterName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      const newChapter = {
        name: chapterName,
        description,
        image: "/images/chapter/ilochapter.webp", // or placeholder
      };

      // Save to localStorage
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("chapters");
        const chapters = stored ? JSON.parse(stored) : {};
        chapters[slug] = newChapter;
        localStorage.setItem("chapters", JSON.stringify(chapters));
      }

      // Redirect
      router.push(`/chapter/${slug}`);
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/35 flex items-center justify-center">
      <div className="bg-white z-50 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl h-full max-h-[90vh] p-6 mx-2 flex flex-col overflow-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Add Chapter
        </h2>

        {/* Chapter Name */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Chapter Name
            </label>
            <Input
              id="chapterName"
              placeholder="Enter Chapter Name"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
            {errors.chapterName && (
              <p className="text-red-500 text-xs mt-1">
                Chapter name is required.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Enter Description"
              className="h-28 pr-10"
              maxLength={characterLimit}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="absolute bottom-1 right-2 text-xs text-gray-400">
              {description.length}/{characterLimit} Characters
            </span>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                Description is required.
              </p>
            )}
          </div>

          {/* Pastor Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Pastors</label>
            <div className="flex gap-2 items-center">
              <select
                id="pastor"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-500"
              >
                <option>Select pastor</option>
                {pastors.map((pastor) => (
                  <option key={pastor.id}>{pastor.name}</option>
                ))}
              </select>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-[#6F4E37] px-1"
              >
                + Add Pastor
              </Button>
            </div>
          </div>

          {/* Church Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Church</label>
            <div className="flex gap-2 items-center">
              <select
                id="church"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-500"
              >
                <option>Select church</option>
                {churches.map((church) => (
                  <option key={church.id}>{church.name}</option>
                ))}
              </select>
              <div>
                <AddChurchButton />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Attach Image
            </label>
            <div className="flex flex-col items-center justify-center border rounded-lg w-full h-32 sm:h-40 md:h-48 px-2 sm:px-5 mx-auto relative">
              <CloudUpload className="w-12 h-12 text-gray-500 justify-items-center" />
              <span className="text-gray-500 text-base text-center">
                Drag and Drop here
                <div className="flex flex-col items-center">
                  <p className="text-gray-500 text-base text-center mb-2">or</p>
                  <Button
                    type="button"
                    className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] ml-1"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    Browse files
                  </Button>
                </div>
              </span>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log("Selected file:", e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 mb-auto bottom-0 left-0 right-0 px-4 py-4">
            <Button
              variant="outline"
              onClick={onCancelAction}
              className="flex-1 w-full h-10 px-4 text-black mr-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 w-full bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B]"
            >
              Create Chapter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
