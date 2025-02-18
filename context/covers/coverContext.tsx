/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

import { PortadasFormValues } from "@/forms";
import { iPortada } from "@/types";
import { onToast } from "@/lib";

interface CoverContextType {
  covers: iPortada[];
  isLoadingData: boolean;
  refreshCovers: () => Promise<void>;
  createCover: (data: PortadasFormValues) => Promise<void>;
  updateCover: (id: string, data: PortadasFormValues) => Promise<void>;
  deleteCover: (id: string) => Promise<void>;
}

export const CoverContext = createContext<CoverContextType | undefined>(
  undefined
);

export function CoverProvider({ children }: { children: ReactNode }) {
  const [covers, setCovers] = useState<iPortada[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const router = useRouter();

  const getCovers = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const query = await axios.get("/api/portada");
      if (query.status === 200) {
        setCovers(query.data.data);
        setIsLoadingData(false);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const createCover = useCallback(async (data: PortadasFormValues) => {
    setIsLoadingData(true);
    try {
      const query = await axios.post("/api/portada", data);
      if (query.status === 200) {
        setCovers(query.data.data);
        setIsLoadingData(false);
        router.refresh();
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const refreshCovers = useCallback(async () => {
    await getCovers();
  }, [getCovers]);

  const updateCover = useCallback(
    async (id: string, data: PortadasFormValues) => {
      setIsLoadingData(true);
      try {
        const query = await axios.patch(`/api/portada/${id}`, data);
        if (query.status === 200) {
          onToast(query.data.message);
          setIsLoadingData(false);
        }
      } catch (err: any) {
        onToast("Algo salió mal ❌", err.message, true);
      } finally {
        router.refresh();
      }
    },
    []
  );

  const deleteCover = useCallback(async (id: string) => {
    try {
      const query = await axios.delete(`/api/portada/${id}`);
      if (query.status === 200) {
        onToast(query.data.message);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    } finally {
      router.refresh();
    }
  }, []);

  useEffect(() => {
    refreshCovers();
  }, [refreshCovers]);

  return (
    <CoverContext.Provider
      value={{
        covers,
        isLoadingData,
        createCover,
        refreshCovers,
        updateCover,
        deleteCover,
      }}
    >
      {children}
    </CoverContext.Provider>
  );
}

export function useCovers() {
  const context = useContext(CoverContext);
  if (context === undefined) {
    throw new Error("useCovers must be use within CoverProvider");
  }
  return context;
}
