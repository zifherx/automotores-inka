import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BadgeDollarSign, ShoppingCart } from "lucide-react";

export default function BtnFlotante() {
  return (
    <div className="fixed bottom-40 right-10 z-50 inline-flex items-center justify-center w-fit">
      <div className="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-blueDarkInka animate-ping"></div>
      <div className="relative z-20 bg-white/80 rounded-full p-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/steps-cotizacion">
                <BadgeDollarSign className="w-10 h-10 text-blueInka" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>¡Cotiza tu unidad ya!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
