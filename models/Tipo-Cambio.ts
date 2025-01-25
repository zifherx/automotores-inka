import { Document, model, models, Schema } from "mongoose";

export interface iTipoCambio extends Document {
  fechaTC: string;
  tipo_cambio: number;
  fechaCreado: Date;
  isActive: boolean;
  createdBy: string;
}

const tcambioSchema: Schema = new Schema<iTipoCambio>(
  {
    fechaTC: { type: String },
    tipo_cambio: { type: Number, required: true },
    fechaCreado: { type: Date },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TipoCambio =
  models.TipoCambio || model<iTipoCambio>("TipoCambio", tcambioSchema);

export default TipoCambio;
