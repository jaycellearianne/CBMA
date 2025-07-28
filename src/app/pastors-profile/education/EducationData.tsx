"use client";
import { useState } from "react";
import AddEducationModal from "./AddEducationModal";
import { Button } from "@/components/ui/button";
import { CirclePlus, GraduationCap } from "lucide-react";
import EditEducationModal from "./EditEducationModal";

export interface Education {
  id: string;
  school: string;
  year: string;
  course?: string;
  category: "Elementary" | "High School" | "College" | "Graduate Studies";
}

export default function EducationData() {
  const [educationData, setEducationData] = useState<Education[]>([]);

  const elementary = educationData.find((edu) => edu.category === "Elementary");
  const highSchool = educationData.find(
    (edu) => edu.category === "High School"
  );
  const colleges = educationData.filter((edu) => edu.category === "College");
  const gradStudies = educationData.filter(
    (edu) => edu.category === "Graduate Studies"
  );

  const addEducation = (data: Omit<Education, "id">) => {
    if (
      data.category === "Elementary" &&
      educationData.some((edu) => edu.category === "Elementary")
    )
      return;
    if (
      data.category === "High School" &&
      educationData.some((edu) => edu.category === "High School")
    )
      return;
    const newEducation = { id: crypto.randomUUID(), ...data };
    setEducationData([...educationData, newEducation]);
  };

  const editEducation = (id: string, data: Omit<Education, "id">) => {
    setEducationData(
      educationData.map((edu) => (edu.id === id ? { ...edu, ...data } : edu))
    );
  };

  const deleteEducation = (id: string) => {
    setEducationData(educationData.filter((edu) => edu.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Education</h1>
      </div>
      {/* Add Elementary  */}
      {!elementary && (
        <AddEducationModal
          category="Elementary"
          triggerButton={
            <div className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start items-center gap-3 text-[#6F4E37]/75 text-base font-normal py-2 border-b border-[#D1C4B0] rounded-none hover:bg-transparent"
              >
                <CirclePlus className="text-[#6F4E37]/75" size={28} />
                Add elementary
              </Button>
            </div>
          }
          onAddAction={(data) =>
            addEducation({
              ...data,
              category: "Elementary",
            })
          }
        />
      )}
      {/* Elementary Info  */}
      {elementary && (
        <div
          key="elementary"
          className="flex items-center justify-between border-b border-[#6F4E37]/12 py-2 mx-0"
        >
          <div className="flex items-center justify-center">
            <GraduationCap size={32} className="mr-4" />
            <div className="flex flex-col g">
              <span className="text-base block">
                {elementary.school || "N/A"}
              </span>
              <span className="text-[#2C1F16]/80 text-xs">
                Year: {elementary.year || "N/A"}
              </span>
            </div>
          </div>
          <EditEducationModal
            education={elementary}
            onEditAction={(updated) =>
              editEducation(elementary.id, {
                school: updated.school,
                course: updated.course,
                year: updated.year,
                category: updated.category as
                  | "Elementary"
                  | "High School"
                  | "College"
                  | "Graduate Studies",
              })
            }
            onDeleteAction={deleteEducation}
          />
        </div>
      )}

      {!highSchool && (
        <AddEducationModal
          category="High School"
          triggerButton={
            <div className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start items-center gap-3 text-[#6F4E37]/75 text-base font-normal px-0 py-2 border-b border-[#D1C4B0] rounded-none hover:bg-transparent"
              >
                <CirclePlus className="text-[#6F4E37]/75" size={28} />
                Add high school
              </Button>
            </div>
          }
          onAddAction={(data) =>
            addEducation({
              ...data,
              category: "High School",
            })
          }
        />
      )}

      {highSchool && (
        <div
          key="highschool"
          className="flex items-center justify-between border-b border-[#6F4E37]/12 py-2 mx-0"
        >
          <div className="flex items-center justify-center">
            <GraduationCap size={32} className="mr-4" />
            <div className="flex flex-col">
              <span className="text-base block">
                {highSchool.school || "N/A"}
              </span>
              <span className="text-[#2C1F16]/80 text-xs">
                Year: {highSchool.year || "N/A"}
              </span>
            </div>
          </div>
          <EditEducationModal
            education={highSchool}
            onEditAction={(updated) =>
              editEducation(highSchool.id, {
                school: updated.school,
                course: updated.course,
                year: updated.year,
                category: updated.category as
                  | "Elementary"
                  | "High School"
                  | "College"
                  | "Graduate Studies",
              })
            }
            onDeleteAction={deleteEducation}
          />
        </div>
      )}

      {colleges.map((college) => (
        <div
          key={college.id}
          className="flex items-center justify-between border-b border-[#6F4E37]/12 py-2 mx-0"
        >
          <div className="flex items-center justify-center">
            <GraduationCap size={32} className="mr-4" />
            <div className="flex flex-col">
              <span className="text-base block">{college.school}</span>
              <span className="text-[#2C1F16]/80 text-xs">
                {college.course || "N/A"}
              </span>
              <span className="text-[#2C1F16]/80 text-xs">
                Year: {college.year}
              </span>
            </div>
          </div>
          <EditEducationModal
            education={college}
            onEditAction={(updated) =>
              editEducation(college.id, {
                school: updated.school,
                course: updated.course,
                year: updated.year,
                category: updated.category as
                  | "Elementary"
                  | "High School"
                  | "College"
                  | "Graduate Studies",
              })
            }
            onDeleteAction={deleteEducation}
          />
        </div>
      ))}

      {gradStudies.map((grad) => (
        <div
          key={grad.id}
          className="flex items-center justify-between border-b border-[#6F4E37]/12 py-2 mx-0"
        >
          <div className="flex items-center justify-center">
            <GraduationCap size={32} className="mr-4" />
            <div className="flex flex-col">
              <span className="text-base block">{grad.school}</span>
              <span className="text-[#2C1F16]/80 text-xs">
                {grad.course || "N/A"}
              </span>
              <span className="text-[#2C1F16]/80 text-xs">
                Year: {grad.year}
              </span>
            </div>
          </div>
          <EditEducationModal
            education={grad}
            onEditAction={(updated) =>
              editEducation(grad.id, {
                school: updated.school,
                course: updated.course,
                year: updated.year,
                category: updated.category as
                  | "Elementary"
                  | "High School"
                  | "College"
                  | "Graduate Studies",
              })
            }
            onDeleteAction={deleteEducation}
          />
        </div>
      ))}

      <AddEducationModal
        category="College"
        triggerButton={
          <div className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start items-center gap-3 text-[#6F4E37]/75 text-base font-normal px-0 py-2 border-b border-[#D1C4B0] rounded-none hover:bg-transparent"
            >
              <CirclePlus className="text-[#6F4E37]/75" size={28} />
              Add college
            </Button>
          </div>
        }
        onAddAction={(data) =>
          addEducation({
            ...data,
            category: "College",
          })
        }
      />

      <AddEducationModal
        category="Graduate Studies"
        triggerButton={
          <div className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-start items-center gap-3 text-[#6F4E37]/75 text-base font-normal px-0 py-2 border-b border-[#D1C4B0] rounded-none hover:bg-transparent"
            >
              <CirclePlus className="text-[#6F4E37]/75" size={28} />
              Add graduate studies
            </Button>
          </div>
        }
        onAddAction={(data) =>
          addEducation({
            ...data,
            category: "Graduate Studies",
          })
        }
      />
    </div>
  );
}
