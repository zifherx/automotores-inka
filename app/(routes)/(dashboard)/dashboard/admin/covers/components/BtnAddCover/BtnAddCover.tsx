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

import { PlusCircle } from "lucide-react";

import { FormAddPortada } from "../FormAddCover";
import { Separator } from "@/components/ui/separator";

export function BtnAddCover() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="font-semibold text-lg"
          variant="outline"
          onClick={() => setOpenDialog(true)}
        >
          <span className="hidden sm:flex">Nueva Portada</span>
          <PlusCircle className="w-5 h-5 ml-0 sm:ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="mb-5 text-left">Nueva Portada</DialogTitle>
          <DialogDescription>
            <FormAddPortada setOpenDialog={setOpenDialog} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
