import {
  iCarroceria,
  iCover,
  iMarca,
  iModel,
  iSucursal,
  iReclamo,
  iSystemEmail,
} from "@/models";
import { iSedeDealer } from "./public.types";
import { iCotizacion } from "@/models/Cotizacion";
import { iCliente } from "@/models/Cliente";
import { iCita } from "@/models/Citas";
import { LucideIcon } from "lucide-react";
import { iConcurso } from "@/models/Concurso";
import { iCybermotor } from "@/models/Cybermotor";

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

//Citas
export type iAppointment = iCita & { _id: string };

//Reclamos
export type iReclamation = iReclamo & { _id: string };

//Cliente
export type iCustomer = iCliente & { _id: string };

//Cotizacion
export type iLead = iCotizacion & { _id: string };

// EMAIL SYSTEM
export type iMailSystem = iSystemEmail & { _id: string };

export type iListMailSystem = {
  mails: iMailSystem[];
};

//Dashboard Cards
export type tDashbordCard = {
  title: string;
  icon: LucideIcon;
  mainValue: string;
  subtitle: string;
  isLoadingValue?: boolean;
};

// Concurso Types
export type iListContest = {
  contests: iContest[];
};

export type iCardContest = {
  contest: iContest;
};

export type iContest = iConcurso & { _id: string };

export type tCybermotor = iCybermotor & {_id: string}