"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { iListCover } from "@/types";

export function BannerPortada(props: iListCover) {
  const { covers } = props;

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  return (
    <div className="w-full h-auto">
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <CarouselContent>
          {covers.map(({ _id, imageUrl, name }) => (
            <CarouselItem key={_id}>
              <Image src={imageUrl} alt={name} width={2000} height={780} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </div>
  );
}
