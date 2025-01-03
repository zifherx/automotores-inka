"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AtSign, Plus } from "lucide-react";
import { FormAddEmail } from "../FormAddEmail";

export function BtnAddEmail() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpenDialog(true)}
                className="shadow-lg rounded-full hover:bg-black hover:text-white"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white" side="right">
              <p>Agregar nuevo correo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="mb-5 flex flex-row uppercase gap-3 text-2xl items-center justify-start">
            <AtSign className="w-5 h-5" />
            Nuevo Email
          </DialogTitle>
          <DialogDescription>
            <FormAddEmail setOpenDialog={setOpenDialog} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
