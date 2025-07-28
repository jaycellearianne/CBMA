"use client";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { AlertTriangle, X } from "lucide-react";
import { Fee } from "./FeesData";
import DeleteFeesForm from "./DeleteFeesForm";

interface DeleteFeesModalProps {
  open: boolean;
  fee: Fee | null;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}

export default function DeleteFeesModal({
  open,
  fee,
  onConfirmAction,
  onCancelAction,
}: DeleteFeesModalProps) {
  if (!fee) return null;
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onCancelAction()}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <DrawerTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Confirm Deletion
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-red-600">
            This action cannot be undone
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <DeleteFeesForm
            open={open}
            fee={fee}
            onConfirmAction={onConfirmAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-red-600">
            This action cannot be undone
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <DeleteFeesForm
            open={open}
            fee={fee}
            onConfirmAction={onConfirmAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
