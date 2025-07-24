"use client";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
import AddEducationForm from "./AddEducationForm";

interface AddEducationModalProps {
  category?: "Elementary" | "High School" | "College" | "Graduate Studies";
  triggerButton?: React.ReactNode;
  onAddAction: (data: {
    course?: string;
    school: string;
    year: string;
    category: string;
  }) => void;
}

export default function AddEducationModal({
  category,
  triggerButton,
  onAddAction,
}: AddEducationModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultTrigger = (
    <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex items-center gap-2">
      <Plus size={24} /> {category ? `Add ${category}` : "Add Education"}
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
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add {category || "Education"}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Please fill out the form to add a new record.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <AddEducationForm
            onSubmitAction={(data) => {
              onAddAction(data);
              setOpen(false);
            }}
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
            Add {category || "Education"}
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Please fill out the form to add a new record.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <AddEducationForm
            onSubmitAction={(data) => {
              onAddAction(data);
              setOpen(false);
            }}
            onCancelAction={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
