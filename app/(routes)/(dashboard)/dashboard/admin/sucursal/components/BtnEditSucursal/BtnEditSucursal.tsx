"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FormEditSucursal } from "../FormEditSucursal";

import { iCardSede } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export function BtnEditSucursal({ sede }: iCardSede) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                className="hover:bg-orange-400 hover:text-white"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar sede</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="uppercase font-bold text-xl">
            Editar Sede
          </DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-[600px] w-full p-1">
              <FormEditSucursal setOpenDialog={setOpenDialog} sede={sede} />
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
