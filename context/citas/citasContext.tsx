"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { utils, writeFile } from "xlsx";

import { iAppointment } from "@/types";

interface CitasContextType {
  citas: iAppointment[];
  isLoading: boolean;
  rangoFechas: DateRange | undefined;
  setRangoFechas: (range: DateRange | undefined) => void;
  refreshCitas: () => Promise<void>;
  exportToExcel: () => void;
}

export const CitasContext = createContext<CitasContextType | undefined>(
  undefined
);

export function CitasProvider({ children }: { children: ReactNode }) {
  const [citas, setCitas] = useState<iAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rangoFechas, setRangoFechas] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const getCitas = useCallback(async () => {
    try {
      setIsLoading(true);
      const filterDate = {
        from: rangoFechas?.from?.toISOString().substring(0, 10),
        to: rangoFechas?.to?.toISOString().substring(0, 10),
      };

      const query = await axios.get(
        `/api/citas?from=${filterDate.from}&to=${filterDate.to}`
      );

      if (query.status === 200) {
        setCitas(query.data.obj);
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
    }
  }, [rangoFechas]);

  const refreshCitas = useCallback(async () => {
    await getCitas();
  }, [getCitas]);

  const exportToExcel = useCallback(() => {
    const formatedData = citas.map((item) => {
      const newDate = new Date(item.createdAt!);
      const formattedDate = newDate
        .toLocaleString("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(",", "");
      return {
        // ...item,
        Fecha: formattedDate,
        Cliente: item.cliente.name,
        "N° Celular": item.cliente.celular,
        Email: item.cliente.email,
        Placa: item.placa,
        Vehiculo: item.modelo.name,
        Km: item.kilometraje,
        Ciudad: item.concesionario.ciudad,
        Dealer: item.concesionario.name,
        "Tipo de Servicio": item.tipoServicio,
        Comentario: item.comentario,
      };
    });

    const worksheet = utils.json_to_sheet(formatedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, `Cotizaciones`);
    writeFile(
      workbook,
      `Reporte_Citas_${new Date().toISOString().substring(0, 10)}.xlsx`
    );
  }, [citas]);

  useEffect(() => {
    refreshCitas();
  }, [refreshCitas]);

  return (
    <CitasContext.Provider
      value={{
        citas,
        isLoading,
        rangoFechas,
        setRangoFechas,
        refreshCitas,
        exportToExcel,
      }}
    >
      {children}
    </CitasContext.Provider>
  );
}

export function useCitas() {
  const context = useContext(CitasContext);
  if (context === undefined) {
    throw new Error("useCitas must be use within CitasProvider");
  }
  return context;
}
