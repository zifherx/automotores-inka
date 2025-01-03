import { iCustomer, iModelo, iSede } from "@/types";
import { Document, model, models, Schema } from "mongoose";

export interface iCita extends Document {
  cliente: iCustomer;
  placa: string;
  kilometraje: string;
  ciudadSede: string;
  marcaFlat: string;
  modeloFlat: string;
  modelo: iModelo;
  concesionario: iSede;
  tipoServicio: string;
  comentario: string;
}

const citaSchema: Schema = new Schema<iCita>(
  {
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", default: null },
    placa: { type: String, required: true },
    kilometraje: { type: String, required: true },
    ciudadSede: { type: String, required: true },
    marcaFlat: { type: String, required: true },
    modeloFlat: { type: String, required: true },
    modelo: { type: Schema.Types.ObjectId, ref: "Modelo", default: null },
    concesionario: { type: Schema.Types.ObjectId, ref: "Sucursal" },
    tipoServicio: { type: String, required: true },
    comentario: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Cita = models.Cita || model<iCita>("Cita", citaSchema);

export default Cita;
