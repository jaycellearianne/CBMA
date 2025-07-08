"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Training {
  id: number;
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
}

interface EditTrainingFormProps {
  open: boolean;
  training: Training;
  onSaveAction: (training: Training) => void;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export default function EditTrainingForm({
  open,
  training,
  onSaveAction,
  onDeleteAction,
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle>Edit Training</DialogTitle>
              <DialogDescription>
                Update or delete this training entry.
              </DialogDescription>
            </div>
            <Button size="icon" variant="ghost" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Sponsoring Agency */}
          <div>
            <Label htmlFor="sponsoringAgency">Sponsoring Agency</Label>
            <Input
              id="sponsoringAgency"
              value={formData.sponsoringAgency}
              onChange={(e) => handleChange("sponsoringAgency", e.target.value)}
            />
            {errors.sponsoringAgency && (
              <p className="text-xs text-red-500">{errors.sponsoringAgency}</p>
            )}
          </div>

          {/* Venue */}
          <div>
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
            />
            {errors.venue && (
              <p className="text-xs text-red-500">{errors.venue}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500">{errors.startDate}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 flex gap-2">
          <Button variant="destructive" onClick={onDeleteAction}>
            Delete
          </Button>
          <Button
            className="bg-[#6F4E37] text-white hover:bg-[#5D3E2A]"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
