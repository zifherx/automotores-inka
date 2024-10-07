"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

import { Car, PlusCircle } from "lucide-react";

import { FormAddModel } from "../FormAddModel";
import { iBtnAddModel } from "@/types";

export function BtnAddModel(props: iBtnAddModel) {
  const { brands, chasises } = props;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={() => setOpenDialog(true)}>
                <PlusCircle className="w-5 h-5" strokeWidth={2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-base">Nuevo Modelo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="mb-5 flex flex-row uppercase gap-3 items-center justify-start">
            Nuevo Modelo
            <Car className="w-5 h-5" />
          </DialogTitle>
          <DialogDescription>
            <FormAddModel
              brands={brands}
              chasises={chasises}
              setOpenDialog={setOpenDialog}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
