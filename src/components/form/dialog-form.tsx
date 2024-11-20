"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

type DialogFormProps = {
  children: ReactNode;
  title: string;
  description?: string;
  btnTriggerTitle: ReactNode | string;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  onResetWhenClose: (e?: React.FormEvent<HTMLFormElement>) => void;
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  className?: string;
};

export function DialogForm({
  children,
  title,
  btnTriggerTitle,
  description,
  encType,
  onSubmit,
  className,
  onResetWhenClose,
}: DialogFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{btnTriggerTitle}</Button>
      {isOpen && (
        <Dialog
          open={isOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen) onResetWhenClose();
            setIsOpen(isOpen);
          }}
        >
          <DialogContent className="md:min-w-[720px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <form
              encType={encType}
              onSubmit={onSubmit}
              className="space-y-4"
            >
              <div className={className}>{children}</div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
