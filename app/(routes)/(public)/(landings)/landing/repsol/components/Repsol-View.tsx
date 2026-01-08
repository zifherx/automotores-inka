"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LucideHandHeart, MapPin } from "lucide-react";
import { BsFuelPumpFill } from "react-icons/bs";

import { VideosYoutube } from "@/components/Shared/VideosYoutube";

export type RespolViewProp = {
  linkRedirection: string;
};

export function RepsolView({ linkRedirection }: RespolViewProp) {
  const router = useRouter();

  const handleClickRepsol = () => {
    router.push(linkRedirection);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section id="banner">
        <div className="max-w-6xl mx-auto pt-8 pb-5 px-5 md:px-8">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-lg md:text-6xl text-blueInka">
              ¡Ahora <strong>ahorrar es más fácil!</strong>
            </h2>
            <button
              onClick={handleClickRepsol}
              className="bg-redInka text-white cursor-pointer rounded-md px-2 py-1 md:px-5 md:py-2 text-xl md:text-5xl"
            >
              Únete ahora
            </button>
          </div>
        </div>

        <div className="relative w-full h-[180px] md:h-[700px] bg-blueInka opacity-100 md:opacity-85">
          <Image
            src="/images/banner-repsol.png"
            alt="Landing Repsol"
            fill
            className="w-full h-full -mt-3 md:mt-0 object-contain md:object-cover"
          />

          <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center ">
            <div className="absolute top-1/4 left-1 ml-5 -mt-6 md:-mt-20 md:-ml-10">
              <h2 className="text-lg md:text-6xl font-headBold text-gray-900 max-w-3xl leading-tight ">
                CON <strong>AUTOMOTORES INKA</strong> <br />
                AHORRA EN CADA VIAJE.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios">
        <div className="w-full bg-blueInka">
          <div className="max-w-5xl mx-auto py-3 md:py-16 text-white">
            <h3 className="text-xl md:text-5xl text-center mt-2 md:mt-6 mb-4 font-headMedium">
              Descubre nuestros Beneficios
            </h3>
            <p className="text-center text-xs md:text-2xl px-4 md:px-0 mb-10 font-textMedium leading-tight">
              Ahorra más en cada carga de combustible con nuestros descuentos
              exclusivos, además de acceder a beneficios adicionales pensados
              para ti, que hacen cada recarga más conveniente y rentable.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-3 md:px-5 -mt-6">
          <div className="flex flex-col gap-2 md:gap-6 mb-6 md:mb-16">
            {/* Descuentos */}
            <div className="bg-white border border-blueInka rounded-lg text-blueInka p-2 md:p-4 shadow-md">
              <div className="grid grid-cols-4 gap-x-4 md:gap-6 px-0 md:px-10 py-0">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] md:text-xl font-headMedium md:font-headBold">
                    Descuentos
                  </span>
                  <BsFuelPumpFill className="fill-redInka w-4 h-4 md:w-14 md:h-14" />
                </div>
                <div className="flex items-center justify-between pr-1 border-r md:border-r-2 border-r-blueInka">
                  <p className="text-[8px] md:text-sm font-textMedium">
                    Premium y Regular:
                  </p>
                  <div className="flex items-center">
                    <p className="font-headRegular text-xs md:text-2xl mr-1">
                      S/
                    </p>
                    <p className="text-xs md:text-4xl font-headMedium md:font-headBold">
                      2.50
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1 px-1 md:px-4 border-r md:border-r-2 border-r-blueInka">
                  <p className="text-[8px] md:text-sm font-textMedium">
                    Diesel:
                  </p>
                  <div className="flex items-center">
                    <p className="font-headRegular text-xs md:text-2xl mr-1">
                      S/
                    </p>
                    <p className="text-xs font-headMedium md:text-4xl md:font-headBold">
                      0.50
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1 px-0 md:px-4">
                  <p className="text-[8px] md:text-sm font-textMedium">GLP:</p>
                  <div className="flex items-center">
                    <p className="font-headRegular text-xs md:text-2xl mr-1">
                      S/
                    </p>
                    <p className="text-xs font-headMedium md:text-4xl md:font-headBold">
                      0.20
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cobetura */}
            <div className="grid grid-cols-[70%_1fr] md:grid-cols-4 gap-x-1 md:gap-x-4">
              <div className="md:col-span-3 bg-white border border-blueInka rounded-lg text-blueInka p-2 md:p-4 shadow-md">
                <div className="grid grid-cols-3 gap-3 md:gap-6 px-1 md:px-8 py-0">
                  <div className="flex items-center justify-between gap-1 border-r md:border-r-2 border-r-blueInka">
                    <p className="text-[9px] font-headMedium md:text-xl md:font-headBold">
                      Cobertura
                    </p>
                    <MapPin className="text-redInka w-4 h-4 md:w-14 md:h-14 mr-1 md:mr-5" />
                  </div>
                  <div className="flex flex-col items-start gap-1 pl-1 md:pl-4 border-r md:border-r-2 border-r-blueInka">
                    <p className="text-[9px] font-headMedium md:text-xl md:font-headBold">
                      LIMA
                    </p>
                    <p className="text-[9px] font-headMedium md:text-xl md:font-headBold">
                      CHIMBOTE
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1 pl-1 md:pl-4">
                    <p className="text-[9px] font-headMedium md:text-xl md:font-headBold">
                      TRUJILLO
                    </p>
                    <p className="text-[9px] font-headMedium md:text-xl md:font-headBold">
                      CHICLAYO
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-blueInka rounded-lg text-blueInka p-2 shadow-md">
                <div className="grid grid-cols-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[9px] font-headMedium md:text-xl md:font-headBold">
                      Benficios adicionales
                    </p>
                    <LucideHandHeart className="text-redInka w-4 h-4 md:w-14 md:h-14" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ventajas */}
            <div className="bg-blueInka rounded-lg text-white p-4 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-[75%_1fr] gap-2 md:gap-5 px-2 md:px-24 py-2">
                <div>
                  <h4 className="text-xl md:text-4xl font-headBold">
                    Ventajas:
                  </h4>
                  <ul className="list-inside list-disc text-xs md:text-xl font-headRegular">
                    <li>Ahorro en combustible</li>
                    <li>Variedad de combustibles cubiertos</li>
                    <li>Descuentos exclusivos</li>
                    <li>Cobertura en las principales ciudades del país</li>
                  </ul>
                </div>
                <div className="hidden md:flex items-center">
                  <BsFuelPumpFill className="fill-white w-24 h-24 md:w-40 md:h-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section id="cta">
        <div className="w-full bg-redInka text-white px-6 py-4 md:px-16 md:py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 md:gap-4 items-center justify-center text-lg md:text-4xl font-headBold">
              <button
                className="bg-white text-redInka py-1 px-3 md:py-2 md:px-7 rounded-sm md:rounded-lg cursor-pointer"
                onClick={handleClickRepsol}
              >
                Únete ahora
              </button>
              <span>y obtén beneficios </span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Registro */}
      <section id="video" className="relative">
        <div className="absolute inset-0 top-0 bottom-1/2 bg-white"></div>
        <div className="absolute inset-0 top-1/2 bottom-0 bg-blueInka"></div>

        <div className="relative max-w-5xl md:max-w-6xl mx-auto px-6 py-10 md:py-16">
          <h2 className="text-2xl md:text-5xl font-headBold text-blueInka text-center mb-6 md:mb-12">
            ¿Cómo registrarse correctamente?
          </h2>

          <div className="bg-white rounded-xl overflow-hidden aspect-video border-0">
            <VideosYoutube
              src="https://www.youtube.com/embed/Ki7mwbj0li0?si=2p8twtnYNMYygW9s"
              title="Primera Solicitud Repsol Más"
              className="aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Footer Logo */}
      <section id="footer">
        <div className="max-w-6xl mx-auto py-4 md:py-6">
          <Link href="/">
            <Image
              src="/images/logo-color.png"
              alt="Logo SAI"
              width={600}
              height={60}
              priority
              className="mx-auto w-[200px] md:w-[350px]"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
