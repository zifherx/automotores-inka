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

import { iPortada } from "@/types";
import { onToast } from "@/lib";

interface CoverContextType {
  covers: iPortada[];
  isLoading: boolean;
  refreshCovers: () => Promise<void>;
  createCover: (data: Partial<iPortada>) => Promise<void>;
  updateCover: (id: string, data: Partial<iPortada>) => Promise<void>;
  deleteCover: (id: string) => Promise<void>;
}

export const CoverContext = createContext<CoverContextType | undefined>(
  undefined
);

export function CoverProvider({ children }: { children: ReactNode }) {
  const [covers, setCovers] = useState<iPortada[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCovers = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = await axios.get("/api/portada");
      if (query.status === 200) {
        setCovers(query.data.data);
        setIsLoading(false);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const createCover = useCallback(async (data: Partial<iPortada>) => {
    setIsLoading(true);
    try {
      const query = await axios.post("/api/portada", data);
      if (query.status === 200) {
        setCovers(query.data.data);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshCovers = useCallback(async () => {
    await getCovers();
  }, [getCovers]);

  const updateCover = useCallback(
    async (id: string, data: Partial<iPortada>) => {
      setIsLoading(true);
      try {
        const query = await axios.patch(`/api/portada/${id}`, data);
        if (query.status === 200) {
          onToast(query.data.message);
        }
      } catch (err: any) {
        onToast("Algo salió mal ❌", err.message, true);
      } finally {
        setIsLoading(false);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CoverContext.Provider
      value={{
        covers,
        isLoading,
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
