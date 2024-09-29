import { Document, model, models, Schema } from "mongoose";

import { iModel } from "./Modelo";
import { iSucursal } from "./Sucursal";
import { iCliente } from "./Cliente";

export interface iCotizacion extends Document {
  cliente: iCliente;
  vehiculo: iModel;
  ciudad: string;
  sede: iSucursal;
  intencionCompra: string;
}

const cotizacionSchema: Schema = new Schema<iCotizacion>(
  {
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente" },
    vehiculo: { type: Schema.Types.ObjectId, ref: "Modelo" },
    ciudad: { type: String },
    sede: { type: Schema.Types.ObjectId, ref: "Sucursal" },
    intencionCompra: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Cotizacion =
  models.Cotizacion || model<iCotizacion>("Cotizacion", cotizacionSchema);

export default Cotizacion;
