"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Title } from "@/components/Shared/Title";
import { CardServicios } from "@/components/Shared/CardServicios/CardServicios";
import { listServiciosSVG } from "@/data/public.data";

export function ServiciosSlider() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <section className="bg-plomoInka w-full py-20">
      <div className="max-w-7xl mx-auto items-center justify-center px-14 lg:px-0">
        <Title
          title="Nuestros Servicios"
          className="text-center text-2xl uppercase font-extrabold text-grisDarkInka"
        />

        <Carousel
          className="py-10"
          opts={{ loop: true }}
          plugins={[plugin.current]}
        >
          <CarouselContent>
            {listServiciosSVG.map(({ id, imageUrl, title }) => (
              <CarouselItem key={id} className="basis-2/3 md:basis-1/5">
                <CardServicios title={title} imageUrl={imageUrl} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
