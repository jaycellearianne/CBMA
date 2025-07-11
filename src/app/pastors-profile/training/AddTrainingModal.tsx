"use client";
import AddTrainingForm from "./AddTrainingForm";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
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

  return isMobile ? (
    <Drawer open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DrawerContent className="w-full max-w-none px-4">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
            Add Training
          </DrawerTitle>
        </DrawerHeader>
        <AddTrainingForm
          onSaveAction={handleSuccess}
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
            Add Training
          </DialogTitle>
        </DialogHeader>
        <AddTrainingForm
          onSaveAction={handleSuccess}
          onCancelAction={onCancelAction}
        />
      </DialogContent>
    </Dialog>
  );
}
