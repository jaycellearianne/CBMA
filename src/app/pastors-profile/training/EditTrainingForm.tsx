"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Training } from "./TrainingData";

interface EditTrainingFormProps {
  open: boolean;
  training: Training;
  onSaveAction: (training: Training) => void;
  onCancelAction: () => void;
}

export default function EditTrainingForm({
  open,
  training,
  onSaveAction,
  onCancelAction,
}: EditTrainingFormProps) {
  const [formData, setFormData] = useState(training);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(training);
    setErrors({});
  }, [training]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.sponsoringAgency.trim())
      newErrors.sponsoringAgency = "Sponsoring agency is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (formData.startDate > formData.endDate)
      newErrors.endDate = "End date must be after start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: keyof Training, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSave = () => {
    if (validate()) onSaveAction(formData);
  };

  const handleClose = () => {
    setErrors({});
    onCancelAction();
  };

  return (
    <div className="bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-8 w-full"
      >
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
          Save Changes
        </Button>
      </form>
    </div>
  );
}
