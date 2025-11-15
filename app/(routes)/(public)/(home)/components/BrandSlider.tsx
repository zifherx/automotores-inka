"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

import { Title } from "@/components/Shared/Title";
import { Subtitle } from "@/components/Shared/Subtitle";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { iBrand } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export function BrandSlider() {
  const [brands, setBrands] = useState<iBrand[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 3000 }));

  const subtitle =
    "Contamos con la mayor oferta de marcas del mercado. Desliza y escoge la marca de tu preferencia";
  const skeletonItems = Array(9).fill(null);

  const getBrands = async () => {
    try {
      const query = await axios.get("/api/marca");
      if (query.status === 200) {
        const marcasActivas = query.data.data.filter(
          (marca: iBrand) => marca.isActive
        );
        setBrands(marcasActivas);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <section className="bg-transparent w-full">
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
            {isLoading
              ? skeletonItems.map((_, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-32 ">
                    <Skeleton className="h-[120px] w-[120px] rounded-md" />
                  </CarouselItem>
                ))
              : brands &&
                brands.map(({ _id, name, imageUrl, slug }) => (
                  <CarouselItem key={_id} className="basis-4/12 md:basis-32">
                    <Image
                      className="object-contain cursor-pointer border border-grisInka rounded-lg hover:border-black drop-shadow-sm"
                      src={imageUrl}
                      alt={`Marca ${name}`}
                      width={120}
                      height={120}
                      onClick={() =>
                        router.push(`/ligeros/catalogo?marca=${slug}`)
                      }
                    />
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
