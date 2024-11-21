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
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AlertDialogManualProps = {
  title: string;
  description?: string;
  onContinue: () => void;
  trigger: ReactNode | string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
};

export function AlertDialogManual({
  open = false,
  title,
  description,
  onContinue,
  trigger,
  onOpenChange,
}: AlertDialogManualProps) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const triggerWrapper = cloneElement(trigger as ReactElement, {
    onClick: (e: Event) => {
      e.preventDefault();
      if (onOpenChange) {
        onOpenChange(true);
      } else {
        setOpenAlertDialog(true);
      }
    },
  });

  return (
    <>
      {triggerWrapper}
      {(open || openAlertDialog) && (
        <AlertDialog
          open={open || openAlertDialog}
          onOpenChange={(value) => {
            if (onOpenChange) {
              onOpenChange(value);
            } else {
              setOpenAlertDialog(value);
            }
          }}
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
