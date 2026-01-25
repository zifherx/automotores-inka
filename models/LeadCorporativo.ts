import { model, models, Schema } from "mongoose";

import { iBrand } from "@/types";

export interface iLeadCorporativo extends Document {
  // 1. Datos de Contacto
  nombres: string;
  apellidos: string;
  dni: string;
  correoElectronico: string;
  celular: string;
  // 2. Datos de Empresa
  razonSocial: string;
  ruc: string;
  // 3. Información Adicional (opcionales)
  marca: iBrand;
  marcaText: string;
  ciudad: string;
  intencionCompra: string;
  sector: string;
  fechaCreacion: Date;
}

const leadCorporativoSchema: Schema = new Schema<iLeadCorporativo>(
  {
    nombres: { type: String, required: true, trim: true },
    apellidos: { type: String, required: true, trim: true },
    dni: { type: String },
    correoElectronico: { type: String },
    celular: { type: String },
    razonSocial: { type: String },
    ruc: { type: String },
    marca: { type: Schema.Types.ObjectId, ref: "Marca" },
    marcaText: { type: String },
    ciudad: { type: String },
    intencionCompra: { type: String },
    sector: { type: String },
    fechaCreacion: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const LeadCorporativo =
  models.LeadCorporativo ||
  model<iLeadCorporativo>("LeadCorporativo", leadCorporativoSchema);

export default LeadCorporativo;
