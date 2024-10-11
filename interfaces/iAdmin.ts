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
