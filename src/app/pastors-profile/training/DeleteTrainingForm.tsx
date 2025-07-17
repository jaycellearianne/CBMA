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
    <div className="bg-white">
      <div className="space-y-4">
        {/* Confirmation Message */}
        <p className="text-lg">
          Are you sure you want to delete this training record?
        </p>

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

        {/* Buttons */}
        <div className="flex">
          <Button
            variant="destructive"
            onClick={onDeleteAction}
            className="w-full"
          >
            Yes, Delete Training
          </Button>
        </div>
      </div>
    </div>
  );
}
