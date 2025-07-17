"use client";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
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
import { AlertTriangle } from "lucide-react";
import { FamilyMember } from "./FamilyData";
import DeleteFamilyForm from "./DeleteFamilyForm";

interface DeleteFamilyModalProps {
  open: boolean;
  member: FamilyMember;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export default function DeleteFamilyModal({
  open,
  member,
  onDeleteAction,
  onCancelAction,
}: DeleteFamilyModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const Content = () => (
    <>
      <div className="flex items-start gap-4 mb-6 px-8 pt-4">
        <div className="flex-1">
          <p className="text-lg mb-4 px-2">
            Are you sure you want to delete this family member?
          </p>

          <div className="bg-red-50 rounded-lg p-4 border border-gray-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {member.relationship}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Education:</span>{" "}
                  {member.education}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Occupation:</span>{" "}
                  {member.occupation}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Birth Date:</span>{" "}
                  {member.birthDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex flex-col gap-2">
          <Button
            onClick={onDeleteAction}
            variant="destructive"
            className="text-2xl items-center transition-all touch-manipulation hover:shadow-xl"
          >
            Yes, Delete Family Member
          </Button>
          <Button
            variant="default"
            type="button"
            onClick={onCancelAction}
            className="border-1 border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full max-w-none text-black hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );

  return isMobile ? (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onCancelAction()}>
      <DrawerContent className="h-auto max-h-[60vh] flex flex-col">
        <DrawerHeader className="border-b border-gray-200 px-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <DrawerTitle className="text-xl font-bold text-gray-900 text-center">
              Confirm Deletion
              </DrawerTitle>
              <DrawerDescription className="text-red-600 mt-1 text-center">
              This action cannot be undone
              </DrawerDescription>
            </div>
        </DrawerHeader>
        {Content()}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={(val) => !val && onCancelAction()}>
      <DialogContent className="h-auto max-h-[60vh] flex flex-col">
      <DialogHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-red-600" />
        </div>
        <div className="text-center">
          <DialogTitle className="text-xl font-bold text-gray-900">
          Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-red-600 mt-1">
          This action cannot be undone
          </DialogDescription>
        </div>
        </div>
      </DialogHeader>
      <div className="flex justify-center">
        <DeleteFamilyForm
        open={open}
        member={member}
        onDeleteAction={onDeleteAction}
        />
      </div>
      </DialogContent>
    </Dialog>
  );
}
