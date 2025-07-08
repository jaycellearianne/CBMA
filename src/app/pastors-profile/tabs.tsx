"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalData from "./personal/PersonalData";
import { TrainingsData } from "./trainings/TrainingsData";
import AddTrainingModal from "./trainings/AddTrainingModal";
import EditTrainingModal from "./trainings/EditTrainingModal";

interface Training {
  id: number;
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
}

export default function PastorsProfileTabs() {
  const [isMobile, setIsMobile] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);

  const tabs = [
    { name: "Personal", value: "Personal" },
    { name: "Education", value: "Education" },
    { name: "Trainings", value: "Trainings" },
    { name: "Experience", value: "Experience" },
    { name: "Family", value: "Family" },
    { name: "Fees", value: "Fees" },
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample data (replace with API call or real data)
  useEffect(() => {
    setTrainings([
      {
        id: 1,
        title: "Church Growth and Discipleship Training",
        sponsoringAgency: "Christ-Centered Fellowship Network",
        venue: "CCFN HQ",
        startDate: "2025-03-04",
        endDate: "2025-03-04",
      },
    ]);
  }, []);

  const handleAddTraining = (data: Omit<Training, "id">) => {
    const newTraining: Training = {
      ...data,
      id: Date.now(),
    };
    setTrainings((prev) => [...prev, newTraining]);
    setShowAddTraining(false);
  };

  const handleEditTraining = (updated: Training) => {
    setTrainings((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setEditingTraining(null);
  };

  const handleDeleteTraining = (id: number) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id));
    setEditingTraining(null);
  };

  const openEditTraining = (training: Training) => {
    setEditingTraining(training);
  };

  const closeAddTraining = () => setShowAddTraining(false);
  const closeEditTraining = () => setEditingTraining(null);

  return (
    <div className="w-full overflow-x-auto">
      <Tabs defaultValue="Personal" className="w-full">
        <div className="w-full overflow-x-auto px-4">
          <TabsList className="flex min-w-max w-full gap-2 bg-white rounded-none">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:text-[#6F4E37] data-[state=active]:border-b-2 data-[state=active]:border-[#6F4E37] data-[state=active]:bg-amber-50 text-gray-600 hover:text-gray-800 px-4 py-3 text-sm font-medium transition-colors"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="Personal" className="w-full">
          <PersonalData />
        </TabsContent>

        <TabsContent value="Education" className="w-full">
          {/* Education Content */}
        </TabsContent>

        <TabsContent value="Trainings" className="w-full">
          <TrainingsData
            trainings={trainings}
            onAddTrainingAction={() => setShowAddTraining(true)}
            onEditTrainingAction={openEditTraining}
          />
        </TabsContent>

        <TabsContent value="Experience" className="w-full">
          {/* Experience Content */}
        </TabsContent>

        <TabsContent value="Family" className="w-full">
          {/* Family Content */}
        </TabsContent>

        <TabsContent value="Fees" className="w-full">
          {/* Fees Content */}
        </TabsContent>
      </Tabs>

      {/* Add Training Modal */}
      <AddTrainingModal
        open={showAddTraining}
        onSaveAction={handleAddTraining}
        onCancelAction={closeAddTraining}
      />

      {/* Edit Training Modal */}
      {editingTraining && (
        <EditTrainingModal
          open={true}
          training={editingTraining}
          onSaveAction={handleEditTraining}
          onDeleteAction={() => handleDeleteTraining(editingTraining.id)}
          onCancelAction={closeEditTraining}
        />
      )}
    </div>
  );
}
