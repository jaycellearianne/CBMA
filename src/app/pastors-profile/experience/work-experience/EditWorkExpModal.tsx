"use client";

import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditWorkExpForm from "./EditWorkExpForm";
import { WorkExperienceFormValues } from "./WorkExpFormFields";

interface EditWorkExpModalProps {
  defaultValues: WorkExperienceFormValues;
  onUpdateAction: (data: WorkExperienceFormValues) => void;
  triggerButton?: React.ReactNode;
}

export default function EditWorkExpModal({
  defaultValues,
  onUpdateAction,
  triggerButton,
}: EditWorkExpModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultTrigger = (
    <Button
      variant="outline"
      className="text-sm flex items-center gap-2"
    >
      <Pencil size={16} />
      Edit
    </Button>
  );

  return (
    <div className="bg-white">
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            {triggerButton || defaultTrigger}
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-none">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
                Edit Work Experience
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <EditWorkExpForm
                defaultValues={defaultValues}
                onSuccess={() => setOpen(false)}
                onSubmitAction={onUpdateAction}
              />
              <DrawerFooter className="p-0 mt-0 py-2">
                <DrawerClose asChild>
                  <Button
                    className="bg-[#A67B5B]/25 w-full text-black hover:bg-red-500"
                    variant="outline"
                    type="button"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {triggerButton || defaultTrigger}
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold text-[#6F4E37]">
                Edit Work Experience
              </DialogTitle>
            </DialogHeader>
            <EditWorkExpForm
              defaultValues={defaultValues}
              onSuccess={() => setOpen(false)}
              onSubmitAction={onUpdateAction}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
