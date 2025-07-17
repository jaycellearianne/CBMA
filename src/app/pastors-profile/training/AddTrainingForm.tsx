"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddTrainingFormProps {
  onSaveAction: (training: Omit<TrainingFormData, "id">) => void;
  onCancelAction: () => void;
}

interface TrainingFormData {
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
}

export default function AddTrainingForm({
  onSaveAction,
}: AddTrainingFormProps) {
  const [formData, setFormData] = useState<TrainingFormData>({
    title: "",
    sponsoringAgency: "",
    venue: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState<Partial<TrainingFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<TrainingFormData> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.sponsoringAgency.trim())
      newErrors.sponsoringAgency = "Sponsoring agency is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof TrainingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSaveAction(formData);
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div>
          <Label htmlFor="title" className="text-[#6f4e37] mb-2">
            Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            placeholder="Enter training / seminar title"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <Label htmlFor="sponsoringAgency" className="text-[#6f4e37] mb-2">
            Sponsoring Agency
          </Label>
          <Input
            id="sponsoringAgency"
            value={formData.sponsoringAgency}
            placeholder="Enter sponsoring agency"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("sponsoringAgency", e.target.value)}
          />
          {errors.sponsoringAgency && (
            <p className="text-red-500 text-xs mt-1">
              {errors.sponsoringAgency}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="venue" className="text-[#6f4e37] mb-2">
            Venue
          </Label>
          <Input
            id="venue"
            value={formData.venue}
            placeholder="Enter venue"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("venue", e.target.value)}
          />
          {errors.venue && (
            <p className="text-red-500 text-xs mt-1">{errors.venue}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start" className="text-[#6f4e37] mb-2">
              Start Date
            </Label>
            <Input
              id="start"
              type="date"
              value={formData.startDate}
              className="bg-[#F7F4F0]"
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>
          <div>
            <Label htmlFor="end" className="text-[#6f4e37] mb-2">
              End Date
            </Label>
            <Input
              id="end"
              type="date"
              value={formData.endDate}
              className="bg-[#F7F4F0]"
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
        >
          Add Training
        </Button>
      </form>
    </div>
  );
}
