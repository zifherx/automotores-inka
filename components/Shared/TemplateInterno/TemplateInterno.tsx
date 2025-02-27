import { DashboardTitulo } from "../DashboardTitulo";
import { BotonRefresh } from "../BotonRefresh";
import { BotonNuevo } from "../BotonNuevo";

import { tTemplateProps } from "@/types";
import { cloneElement, FC, ReactElement } from "react";

export const TemplateInterno: FC<tTemplateProps> = ({
  isLoading,
  children,
  childrenGeneric,
  openDialog,
  setOpenDialog,
  refreshAction,
  titleDialog,
  titulo,
  actionSubmit,
}: tTemplateProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <DashboardTitulo titulo={titulo} />
        <div className="flex justify-between gap-1">
          <BotonRefresh isLoading={isLoading} refreshAction={refreshAction} />
          <BotonNuevo
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            titleDialog={titleDialog}
          >
            {cloneElement(childrenGeneric as ReactElement, {
              isLoading,
              actionSubmit,
            })}
          </BotonNuevo>
        </div>
      </div>
      {children}
    </div>
  );
};
