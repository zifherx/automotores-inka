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

import { Car, PlusCircle } from "lucide-react";

import { FormAddModel } from "../FormAddModel";
import { iBtnAddModel } from "@/types";

export function BtnAddModel(props: iBtnAddModel) {
  const { brands, chasises } = props;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="font-semibold text-lg"
          variant="outline"
          onClick={() => setOpenDialog(true)}
        >
          <span className="hidden sm:flex">Nueva Modelo</span>
          <PlusCircle className="w-5 h-5 ml-0 sm:ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
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
