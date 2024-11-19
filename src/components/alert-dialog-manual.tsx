"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";

type AlertDialogManualProps = {
  title: string;
  description?: string;
  trigger: ReactNode;
  onContinue: () => void;
};

export function AlertDialogManual({
  title,
  description,
  onContinue,
  trigger,
}: AlertDialogManualProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const triggerWrapper = cloneElement(trigger as ReactElement, {
    onClick: (e: Event) => {
      e.preventDefault();
    },
  });

  return (
    <>
      <button
        className="w-full"
        onClick={(e) => {
          setOpenDialog(true);
          e.stopPropagation();
        }}
      >
        {triggerWrapper}
      </button>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>
                {description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onContinue}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
