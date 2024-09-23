import { Dispatch, SetStateAction } from "react";
import { iBrand, iChasis, iSede } from "./admin.types";

export type iFormAddCover = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormAddBrand = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormAddChasis = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormAddModel = {
  brands: iBrand[];
  chasises: iChasis[];
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormAddSucursal = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormEditSucursal = iFormAddSucursal & {
  sede: iSede;
};
