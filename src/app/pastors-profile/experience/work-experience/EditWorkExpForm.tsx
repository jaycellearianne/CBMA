// components/work-experience/EditWorkExpForm.tsx
"use client";

import WorkExpForm, { WorkExperienceFormValues } from "./WorkExpFormFields";

interface EditWorkExpFormProps {
  defaultValues: WorkExperienceFormValues;
  onSubmitAction: (data: WorkExperienceFormValues) => void;
  onSuccess?: () => void;
}

export default function EditWorkExpForm({
  defaultValues,
  onSubmitAction,
  onSuccess,
}: EditWorkExpFormProps) {
  return (
    <WorkExpForm
      defaultValues={defaultValues}
      onSubmitAction={onSubmitAction}
      onSuccess={onSuccess}
      submitLabel="Update"
    />
  );
}
