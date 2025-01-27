import { Dispatch, SetStateAction } from "react";
import {
  iCardBrand,
  iChasis,
  iMailSystem,
  iPortada,
  iSede,
} from "./admin.types";

export type tFormAdding = {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};

export type iFormEditMail = tFormAdding & {
  mail: iMailSystem;
};

export type tFormEditSucursal = tFormAdding & {
  sede: iSede;
};

export type tFormEditChasis = tFormAdding & {
  chasis: iChasis;
};

export type tFormEditCover = tFormAdding & {
  portada: iPortada;
};

export type tFormEditMarca = tFormAdding & iCardBrand;
