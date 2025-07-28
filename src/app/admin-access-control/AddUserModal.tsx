"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddUserForm from "./AddUserForm";

interface AddUserModalProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: (user: { name: string; email: string; role: string }) => void;
}

export default function AddUserModal({
  open,
  onOpenChangeAction,
  onSubmitAction,
}: AddUserModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const [mounted, setMounted] = useState(false);
  const [openState, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChangeAction}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add New User
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Please fill out the form to register a new user.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <AddUserForm
            open={open}
            onOpenChangeAction={onOpenChangeAction}
            onSubmitAction={onSubmitAction}
            onCancelAction={() => setOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onOpenChange={(val) => !val && onOpenChangeAction(false)}
    >
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Add New User
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Please fill out the form to register a new user.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <AddUserForm
            open={open}
            onOpenChangeAction={onOpenChangeAction}
            onSubmitAction={onSubmitAction}
            onCancelAction={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
