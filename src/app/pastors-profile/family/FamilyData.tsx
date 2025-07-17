"use client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface FamilyMember {
  id: number;
  name: string;
  relationship: string;
  education: string;
  occupation: string;
  birthDate: string;
  otherRelationship?: string;
}

interface FamilyDataProps {
  members: FamilyMember[];
  onAddMemberAction: () => void;
  onEditMemberAction: (member: FamilyMember) => void;
  onDeleteMemberAction: (member: FamilyMember) => void;
}

export default function FamilyData({
  members,
  onAddMemberAction,
  onEditMemberAction,
  onDeleteMemberAction,
}: FamilyDataProps) {
  const getRelationshipColor = (relationship: string) => {
    const colors: { [key: string]: string } = {
      Father: "bg-blue-100 text-blue-800",
      Mother: "bg-pink-100 text-pink-800",
      Brother: "bg-green-100 text-green-800",
      Sister: "bg-purple-100 text-purple-800",
      Son: "bg-orange-100 text-orange-800",
      Daughter: "bg-red-100 text-red-800",
      Spouse: "bg-yellow-100 text-yellow-800",
      Grandfather: "bg-indigo-100 text-indigo-800",
      Grandmother: "bg-rose-100 text-rose-800",
      Uncle: "bg-teal-100 text-teal-800",
      Aunt: "bg-cyan-100 text-cyan-800",
      Cousin: "bg-lime-100 text-lime-800",
    };
    return colors[relationship] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-black">Family Background</h3>
        <Button
          size="sm"
          onClick={onAddMemberAction}
          className="bg-[#6F4E37] hover:bg-[#5D3E2A] text-white text-xs px-3 py-2 h-8 rounded-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add a family member
        </Button>
      </div>

      <div className="space-y-4">
        {members.length > 0 ? (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  {/* NAME */}
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <Badge
                      className={`${getRelationshipColor(
                        member.relationship
                      )} text-xs font-medium px-2 py-1`}
                    >
                      {member.relationship}
                    </Badge>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-700">
                        Education:
                      </span>{" "}
                      {member.education}
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">
                        Occupation:
                      </span>{" "}
                      {member.occupation}
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">
                        Birth Date:
                      </span>{" "}
                      {member.birthDate}
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditMemberAction(member)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteMemberAction(member)}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No family members recorded yet.</p>
            {/* <Button
              onClick={onAddMemberAction}
              className="mt-4 bg-[#6F4E37] hover:bg-[#5D3E2A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add your first family member
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
}
