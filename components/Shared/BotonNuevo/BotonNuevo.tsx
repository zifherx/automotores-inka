import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tRefreshBtn } from "@/types";
import { Plus } from "lucide-react";

export function BotonNuevo({ isLoading, refreshAction }: tRefreshBtn) {
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
            <Plus className={`w-6 h-6`} strokeWidth={2} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="font-bold text-lg">
          <p>Nuevo Item</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
