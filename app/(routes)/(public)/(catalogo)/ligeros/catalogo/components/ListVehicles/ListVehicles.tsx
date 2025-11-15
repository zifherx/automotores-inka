import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardProductModel } from "@/components/Shared/CardProductModel";

import { iListVehicle, iModelo } from "@/types";
import { CardSkeletonModel } from "@/components/Shared/CardSkeletonModel";
import { ArrowRight } from "lucide-react";

export function ListVehicles({ models }: iListVehicle) {
  const [counterVehicles, setCounterVehicles] = useState(9);
  const dataFilteredVehicles = models?.slice(0, counterVehicles);

  const loadMoreVehicles = () => {
    setCounterVehicles(counterVehicles + 3);
  };

  // if (!dataFilteredVehicles || !models) {
  //   return <AutoLoadingSpinner />;
  // }

  return (
    <section>
      <h2 className="text-xl font-bold uppercase mb-3 text-blueInka">
        Ofertas en Autos, SUVs y Pickups
      </h2>

      <p className="text-grisDarkInka text-justify mb-10 leading-snug">
        Encuentra tu auto entre las más de 14 marcas que tenemos disponibles
        para ti. Podrás evaluar tu financiamiento y simular tu crédito online.
        Comienza el sueño de tu nuevo auto con nosotros.
      </p>

      {models.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
          {[...Array(3)].map((_, index) => (
            <CardSkeletonModel key={index} />
          ))}
        </div>
      )}

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {dataFilteredVehicles.map((item: iModelo) => (
          <CardProductModel key={item._id} model={item} />
        ))}
      </div>
      <div className="text-center my-8">
        {counterVehicles < models.length && (
          <Button
            className="p-6 text-white font-bold bg-blueInka transition-all duration-150 cursor-pointer rounded-xl hover:scale-105 hover:bg-blueDarkInka"
            onClick={loadMoreVehicles}
          >
            Ver más modelos
            <ArrowRight className="w-5 h-5 mr-2" strokeWidth={2} />
          </Button>
        )}
      </div>
    </section>
  );
}
