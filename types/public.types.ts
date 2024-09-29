import { iColor, iGallery } from "@/models";
import {
  iBrand,
  iCardModel,
  iChasis,
  iListBrand,
  iListModels,
  iModelo,
  iSede,
} from "./admin.types";
import { iOracion } from "@/interfaces";
import { LucideIcon } from "lucide-react";

export type iVideosYoutube = {
  src: string;
  title: string;
  className: string;
};

export type iTitle = {
  title: string;
  className: string;
};

export type iSubtitle = {
  subtitle: string;
  className?: string;
};

export type iCardServicios = {
  title: string;
  imageUrl: string;
};

export type iCircleProgress = {
  value: number;
  className?: string;
};

//Catalogo

export type iCatalogoLigeros = {
  brands: iBrand[];
  chasises: iChasis[];
  models: iModelo[];
};

export type iMigajas = {
  marca: string;
  modelo?: string;
};

export type iFiltros = {
  brands: iBrand[];
  chasises: iChasis[];
  setFilter: (filterName: string, filterValue: string) => void;
  clearFilter: () => void;
  filters: {
    marca: string;
    carroceria: string;
  };
};

export type iListVehicle = {
  models: iModelo[] | undefined;
};

export type iCardProductModel = {
  model: iModelo;
};

export type iCardObjetivo = {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  bgDescription: string;
};

export type iBannerHome = {
  imageSource: string;
  imageAlt: string;
};

export type iCardUbicanos = {
  params: iSede;
};

export type iFichaTecnica = {
  link: string;
};

export type iColores = {
  colores: iColor[];
};

export type iGalleries = {
  galeria: iGallery[];
};

export type iCotizacionMarca = iListModels & {
  listDepartamentos: iSedeDealer[];
};

export type iCotizacionCero = iListBrand & {
  listDepartamentos: iSedeDealer[];
};

export type iSideFormMarca = iCardModel & {
  listDepartamentos: iSedeDealer[];
};

export interface iSedeDealer {
  [key: string]: iConcesionario[];
}

export interface iConcesionario {
  name: string;
  slug: string;
  address: string;
}

export type iEmailTemplate = {
  nombres: string;
  tipoDocumento: string;
  numeroDocumento: string;
  email: string;
  celular: string;
  departamento: string;
  concesionario: string;
  intencionCompra: string;
  checkDatosPersonales: boolean;
  checkPromociones: string;
  marca: string;
  modelo: string;
  imageUrl: string;
  precioBase: number;
};

export type iCustomMessage = {
  message: string;
  volverInicio: () => void;
};

export type iCaratulaReclamo = {
  slugType: string;
};

export type iHojaReclamo = {
  slugType: string;
};

export type iParrafo = {
  id?: number;
  title: string;
  parrafos: iOracion[];
};

export type iCustomIconTitle = {
  icon: LucideIcon
  titleDark: string
  titleLight: string
  className: string
}