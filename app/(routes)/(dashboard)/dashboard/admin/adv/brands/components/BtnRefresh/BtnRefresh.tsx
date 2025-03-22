"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBrands } from "@/context/brands/marcaContext";
import { RefreshCcw } from "lucide-react";

export function BtnRefresh() {
  const { refreshBrands } = useBrands();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" onClick={refreshBrands}>
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
