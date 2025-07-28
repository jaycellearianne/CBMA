"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalData from "./personal/PersonalData";
import EducationData from "./education/EducationData";
import TrainingData, { Training } from "./training/TrainingData";
import AddTrainingModal from "./training/AddTrainingModal";
import EditTrainingModal from "./training/EditTrainingModal";
import DeleteTrainingModal from "./training/DeleteTrainingModal";
import FamilyData, { FamilyMember } from "./family/FamilyData";
import AddFamilyModal from "./family/AddFamilyModal";
import EditFamilyModal from "./family/EditFamilyModal";
import ExperienceData from "./experience/ExperienceData";
import EducationData from "./education/EducationData";
import DeleteFamilyModal from "./family/DeleteFamilyModal";
import { Education } from "./education/EducationData";
import AddEducationModal from "./education/AddEducationModal";
import EditEducationModal from "./education/EditEducationModal";
import DeleteEducationModal from "./education/DeleteEducationModal";
import FeesData, { Fee } from "./fees/FeesData";
import AddFeesModal from "./fees/AddFeesModal";
import EditFeesModal from "./fees/EditFeesModal";
import DeleteFeesModal from "./fees/DeleteFeesModal";

export default function PastorsProfileTabs() {
  const tabs = [
    { name: "Personal", value: "Personal" },
    { name: "Education", value: "Education" },
    { name: "Trainings", value: "Trainings" },
    { name: "Experience", value: "Experience" },
    { name: "Family", value: "Family" },
    { name: "Fees", value: "Fees" },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // EDUCATION STATES
  const [educations, setEducations] = useState<Education[]>([]);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [deletingEducation, setDeletingEducation] = useState<Education | null>(
    null
  );

  // TRAINING STATES
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [deletingTraining, setDeletingTraining] = useState<Training | null>(
    null
  );

  // EXPERIENCE STATES

  // FAMILY STATES
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [showEditFamily, setShowEditFamily] = useState(false);
  const [showDeleteFamily, setShowDeleteFamily] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<FamilyMember | null>(
    null
  );

  // FEES STATES
  const [fees, setFees] = useState<Fee[]>([]);
  const [showAddFee, setShowAddFee] = useState(false);
  const [editingFee, setEditingFee] = useState<Fee | null>(null);
  const [deletingFee, setDeletingFee] = useState<Fee | null>(null);

  // EDUCATION HANDLERS
  const handleAddEducation = {};

  const handleEditEducation = {};

  const handleDeleteEducation = {};

  // TRAINING MOCK
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

  // TRAINING HANDLERS
  const handleAddTraining = (data: Omit<Training, "id">) => {
    setTrainings([...trainings, { ...data, id: Date.now() }]);
    setShowAddTraining(false);
  };

  const handleEditTraining = (updated: Training) => {
    setTrainings(trainings.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTraining(null);
  };

  const handleDeleteTraining = (id: number) => {
    setTrainings(trainings.filter((t) => t.id !== id));
    setDeletingTraining(null);
  };

  // EXPERIENCE HANDLERS
  const handleAddExperience = {};

  const handleEditExperience = {};


  const handleDeleteExperience = {};

  // FAMILY HANDLERS
  const handleAddMember = (member: Omit<FamilyMember, "id">) => {
    setFamilyMembers([...familyMembers, { ...member, id: Date.now() }]);
    setShowAddFamily(false);
  };

  const handleEditMember = (member: FamilyMember) => {
    setFamilyMembers(
      familyMembers.map((m) => (m.id === member.id ? member : m))
    );
    setShowEditFamily(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: number) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id));
    setShowDeleteFamily(false);
    setDeletingMember(null);
  };

  // FEES HANDLERS
  const handleAddFees = (fee: Omit<Fee, "id">) => {
    setFees([...fees, { ...fee, id: Date.now() }]);
    setShowAddFee(false);
  };

  const handleEditFees = (updated: Partial<Fee>) => {
    if (!editingFee) return;
    setFees(
      fees.map((fee) =>
        fee.id === editingFee.id ? { ...fee, ...updated } : fee
      )
    );
    setEditingFee(null);
  };

  const handleDeleteFees = () => {
    if (!deletingFee) return;
    setFees(fees.filter((fee) => fee.id !== deletingFee.id));
    setDeletingFee(null);
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

        <TabsContent value="Personal">
          <PersonalData />
        </TabsContent>

        <TabsContent value="Education">
          <EducationData />
        </TabsContent>

        <TabsContent value="Trainings">
          <TrainingData
            trainings={trainings}
            onAddTrainingAction={() => setShowAddTraining(true)}
            onEditTrainingAction={(t) => setEditingTraining(t)}
            onDeleteTrainingAction={(t) => setDeletingTraining(t)}
          />
        </TabsContent>

        <TabsContent value="Experience" className="w-full">
          <ExperienceData />
        </TabsContent>

        <TabsContent value="Family">
          <FamilyData
            members={familyMembers}
            onAddMemberAction={() => setShowAddFamily(true)}
            onEditMemberAction={(m) => {
              setEditingMember(m);
              setShowEditFamily(true);
            }}
            onDeleteMemberAction={(m) => {
              setDeletingMember(m);
              setShowDeleteFamily(true);
            }}
          />
        </TabsContent>

        <TabsContent value="Fees">
          <FeesData
            fees={fees}
            onAddFeeAction={() => setShowAddFee(true)}
            onEditFeeAction={(fee) => setEditingFee(fee)}
            onDeleteFeeAction={(fee) => setDeletingFee(fee)}
          />
        </TabsContent>
      </Tabs>

      {/* TRAINING */}
      <AddTrainingModal
        open={showAddTraining}
        onSaveAction={handleAddTraining}
        onCancelAction={() => setShowAddTraining(false)}
      />
      {editingTraining && (
        <EditTrainingModal
          open={true}
          training={editingTraining}
          onSaveAction={handleEditTraining}
          onCancelAction={() => setEditingTraining(null)}
        />
      )}
      {deletingTraining && (
        <DeleteTrainingModal
          open={true}
          training={deletingTraining}
          onDeleteAction={() => handleDeleteTraining(deletingTraining.id)}
          onCancelAction={() => setDeletingTraining(null)}
        />
      )}

      {/* FAMILY */}
      <AddFamilyModal
        open={showAddFamily}
        onSaveAction={handleAddMember}
        onCancelAction={() => setShowAddFamily(false)}
      />
      {editingMember && (
        <EditFamilyModal

          open={showEditFamily}
          member={editingMember}
          onSaveAction={handleEditMember}
          onCancelAction={() => setShowEditFamily(false)}
        />
      )}
      {deletingMember && (
        <DeleteFamilyModal

          open={showDeleteFamily}
          member={deletingMember}
          onDeleteAction={() => handleDeleteMember(deletingMember.id)}
          onCancelAction={() => setShowDeleteFamily(false)}
        />
      )}

      {/* FEES */}
      <AddFeesModal
        open={showAddFee}
        onSaveAction={handleAddFees}
        onCancelAction={() => setShowAddFee(false)}
      />
      {editingFee && (
        <EditFeesModal
          open={true}
          fee={editingFee}
          onSaveAction={handleEditFees}
          onCancelAction={() => setEditingFee(null)}
        />
      )}
      {deletingFee && (
        <DeleteFeesModal
          open={true}
          fee={deletingFee}
          onConfirmAction={handleDeleteFees}
          onCancelAction={() => setDeletingFee(null)}
        />
      )}
    </div>
  );
}
