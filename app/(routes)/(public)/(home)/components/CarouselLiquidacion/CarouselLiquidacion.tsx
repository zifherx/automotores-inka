"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

import { iModelo } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardProductModel } from "@/components/Shared/CardProductModel";

export function CarouselLiquidacion() {
  const [listModelos, setListModelos] = useState<iModelo[]>([]);

  const plugin = useRef(Autoplay({ delay: 3000 }));

  const getListModels = async () => {
    const query = await axios.get("/api/modelo");
    if (query.status === 200) {
      const modelosLiquidacion: iModelo[] = query.data.filter(
        (modelo: any) => modelo.isLiquidacion == true
      );
      setListModelos(modelosLiquidacion);
    }
  };

  useEffect(() => {
    getListModels();
  }, []);

  //   console.log(listModelos);

  return (
    <Carousel className="" opts={{ loop: true }} plugins={[plugin.current]}>
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
