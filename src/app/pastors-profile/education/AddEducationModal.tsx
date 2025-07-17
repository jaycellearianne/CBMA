"use client";

import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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

  return (
    <div className="bg-white">
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            {triggerButton || defaultTrigger}
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-none">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-left text-2xl font-bold text-[#6F4E37]">
                Add {category || "Education"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <AddEducationForm
                category={category}
                onSuccess={() => setOpen(false)}
                onSubmitAction={onAddAction}
              />
              <DrawerFooter className="p-0 mt-0 py-2">
                <DrawerClose asChild>
                  <Button
                    className="border-1 border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full max-w-none text-black hover:bg-red-50"
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
              <DialogTitle className="text-left text-2xl font-bold text-[#6F4E37]">
                Add {category || "Education"}
              </DialogTitle>
            </DialogHeader>
            <AddEducationForm
              category={category}
              onSuccess={() => setOpen(false)}
              onSubmitAction={onAddAction}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
