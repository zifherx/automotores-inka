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
import { FormEditChasis } from "../FormEditChasis";

import { iCardChasis } from "@/types";

export function BtnEditChasis({ chasis }: iCardChasis) {
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
              <p>Editar chasis</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="uppercase font-bold text-xl">
            Editar Chasis
          </DialogTitle>
          <DialogDescription>
            <FormEditChasis chasis={chasis} setOpenDialog={setOpenDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
