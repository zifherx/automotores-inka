import { ExcelRowStatus, iModelo } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface iFilterBar {
  // Precio
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  // Marcas
  marcas: string[];
  selectedMarca: string;
  setSelectedMarca: Dispatch<SetStateAction<string>>;
  // Carroceria
  carroceriaType: string[];
  selectedCarroceria: string[];
  setSelectedCarroceria: Dispatch<SetStateAction<string[]>>;
}

export interface iUser {
  id: string;
  banned: boolean;
  hasImage: boolean;
  imageUrl: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  createdAt: number;
  updatedAt: number;
}

export interface IExcelData {
  headers: string[];
  data: any[][];
}

export interface IPriceImportRow {
  marca: string;
  modelo: string;
  nombre_fd: string;
  precio: number;
  glp: boolean;
  entrega: boolean;
  liquidacion: boolean;
  nuevo: boolean;
  matchedVehicle?: iModelo;
  status: ExcelRowStatus;
}
