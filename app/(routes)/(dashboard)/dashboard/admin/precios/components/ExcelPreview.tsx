"use client";

import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

import { ExcelPreviewProp } from "@/types";

export function ExcelPreview({ data, headers }: ExcelPreviewProp) {
  const previewData = data.slice(0, 4);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" strokeWidth={2} />
          Vista Previa del Excel
        </CardTitle>
        <CardDescription>
          Se detectaron {headers.length} columnas y {data.length} filas de datos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mostrarr  columnas detectadas */}
          <div>
            <h4 className="text-sm font-medium mb-2">Columnas detectadas:</h4>
            <div className="div flex-wrap gap-2">
              {headers.map((header, index) => (
                <Badge key={index} variant="outline">
                  {header}
                </Badge>
              ))}
            </div>
          </div>

          {/* Vista previa de datos */}
          <div>
            <h4 className="text-sm font-medium mb-2">Vista previa de datos:</h4>
            <div className="rounded-md max-h-72 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableHead key={index} className="whitespace-nowrap">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {headers.map((_, colIndex) => (
                        <TableCell key={colIndex} className="whitespace-nowrap">
                          {row[colIndex] || "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {data.length > 4 && (
              <p className="text-sm text-muted-foreground">
                Mostrando 4 de {data.length} filas
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
