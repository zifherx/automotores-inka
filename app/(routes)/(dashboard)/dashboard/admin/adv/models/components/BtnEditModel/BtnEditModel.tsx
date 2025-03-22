import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import { iCardModel } from "@/types";
import { FormEditModel } from "../FormEditModel";

export function BtnEditModel({ model }: iCardModel) {
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
                <Pencil className="w-4 h-4" strokeWidth={2} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar modelo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="uppercase font-bold text-xl">
            Editar Modelo
          </DialogTitle>
          <DialogDescription>
            <FormEditModel setOpenDialog={setOpenDialog} model={model} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
