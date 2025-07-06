import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CardStatProp } from "@/types";

export function CardStat({
  icon: Icon,
  title,
  value,
  tienePorcentaje,
}: CardStatProp) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        <Icon className="h-4 w-4 text-redInka" strokeWidth={2} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {value} {tienePorcentaje && "%"}
        </div>
      </CardContent>
    </Card>
  );
}
