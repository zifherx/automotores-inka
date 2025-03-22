"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import axios from "axios";

import { iBudget } from "@/types";
import { onToast } from "@/lib";

interface PresupuestoContextType {
  presupuestos: iBudget[];
  isLoading: boolean;
  refreshPresupuestos: () => Promise<void>;
  createPresupuesto: (data: Partial<iBudget>) => Promise<void>;
}

export const PresupuestoContext = createContext<
  PresupuestoContextType | undefined
>(undefined);

export function PresupuestoProvider({ children }: { children: ReactNode }) {
  const [presupuestos, setPresupuestos] = useState<iBudget[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPresupuestos = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = await axios.get(`/api/presupuesto`);
      if (query.status === 200) {
        setPresupuestos(query.data.data);
        setIsLoading(false);
      }
    } catch (err: any) {
      onToast(`Algo salió mal ❌`, err.message, true);
    }
  }, []);

  const createPresupuesto = useCallback(async (data: Partial<iBudget>) => {
    setIsLoading(true);
    try {
      const query = await axios.post("/api/presupuesto", data);
      if (query.status === 200) {
        setPresupuestos(query.data.data);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshPresupuestos = useCallback(async () => {
    await getPresupuestos();
  }, [getPresupuestos]);

  return (
    <PresupuestoContext.Provider
      value={{
        presupuestos,
        isLoading,
        refreshPresupuestos,
        createPresupuesto,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
}

export function usePresupuesto() {
  const context = useContext(PresupuestoContext);
  if (context === undefined) {
    throw new Error("usePresupuesto must be use within PresupuestoProvider");
  }
  return context;
}
