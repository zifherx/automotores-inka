import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { tRefreshBtn } from "@/types";
import { RefreshCcw } from "lucide-react";

export function BotonRefresh({ refreshAction, isLoading }: tRefreshBtn) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAction}
            disabled={isLoading}
          >
            <RefreshCcw
              className={`w-6 h-6 ${isLoading ? "animate-spin" : ""}`}
              strokeWidth={2}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-bold text-lg">
          <p>Actualizar Contenido</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
