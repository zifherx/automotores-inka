"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FormEditSucursal } from "../FormEditSucursal";

import { Pencil } from "lucide-react";
import { iCardSede } from "@/types";

export function BtnEditSucursal(props: iCardSede) {
  const { sede } = props;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="hover:bg-blueInka hover:text-white"
          onClick={() => setOpenDialog(true)}
        >
          Editar
          <Pencil className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="uppercase font-bold text-xl">
            Editar Sede
          </DialogTitle>
          <DialogDescription>
            <FormEditSucursal setOpenDialog={setOpenDialog} sede={sede} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
