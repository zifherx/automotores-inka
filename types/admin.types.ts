import {
  iCarroceria,
  iCover,
  iMarca,
  iModel,
  iSucursal,
  iReclamo,
} from "@/models";
import { iSedeDealer } from "./public.types";
import { iCotizacion } from "@/models/Cotizacion";
import { iCliente } from "@/models/Cliente";

// Cover
export type iListCover = {
  covers: iPortada[];
};

export type iCardCover = {
  cover: iPortada;
};

export type iPortada = iCover & { _id: string };

// Brand
export type iListBrand = {
  brands: iBrand[];
};

export type iCardBrand = {
  brand: iBrand;
};

export type iBrand = iMarca & { _id: string };

// Chasis
export type iListChasis = {
  chasises: iChasis[];
};

export type iCardChasis = {
  chasis: iChasis;
};

export type iChasis = iCarroceria & { _id: string };

// Modelo
export type iListModels = {
  models: iModelo[];
};

export type iCardModel = {
  model: iModelo;
};

export type iModelo = iModel & { _id: string };

export type iBtnAddModel = {
  brands: iBrand[];
  chasises: iChasis[];
};

// SEDE
export type iListSede = {
  sedes: iSede[];
};

export type iCardSede = {
  sede: iSede;
};

export type iSede = iSucursal & { _id: string };

export type iFormCotizacionGeneral = iListBrand & {
  listDepartamentos: iSedeDealer[];
};

export type iReclamation = iReclamo & { _id: string };

export type iCustomer = iCliente & { _id: string} 

export type iLead = iCotizacion & { _id: string}