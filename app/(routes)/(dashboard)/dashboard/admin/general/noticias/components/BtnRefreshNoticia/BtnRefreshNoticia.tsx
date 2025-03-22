import { RefreshCcw } from "lucide-react";
import { useNews } from "@/context/news/noticeContext";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BtnRefreshNoticia() {
  const { refreshNews } = useNews();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" onClick={() => refreshNews()}>
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
