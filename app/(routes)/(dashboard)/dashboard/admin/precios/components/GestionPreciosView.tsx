"use client";

import { ChangeEvent, useState } from "react";
import { read, utils } from "xlsx";

import { EstadisticasSection } from "./EstadisticasSection";
import { ResultsTableSection } from "./ResultsTableSection";
import { UploadSection } from "./UploadSection";

import { useModelos } from "@/context/modelos/modeloContext";
import { UploadStatusType } from "@/types";
import { IExcelData, IPriceImportRow } from "@/interfaces/iAdmin";

export function GestionPreciosView() {
  const { modelos } = useModelos();
  const [importedData, setImportedData] = useState<IPriceImportRow[]>([]);
  const [uploadStatus, setUploadStatus] =
    useState<UploadStatusType>("inactivo");
  const [isProcessing, setIsProcessing] = useState(false);
  const [excelData, setExcelData] = useState<IExcelData>({
    headers: [],
    data: [],
  });

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadStatus("en proceso");

    try {
      // Leer archivo Excel
      const arrayBuffer = await file.arrayBuffer();
      const workbook = read(arrayBuffer, { type: "array" });

      // Obtener la primera hoja
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir a json
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (jsonData.length < 2) {
        throw new Error(
          "El archivo Excel debe tener al menos una fila de encabezados y una fila de datos"
        );
      }

      // Obtener encabezados (primera fila)
      const headers = jsonData[0] as string[];

      // Guardar datos raw para vista previa
      setExcelData({
        headers,
        data: jsonData.slice(1),
      });

      console.log("JSONDATA:", jsonData);

      const processedData: IPriceImportRow[] = jsonData
        .slice(1)
        .map((row: any[]) => {
          const rowData: any = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index] || "";
          });

          const mappedRow: IPriceImportRow = {
            marca: rowData["Marca"] || rowData["marca"] || "",
            modelo: rowData["Modelo"] || rowData["modelo"] || "",
            nombre_fd:
              rowData["Nombre_FD"] ||
              rowData["nombre_fd"] ||
              rowData["Código"] ||
              "",
            precio: Number.parseFloat(
              rowData["Precio"] || rowData["precio"] || "0"
            ),
            glp:
              (rowData["GLP"] || rowData["glp"] || "")
                .toString()
                .toLowerCase() === "si",
            entrega:
              (rowData["Entrega"] || rowData["entrega"] || "")
                .toString()
                .toLowerCase() === "si",
            liquidacion:
              (rowData["Liquidación"] || rowData["liquidacion"] || "")
                .toString()
                .toLowerCase() === "si",
            nuevo:
              (rowData["Nuevo"] || rowData["nuevo"] || "")
                .toString()
                .toLowerCase() === "si",
            status: "pending",
          };
          return mappedRow;
        })
        .filter((row) => row.marca && row.modelo);

      console.log("PROCESSEDDATA:", processedData);

      const finalData = processedData.map((row) => {
        const matchedVehicle = modelos.find(
          (vehicle) =>
            vehicle.codigo_flashdealer.toLowerCase() ===
              row.nombre_fd.toLowerCase() ||
            vehicle.name.toLowerCase() === row.modelo.toLowerCase()
        );

        return {
          ...row,
          matchedVehicle,
          status: matchedVehicle
            ? ("matched" as const)
            : ("not-found" as const),
        };
      });

      // console.log("finalData", finalData);

      setImportedData(finalData);
      setUploadStatus("completado");
    } catch (err: any) {
      setUploadStatus("error");
      console.error("Error procesando Excel file:", err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveUpdates = async () => {
    console.log("Guardar Datos");
  };

  const handleClearData = () => {
    setImportedData([]);
    setExcelData({ headers: [], data: [] });
    setUploadStatus("inactivo");

    const fileInput = document.getElementById(
      "excel-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const matchedCount = importedData.filter((row) => row.matchedVehicle).length;
  const totalCount = importedData.length;

  // console.log({ importedData });

  return (
    <div className="p-2 space-y-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl md:text-3xl font-headMedium">
            Gestión de Precios
          </h2>
          <p>Importa y actualiza los precios de vehículos desde EXCEL</p>
        </div>
      </div>

      <UploadSection
        handleFile={handleFileUpload}
        isProcessing={isProcessing}
        uploadStatus={uploadStatus}
        preview={excelData}
        rowsMatched={matchedCount}
        rowsTotal={totalCount}
        onClearData={handleClearData}
      />

      {importedData.length > 0 && (
        <EstadisticasSection
          matchImportados={matchedCount}
          totalImportados={totalCount}
        />
      )}

      {importedData.length > 0 && (
        <ResultsTableSection
          importedData={importedData}
          isProcessing={isProcessing}
          matchedCount={matchedCount}
          onSaveUpdates={handleSaveUpdates}
        />
      )}
    </div>
  );
}
