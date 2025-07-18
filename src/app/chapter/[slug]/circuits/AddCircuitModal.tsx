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
import AddCircuitForm from "./AddCircuitForm";

export default function AddPastorModal() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // MOCK DATA
  const mockPastors = [
    { id: 1, name: "Pastor John Doe" },
    { id: 2, name: "Pastor Jane Smith" },
    { id: 3, name: "Pastor Luke Sky" },
  ];

  const mockChurches = [
    { id: 101, name: "Grace Community Church", location: "Downtown" },
    { id: 102, name: "Faith Baptist Church", location: "Uptown" },
    { id: 103, name: "Hope Revival Church", location: "Suburbs" },
  ];

  return (
    <>
      <div className="bg-white ">
        {isMobile ? (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center">
                <Plus size={24} color="white" /> Add Circuit
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-full max-w-none px-4 h-full flex flex-col">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
                  Add Circuit
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-2">
                <AddCircuitForm
                  pastors={mockPastors}
                  churches={mockChurches}
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
                <Plus size={24} color="white" /> Add Circuit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="items-center">
                <DialogTitle className="text-2xl items-center justify-center font-bold text-[#6F4E37]">
                  Add Circuit
                </DialogTitle>
              </DialogHeader>
              <AddCircuitForm
                pastors={mockPastors}
                churches={mockChurches}
                onSuccess={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}
