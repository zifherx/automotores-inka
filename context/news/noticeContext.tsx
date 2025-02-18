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
import { useRouter } from "next/navigation";

import { iNews } from "@/types";
import { NoticiasFormValues } from "@/forms";
import { onToast } from "@/lib";

interface NoticeContextType {
  news: iNews[];
  isLoadingData: boolean;
  refreshNews: () => Promise<void>;
  createNew: (data: NoticiasFormValues) => Promise<void>;
  updateNew: (id: string, data: NoticiasFormValues) => Promise<void>;
  deleteNew: (id: string) => Promise<void>;
}

export const NewsContext = createContext<NoticeContextType | undefined>(
  undefined
);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<iNews[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const router = useRouter();

  const getNews = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const query = await axios.get("/api/noticia");
      if (query.status === 200) {
        setNews(query.data.data);
        setIsLoadingData(false);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const createNew = useCallback(async (data: NoticiasFormValues) => {
    setIsLoadingData(true);
    try {
      const query = await axios.post("/api/noticia", data);
      if (query.status === 200) {
        onToast(query.data.message);
        setIsLoadingData(false);
      }
      setIsLoadingData(false);
      router.refresh();
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const refreshNews = useCallback(async () => {
    await getNews();
  }, [getNews]);

  const deleteNew = useCallback(async (id: string) => {
    try {
      const query = await axios.delete(`/api/noticia/${id}`);
      if (query.status === 200) {
        onToast(query.data.message);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.response.data.message, true);
    } finally {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNew = useCallback(
    async (id: string, data: NoticiasFormValues) => {
      setIsLoadingData(true);
      try {
        const query = await axios.patch(`/api/noticia/${id}`, data);
        if (query.status === 200) {
          onToast(query.data.message);
        }
      } catch (err) {
        onToast("Algo salió mal ❌", "", true);
      } finally {
        router.refresh();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    refreshNews();
  }, [refreshNews]);

  return (
    <NewsContext.Provider
      value={{
        news,
        isLoadingData,
        refreshNews,
        createNew,
        updateNew,
        deleteNew,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be use within NewsProvider");
  }
  return context;
}
