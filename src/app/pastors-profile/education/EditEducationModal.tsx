"use client";

import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
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
import EditEducationForm from "./EditEducationForm";

interface EditEducationModalProps {
  education: {
    id: string;
    course?: string;
    school: string;
    year: string;
    category: "Elementary" | "High School" | "College" | "Graduate Studies";
  };
  triggerButton?: React.ReactNode;
  onEditAction: (data: {
    id: string;
    course?: string;
    school: string;
    year: string;
    category: string;
  }) => void;
  onDeleteAction: (id: string) => void;
}

export default function EditEducationModal({
  education,
  triggerButton,
  onEditAction,
  onDeleteAction,
}: EditEducationModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultTrigger = (
    <Button variant="ghost" className="flex items-center gap-2 text-sm">
      <SquarePen size={18} />
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
            <DrawerHeader>
              <DrawerTitle className="text-left text-2xl font-bold text-[#6F4E37]">
                Edit {education.category}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <EditEducationForm
                education={education}
                onSuccess={() => setOpen(false)}
                onSubmitAction={onEditAction}
                onDeleteAction={onDeleteAction}
              />
              <DrawerFooter className="p-0 mt-0 py-2">
                <DrawerClose asChild></DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {triggerButton || defaultTrigger}
          </DialogTrigger>
          <DialogContent className="p-6 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold text-[#6F4E37] text-left">
                Edit {education.category}
              </DialogTitle>
            </DialogHeader>
            <EditEducationForm
              education={education}
              onSuccess={() => setOpen(false)}
              onSubmitAction={onEditAction}
              onDeleteAction={(id) => {
                console.log("Delete:", id);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
