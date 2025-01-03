import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BtnAddUser() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Plus className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-base">
          <p>Nuevo Usuario</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
