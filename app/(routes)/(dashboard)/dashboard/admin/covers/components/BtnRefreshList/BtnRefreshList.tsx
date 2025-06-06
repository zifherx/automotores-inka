"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useCovers } from "@/context/covers/coverContext";
import { RefreshCcw } from "lucide-react";

export function BtnRefreshList() {
  const { refreshCovers } = useCovers();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" onClick={refreshCovers}>
            <RefreshCcw className="w-6 h-6" strokeWidth={2} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Actualizar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
