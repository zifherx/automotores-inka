import { Badge } from "@/components/ui/badge";
import { Check, FileCheck, FileClock, FileEdit, FileX } from "lucide-react";

type EstadoPresupuesto =
  | "borrador"
  | "evaluacion"
  | "aprobado"
  | "rechazado"
  | "finalizado";

export function EstadoBadge({ estado }: { estado: EstadoPresupuesto }) {
  const config = {
    borrador: { color: "bg-slate-200 text-slate-800", icon: FileEdit },
    evaluacion: { color: "bg-yellow-100 text-yellow-800", icon: FileClock },
    aprobado: { color: "bg-green-100 text-green-800", icon: FileCheck },
    rechazado: { color: "bg-red-100 text-red-800", icon: FileX },
    finalizado: { color: "bg-blue-100 text-blue-800", icon: Check },
  };

  const { color, icon: Icon } = config[estado];

  return (
    <Badge
      variant="outline"
      className={`${color} flex items-center gap-1 capitalize`}
    >
      <Icon className="h-4 w-4" />
      {estado}
    </Badge>
  );
}
