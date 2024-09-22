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

import { FormAddSucursal } from "../FormAddSucursal";

import { PlusCircle } from "lucide-react";

export function BtnAddSucursal() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="font-semibold text-lg"
          variant="outline"
          onClick={() => setOpenDialog(true)}
        >
          <span className="hidden sm:flex">Nueva Sede</span>
          <PlusCircle className="w-5 h-5 ml-0 sm:ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Nueva Sede</DialogTitle>
          <DialogDescription>
            <FormAddSucursal setOpenDialog={setOpenDialog} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
