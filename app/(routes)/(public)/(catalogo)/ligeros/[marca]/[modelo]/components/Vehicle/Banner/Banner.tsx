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
      <div className="flex justify-between items-center">
        <div className="w-[160px] lg:w-[280px] p-0 lg:p-6">
          <div className="uppercase text-left">
            <p className="text-2xl lg:text-4xl font-headRegular">
              {marca.name}
            </p>
            <p className="text-3xl lg:text-5xl font-headMedium">{name}</p>
          </div>
          <div className="mt-5 flex flex-col gap-y-3">
            <Button
              className="bg-redInka text-white text-sm w-fit md:w-full md:text-base rounded-full hover:bg-redDarkInka font-textMedium"
              onClick={() => router.push(`/cotizacion?modelo=${params.modelo}`)}
            >
              Cotízalo ahora
            </Button>
            <Link
              className={cn(
                "px-4 py-2 text-center border border-redInka rounded-full text-sm w-fit md:w-full md:text-base text-redInka font-textMedium ",
                "hover:bg-redInka hover:text-white"
              )}
              href={rutaTestDrive}
            >
              Solicita un test drive
            </Link>
          </div>
        </div>
        <RevealElement position="bottom" className="lg:-mr-28">
          <Image
            className="object-cover drop-shadow-xl"
            src={imageUrl}
            alt={name}
            width={600}
            height={400}
            priority
          />
          {/* <img
            className="w-[600px] h-auto object-cover drop-shadow-xl"
            src={imageUrl}
            alt={name}
          /> */}
        </RevealElement>
      </div>
    </div>
  );
}
