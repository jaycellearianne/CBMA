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
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { AlertTriangle, Calendar, MapPin } from "lucide-react";
import { Training } from "./TrainingData";
import { DeleteTrainingForm } from "./DeleteTrainingForm";

interface DeleteTrainingModalProps {
  open: boolean;
  training: Training;
  onDeleteAction: () => void;
  onCancelAction: () => void;
}

export function DeleteTrainingModal({
  open,
  training,
  onDeleteAction,
  onCancelAction,
}: DeleteTrainingModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
                <h4 className="font-medium text-gray-900">{training.title}</h4>
              </div>

              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Sponsoring Agency:</span>{" "}
                  {training.sponsoringAgency}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Venue:</span> {training.venue}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="w-4 h-4" />
                <p className="text-sm text-gray-700">
                  <span>
                    {formatDate(training.startDate)}
                    {training.startDate !== training.endDate &&
                      ` - ${formatDate(training.endDate)}`}
                  </span>
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
            Yes, Delete Training
          </Button>
          <Button
            variant="outline"
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
          <DeleteTrainingForm
            open={open}
            training={training}
            onDeleteAction={onDeleteAction}
            onCancelAction={onCancelAction}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
