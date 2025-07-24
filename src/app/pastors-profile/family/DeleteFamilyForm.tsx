"use client";
import { FamilyMember } from "./FamilyData";
import { Button } from "@/components/ui/button";

interface DeleteFamilyFormProps {
  open: boolean;
  member: FamilyMember;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export default function DeleteFamilyForm({
  member,
  onDeleteAction,
  onCancelAction,
}: DeleteFamilyFormProps) {
  return (
    <div className="space-y-4 px-1 mb-4">
      {/* DETAILS */}
      <div className="bg-red-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{member.name}</h4>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {member.relationship}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Education:</span> {member.education}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Occupation:</span>{" "}
              {member.occupation}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Birth Date:</span>{" "}
              {member.birthDate}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          onClick={onDeleteAction}
          variant="destructive"
          className="w-full"
        >
          Yes, Delete Family Member
        </Button>

        <Button
          type="button"
          onClick={onCancelAction}
          className="border border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full text-black hover:bg-red-50"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
