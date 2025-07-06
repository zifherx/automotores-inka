import { AlertCircle, CheckCircle, FileText, XCircle } from "lucide-react";

import { CardStat } from "./CardStat";

import { StatisticsSectionProp } from "@/types";

export function EstadisticasSection({
  matchImportados,
  totalImportados,
}: StatisticsSectionProp) {
  const totalNoEncontrados = totalImportados - matchImportados;
  const tasaCoincidencia =
    totalImportados > 0
      ? Math.round((matchImportados / totalImportados) * 100)
      : 0;

  return (
    <section className="grid gap-4 md:grid-cols-4">
      <CardStat
        icon={FileText}
        title="Total Importado"
        value={totalImportados}
      />
      <CardStat
        icon={CheckCircle}
        title="Encontrados"
        value={matchImportados}
      />
      <CardStat
        icon={XCircle}
        title="No Encontrados"
        value={totalNoEncontrados}
      />
      <CardStat
        icon={AlertCircle}
        title="Tasa de Coincidencia"
        value={tasaCoincidencia}
        tienePorcentaje={true}
      />
    </section>
  );
}
