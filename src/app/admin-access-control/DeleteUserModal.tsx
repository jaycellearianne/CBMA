"use client";
import { useMediaQuery } from "react-responsive";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
import { AlertTriangle } from "lucide-react";
import DeleteUserForm from "./DeleteUserForm";

interface DeleteUserModalProps {
  open: boolean;
  user: User | null;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: () => void;
}

export default function DeleteUserModal({
  open,
  user,
  onOpenChangeAction,
  onSubmitAction,
}: DeleteUserModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  if (!user) return null;

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChangeAction}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader className="flex flex-col items-center gap-2">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Confirm User Deletion
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-red-600">
            This action cannot be undone. Are you sure you want to delete this
            user?
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <DeleteUserForm
            user={user}
            onDeleteAction={onSubmitAction}
            onCancelAction={() => onOpenChangeAction(false)}
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
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Confirm User Deletion
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-red-600">
            This action cannot be undone. Are you sure you want to delete this
            user?
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <DeleteUserForm
            user={user}
            onDeleteAction={onSubmitAction}
            onCancelAction={() => onOpenChangeAction(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
