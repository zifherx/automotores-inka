import { iColor, iGallery } from "@/models";
import {
  iBrand,
  iCardModel,
  iChasis,
  iListBrand,
  iListModels,
  iModelo,
  iReclamation,
  iSede,
} from "./admin.types";
import { iOracion, iReclamosRS } from "@/interfaces";
import { LucideIcon } from "lucide-react";
import { HReclamoFormValues } from "@/forms";

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
  models: iModelo[];
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
  href?: string;
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

export interface iTEmailCotizacion {
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
  tcambio: number;
}

export interface iTEmailReclamo {
  fecha: string;
  hora: string;
  numeroReclamo: string;
  nombres: string;
  apellidos: string;
  sedeCompra: string;
  razonSocial: string;
  direccionSede: string;
}

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
  icon: LucideIcon;
  titleDark: string;
  titleLight: string;
  className: string;
};

export type iTipoServicio = {
  id: number;
  label: string;
  value: string;
};

export type iShowingCar = {
  vehicle: iModelo;
};

export type tClaimAll = HReclamoFormValues & {
  sedeCompra: string;
  tipoBien: string;
  fecha: string;
  hora: string;
  numeroReclamo: string;
  razonSocial: string;
  rucEmpresa: string;
  direccionCliente: string;
  direccionSede: string;
  sedeCodexHR: string;
};
