"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";

import { Title } from "@/components/Shared/Title";
import { Subtitle } from "@/components/Shared/Subtitle";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { iListBrand } from "@/types";

export function BrandSlider(props: iListBrand) {
  const { brands } = props;

  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 3000 }));

  const subtitle =
    "Contamos con la mayor oferta de marcas del mercado. Desliza y escoge la marca de tu preferencia";

  return (
    <div className="bg-transparent w-full">
      <div className="max-w-4xl px-14 lg:max-w-6xl mx-auto py-4 md:px-0 md:py-14 items-center">
        <Title
          title="Elige alguna de nuestras marcas"
          className="text-center text-2xl uppercase font-extrabold text-grisDarkInka"
        />
        <Subtitle subtitle={subtitle} />

        <Carousel
          className="mt-10"
          opts={{ loop: true }}
          plugins={[plugin.current]}
        >
          <CarouselContent>
            {brands.map(({ _id, name, imageUrl, slug }) => (
              <CarouselItem key={_id} className="basis-4/12 md:basis-32">
                <Image
                  className="object-contain cursor-pointer border border-grisInka rounded-lg hover:border-black drop-shadow-sm"
                  src={imageUrl}
                  alt={`Marca ${name}`}
                  width={120}
                  height={120}
                  onClick={() => router.push(`/ligeros/catalogo?marca=${slug}`)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
