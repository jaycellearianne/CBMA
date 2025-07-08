"use client";

import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

export interface Training {
  id: number;
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

interface TrainingsDataProps {
  trainings: Training[];
  onAddTrainingAction: () => void;
  onEditTrainingAction: (training: Training) => void;
}

export function TrainingsData({
  trainings,
  onAddTrainingAction,
  onEditTrainingAction,
}: TrainingsDataProps) {
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
        <h3 className="text-lg font-medium text-black">Trainings / Seminars</h3>
        <Button
          onClick={onAddTrainingAction}
          size="sm"
          className="bg-[#6F4E37] hover:bg-[#5D3E2A] text-white text-xs px-3 py-2 h-8 rounded-md"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Training
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
                  <h4 className="font-medium text-gray-900 leading-tight">
                    {training.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Sponsoring Agency: {training.sponsoringAgency}
                  </p>
                  <p className="text-sm text-gray-600">
                    Venue: {training.venue}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-[#6F4E37]">
                    <span>📅</span>
                    <span className="font-medium">
                      {formatDate(training.startDate)}
                      {training.startDate !== training.endDate &&
                        ` - ${formatDate(training.endDate)}`}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => onEditTrainingAction(training)}
                  variant="ghost"
                  size="sm"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No trainings recorded yet.</p>
            <Button
              onClick={onAddTrainingAction}
              className="mt-4 bg-[#6F4E37] hover:bg-[#5D3E2A] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add your first training
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
