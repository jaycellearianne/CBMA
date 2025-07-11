"use client";
import { useEffect, useState } from "react";
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
import EditTrainingForm from "./EditTrainingForm";
import { Training } from "./TrainingData";

interface EditTrainingModalProps {
  open: boolean;
  training: Training;
  onSaveAction: (training: Training) => void;
  onCancelAction: () => void;
}

export default function EditTrainingModal({
  open,
  training,
  onSaveAction,
  onCancelAction,
}: EditTrainingModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isMobile ? (
    <Drawer open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DrawerContent className="w-full max-w-none px-4">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
            Edit Training
          </DrawerTitle>
        </DrawerHeader>
        <EditTrainingForm
          open={true}
          training={training}
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
            Edit Training
          </DialogTitle>
        </DialogHeader>
        <EditTrainingForm
          open={true}
          training={training}
          onSaveAction={onSaveAction}
          onCancelAction={onCancelAction}
        />
      </DialogContent>
    </Dialog>
  );
}
