import { BannerPortada } from "./components/BannerPortada";
import { BrandSlider } from "./components/BrandSlider";
import { VideoCustom } from "@/components/Shared/VideoCustom";
import { ServiciosSlider } from "./components/ServiciosSlider";
import { VideoBienvenida } from "./components/VideoBienvenida";
import { dataNewVideoMazda5 } from "@/data";

export default async function HomePage() {
  return (
    <>
      <BannerPortada />
      <BrandSlider />
      <VideoCustom {...dataNewVideoMazda5} />
      <ServiciosSlider />
      <VideoBienvenida />
    </>
  );
}
