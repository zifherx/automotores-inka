"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { iPortada } from "@/types";

export function BannerPortada() {
  const [portadas, setPortadas] = useState<iPortada[]>([]);

  const getPortadas = async () => {
    const query = await axios.get("/api/portada");
    if (query.status === 200) {
      const portadasActivas = query.data.obj.filter(
        (portada: iPortada) => portada.isActive
      );
      setPortadas(portadasActivas);
    }
  };

  useEffect(() => {
    getPortadas();
  }, []);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  return (
    <div className="w-full h-auto">
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent>
          {portadas.map(({ _id, imageUrl, name }) => (
            <CarouselItem key={_id}>
              <Image src={imageUrl} alt={name} width={2000} height={780} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {portadas.length > 1 && <CarouselPrevious className="ml-20" />}
        {portadas.length > 1 && <CarouselNext className="mr-20" />}
      </Carousel>
    </div>
  );
}
