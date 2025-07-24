"use client";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Training } from "./TrainingData";

interface DeleteTrainingFormProps {
  open: boolean;
  training: Training;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export function DeleteTrainingForm({
  training,
  onDeleteAction,
  onCancelAction,
}: DeleteTrainingFormProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4 px-1 mb-4">
      {/* DETAILS */}
      <div className="bg-red-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{training.title}</h4>
          </div>

          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Sponsoring Agency:</span>{" "}
              {training.sponsoringAgency}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <MapPin className="w-4 h-4" />
            <p className="text-sm text-gray-700">
              <span className="font-medium">Venue:</span> {training.venue}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Calendar className="w-4 h-4" />
            <p className="text-sm text-gray-700">
              <span>
                {formatDate(training.startDate)}
                {training.startDate !== training.endDate &&
                  ` - ${formatDate(training.endDate)}`}
              </span>
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
          Yes, Deactivate User
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
