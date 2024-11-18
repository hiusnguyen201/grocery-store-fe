"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

type DialogFormProps = {
  children: ReactNode;
  title: string;
  btnSubmitTitle: string;
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
  btnSubmitTitle,
  btnTriggerTitle,
  description,
  encType,
  onSubmit,
  className,
  onResetWhenClose,
}: DialogFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onResetWhenClose();
        setIsOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>{btnTriggerTitle}</Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="md:min-w-[640px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription aria-describedby={title}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <form
            encType={encType}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <div className={className}>{children}</div>
            <DialogFooter>
              <Button type="submit">{btnSubmitTitle}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
