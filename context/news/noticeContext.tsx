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

import { iNews } from "@/types";
import { onToast } from "@/lib";

interface NoticeContextType {
  news: iNews[];
  isLoading: boolean;
  refreshNews: () => Promise<void>;
  createNew: (noticia: Partial<iNews>) => Promise<iNews | void>;
  updateNew: (id: string, noticia: Partial<iNews>) => Promise<iNews | void>;
  deleteNew: (id: string) => Promise<void>;
}

export const NewsContext = createContext<NoticeContextType | undefined>(
  undefined
);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<iNews[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = await axios.get("/api/noticia");
      if (query.status === 200) {
        setNews(query.data.data);
        setIsLoading(false);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.message, true);
    }
  }, []);

  const createNew = useCallback(
    async (noticia: Partial<iNews>): Promise<iNews | void> => {
      try {
        const query = await axios.post("/api/noticia", noticia);
        if (query.status === 200) {
          const newNoticia = query.data.data;
          setNews((prevNews) => [...prevNews, newNoticia]);
          onToast(query.data.message);
          return newNoticia;
        }
      } catch (err: any) {
        onToast("Algo salió mal ❌", err.message, true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const refreshNews = useCallback(async () => {
    await getNews();
  }, [getNews]);

  const deleteNew = useCallback(async (id: string): Promise<void> => {
    try {
      const query = await axios.delete(`/api/noticia/${id}`);
      if (query.status === 200) {
        setNews((preNews) => preNews.filter((a) => a._id !== id));
        onToast(query.data.message);
      }
    } catch (err: any) {
      onToast("Algo salió mal ❌", err.response.data.message, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNew = useCallback(
    async (id: string, noticia: Partial<iNews>): Promise<iNews | void> => {
      try {
        const query = await axios.patch(`/api/noticia/${id}`, noticia);
        if (query.status === 200) {
          const updateNew = query.data.data;
          onToast(query.data.message);
          setNews((prevNews) =>
            prevNews.map((a) => (a._id === id ? updateNew : a))
          );
          return updateNew;
        }
      } catch (err) {
        onToast("Algo salió mal ❌", "", true);
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
        isLoading,
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
