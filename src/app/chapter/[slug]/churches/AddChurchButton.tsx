"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CloudUpload } from "lucide-react";

export default function AddChurchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [churchName, setChurchName] = useState("");
  const [location, setLocation] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [errors, setErrors] = useState({
    churchName: false,
    location: false,
    serviceTime: false,
    description: false,
  });
  const characterLimit = 500;

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      churchName: !churchName.trim(),
      location: !location.trim(),
      serviceTime: !serviceTime.trim(),
      description: !description.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      // Submit form logic here
      console.log("Form submitted");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setChurchName("");
    setLocation("");
    setServiceTime("");
    setDescription("");
    setErrors({
      churchName: false,
      location: false,
      serviceTime: false,
      description: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Button
        className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center rounded-lg"
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
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Church Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter church name"
                    className={`h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.churchName ? "border-red-500" : "focus:ring-amber-500"
                    }`}
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                  />
                  {errors.churchName && (
                    <p className="text-red-500 text-xs mt-1">
                      Church name is required.
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter location"
                    className={`h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.location ? "border-red-500" : "focus:ring-amber-500"
                    }`}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      Location is required.
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Service Time
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter service time"
                    className={`h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                      errors.serviceTime ? "border-red-500" : "focus:ring-amber-500"
                    }`}
                    value={serviceTime}
                    onChange={(e) => setServiceTime(e.target.value)}
                  />
                  {errors.serviceTime && (
                    <p className="text-red-500 text-xs mt-1">
                      Service time is required.
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    placeholder="Enter Description"
                    className={`h-28 pr-10 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    maxLength={characterLimit}
                    value={description}
                    onChange={handleDescriptionChange}
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
                    <Button
                      type="button"
                      className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] ml-1"
                      onClick={() => document.getElementById("fileInput")?.click()}
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

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 mb-auto bottom-0 left-0 right-0 px-4 py-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className=" flex-1 w-full h-10 px-4 text-black mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
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
}
