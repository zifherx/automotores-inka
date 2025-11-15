import { CheckCircle, FileText, Trash2, Upload } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { UploadSectionProp } from "@/types";
import { ExcelPreview } from "./ExcelPreview";
import { Button } from "@/components/ui/button";

export function UploadSection({
  uploadStatus,
  handleFile,
  isProcessing,
  preview,
  rowsMatched,
  rowsTotal,
  onClearData,
}: UploadSectionProp) {
  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <Upload className="w-6 h-6" strokeWidth={2} />
                Importar Precios desde Excel
              </CardTitle>
              <CardDescription>
                Sube un archivo Excel con los nuevos precios para actualizar la
                base de datos
              </CardDescription>
            </div>
            {uploadStatus === "completado" && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearData}
                className="flex items-center gap-2 bg-transparent hover:bg-blueInka hover:text-white"
              >
                <Trash2 className="w-5 h-5 mr-" strokeWidth={2} />
                Limpiar e Intentar de Nuevo
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Archivo Excel</Label>
              <Input
                id="excel-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFile}
                disabled={isProcessing}
              />
            </div>

            {uploadStatus === "en proceso" && (
              <Alert>
                <FileText className="h-5 w-5" />
                <AlertDescription>
                  Procesando archivo Excel... Por favor espera.
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus === "completado" && (
              <Alert>
                <CheckCircle className="h-5 w-5" />
                <AlertDescription>
                  Archivo procesado exitosamente. {rowsMatched} de {rowsTotal}{" "}
                  vehículos encontrados.
                </AlertDescription>
              </Alert>
            )}

            {uploadStatus === "completado" && preview.headers.length > 0 && (
              <ExcelPreview data={preview.data} headers={preview.headers} />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
