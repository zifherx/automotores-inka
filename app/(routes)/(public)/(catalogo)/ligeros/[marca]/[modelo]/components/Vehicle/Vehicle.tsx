import { Banner } from "./Banner";
import { Feature } from "./Feature";
import { FichaTecnica } from "./FichaTecnica";
import { Color } from "./Color";
import { Gallery } from "./Gallery/Gallery";
import { CotizaAhora } from "./CotizaAhora";

import { iCardModel } from "@/types";

export function Vehicle(props: iCardModel) {
  const { model } = props;

  return (
    <>
      <Banner model={model} />
      <Feature features={model.features} />
      <FichaTecnica link={`${model.fichaTecnica}`} />
      <Color colores={model.colores} />
      <Gallery galeria={model.galeria} />
      <CotizaAhora model={model} />
    </>
  );
}
