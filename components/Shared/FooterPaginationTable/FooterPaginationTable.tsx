import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PaginationType } from "@/types";

export function FooterPaginationTable({
  paginaAnterior,
  paginaSiguiente,
  getPaginaAnterior,
  getPaginaSiguiente,
}: PaginationType) {
  return (
    <div className="flex space-x-2 items-center">
      <Button
        className="flex items-center gap-2"
        variant="outline"
        size="sm"
        onClick={() => paginaAnterior}
        disabled={!getPaginaAnterior}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        Anterior
      </Button>
      <Button
        className="flex items-center gap-2"
        variant="outline"
        size="sm"
        onClick={() => paginaSiguiente}
        disabled={!getPaginaSiguiente}
      >
        Siguiente
        <ChevronRight className="w-5 h-5" strokeWidth={2} />
      </Button>
    </div>
  );
}
