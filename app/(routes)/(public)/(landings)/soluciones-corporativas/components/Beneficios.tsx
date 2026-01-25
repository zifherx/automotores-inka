"use client";

import Image from "next/image";
import { BeneficiosCorporativosData } from "@/data";

export function Beneficios() {
  const primeraFila = BeneficiosCorporativosData.filter((item) => item.id <= 3);
  const segundaFila = BeneficiosCorporativosData.filter((item) => item.id > 3);

  return (
    <section className="w-full relative">
      <div className="absolute -top-6 z-10 left-1/2 transform -translate-x-1/2">
        <button className="bg-white text-[#05224C] font-headBold px-8 py-3 rounded-full text-2xl">
          BENEFICIOS
        </button>
      </div>

      <div className="bg-[#05224C] w-full py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {primeraFila.map((item) => (
              <div key={item.id} className="p-4">
                <h3 className="text-white font-headBold text-2xl text-center mb-3">
                  {item.title}
                </h3>
                <div className="flex items-center justify-center gap-5">
                  <Image
                    src={`/assets/corporativo/${item.icon}`}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-16 h-16"
                  />
                  <p className="text-sm text-white text-justify leading-tight font-textRegular">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#6CA5EA] w-full py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {segundaFila.map((item) => (
              <div key={item.id} className="p-4">
                <h3 className="text-[#05224C] font-headBold text-2xl text-center mb-3">
                  {item.title}
                </h3>
                <div className="flex items-center justify-center gap-5">
                  <Image
                    src={`/assets/corporativo/${item.icon}`}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="w-16 h-16"
                  />
                  <p className="text-sm text-[#05224C] text-justify leading-tight font-textRegular">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
