import { RefreshCcw } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function BtnUpdateUser() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <RefreshCcw className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-base">
          <p>Actualizar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
