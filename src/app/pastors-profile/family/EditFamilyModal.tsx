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

  return isMobile ? (
    <Drawer open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DrawerContent className="w-full max-w-none px-4">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-[#6F4E37]">
            Edit Family Member
          </DrawerTitle>
        </DrawerHeader>
        <EditFamilyForm
          open={open}
          member={formData}
          onSaveAction={onSaveAction}
          onCancelAction={onCancelAction}
        />
        <DrawerFooter className="p-0 mt-0 py-2">
          <DrawerClose asChild>
            <Button
              className="bg-[#A67B5B]/25 w-full max-w-none text-black hover:bg-red-500 p-0"
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
            Edit Family
          </DialogTitle>
        </DialogHeader>
        <EditFamilyForm
          open={open}
          member={formData}
          onSaveAction={onSaveAction}
          onCancelAction={onCancelAction}
        />
      </DialogContent>
    </Dialog>
  );
}
