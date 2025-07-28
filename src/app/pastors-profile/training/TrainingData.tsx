"use client";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2, Calendar, MapPin } from "lucide-react";

export interface Training {
  id: number;
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
}

interface TrainingDataProps {
  trainings: Training[];
  onAddTrainingAction: () => void;
  onEditTrainingAction: (training: Training) => void;
  onDeleteTrainingAction: (training: Training) => void;
}

export default function TrainingData({
  trainings,
  onAddTrainingAction,
  onEditTrainingAction,
  onDeleteTrainingAction,
}: TrainingDataProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-black">Trainings / Seminars</h3>
        <Button
          onClick={onAddTrainingAction}
          size="sm"
          className="bg-[#6F4E37] hover:bg-[#5D3E2A] text-white text-xs px-3 py-2 h-8 rounded-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add a Training
        </Button>
      </div>

      <div className="space-y-4">
        {trainings.length > 0 ? (
          trainings.map((training) => (
            <div
              key={training.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  {/* TITLE */}
                  <div>
                    <h4 className="font-bold text-black leading-tight">
                      {training.title}
                    </h4>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Sponsoring Agency:</span>{" "}
                        {training.sponsoringAgency}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="w-4 h-4" />
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Venue:</span>{" "}
                        {training.venue}
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

                {/* BUTTONS */}
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditTrainingAction(training)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteTrainingAction(training)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No trainings recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
