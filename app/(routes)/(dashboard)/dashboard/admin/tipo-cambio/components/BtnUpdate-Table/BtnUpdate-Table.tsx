"use client";

import { RefreshCcw } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function BtnUpdateTable() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="font-semibold text-lg hover:shadow-xl"
            variant="outline"
            onClick={() => console.log("Se actualizará tabla")}
          >
            <RefreshCcw className="w-5 h-5" strokeWidth={2} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="capitalize text-lg">Actualizar tabla</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
