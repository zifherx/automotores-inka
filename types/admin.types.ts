import { LucideIcon } from "lucide-react";
import {
  iCarroceria,
  iCover,
  iMarca,
  iModel,
  iSucursal,
  iReclamo,
  iSystemEmail,
  iCotizacion,
  iCliente,
  iConcurso,
  iCita,
  iCybermotor,
  iTipoCambio,
} from "@/models";
import { iSedeDealer } from "./public.types";
import { iUser } from "@/interfaces/iAdmin";
import { User } from "@clerk/nextjs/server";

export type defaultDocument = {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Cover
export type iListCover = {
  covers: iPortada[];
};

export type iCardCover = {
  cover: iPortada;
};

export type iPortada = iCover & defaultDocument;

// Brand
export type iListBrand = {
  brands: iBrand[];
};

export type iCardBrand = {
  brand: iBrand;
};

export type iBrand = iMarca & defaultDocument;

// Chasis
export type iListChasis = {
  chasises: iChasis[];
};

export type iCardChasis = {
  chasis: iChasis;
};

export type iChasis = iCarroceria & defaultDocument;

// Modelo
export type iListModels = {
  models: iModelo[];
};

export type iCardModel = {
  model: iModelo;
};

export type iModelo = iModel & defaultDocument;

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

export type iSede = iSucursal & defaultDocument;

export type iFormCotizacionGeneral = iListBrand & {
  listDepartamentos: iSedeDealer[];
};

//Citas
export type iAppointment = iCita & defaultDocument;

//Reclamos
export type iReclamation = iReclamo & defaultDocument;

//Cliente
export type iCustomer = iCliente & defaultDocument;

//Cotizacion
export type iLead = iCotizacion & defaultDocument;

// EMAIL SYSTEM
export type iMailSystem = iSystemEmail & defaultDocument;

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

export type iContest = iConcurso & defaultDocument;

export type tCybermotor = iCybermotor & defaultDocument;

export type tUserPage = {
  users: iUser[];
};

export type tUser = User & iUser;

export type iExchange = iTipoCambio & defaultDocument;

export type iListTCambio = {
  tCambios: iExchange[];
};

export type iCardTCambio = {
  tCambio: iExchange;
};
