"use client";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center">
          <Plus size={24} color="white" /> Add Chapter
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add New Chapter
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Please fill out the form to create a new chapter.
          </DrawerDescription>
          <Separator />
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
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add New Chapter
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Please fill out the form to create a new chapter.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto">
          <AddChapterForm
            pastors={pastors}
            churches={churches}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
