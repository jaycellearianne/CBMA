/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function AddChurchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const characterLimit = 500;
  const [dataURL, setDataURL] = useState<string | null>(null);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setAcceptedFiles(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setDataURL(binaryStr as string);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const selectedFile = acceptedFiles[0];

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Button
        className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={24} color="white" /> Add Church
      </Button>

      <div className="relative w-full items-center">
        {isOpen && (
          <div className="fixed inset-0 z-10 w-screen bg-black/35 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-[98vw] max-w-[98vw] sm:w-[90vw] sm:max-w-lg md:max-w-xl xl:max-w-2xl flex flex-col items-center p-2 sm:p-4 overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Add Church
              </h2>

              {/* Form */}
              <form className="space-y-4 w-full">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Church Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter church name"
                    maxLength={50}
                    className="h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Location{" "}
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter location"
                    maxLength={50}
                    className="h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Service Time
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter service time"
                    maxLength={50}
                    className="h-10 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col w-full items-center justify-between">
                  {/* Description */}
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Enter description"
                      maxLength={characterLimit}
                      className="h-20 max-h-40 px-4 w-full max-w-full border text-xs rounded-lg  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 mt-1 resize-none overflow-hidden overflow-x-hidden overflow-y-auto break-words break-all"
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {description.length}/{characterLimit} characters
                    </div>
                  </div>

                  {/* Upload Image */}
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-700">
                      Attach Image
                    </label>
                    <div
                      className=" flex flex-row items-center justify-center border rounded-lg w-full h-250 max-h-30 sm:h-40 md:h-48 px-2 sm:px-5 mx-auto relative"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {!dataURL ? (
                        <div className=" h-20 max-h-40 flex flex-col items-center justify-center w-full min-h-25 sm:h-40 md:h-48 px-2 sm:px-5 mx-auto relative">
                          <CloudUpload className="w-8 h-8 text-gray-500 justify-items-center" />
                          <span className="text-gray-500 text-sm text-center">
                            Drag & Drop your image
                          </span>
                          <div className="flex flex-col items-center">
                            <p className="text-gray-500 text-sm text-center mb-2">
                              or
                            </p>
                            <span className="underline text-xs text-[#6F4E37]">
                              Browse files
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center mt-2 w-full relative">
                          <X
                            className="absolute top-1 right-1 bg-opacity-80 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-colors z-10"
                            color="white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDataURL(null);
                              setAcceptedFiles([]);
                            }}
                            aria-label="Remove image"
                          />
                          <Image
                            src={dataURL || ""}
                            alt="Preview"
                            width={400}
                            height={160}
                            className="w-full h-full object-contain max-h-20  sm:max-w-xs"
                          />
                          <span className="text-xs text-gray-500 mt-1 break-all text-center w-full">
                            {selectedFile?.name || "No file selected"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                  <Button className="flex-1 w-full bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B]">
                    Add Church
                  </Button>{" "}
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className=" flex-1 w-full bg-[#A67B5B40] h-10 px-4 text-black hover:bg-[#A67B5B] mr-2"
                  >
                    Cancel
                  </Button>{" "}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
