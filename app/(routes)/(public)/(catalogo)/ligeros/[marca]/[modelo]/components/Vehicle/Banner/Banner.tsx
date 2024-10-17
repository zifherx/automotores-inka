/* eslint-disable @next/next/no-img-element */
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { RevealElement } from "@/components/Shared/RevealElement";

import { iCardModel } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib";

export function Banner(props: iCardModel) {
  const { model } = props;
  const { marca, name, imageUrl } = model;

  const router = useRouter();
  const params = useParams();

  const rutaTestDrive =
    "https://api.whatsapp.com/send/?phone=51972051479&text=Hola+%2AAutomotores+Inka%2A%21+Quiero+hacer+un+Test+Drive+en+Automotores+Inka+https%3A%2F%2Fautomotoresinka.pe&type=phone_number&app_absent=0";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between py-5 px-1 items-center gap-5">
        <div className="flex flex-row md:flex-col gap-5 justify-between w-full md:w-[400px]">
          <div className="w-[150px] md:w-fit">
            <p className="text-xl lg:text-4xl font-headRegular">{marca.name}</p>
            <p className="text-3xl lg:text-5xl font-headMedium">{name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/cotizacion?modelo=${params.modelo}`}
              className={cn(
                "px-4 py-2 text-center bg-redInka text-white text-sm w-full md:text-base rounded-full font-textMedium ",
                "hover:bg-white hover:text-redInka hover:border hover:border-redInka hover:underline"
              )}
            >
              Cotízalo ahora
            </Link>
            <Link
              className={cn(
                "px-4 py-2 text-center border border-redInka rounded-full text-sm full md:text-base text-redInka font-textMedium ",
                "hover:bg-redInka hover:text-white hover:underline"
              )}
              href={rutaTestDrive}
            >
              Solicita un test drive
            </Link>
          </div>
        </div>
        <RevealElement position="bottom" className="relative w-full">
          <Image
            className="object-cover"
            src={imageUrl}
            alt={name}
            width={600}
            height={500}
            priority
          />
        </RevealElement>
      </div>
    </div>
  );
}
