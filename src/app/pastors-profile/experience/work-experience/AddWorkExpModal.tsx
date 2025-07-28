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
import AddWorkExpForm from "./AddWorkExpForm";

interface AddWorkExpModalProps {
  triggerButton?: React.ReactNode;
  onAddAction: (data: {
    church: string;
    address: string;
    position: string;
    status: "Full-Time" | "Part-Time";
    startDate: Date;
    endDate?: Date;
    isCurrent: boolean;
  }) => void;
}

export default function AddEducationModal({
  triggerButton,
  onAddAction,
}: AddWorkExpModalProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultTrigger = (
    <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex items-center gap-2">
      <Plus size={24} />
    </Button>
  );

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
                Add
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <AddWorkExpForm
                onSuccess={() => setOpen(false)}
                onSubmitAction={(data) =>
                  onAddAction({
                    ...data,
                    startDate: new Date(data.startDate),
                    endDate: data.endDate ? new Date(data.endDate) : undefined,
                  })
                }
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
              <DialogTitle className="text-left text-2xl font-bold text-[#6F4E37]">
                Add
              </DialogTitle>
            </DialogHeader>
            <AddWorkExpForm
              onSuccess={() => setOpen(false)}
              onSubmitAction={(data) =>
                onAddAction({
                  ...data,
                  startDate: new Date(data.startDate),
                  endDate: data.endDate ? new Date(data.endDate) : undefined,
                })
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
