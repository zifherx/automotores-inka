import { RefreshCw } from "lucide-react";
import { TableQuotes } from "../TableQuotes";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CotizacionesView() {
  return (
    <div className="p-2">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl md:text-3xl font-headMedium">
          Gestión de Cotizaciones
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <RefreshCw className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-base">
              <p>Actualizar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TableQuotes />
    </div>
  );
}
