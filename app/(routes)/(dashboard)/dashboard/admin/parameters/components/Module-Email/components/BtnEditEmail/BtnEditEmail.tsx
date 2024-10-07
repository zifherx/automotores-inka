"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { FormEditEmail } from "../FormEditEmail";
import { iMailSystem } from "@/types";

export default function BtnEditEmail() {
  const [openDialog, setOpenDialog] = useState(false);

  const obj = {
    email: "",
    isActive: true,
    createdBy: "",
    _id: "",
  } as iMailSystem;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                size="icon"
                className="text-orange-500 hover:shadow-xl hover:rounded-full"
                onClick={() => setOpenDialog(true)}
              >
                <Pencil className="w-5 h-5" strokeWidth={2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-orange-500 text-white" side="bottom">
              <p>Editar correo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <FormEditEmail setOpenDialog={setOpenDialog} mail={obj} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
