"use client";

import { Fee } from "./FeesData"; // adjust this import based on your structure
import { Button } from "@/components/ui/button";

interface DeleteFeesFormProps {
  open: boolean;
  fee: Fee;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}

export default function DeleteFeesForm({
  fee,
  onConfirmAction,
  onCancelAction,
}: DeleteFeesFormProps) {
  return (
    <div className="space-y-4 px-1 mb-4">
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">{fee.feeTitle}</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Amount:</span> {fee.amount}
            </p>
            <p>
              <span className="font-medium">Year:</span> {fee.year}
            </p>
            <p>
              <span className="font-medium">Status:</span> {fee.status}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          onClick={onConfirmAction}
          variant="destructive"
          className="w-full"
        >
          Yes, Delete Fee
        </Button>

        <Button
          type="button"
          onClick={onCancelAction}
          className="border border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full text-black hover:bg-red-50"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
