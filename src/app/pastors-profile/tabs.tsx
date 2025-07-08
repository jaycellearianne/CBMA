"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalData from "./personal/PersonalData";
import TrainingData from "./training/TrainingData";
import { Training } from "./training/TrainingData";
import AddTrainingModal from "./training/AddTrainingModal";
import EditTrainingModal from "./training/EditTrainingModal";
import FamilyData from "./family/FamilyData";
import { FamilyMember } from "./family/FamilyData";
import AddFamilyModal from "./family/AddFamilyModal";
import EditFamilyModal from "./family/EditFamilyModal";
import DeleteFamilyModal from "./family/DeleteFamilyModal";

export default function PastorsProfileTabs() {
  const [isMobile, setIsMobile] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<FamilyMember | null>(
    null
  );

  const closeAddForms = () => {
    setShowAddModal(false);
    setShowAddForm(false);
  };

  const closeEditForms = () => {
    setShowEditModal(false);
    setShowEditForm(false);
    setEditingMember(null);
  };

  const closeDeleteForms = () => {
    setShowDeleteModal(false);
    setShowDeleteForm(false);
    setDeletingMember(null);
  };

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

  // FAMILY
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      name: "Mary Jean P. Arroz",
      relationship: "Spouse",
      education: "Master of Science in Civil Engineering",
      occupation: "Civil Engineer",
      birthDate: "March 15, 1995",
    },
    {
      id: 2,
      name: "Diadem Grace P. Arroz",
      relationship: "Daughter",
      education: "Bachelor of Science in Software Engineering",
      occupation: "Business Owner",
      birthDate: "September 23, 2002",
    },
        {
      id: 3,
      name: "Zairene Faith P. Arroz",
      relationship: "Daughter",
      education: "Senior High School",
      occupation: "Student",
      birthDate: "September 1, 2009",
    },
  ]);
  const handleAddMember = (member: Omit<FamilyMember, "id">) => {
    const newMember = {
      ...member,
      id: Date.now(),
    };
    setFamilyMembers([...familyMembers, newMember]);
    closeAddForms();
  };

  const handleEditMember = (member: FamilyMember) => {
    setFamilyMembers(
      familyMembers.map((m) => (m.id === member.id ? member : m))
    );
    closeEditForms();
  };

  const handleDeleteMember = (id: number) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id));
    closeDeleteForms();
  };

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
          <TrainingData
            trainings={trainings}
            onAddTrainingAction={() => setShowAddTraining(true)}
            onEditTrainingAction={openEditTraining}
          />
        </TabsContent>

        <TabsContent value="Experience" className="w-full">
          {/* Experience Content */}
        </TabsContent>

        <TabsContent value="Family" className="w-full">
          <FamilyData
            members={familyMembers}
            onAddMemberAction={() => {
              setShowAddModal(true);
              setShowAddForm(true);
            }}
            onEditMemberAction={(member) => {
              setEditingMember(member);
              setShowEditModal(true);
              setShowEditForm(true);
            }}
            onDeleteMemberAction={(member) => {
              setDeletingMember(member);
              setShowDeleteModal(true);
              setShowDeleteForm(true);
            }}
          />
        </TabsContent>

        <TabsContent value="Fees" className="w-full">
          {/* Fees Content */}
        </TabsContent>
      </Tabs>

      {/* TRAINING */}
      <AddTrainingModal
        open={showAddTraining}
        onSaveAction={handleAddTraining}
        onCancelAction={closeAddTraining}
      />

      {editingTraining && (
        <EditTrainingModal
          open={true}
          training={editingTraining}
          onSaveAction={handleEditTraining}
          onCancelAction={closeEditTraining}
        />
      )}

      {/* FAMILY */}
      <AddFamilyModal
        open={showAddModal}
        onCancelAction={closeAddForms}
        onSaveAction={handleAddMember}
      />

      {editingMember && (
          <EditFamilyModal
            open={showEditModal}
            member={editingMember}
            onSaveAction={handleEditMember}
            onCancelAction={closeEditForms}
          />
      )}

      {deletingMember && (
          <DeleteFamilyModal
            open={showDeleteModal}
            member={deletingMember}
            onDeleteAction={() => handleDeleteMember(deletingMember.id)}
            onCancelAction={closeDeleteForms}
          />
      )}
    </div>
  );
}
