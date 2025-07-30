
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, PenIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function MinistryExp() {
  const [isEditing, setIsEditing] = useState(false);
  const [ordinationDate, setOrdinationDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    salary: "",
    yearStarted: "",
    yearsInMinistry: "",
    ordained: "",
    recommendingChurch: "",
    cbmaStatus: "",
  });

  const handleChange = (key: string, value: string) => {
    if (!isEditing) return;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const displayBoxStyle = `bg-gray-50 px-4 py-2 w-full rounded-lg text-sm border border-gray-200`;
  const editBoxStyle = `bg-white px-4 py-2 w-full rounded-lg text-sm border-2 border-[#4E342E]/50 focus-within:border-[#4E342E] transition-colors duration-200`;
  const fieldStyle = `${isEditing ? editBoxStyle : displayBoxStyle} placeholder:text-gray-500 ${
    isEditing ? "cursor-text" : "cursor-default"
  }`;

  const renderViewValue = (value?: string | null) =>
    value && value.trim() !== "" ? (
      value
    ) : (
      <span className="text-gray-500">Not specified</span>
    );

  return (
    <div className="w-full max-w-screen mx-auto p-4 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-lg font-bold text-gray-800">Ministry Experience</h2>
        {isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(false)}
            className=" text-[#6F4E37] hover:bg-[#8D6E63]/25 font-semibold"
          >
            Save
          </Button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-[#2C1F16] hover:text-[#2C1F16] flex items-center gap-1"
          >
            <PenIcon size={14} />
            Edit
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {/* Salary */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Monthly Honorarium/Salary
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="Enter amount"
              value={formData.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
              className="mt-1 w-full border-none bg-transparent focus:ring-0"
            />
          ) : (
            <div className="text-gray-800">{renderViewValue(formData.salary)}</div>
          )}
        </div>

        {/* Year started */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Year started
          </label>
          {isEditing ? (
            <Select
              value={formData.yearStarted}
              onValueChange={(val) => handleChange("yearStarted", val)}
            >
              <SelectTrigger
                className="mt-1 w-full border-none bg-transparent pr-8"
              >
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(50)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          ) : (
            <div className="text-gray-800">{renderViewValue(formData.yearStarted)}</div>
          )}
        </div>

        {/* Years in Ministry */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            No. of Years in the Ministry
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="Enter years"
              value={formData.yearsInMinistry}
              onChange={(e) => handleChange("yearsInMinistry", e.target.value)}
              className="mt-1 w-full border-none bg-transparent focus:ring-0"
            />
          ) : (
            <div className="text-gray-800">{renderViewValue(formData.yearsInMinistry)}</div>
          )}
        </div>

        {/* Ordained */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Ordained
          </label>
          {isEditing ? (
            <Select
              value={formData.ordained}
              onValueChange={(val) => handleChange("ordained", val)}
            >
              <SelectTrigger
                className="mt-1 w-full border-none bg-transparent pr-8"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="text-gray-800">{renderViewValue(formData.ordained)}</div>
          )}
        </div>

        {/* Date of Ordination */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Date of Ordination
          </label>
          {isEditing ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "mt-1 w-full justify-between text-sm font-normal text-gray-800 rounded-lg",
                    !ordinationDate && "text-muted-foreground",
                    isEditing && "shadow-xs",
                  )}
                >
                  {ordinationDate
                    ? format(ordinationDate, "PPP")
                    : "Select date"}
                  <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={ordinationDate}
                  onSelect={setOrdinationDate}
                  disabled={(date) =>
                    date > new Date("2025-07-26") || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                  className="rounded-md border shadow-sm"
                />
              </PopoverContent>
            </Popover>
          ) : (
            <div className="text-gray-800">
              {ordinationDate ? (
                format(ordinationDate, "PPP")
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </div>
          )}
        </div>

        {/* Recommending Church */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Recommending Church
          </label>
          {isEditing ? (
            <input
              type="text"
              placeholder="Enter church name"
              value={formData.recommendingChurch}
              onChange={(e) =>
                handleChange("recommendingChurch", e.target.value)
              }
              className="mt-1 w-full border-none bg-transparent focus:ring-0"
            />
          ) : (
            <div className="text-gray-800">{renderViewValue(formData.recommendingChurch)}</div>
          )}
        </div>

        {/* CBMA Membership Status */}
        <div className={fieldStyle}>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            CBMA Membership Status
          </label>
          {isEditing ? (
            <Select
              value={formData.cbmaStatus}
              onValueChange={(val) => handleChange("cbmaStatus", val)}
            >
              <SelectTrigger
                className="mt-1 w-full border-none bg-transparent pr-8"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Regular</SelectItem>
                <SelectItem value="inactive">Associate</SelectItem>
                <SelectItem value="pending">Honorary</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="text-gray-800">{renderViewValue(formData.cbmaStatus)}</div>
          )}
        </div>
      </div>
    </div>
  );
}