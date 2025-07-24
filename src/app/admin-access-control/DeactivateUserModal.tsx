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
import { toast } from "sonner";
import { User } from "./page";
import { ShieldMinus } from "lucide-react";
import DeactivateUserForm from "./DeactivateUserForm";

interface DeactivateUserModalProps {
  open: boolean;
  user: User | null;
  onOpenChangeAction: (open: boolean) => void;
  onConfirmAction: (userId: number) => Promise<void>;
}

export default function DeactivateUserModal({
  open,
  user,
  onOpenChangeAction,
  onConfirmAction,
}: DeactivateUserModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  if (!user) return null;

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );
  
  async function handleDeactivate() {
    try {
      if (user) {
        await onConfirmAction(user.id);
      }
      toast.success("User deactivated successfully");
      onOpenChangeAction(false);
    } catch (err) {
      toast.error("Failed to deactivate user");
    }
  }

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChangeAction}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader className="flex flex-col items-center gap-2">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldMinus className="w-7 h-7 text-red-600" />
          </div>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Deactivate User
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-red-600">
            Are you sure you want to deactivate this user?
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <DeactivateUserForm
            user={user}
            onConfirmAction={handleDeactivate}
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
            <ShieldMinus className="w-7 h-7 text-red-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            {user?.isActive ? "Deactivate User" : "Activate User"}
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-red-600">
            Are you sure you want to{" "}
            {user?.isActive ? "deactivate" : "activate"} this user?
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <DeactivateUserForm
            user={user}
            onConfirmAction={handleDeactivate}
            onCancelAction={() => onOpenChangeAction(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
