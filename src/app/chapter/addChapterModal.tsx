"use client";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddChapterForm from "./addChapterForm";

interface AddChapterModalProps {
  pastors: { id: number; name: string }[];
  churches: { id: number; name: string; location: string }[];
}

export default function AddChapterModal({
  pastors,
  churches,
}: AddChapterModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div className="bg-white">
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center">
              <Plus size={24} color="white" /> Add Chapter
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-none h-[90vh] flex flex-col px-4">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
                Add Chapter
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto">
              <AddChapterForm
                pastors={pastors}
                churches={churches}
                onSuccess={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center">
              <Plus size={24} color="white" /> Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] flex flex-col">
            <DialogHeader className="items-center">
              <DialogTitle className="text-2xl font-bold text-[#6F4E37]">
                Add Chapter
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-1">
              <AddChapterForm
                pastors={pastors}
                churches={churches}
                onSuccess={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
