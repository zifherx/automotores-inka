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

import { iBrand } from "@/types";
import { BrandFormValues } from "@/forms";
import { onToast } from "@/lib";

interface MarcaContextType {
  brands: iBrand[];
  isLoadingData: boolean;
  refreshBrands: () => Promise<void>;
  createBrand: (data: BrandFormValues) => Promise<void>;
  updateBrand: (id: string, data: BrandFormValues) => Promise<void>;
  deleteBrand: (id: string) => Promise<void>;
}

export const BrandsContext = createContext<MarcaContextType | undefined>(
  undefined
);

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<iBrand[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const router = useRouter();

  const getBrands = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const query = await axios.get("/api/marca");
      if (query.status === 200) {
        setBrands(query.data.data);
        setIsLoadingData(false);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const createBrand = useCallback(async (data: BrandFormValues) => {
    setIsLoadingData(true);
    try {
      const query = await axios.post("/api/marca", data);
      if (query.status === 200) {
        onToast(query.data.message);
        setIsLoadingData(false);
        router.refresh();
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshBrands = useCallback(async () => {
    await getBrands();
  }, [getBrands]);

  const updateBrand = useCallback(async (id: string, data: BrandFormValues) => {
    setIsLoadingData(true);
    try {
      const query = await axios.patch(`/api/marca/${id}`, data);
      if (query.status === 200) {
        onToast(query.data.message);
        setIsLoadingData(false);
        router.refresh();
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteBrand = useCallback(async (id: string) => {
    try {
      const query = await axios.delete(`/api/marca/${id}`);
      if (query.status === 200) {
        onToast(query.data.message);
        router.refresh();
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refreshBrands();
  }, [refreshBrands]);

  return (
    <BrandsContext.Provider
      value={{
        brands,
        isLoadingData,
        createBrand,
        refreshBrands,
        updateBrand,
        deleteBrand,
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
}

export function useBrands() {
  const context = useContext(BrandsContext);
  if (context === undefined) {
    throw new Error("useBrands must be use within BrandsProvider");
  }
  return context;
}
