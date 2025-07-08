"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";

interface Training {
  id: number;
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
}

interface EditTrainingModalProps {
  open: boolean;
  training: Training;
  onSaveAction: (training: Training) => void;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export default function EditTrainingModal({
  open,
  training,
  onSaveAction,
  onDeleteAction,
  onCancelAction,
}: EditTrainingModalProps) {
  const [formData, setFormData] = useState<Training>(training);
  const [errors, setErrors] = useState<Partial<Omit<Training, "id">>>({});

  // Update form data when training prop changes
  useEffect(() => {
    setFormData(training);
  }, [training]);

  const validateForm = () => {
    const newErrors: Partial<Omit<Training, "id">> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.sponsoringAgency.trim())
      newErrors.sponsoringAgency = "Sponsoring Agency is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSaveAction(formData);
    }
  };

  const handleInputChange = (field: keyof Training, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof Omit<Training, "id">]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    setErrors({});
    onCancelAction();
  };

  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DrawerContent className="h-[95vh] flex flex-col">
        {/* Mobile-first: Full width with responsive max-width */}
        <div className="w-full max-w-full sm:max-w-md mx-auto flex flex-col h-full">
          {/* Header - Mobile optimized */}
          <DrawerHeader className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <DrawerTitle className="text-xl font-semibold text-black leading-tight">
                  Edit Training
                </DrawerTitle>
                <DrawerDescription className="text-base text-gray-600 mt-1">
                  Update or delete this training record
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-500 hover:text-gray-700 touch-manipulation flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Content - Mobile scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="edit-title"
                  className="text-base font-medium text-gray-700"
                >
                  Title
                </Label>
                <Input
                  id="edit-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`w-full h-14 px-4 border-2 rounded-xl text-lg placeholder:text-gray-400 focus:outline-none transition-all touch-manipulation ${
                    errors.title
                      ? "border-red-500 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-4 focus:ring-amber-100 focus:border-amber-500"
                  }`}
                  autoComplete="off"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm flex items-center mt-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Sponsoring Agency Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="edit-sponsoringAgency"
                  className="text-base font-medium text-gray-700"
                >
                  Sponsoring Agency
                </Label>
                <Input
                  id="edit-sponsoringAgency"
                  type="text"
                  value={formData.sponsoringAgency}
                  onChange={(e) =>
                    handleInputChange("sponsoringAgency", e.target.value)
                  }
                  className={`w-full h-14 px-4 border-2 rounded-xl text-lg placeholder:text-gray-400 focus:outline-none transition-all touch-manipulation ${
                    errors.sponsoringAgency
                      ? "border-red-500 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-4 focus:ring-amber-100 focus:border-amber-500"
                  }`}
                  autoComplete="organization"
                />
                {errors.sponsoringAgency && (
                  <p className="text-red-500 text-sm flex items-center mt-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.sponsoringAgency}
                  </p>
                )}
              </div>

              {/* Venue Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="edit-venue"
                  className="text-base font-medium text-gray-700"
                >
                  Venue
                </Label>
                <Input
                  id="edit-venue"
                  type="text"
                  value={formData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  className={`w-full h-14 px-4 border-2 rounded-xl text-lg placeholder:text-gray-400 focus:outline-none transition-all touch-manipulation ${
                    errors.venue
                      ? "border-red-500 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-4 focus:ring-amber-100 focus:border-amber-500"
                  }`}
                  autoComplete="off"
                />
                {errors.venue && (
                  <p className="text-red-500 text-sm flex items-center mt-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.venue}
                  </p>
                )}
              </div>

              {/* Date Fields - Mobile optimized */}
              <div className="space-y-4">
                <Label className="text-base font-medium text-gray-700">
                  Training Dates
                </Label>

                {/* Mobile: Stack dates vertically for better UX */}
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-startDate"
                      className="text-sm text-gray-600 font-medium"
                    >
                      Start Date
                    </Label>
                    <Input
                      id="edit-startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className={`w-full h-14 px-4 border-2 rounded-xl text-lg focus:outline-none transition-all touch-manipulation ${
                        errors.startDate
                          ? "border-red-500 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
                          : "border-gray-300 focus:ring-4 focus:ring-amber-100 focus:border-amber-500"
                      }`}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="edit-endDate"
                      className="text-sm text-gray-600 font-medium"
                    >
                      End Date
                    </Label>
                    <Input
                      id="edit-endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className={`w-full h-14 px-4 border-2 rounded-xl text-lg focus:outline-none transition-all touch-manipulation ${
                        errors.endDate
                          ? "border-red-500 focus:ring-4 focus:ring-red-100 focus:border-red-500 bg-red-50"
                          : "border-gray-300 focus:ring-4 focus:ring-amber-100 focus:border-amber-500"
                      }`}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer - Mobile optimized with stacked buttons */}
          <DrawerFooter className="flex-shrink-0 px-6 py-6 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Button
                type="button"
                onClick={onDeleteAction}
                variant="destructive"
                className="w-full h-14 text-lg font-medium touch-manipulation transition-all shadow-lg hover:shadow-xl"
              >
                Delete Training
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full h-14 text-lg font-medium bg-[#6F4E37] hover:bg-[#5D3E2A] active:bg-[#4A3228] text-white touch-manipulation transition-all shadow-lg hover:shadow-xl"
              >
                Save Changes
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
