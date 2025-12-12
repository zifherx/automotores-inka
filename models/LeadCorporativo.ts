import { model, models, Schema } from "mongoose";

import { iBrand } from "@/types";

export interface iLeadCorporativo extends Document {
  // 1. Datos de Contacto
  nombreCompleto: string;
  dni: string;
  correoElectronico: string;
  celular: string;
  // 2. Datos de Empresa
  razonSocial: string;
  ruc: string;
  // 3. Información Adicional (opcionales)
  marca: iBrand;
  marcaText: string;
  intencionCompra: string;
  fechaCreacion: Date;
}

const leadCorporativoSchema: Schema = new Schema<iLeadCorporativo>(
  {
    nombreCompleto: { type: String },
    dni: { type: String },
    correoElectronico: { type: String },
    celular: { type: String },
    razonSocial: { type: String },
    ruc: { type: String },
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
