"use client";
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
import { User } from "./page";
import EditUserForm from "./EditUserForm";

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onOpenChangeAction: (open: boolean) => void;
  onSaveAction: (updatedUser: User) => void;
}

export default function EditUserModal({
  open,
  user,
  onOpenChangeAction,
  onSaveAction,
}: EditUserModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  if (!user) return null;

  const handleCancel = () => {
    onOpenChangeAction(false);
  };

  const handleSave = (updatedUser: User) => {
    onSaveAction(updatedUser);
    onOpenChangeAction(false);
  };

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChangeAction}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
            Edit User
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Update the user's information below.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <EditUserForm
            user={user}
            onCancelAction={handleCancel}
            onSaveAction={handleSave}
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
            Edit User
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Update the user's information below.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <EditUserForm
            user={user}
            onCancelAction={handleCancel}
            onSaveAction={handleSave}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
