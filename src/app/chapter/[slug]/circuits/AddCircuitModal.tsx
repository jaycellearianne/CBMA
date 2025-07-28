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

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center">
          <Plus size={24} color="white" /> Add Circuit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add New Circuit
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Please fill out the form to create a new circuit.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
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
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add New Circuit
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Please fill out the form to create a new circuit.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto">
          <AddCircuitForm
            pastors={mockPastors}
            churches={mockChurches}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
