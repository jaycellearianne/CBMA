"use client";
import TalentsSkillsAddModal from "./TalentsSkillsAddModal";
import { Button } from "@/components/ui/button";
import { Star, CirclePlus, X, Pencil } from "lucide-react";
import { useState } from "react";

export default function TalentsSkillsInterests() {
  const [items, setItems] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddItem = (newItem: string) => {
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 mx-5 mb-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-black">
          Talents, Skills & Interests
        </h3>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#6F4E37] hover:bg-[#F5F5F5] "
          >
            <Pencil size={16} />
            {isEditing ? "Save" : "Edit"}
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">
            No talents, skills or interests added yet
          </p>
          <p className="text-gray-500 mb-4">
            Share your unique abilities and passions with the community.
          </p>
          <TalentsSkillsAddModal
            triggerButton={
              <Button
                className="text-[#6F4E37] font-medium border border-lg border-[#6F4E37] hover:bg-[#8B5A2B] px-4"
                variant="ghost"
              >
                <CirclePlus className="mr-2" size={24} />
                Add Talents, Skills or Interests
              </Button>
            }
            onAddAction={handleAddItem}
          />
        </div>
      ) : (
        <div className="space-y-4 p-4 rounded-lg border border-[#D8CFC7] bg-white shadow-sm  relative">
          <div className="flex flex-wrap gap-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-[#F5F5F5] px-4 py-1 rounded-full flex items-center justify-between text-[#3E2A1D] text-sm"
              >
                {item}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-gray-500 hover:text-red-500 ml-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <TalentsSkillsAddModal
              triggerButton={
                <Button
                  className="text-[#6F4E37] font-medium  hover:bg-[#8B5A2B] px-4"
                  variant="ghost"
                >
                  <CirclePlus className="" size={24} />
                  Add interests, skills or talents
                </Button>
              }
              onAddAction={handleAddItem}
            />
          </div>
        </div>
      )}
    </div>
  );
}
