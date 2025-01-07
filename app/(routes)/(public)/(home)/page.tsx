import BannerHome from "@/components/Shared/BannerHome/BannerHome";

import { BannerPortada } from "./components/BannerPortada";
import { VideoBienvenida } from "./components/VideoBienvenida";
import { ServiciosSlider } from "./components/ServiciosSlider";
import { BrandSlider } from "./components/BrandSlider";

import { dbConnect, serializeDocument } from "@/lib/";
import Cover from "@/models/Cover";
import Marca from "@/models/Marca";
import { ModelosEnLiquidacion } from "./components/ModelosEnLiquidacion";
import { VideoCustom } from "@/components/Shared/VideoCustom";
import { tCustomvideo } from "@/types";

async function loadBrands() {
  await dbConnect();

  const query = await Marca.find({ isActive: true }).sort({ name: 1 });
  return query.map(serializeDocument);
}

export default async function HomePage() {
  const queryBrands = await loadBrands();

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
      <BrandSlider brands={queryBrands} />
      <ModelosEnLiquidacion />
      <VideoCustom
        bgSection={dataNewVideoMazda5.bgSection}
        parrafo={dataNewVideoMazda5.parrafo}
        title={dataNewVideoMazda5.title}
        uriVideoYoutube={dataNewVideoMazda5.uriVideoYoutube}
      />
      <ServiciosSlider />
      <VideoBienvenida />
      {/* <BannerHome
        imageAlt="Cover Geely 2"
        imageSource="geely-action2.jpeg"
        href="/posventa/separa-tu-cita"
      /> */}
    </>
  );
}
