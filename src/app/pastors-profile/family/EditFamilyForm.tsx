"use client";
import type React from "react";
import { useState, useEffect } from "react";
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

interface EditFamilyFormProps {
  open: boolean;
  member: FamilyMember;
  onSaveAction: (member: FamilyMember) => void;
  onCancelAction: () => void;
}

export default function EditFamilyForm({
  open,
  member,
  onSaveAction,
  onCancelAction,
}: EditFamilyFormProps) {
  const [formData, setFormData] = useState<FamilyMember>(member);

  useEffect(() => {
    setFormData(member);
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.relationship &&
      formData.education &&
      formData.occupation &&
      formData.birthDate
    ) {
      onSaveAction(formData);
    }
  };

  const [errors, setErrors] = useState<Partial<FamilyMember>>({});

  const handleChange = (field: keyof FamilyMember, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-[#F7F4F0]"
          />
        </div>

        <div>
          <Label htmlFor="relationship" className="text-[#6f4e37] mb-2">
            Relationship
          </Label>
          <Select
            value={formData.relationship}
            onValueChange={(value) => handleChange("relationship", value)}
          >
            <SelectTrigger className="bg-[#F7F4F0]">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Spouse">Spouse</SelectItem>
              <SelectItem value="Son">Son</SelectItem>
              <SelectItem value="Daughter">Daughter</SelectItem>
              <SelectItem value="Father">Father</SelectItem>
              <SelectItem value="Mother">Mother</SelectItem>
              <SelectItem value="Brother">Brother</SelectItem>
              <SelectItem value="Sister">Sister</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="education" className="text-[#6f4e37] mb-2">
            Education
          </Label>
          <Input
            id="education"
            placeholder="Enter education background"
            value={formData.education}
            onChange={(e) => handleChange("education", e.target.value)}
            className="bg-[#F7F4F0]"
          />
        </div>

        <div>
          <Label htmlFor="occupation" className="text-[#6f4e37] mb-2">
            Occupation
          </Label>
          <Input
            id="occupation"
            placeholder="Enter occupation"
            value={formData.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
            className="bg-[#F7F4F0]"
          />
        </div>

        <div>
          <Label htmlFor="birthdate" className="text-[#6f4e37] mb-2">
            Birth Date
          </Label>
          <Input
            id="birthdate"
            type="date"
            placeholder="Enter birth date"
            value={formData.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            className="bg-[#F7F4F0] cursor-pointer"
          />
          {errors.birthDate && (
            <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
          )}
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
