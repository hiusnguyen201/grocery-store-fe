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
import { cloneElement, ReactElement, ReactNode, useState } from "react";

type AlertDialogManualProps = {
  title: string;
  description?: string;
  onContinue: () => void;
  trigger: ReactNode | string;
};

export function AlertDialogManual({
  title,
  description,
  onContinue,
  trigger,
}: AlertDialogManualProps) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const triggerWrapper = cloneElement(trigger as ReactElement, {
    onClick: (e: Event) => {
      e.preventDefault();
      setOpenAlertDialog(true);
    },
  });

  return (
    <>
      {triggerWrapper}
      {openAlertDialog && (
        <AlertDialog
          open={openAlertDialog}
          onOpenChange={setOpenAlertDialog}
        >
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
      )}
    </>
  );
}
