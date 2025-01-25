"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { FormAddTipoCambio } from "../FormAddTipoCambio";

export function BtnAddTCambio() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="font-semibold text-lg hover:shadow-xl"
                variant="outline"
                onClick={() => setOpenDialog(true)}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="capitalize text-lg">Nuevo Tipo de Cambio</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl">Nuevo Tipo de Cambio</DialogTitle>
          <DialogDescription>
            Gestión del tipo de cambio para la cotización de unidades
            vehiculares.
          </DialogDescription>
        </DialogHeader>
        <FormAddTipoCambio setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}
