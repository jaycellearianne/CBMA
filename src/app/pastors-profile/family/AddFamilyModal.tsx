"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMediaQuery } from "react-responsive";
import AddFamilyForm from "./AddFamilyForm";
import { FamilyMember } from "./FamilyData";

interface AddFamilyModalProps {
  open: boolean;
  onSaveAction: (member: FamilyMember) => void;
  onCancelAction: () => void;
}

export default function AddFamilyModal({
  open,
  onSaveAction,
  onCancelAction,
}: AddFamilyModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FamilyMember>({
    id: 0, // Default id value
    name: "",
    relationship: "",
    education: "",
    occupation: "",
    birthDate: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.relationship &&
      formData.education &&
      formData.occupation &&
      formData.birthDate
    ) {
      onSaveAction(formData);
      setFormData({
        id: 0, // Reset id to default value
        name: "",
        relationship: "",
        education: "",
        occupation: "",
        birthDate: "",
      });
    }
  };

  function handleSuccess(family: FamilyMember): void {
    console.log("Family successfully added:", family);
    onCancelAction();
  }

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={onCancelAction}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add Family Member
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Please fill out the form to register a new family member.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <AddFamilyForm
            open={open}
            onSaveAction={onSaveAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add Family Member
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Please fill out the form to register a new family member.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <AddFamilyForm
            open={open}
            onSaveAction={onSaveAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
