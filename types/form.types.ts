import { Dispatch, SetStateAction } from "react";
import { iChasis, iMailSystem, iSede } from "./admin.types";

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
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormAddSucursal = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormAddGeneral = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormEditMail = iFormAddGeneral & {
  mail: iMailSystem;
};

export type iFormAddContest = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type tFormAdding = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type tFormEditSucursal = tFormAdding & {
  sede: iSede;
};

export type tFormEditChasis = tFormAdding & {
  chasis: iChasis;
};
