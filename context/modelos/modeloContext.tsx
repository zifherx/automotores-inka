"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { onToast } from "@/lib";
import { iModelo } from "@/types";

interface ModeloContextType {
  modelos: iModelo[];
  isLoadingData: boolean;
  refreshModels: () => Promise<void>;
}

export const ModeloContext = createContext<ModeloContextType | undefined>(
  undefined
);

export function ModelosProvider({ children }: { children: ReactNode }) {
  const [modelos, setModelos] = useState<iModelo[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const router = useRouter();

  const getModelos = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const query = await axios.get("/api/modelo");
      if (query.status === 200) {
        setModelos(query.data.obj);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const refreshModels = useCallback(async () => {
    await getModelos();
  }, [getModelos]);

  useEffect(() => {
    refreshModels();
  }, [refreshModels]);

  return (
    <ModeloContext.Provider
      value={{
        modelos,
        isLoadingData,
        refreshModels,
      }}
    >
      {children}
    </ModeloContext.Provider>
  );
}

export function useModelos() {
  const context = useContext(ModeloContext);
  if (context === undefined) {
    throw new Error("useModelos must be use within ModelosProvider");
  }
  return context;
}
