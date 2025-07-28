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
import { FamilyMember } from "./FamilyData";
import EditFamilyForm from "./EditFamilyForm";

interface EditFamilyModalProps {
  open: boolean;
  member: FamilyMember;
  onSaveAction: (member: FamilyMember) => void;
  onCancelAction: () => void;
}

export default function EditFamilyModal({
  open,
  member,
  onSaveAction,
  onCancelAction,
}: EditFamilyModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [formData, setFormData] = useState<FamilyMember>(member);

  useEffect(() => {
    setFormData(member);
  }, [member]);

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
            Edit Family Member
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Update {member.name}'s information below.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <EditFamilyForm
            open={open}
            member={formData}
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
            Edit Family
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Update {member.name}'s information below.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <EditFamilyForm
            open={open}
            member={formData}
            onSaveAction={onSaveAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
