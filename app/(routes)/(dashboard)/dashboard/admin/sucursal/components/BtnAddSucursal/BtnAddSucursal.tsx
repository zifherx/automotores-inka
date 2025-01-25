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

import { FormAddSucursal } from "../FormAddSucursal";

import { Plus } from "lucide-react";

export function BtnAddSucursal() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="font-semibold text-lg"
                variant="outline"
                onClick={() => setOpenDialog(true)}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="capitalize text-lg">Nueva Sede</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="mb-5">Nueva Sede</DialogTitle>
          <DialogDescription>
            <FormAddSucursal setOpenDialog={setOpenDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
