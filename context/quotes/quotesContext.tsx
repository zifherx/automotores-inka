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

import { iLead } from "@/types";
import { COLUMN_DEFINITION_EXPORTING, ColumnQuoteDef } from "@/table-columns";

interface QuoteContextType {
  quotes: iLead[];
  isLoading: boolean;
  rangoFechas: DateRange | undefined;
  setRangoFechas: (range: DateRange | undefined) => void;
  refreshQuotes: () => Promise<void>;
  exportToExcel: (selectedColumns: ColumnQuoteDef[]) => void;
  columns: typeof COLUMN_DEFINITION_EXPORTING;
}

export const QuotesContext = createContext<QuoteContextType | undefined>(
  undefined
);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<iLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rangoFechas, setRangoFechas] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const getQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const filterDate = {
        from: rangoFechas?.from?.toISOString().substring(0, 10),
        to: rangoFechas?.to?.toISOString().substring(0, 10),
      };

      const query = await axios.get(
        `/api/cotizacion?from=${filterDate.from}&to=${filterDate.to}`
      );
      if (query.status === 200) {
        setQuotes(query.data.obj);
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
    }
  }, [rangoFechas]);

  const refreshQuotes = useCallback(async () => {
    await getQuotes();
  }, [getQuotes]);

  const exportToExcel = useCallback(
    (selectedColumns: ColumnQuoteDef[]) => {
      const filteredData = quotes.map((quote) => {
        const filteredQuote: Record<string, any> = {};
        selectedColumns.forEach((column) => {
          filteredQuote[column.label] = column.accessor(quote);
        });
        return filteredQuote;
      });

      const formatedData = filteredData.map((item) => {
        const newDate = new Date(item.Fecha);
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
          ...item,
          Fecha: formattedDate,
        };
      });

      const worksheet = utils.json_to_sheet(formatedData);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, `Cotizaciones`);
      writeFile(
        workbook,
        `Reporte_Cotizaciones_${new Date().toISOString().substring(0, 10)}.xlsx`
      );
    },
    [quotes]
  );

  useEffect(() => {
    refreshQuotes();
  }, [refreshQuotes]);

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        isLoading,
        rangoFechas,
        setRangoFechas,
        refreshQuotes,
        exportToExcel,
        columns: COLUMN_DEFINITION_EXPORTING,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error("useQuotes must be use within QuotesProvider");
  }
  return context;
}
