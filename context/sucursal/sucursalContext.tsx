"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

import { onToast } from "@/lib";
import { iSede } from "@/types";

interface SucursalContextType {
  sucursales: iSede[];
  isLoadingData: boolean;
  refreshSucursales: () => Promise<void>;
}

export const SucursalContext = createContext<SucursalContextType | undefined>(
  undefined
);

export function SucursalProvider({ children }: { children: ReactNode }) {
  const [sucursales, setSucursales] = useState<iSede[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const getSucursales = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const query = await axios.get("/api/sucursal");
      if (query.status === 200) {
        setSucursales(query.data.obj);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const refreshSucursales = useCallback(async () => {
    await getSucursales();
  }, [getSucursales]);

  useEffect(() => {
    refreshSucursales();
  }, [refreshSucursales]);

  return (
    <SucursalContext.Provider
      value={{
        sucursales,
        isLoadingData,
        refreshSucursales,
      }}
    >
      {children}
    </SucursalContext.Provider>
  );
}

export function useSucursales() {
  const context = useContext(SucursalContext);
  if (context === undefined) {
    throw new Error("useSucursales must be use within ModelosProvider");
  }
  return context;
}
