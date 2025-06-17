"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CloudUpload } from "lucide-react";

export default function AddChurchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const characterLimit = 500;

   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Button
        className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={24} color="white" /> Add Church
      </Button>


      <div className="relative w-full">
        {isOpen && (
          <div className="fixed inset-0 z-10 bg-black/35 flex items-center justify-center">
            <div className="bg-white z-50 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl h-full max-h-[90vh] p-6 mx-2 flex flex-col overflow-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Add Church
            </h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Church Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter church name"
                  className="h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="Enter location"
                  className="h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Service Time
                </label>
                <Input
                  type="text"
                  placeholder="Enter service time"
                  className="h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter description"
                  maxLength={characterLimit}
                  className="min-h-[5rem] px-4 w-full border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 mt-1 resize-none overflow-hidden"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
{                 description.length}/{characterLimit} characters
                </div>

              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Attach Image
                </label>
                <div className="flex flex-col items-center justify-center border rounded-lg w-full h-32 sm:h-40 md:h-48 px-2 sm:px-5 mx-auto relative">
                  <CloudUpload className="w-12 h-12 text-gray-500 justify-items-center" />
                  <span className="text-gray-500 text-base text-center">
                    Drag and Drop here
                    <div className="flex flex-col items-center">
                      <p className="text-gray-500 text-base text-center mb-2">
                        or
                      </p>
                      <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] ml-1">
                      Browse files
                    </Button>
                    </div>
                    
                  </span>
                </div>
              </div>

              {/* Cancel & Delete Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 mb-auto bottom-0 left-0 right-0 px-4 py-4">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className=" flex-1 w-full bg-[#A67B5B40] h-10 px-4 text-black hover:bg-[#A67B5B] mr-2"
                >
                  Cancel
                </Button>
                <Button
                  // type="submit"
                  className="flex-1 w-full bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B]"
                >
                  Add Church
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>

      
    </div>
  );

  // Validate Location
}
