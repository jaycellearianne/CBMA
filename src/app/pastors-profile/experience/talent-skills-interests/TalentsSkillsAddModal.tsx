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
import { Input } from "@/components/ui/input";

interface AddSkillsModalProps {
  triggerButton?: React.ReactNode;
  onAddAction: (item: string) => void;
}

export default function AddSkillsModal({
  triggerButton,
  onAddAction,
}: AddSkillsModalProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultTrigger = (
    <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex items-center gap-2">
      <Plus size={24} />
      Add
    </Button>
  );

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAddAction(inputValue.trim());
      setInputValue("");
      setOpen(false);
    }
  };

  return (
    <div className="">
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            {triggerButton || defaultTrigger}
          </DrawerTrigger>
          <DrawerContent className="w-full max-w-none">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-left text-2xl font-bold text-[#6F4E37]">
                Add skills, talents, or interests
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 space-y-4">
              <Input
                placeholder="E.g., Photography, Piano, Coding..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <DrawerFooter className="p-0 mt-0 py-2 space-y-2">
                <Button
                  className="w-full bg-[#6F4E37] hover:bg-[#A67B5B]"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <DrawerClose asChild>
                  <Button
                    className="w-full bg-gray-100 text-black hover:bg-gray-200"
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
                Add skills, talents, or interests
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="E.g., Photography, Piano, Coding..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-[#6F4E37] hover:bg-[#A67B5B]"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
