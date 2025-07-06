import { CheckCircle, FileText, Upload } from "lucide-react";

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

export function UploadSection({
  uploadStatus,
  handleFile,
  isProcessing,
  preview,
  rowsMatched,
  rowsTotal,
}: UploadSectionProp) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-6 h-6" strokeWidth={2} />
            Importar Precios desde Excel
          </CardTitle>
          <CardDescription>
            Sube un archivo Excel con los nuevos precios para actualizar la base
            de datos
          </CardDescription>
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
