"use client";

import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

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
          Add member
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
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <p
                    className="text-xs bg-amber-50 px-2 py-1 rounded inline-block border"
                    style={{ borderColor: "#6F4E37" }}
                  >
                    {member.relationship}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Education:</span>{" "}
                    {member.education}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Occupation:</span>{" "}
                    {member.occupation}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Birth Date:</span>{" "}
                    {member.birthDate}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditMemberAction(member)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteMemberAction(member)}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No family members recorded yet.</p>
            <Button
              onClick={onAddMemberAction}
              className="mt-4 bg-[#6F4E37] hover:bg-[#5D3E2A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add your first family member
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
