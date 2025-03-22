import { model, Schema, Document, models } from "mongoose";

export type estadoPresupuesto =
  | "borrador"
  | "evaluacion"
  | "aprobado"
  | "rechazado"
  | "finalizado";

export interface iPresupuesto extends Document {
  name: string;
  mes: number;
  anio: number;
  estado: estadoPresupuesto;
  montoTotal: number;
  fechaRegistro: Date;
  observaciones?: string;
}

const presupuestoSchema: Schema = new Schema<iPresupuesto>(
  {
    name: { type: String, required: true },
    mes: { type: Number, required: true },
    anio: { type: Number, required: true },
    estado: { type: String },
    montoTotal: { type: Number, required: true },
    fechaRegistro: { type: Date, default: new Date() },
    observaciones: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Presupuesto =
  models.Presupuesto || model<iPresupuesto>("Presupuesto", presupuestoSchema);
