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
import { Skeleton } from "@/components/ui/skeleton";

export function BannerPortada() {
  const [portadas, setPortadas] = useState<iPortada[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonItems = Array(3).fill(null);

  const getPortadas = async () => {
    try {
      const query = await axios.get("/api/portada");
      if (query.status === 200) {
        const portadasActivas = query.data.obj.filter(
          (portada: iPortada) => portada.isActive
        );
        setPortadas(portadasActivas);
        setIsLoading(false);
      }
    } catch (err) {
      console.log({ err });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPortadas();
  }, []);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  return (
    <section className="w-full h-auto">
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent>
          {isLoading
            ? skeletonItems.map((_, index) => (
                <CarouselItem key={index}>
                  <Skeleton className="h-[200px] md:h-[780px] w-full rounded-md" />
                </CarouselItem>
              ))
            : portadas?.map(({ _id, imageUrl, name }) => (
                <CarouselItem key={_id}>
                  <Image src={imageUrl} alt={name} width={2000} height={780} />
                </CarouselItem>
              ))}
        </CarouselContent>
        {portadas && portadas.length > 1 && (
          <CarouselPrevious className="ml-20" />
        )}
        {portadas && portadas.length > 1 && <CarouselNext className="mr-20" />}
      </Carousel>
    </section>
  );
}
