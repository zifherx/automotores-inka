import { Document, Schema, model, models } from "mongoose";
import { iBrand } from "@/types";

export interface iSucursal extends Document {
  name: string;
  slug: string;
  codexHR: string;
  imageUrl: string;
  ciudad: string;
  address: string;
  scheduleRegular: string;
  scheduleExtended: string;
  linkHowArrived: string;
  marcasDisponibles: iBrand[];
  isActive: boolean;
  createdBy: string;
}

const sucursalSchema: Schema = new Schema<iSucursal>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    codexHR: { type: String, required: true, lowercase: true },
    imageUrl: { type: String },
    address: { type: String },
    ciudad: { type: String },
    scheduleRegular: { type: String },
    scheduleExtended: { type: String },
    linkHowArrived: { type: String },
    marcasDisponibles: [{ type: Schema.Types.ObjectId, ref: "Marca" }],
    isActive: { type: Boolean },
    createdBy: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Sucursal =
  models.Sucursal || model<iSucursal>("Sucursal", sucursalSchema);

export default Sucursal;
