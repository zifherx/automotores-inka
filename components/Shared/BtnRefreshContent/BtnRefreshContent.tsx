import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshProps } from "@/types";
import { RefreshCcw } from "lucide-react";

export function BtnRefreshContent({ refreshAction }: RefreshProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" onClick={refreshAction}>
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
