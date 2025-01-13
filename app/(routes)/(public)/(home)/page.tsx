import { BannerPortada } from "./components/BannerPortada";
import { VideoBienvenida } from "./components/VideoBienvenida";
import { ServiciosSlider } from "./components/ServiciosSlider";
import { BrandSlider } from "./components/BrandSlider";
import { ModelosEnLiquidacion } from "./components/ModelosEnLiquidacion";
import { VideoCustom } from "@/components/Shared/VideoCustom";

import { tCustomvideo } from "@/types";

export default async function HomePage() {
  const dataNewVideoMazda5: tCustomvideo = {
    bgSection: "bg-[url('/images/fondo-tramado-gris.png')]",
    title: "Mazda MX-5: El Placer de la Libertad",
    uriVideoYoutube: "OixCoqezLbI?si=SOHLgbqantwV47LY",
    parrafo: [
      "Experimenta la verdadera esencia de conducción en el icónico Mazda MX-5. Cada curva, cada kilómetro, se transforma en una conexión pura entre el camino y tus emociones.",
      "Con su diseño descapotable y su ligereza inigualable, el MX-5 está diseñado para que sientas el viento y la potencia de cada viaje.",
    ],
  };

  return (
    <>
      <BannerPortada />
      <BrandSlider />
      <ModelosEnLiquidacion />
      <VideoCustom
        bgSection={dataNewVideoMazda5.bgSection}
        parrafo={dataNewVideoMazda5.parrafo}
        title={dataNewVideoMazda5.title}
        uriVideoYoutube={dataNewVideoMazda5.uriVideoYoutube}
      />
      <ServiciosSlider />
      <VideoBienvenida />
    </>
  );
}
