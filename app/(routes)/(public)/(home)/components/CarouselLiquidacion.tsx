"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardProductModel } from "@/components/Shared/CardProductModel";
import { CardSkeletonModel } from "@/components/Shared/CardSkeletonModel";

import { iModelo } from "@/types";

export function CarouselLiquidacion() {
  const [listModelos, setListModelos] = useState<iModelo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const plugin = useRef(Autoplay({ delay: 3000 }));

  const getListModels = async () => {
    try {
      const query = await axios.get("/api/modelo");
      if (query.status === 200) {
        const modelosLiquidacion: iModelo[] = query.data.obj.filter(
          (modelo: iModelo) => modelo.isLiquidacion === true && modelo.isActive
        );
        setListModelos(modelosLiquidacion);
        setIsLoading(false);
      }
    } catch (err: any) {
      setListModelos([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListModels();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        {[...Array(3)].map((_, index) => (
          <CardSkeletonModel key={index} />
        ))}
      </div>
    );
  }

  return (
    <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
      <CarouselContent>
        {listModelos.map((item, index) => (
          <CarouselItem key={index} className="sm:basis-1 md:basis-1/3">
            <CardProductModel model={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
