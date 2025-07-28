"use client";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
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
import { Fee } from "./FeesData";
import EditFeesForm from "./EditFeesForm";

interface EditFeesModalProps {
  open: boolean;
  fee: Fee | null;
  onSaveAction: (feeData: {
    feeTitle: string;
    amount: string;
    status: string;
  }) => void;
  onCancelAction: () => void;
}

export default function EditFeesModal({
  open,
  fee,
  onSaveAction,
  onCancelAction,
}: EditFeesModalProps) {
  const [feeTitle, setfeeTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Paid");

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    if (fee) {
      setfeeTitle(fee.feeTitle);
      // Remove currency symbol and formatting for editing
      const cleanAmount = fee.amount.replace(/[₱,]/g, "");
      setAmount(cleanAmount);
      setStatus(fee.status);
    }
  }, [fee]);

  const formatAmount = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, "");

    // Split by decimal point
    const parts = numericValue.split(".");

    // Format the integer part with commas
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Limit decimal places to 2
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
    }

    return parts.join(".");
  };

  const handleAmountChange = (value: string) => {
    const formatted = formatAmount(value);
    setAmount(formatted);
  };

  const handleSave = () => {
    if (feeTitle && amount) {
      const formattedAmount = amount.startsWith("₱") ? amount : `₱${amount}`;
      onSaveAction({ feeTitle, amount: formattedAmount, status });
    }
  };

  const handleCancel = () => {
    if (fee) {
      setfeeTitle(fee.feeTitle);
      const cleanAmount = fee.amount.replace(/[₱,]/g, "");
      setAmount(cleanAmount);
      setStatus(fee.status);
    }
    onCancelAction();
  };

  const Separator = () => (
    <div className="border-t border-gray-200 my-4 w-full" />
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={onCancelAction}>
      <DrawerContent className="w-full max-w-none px-4 h-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold text-[#6F4E37]">
            Edit Fee Details
          </DrawerTitle>
          <DrawerDescription className="text-sm text-center text-gray-500">
            Update {fee?.feeTitle}'s information below.
          </DrawerDescription>
          <Separator />
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <EditFeesForm
            open={open}
            fee={fee}
            onSaveAction={onSaveAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DialogContent className="sm:max-w-[425px] max-h-[750px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#6F4E37]">
            Edit Family
          </DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-500">
            Update {fee?.feeTitle}'s information below.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <EditFeesForm
            open={open}
            fee={fee}
            onSaveAction={onSaveAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
