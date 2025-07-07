"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusBadge } from "@/lib/statusBadge";
import { ResultsTableSectionProp } from "@/types";
import { Save, TrendingDown, TrendingUp } from "lucide-react";

export function ResultsTableSection({
  importedData,
  isProcessing,
  matchedCount,
  onSaveUpdates,
}: ResultsTableSectionProp) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Datos Importados</CardTitle>
            <CardDescription>
              Revisa los datos importados antes de guardar los cambios
            </CardDescription>
          </div>
          <Button
            onClick={onSaveUpdates}
            disabled={isProcessing || matchedCount === 0}
            className="flex items-center gap-2"
          >
            <Save className="w-5 h-5" strokeWidth={2} />
            {isProcessing
              ? "Guardando..."
              : `Guardar cambios (${matchedCount})`}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Codigo FD</TableHead>
                <TableHead>Precio Nuevo</TableHead>
                <TableHead>Precio Actual</TableHead>
                <TableHead>GLP</TableHead>
                <TableHead>Entrega 48H</TableHead>
                <TableHead>Liquidación</TableHead>
                <TableHead>Nuevo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{getStatusBadge(row.status)}</TableCell>
                  <TableCell className="font-medium">{row.marca}</TableCell>
                  <TableCell>{row.modelo}</TableCell>
                  <TableCell>{row.nombre_fd}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-headBold">
                        ${row.precio.toLocaleString()}
                      </span>
                      {row.precio < row.matchedVehicle!.precioBase && (
                        <TrendingDown
                          className="text-redInka"
                          strokeWidth={2}
                        />
                      )}
                      {row.precio > row.matchedVehicle!.precioBase && (
                        <TrendingUp
                          className="text-green-500"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.matchedVehicle
                      ? `$${row.matchedVehicle.precioBase.toLocaleString()}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.glp ? "default" : "secondary"}>
                      {row.glp ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.entrega ? "default" : "secondary"}>
                      {row.entrega ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={row.liquidacion ? "destructive" : "secondary"}
                    >
                      {row.liquidacion ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={row.nuevo ? "default" : "secondary"}>
                      {row.nuevo ? "Sí" : "No"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
