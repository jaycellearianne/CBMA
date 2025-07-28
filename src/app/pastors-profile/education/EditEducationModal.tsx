"use client";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerButton || defaultTrigger}</DrawerTrigger>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
            Edit {education.category}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Update the education details below.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <EditEducationForm
            education={education}
            onSuccess={() => setOpen(false)}
            onSubmitAction={onEditAction}
            onCancelAction={() => setOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Edit {education.category}
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Update the education details below.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <EditEducationForm
            education={education}
            onSuccess={() => setOpen(false)}
            onSubmitAction={onEditAction}
            onCancelAction={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
