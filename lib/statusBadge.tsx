import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { IPriceImportRow } from "@/interfaces/iAdmin";

export const getStatusBadge = (estado: IPriceImportRow["status"]) => {
  switch (estado) {
    case "matched":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          Encontrado
        </Badge>
      );
    case "not-found":
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="w-4 h-4 mr-1" />
          No Encontrado
        </Badge>
      );
    case "updated":
      return (
        <Badge variant="outline" className="text-green-600 border-gren-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          Actualizado
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          <AlertCircle className="w-4 h-4 mr-1" />
          Pendiente
        </Badge>
      );
  }
};
