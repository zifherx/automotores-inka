import { model, models, Schema } from "mongoose";

import { iCliente } from "./Cliente";
import { iBrand } from "@/types";

export interface iLeadCorporativo extends Document {
  cliente: iCliente;
  marca: iBrand;
  marcaText: string;
  intencionCompra: string;
  fechaCreacion: Date;
}

const leadCorporativoSchema: Schema = new Schema<iLeadCorporativo>(
  {
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente" },
    marca: { type: Schema.Types.ObjectId, ref: "Marca" },
    marcaText: { type: String },
    intencionCompra: { type: String },
    fechaCreacion: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const LeadCorporativo =
  models.LeadCorporativo ||
  model<iLeadCorporativo>("LeadCorporativo", leadCorporativoSchema);

export default LeadCorporativo;
