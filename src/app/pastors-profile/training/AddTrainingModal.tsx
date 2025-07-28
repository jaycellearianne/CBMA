"use client";
import AddTrainingForm from "./AddTrainingForm";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Training = {
  id: number;
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
};

interface AddTrainingModalProps {
  open: boolean;
  onSaveAction: (training: Omit<Training, "id">) => void;
  onCancelAction: () => void;
}

export default function AddTrainingModal({
  open,
  onSaveAction,
  onCancelAction,
}: AddTrainingModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSuccess = (data: Omit<Training, "id">) => {
    onSaveAction(data);
  };

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add Training
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Please fill out the form to register a new training data.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <AddTrainingForm
            onSaveAction={handleSuccess}
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
            Add Training
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Please fill out the form to register a new user.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <AddTrainingForm
            onSaveAction={handleSuccess}
            onCancelAction={onCancelAction}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
