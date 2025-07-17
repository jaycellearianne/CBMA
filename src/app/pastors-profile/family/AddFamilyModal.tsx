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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

  return isMobile ? (
    <Drawer open={open} onOpenChange={onCancelAction}>
      <DrawerContent className="w-full max-w-none px-4">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold text-gray-900">
            Add Family Member
          </DrawerTitle>
        </DrawerHeader>
        <AddFamilyForm
          open={open}
          onSaveAction={onSaveAction}
          onCancelAction={onCancelAction}
        />
        <DrawerFooter className="p-0 mt-0 py-2">
          <DrawerClose asChild>
            <Button
              className="border-1 border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full max-w-none text-black hover:bg-red-50"
              variant="default"
              type="button"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DialogContent>
        <DialogHeader className="items-center">
          <DialogTitle className="text-2xl items-center justify-center font-bold text-[#6F4E37]">
            Add Family Member
          </DialogTitle>
        </DialogHeader>
        <AddFamilyForm
          open={open}
          onSaveAction={handleSuccess}
          onCancelAction={onCancelAction}
        />
      </DialogContent>
    </Dialog>
  );
}
