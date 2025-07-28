"use client";
import { Button } from "@/components/ui/button";
import { User } from "./page";

interface DeactivateUserFormProps {
  user: User | null;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}

export default function DeactivateUserForm({
  user,
  onConfirmAction,
  onCancelAction,
}: DeactivateUserFormProps) {
  if (!user) return null;

  const isDeactivating = user.isActive;

  return (
    <div className="space-y-4 px-1 mb-4">
      <div className="bg-red-50 rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-black">
          {user.name}
          <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
            {user.role}
          </span>
        </h4>
        <span className="text-black">{user.email}</span>
      </div>

      <p className="text-sm text-gray-700">
        {isDeactivating
          ? "They will lose access to the system but their data will be preserved."
          : "This user will regain access to the system."}
      </p>

      <div className="flex flex-col gap-2.5">
        <Button
          type="button"
          onClick={onConfirmAction}
          variant="destructive"
          className="w-full"
        >
          {isDeactivating ? "Yes, Deactivate User" : "Yes, Activate User"}
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
