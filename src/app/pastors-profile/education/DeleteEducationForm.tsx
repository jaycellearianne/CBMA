"use client";
import { Button } from "@/components/ui/button";

interface DeleteEducationFormProps {
  id: number;
  school: string;
  year: string;
  course?: string;
  category: string;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export default function DeleteEducationForm({
  school,
  year,
  course,
  category,
  onDeleteAction,
  onCancelAction,
}: DeleteEducationFormProps) {
  return (
    <div className="space-y-4 px-1 mb-4">
      {/* DETAILS */}
      <div className="bg-red-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold text-black">{school || "N/A"}</h4>
          {/* edit */}
          <span className="text-sm text-gray-700">
            {category}
          </span>
        </div>

        {course && (
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Course:</span> {course}
            </p>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Year:</span> {year || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          onClick={onDeleteAction}
          variant="destructive"
          className="w-full"
        >
          Yes, Delete Education Record
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
