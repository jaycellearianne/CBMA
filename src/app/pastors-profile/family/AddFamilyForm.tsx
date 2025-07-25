"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FamilyMember } from "./FamilyData";

interface AddFamilyFormProps {
  open: boolean;
  onSaveAction: (member: FamilyMember) => void;
  onCancelAction: () => void;
}

export default function AddFamilyForm({
  open,
  onSaveAction,
  onCancelAction,
}: AddFamilyFormProps) {
  const [formData, setFormData] = useState<FamilyMember>({
    id: 0, // Default id value
    name: "",
    relationship: "",
    education: "",
    occupation: "",
    birthDate: "",
    otherRelationship: "",
  });

  const [errors, setErrors] = useState<Partial<FamilyMember>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<FamilyMember> = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.relationship)
      newErrors.relationship = "Relationship is required.";
    if (!formData.education) newErrors.education = "Education is required.";
    if (!formData.occupation) newErrors.occupation = "Occupation is required.";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSaveAction(formData);
      setFormData({
        id: 0, // Reset id value
        name: "",
        relationship: "",
        education: "",
        occupation: "",
        birthDate: "",
        otherRelationship: "",
      });
    }
  };

  const handleChange = (field: keyof FamilyMember, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // Clear error for the field
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div>
          <Label htmlFor="name" className="text-[#6f4e37] mb-2">
            Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            placeholder="Enter full name"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="relationship" className="text-[#6f4e37] mb-2">
            Relationship
          </Label>
          <Select
            value={formData.relationship}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                relationship: value,
                otherRelationship: "", // reset when changing
              }))
            }
          >
            <SelectTrigger className="h-10 bg-[#F7F4F0]">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Father">Father</SelectItem>
              <SelectItem value="Mother">Mother</SelectItem>
              <SelectItem value="Brother">Brother</SelectItem>
              <SelectItem value="Sister">Sister</SelectItem>
              <SelectItem value="Spouse">Spouse</SelectItem>
              <SelectItem value="Daughter">Daughter</SelectItem>
              <SelectItem value="Son">Son</SelectItem>
              <SelectItem value="Grandfather">Grandfather</SelectItem>
              <SelectItem value="Grandmother">Grandmother</SelectItem>
              <SelectItem value="Uncle">Uncle</SelectItem>
              <SelectItem value="Aunt">Aunt</SelectItem>
              <SelectItem value="Cousin">Cousin</SelectItem>
            </SelectContent>
          </Select>
          {errors.relationship && (
            <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>
          )}
        </div>

        <div>
          <Label htmlFor="education" className="text-[#6f4e37] mb-2">
            Education
          </Label>
          <Input
            id="education"
            value={formData.education}
            placeholder="Enter education"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("education", e.target.value)}
          />
          {errors.education && (
            <p className="text-red-500 text-xs mt-1">{errors.education}</p>
          )}
        </div>

        <div>
          <Label htmlFor="occupation" className="text-[#6f4e37] mb-2">
            Occupation
          </Label>
          <Input
            id="occupation"
            value={formData.occupation}
            placeholder="Enter occupation"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("occupation", e.target.value)}
          />
          {errors.occupation && (
            <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
          )}
        </div>

        <div>
          <Label htmlFor="birthDate" className="text-[#6f4e37] mb-2">
            Birth Date
          </Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            placeholder="Enter birth date"
            className="bg-[#F7F4F0]"
            onChange={(e) => handleChange("birthDate", e.target.value)}
          />
          {errors.birthDate && (
            <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
        >
          Add Family Member
        </Button>
      </form>
    </div>
  );
}
