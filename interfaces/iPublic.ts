import { IconProp } from "@/types";
import { LucideIcon } from "lucide-react";

export interface iServicioSVG {
  id: number;
  title: string;
  imageUrl: string;
}

export interface iObjetivosEmpresa {
  id: number;
  title: string;
  description: string;
  bgDescription: string;
  imageUrl: string;
}

export interface iListValores {
  id: number;
  icon: LucideIcon;
  title: string;
  descriptionLight: string;
  descriptionDark: string;
}

export interface iListLinkUtiles {
  id: number;
  label: string;
  href: string;
}

export interface iReclamosRS {
  id: number;
  name: string;
  ruta: string;
}

export interface tDepartamento {
  id: number;
  name: string;
  value: string;
  provincias: tProvincia[];
}

export interface tProvincia {
  id: number;
  name: string;
  value: string;
}

export interface iOracion {
  oracion: string;
  linkHref?: string;
}

export interface iCompany {
  razonSocial: string;
  ruc: string;
  nomenclatura: string;
}

export interface iPosition {
  lat: number;
  lng: number;
}

export interface iIconText {
  id: number;
  icon: IconProp;
  text: string;
}

export interface iFiltrosTalleres {
  ciudad: string;
}

export interface iTalleres {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  marcas: iMarcaTaller[];
  horarios: iHorarioTaller;
  imageSource: string;
}

export interface iMarcaTaller {
  id: number;
  title: string;
  imageSource: string;
}

export interface iHorarioTaller {
  semana: string;
  sabado: string;
}
