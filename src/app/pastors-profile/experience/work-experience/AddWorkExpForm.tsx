// components/work-experience/AddWorkExpForm.tsx
"use client";

import WorkExpForm from "./WorkExpFormFields";
import { WorkExperienceFormValues } from "./WorkExpFormFields";

interface AddWorkExpFormProps {
  onSuccess?: () => void;
  onSubmitAction: (data: WorkExperienceFormValues) => void;
}

export default function AddWorkExpForm({
  onSuccess,
  onSubmitAction,
}: AddWorkExpFormProps) {
  return (
    <WorkExpForm
      onSubmitAction={onSubmitAction}
      onSuccess={onSuccess}
    />
  );
}
