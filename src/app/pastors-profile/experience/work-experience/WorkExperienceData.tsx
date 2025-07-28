"use client";

import { useState } from "react";
import { CirclePlus, Briefcase, Pencil, MapPin } from "lucide-react";
import AddWorkExpModal from "./AddWorkExpModal";
import EditWorkExpModal from "./EditWorkExpModal";
import { Button } from "@/components/ui/button";
import { WorkExperienceFormValues } from "./WorkExpFormFields";

interface WorkExperience {
  id: string;
  church: string;
  address: string;
  position: string;
  status: "Full-time" | "Part-time";
  inclusiveDates: {
    start: {
      month: string;
      year: string;
    };
    end:
      | {
          month: string;
          year: string;
        }
      | "Present";
  };
}

export default function WorkExperienceData() {
  const [workExperienceData, setWorkExperienceData] = useState<
    WorkExperience[]
  >([]);
  const [editingItem, setEditingItem] = useState<WorkExperience | null>(null);

  const addWorkExperience = (data: {
    church: string;
    address: string;
    position: string;
    status: "Full-Time" | "Part-Time";
    startDate: string | Date;
    endDate?: string | Date;
    isCurrent: boolean;
  }) => {
    const parsedStartDate =
      typeof data.startDate === "string"
        ? new Date(data.startDate)
        : data.startDate;

    const startMonth = parsedStartDate.toLocaleString("default", {
      month: "short",
    });
    const startYear = parsedStartDate.getFullYear().toString();

    let end: WorkExperience["inclusiveDates"]["end"];

    if (data.isCurrent) {
      end = "Present";
    } else if (data.endDate) {
      const parsedEndDate =
        typeof data.endDate === "string"
          ? new Date(data.endDate)
          : data.endDate;

      end = {
        month: parsedEndDate.toLocaleString("default", { month: "short" }),
        year: parsedEndDate.getFullYear().toString(),
      };
    } else {
      end = "Present";
    }

    const newWorkExperience: WorkExperience = {
      id: crypto.randomUUID(),
      church: data.church,
      address: data.address,
      position: data.position,
      status: data.status === "Full-Time" ? "Full-time" : "Part-time",
      inclusiveDates: {
        start: {
          month: startMonth,
          year: startYear,
        },
        end,
      },
    };

    setWorkExperienceData((prev) => [...prev, newWorkExperience]);
  };

  const updateWorkExperience = (updated: WorkExperienceFormValues) => {
    if (!editingItem) return;

    const parsedStartDate = new Date(updated.startDate);
    const startMonth = parsedStartDate.toLocaleString("default", {
      month: "short",
    });
    const startYear = parsedStartDate.getFullYear().toString();

    let end: WorkExperience["inclusiveDates"]["end"];

    if (updated.isCurrent) {
      end = "Present";
    } else if (updated.endDate) {
      const parsedEndDate = new Date(updated.endDate);
      end = {
        month: parsedEndDate.toLocaleString("default", { month: "short" }),
        year: parsedEndDate.getFullYear().toString(),
      };
    } else {
      end = "Present";
    }

    setWorkExperienceData((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              church: updated.church,
              address: updated.address,
              position: updated.position,
              status:
                updated.status === "Full-Time" ? "Full-time" : "Part-time",
              inclusiveDates: {
                start: { month: startMonth, year: startYear },
                end,
              },
            }
          : item
      )
    );

    setEditingItem(null);
  };

//   const deleteWorkExperience = (id: string) => {
//   setWorkExperienceData((prev) =>
//     prev.filter((experience) => experience.id !== id)
//   );
// };

  const formatDates = (dates: WorkExperience["inclusiveDates"]) => {
    const start = `${dates.start.month} ${dates.start.year}`;
    const end =
      dates.end === "Present"
        ? "Present"
        : `${dates.end.month} ${dates.end.year}`;
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-4 mx-5">
      <h3 className="text-lg font-semibold text-[#2C1F16]">Work Experience</h3>

      {workExperienceData.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <AddWorkExpModal
            triggerButton={
              <Button className="text-[#6F4E37] font-medium border border-lg border-[#6F4E37] hover:bg-[#8B5A2B]" variant="ghost">
                <CirclePlus className="mr-2" size={18} />
                Add your first work experience
              </Button>
            }
            onAddAction={addWorkExperience}
          />
        </div>
      ) : (
        <>
          {workExperienceData.map((experience) => {
            const defaultValues: WorkExperienceFormValues = {
              church: experience.church,
              address: experience.address,
              position: experience.position,
              status:
                experience.status === "Full-time" ? "Full-Time" : "Part-Time",
              startDate: `${experience.inclusiveDates.start.month} ${experience.inclusiveDates.start.year}`,
              endDate:
                experience.inclusiveDates.end === "Present"
                  ? undefined
                  : `${experience.inclusiveDates.end.month} ${experience.inclusiveDates.end.year}`,
              isCurrent: experience.inclusiveDates.end === "Present",
            };

            return (
              <div
                key={experience.id}
                className="p-4 rounded-lg border border-[#D8CFC7] bg-white shadow-sm space-y-2 relative"
              >
                <div className="text-lg font-semibold text-[#3E2A1D]">
                  {experience.church}
                </div>

                <div className="text-sm text-[#5C4433] flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#A78B7D]" />
                    {experience.address}
                  </span>
                </div>

                <div className="text-sm text-[#5C4433] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#A78B7D]" />
                  {experience.position}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="bg-[#A78B7D] text-white text-xs px-3 py-1 rounded-full capitalize">
                    {experience.status}
                  </span>
                  <span className="bg-[#A78B7D]/30 text-[#3E2A1D] text-xs px-3 py-1 rounded-full">
                    {formatDates(experience.inclusiveDates)}
                  </span>
                </div>

                <EditWorkExpModal
                  defaultValues={defaultValues}
                  onUpdateAction={updateWorkExperience}
                  triggerButton={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-[#6F4E37] hover:text-[#8B5A2B]"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  }
                />
              </div>
            );
          })}

          <AddWorkExpModal
            triggerButton={
              <Button
                variant="ghost"
                className="w-full border border-dashed border-gray-300 text-[#6F4E37] hover:bg-brown-50 font-normal py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                <CirclePlus className="h-4 w-4 text-[#5A7CA80]" />
                Add work experience
              </Button>
            }
            onAddAction={addWorkExperience}
          />
        </>
      )}
    </div>
  );
}
