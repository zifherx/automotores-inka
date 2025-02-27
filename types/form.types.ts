import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  iCardBrand,
  iCardModel,
  iCardNoticia,
  iChasis,
  iMailSystem,
  iPortada,
  iSede,
} from "./admin.types";
import { PortadasFormValues } from "@/forms";

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

export type tRefreshBtn = {
  refreshAction: () => void;
  isLoading: boolean;
};

export type tLayoutContentTitle = {
  titulo: string;
  qty: number;
};

export type tFormGeneric = {
  portada?: iPortada;
  onSubmit: () => void;
};

export type tTemplateProps = tRefreshBtn &
  tLayoutContentTitle & {
    childrenGeneric: ReactNode;
    actionSubmit: ReactNode;
  };

export type tFormEditMarca = tFormAdding & iCardBrand;
export type tFormEditModelo = tFormAdding & iCardModel;
export type tFormEditNoticia = tFormAdding & iCardNoticia;

export type tTableGenericProps = {
  onEdit: (cover: iPortada) => void;
  // onDelete: (id: string) => void;
};
