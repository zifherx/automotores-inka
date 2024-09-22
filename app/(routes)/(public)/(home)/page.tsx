import BannerHome from "@/components/Shared/BannerHome/BannerHome";

import { BannerPortada } from "./components/BannerPortada";
import { VideoBienvenida } from "./components/VideoBienvenida";
import { ServiciosSlider } from "./components/ServiciosSlider";
import { AsesoriaAction } from "./components/AsesoriaAction";
import { BrandSlider } from "./components/BrandSlider";

import { dbConnect, serializeDocument } from "@/lib/";
import Cover from "@/models/Cover";
import Marca from "@/models/Marca";

export async function loadCovers() {
  await dbConnect();
  const query = await Cover.find({ isActive: true });
  return query.map(serializeDocument);
}

export async function loadBrands() {
  await dbConnect();

  const query = await Marca.find({ isActive: true });
  return query.map(serializeDocument);
}

export default async function HomePage() {
  const queryCovers = await loadCovers();
  const queryBrands = await loadBrands();

  return (
    <>
      <BannerPortada covers={queryCovers} />
      <BrandSlider brands={queryBrands} />
      <p>MasBuscados</p>
      <BannerHome imageAlt="Cover Geely 1" imageSource="geely-action1.jpeg" />
      <VideoBienvenida />
      <ServiciosSlider />
      <BannerHome imageAlt="Cover Geely 2" imageSource="geely-action2.jpeg" />
      {/* <AsesoriaAction /> */}
    </>
  );
}
