import { Document, model } from "mongoose";
import { models, Schema } from "mongoose";

export interface iCliente extends Document{
  name: string;
  tipoDocumento: string;
  numeroDocumento: string;
  celular: string;
  email: string;
  usoDatosPersonales: boolean;
  aceptaPromociones: boolean;
}

const clienteSchema: Schema = new Schema<iCliente>(
  {
    name: { type: String },
    tipoDocumento: { type: String },
    numeroDocumento: { type: String },
    celular: { type: String },
    email: { type: String },
    usoDatosPersonales: { type: Boolean },
    aceptaPromociones: { type: Boolean },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Cliente || model<iCliente>("Cliente", clienteSchema);
