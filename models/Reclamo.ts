import { iSede } from "@/types";
import { Document, Schema, model, models } from "mongoose";

export interface iReclamo extends Document {
  //   Generales
  fecha: string;
  hora: string;
  numeroReclamo: string;
  // 1. Datos del Consumidor
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  email: string;
  celular: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  // 2. Datos del bien adquirido
  tipoBien: string;
  vin: string;
  placa: string;
  sedeCompra: string;
  sedeDealer: iSede;
  moneda: string;
  importeBien: number;
  descripcionBien: string;
  // 3. Detalle del reclamo y solicitud del reclamante
  tipoSolicitud: string;
  detalleSolicitud: string;
  pedidoSolicitud: string;
  isConforme: boolean;
}

// interface MarcaDocument extends iMarca, Document {}
// interface MarcaModel extends Model<MarcaDocument> {}

const reclamoSchema: Schema = new Schema<iReclamo>(
  {
    fecha: { type: String },
    hora: { type: String },
    numeroReclamo: { type: String },
    // 1. Datos del Consumidor
    tipoDocumento: { type: String },
    numeroDocumento: { type: String },
    nombres: { type: String },
    apellidos: { type: String },
    email: { type: String },
    celular: { type: String },
    departamento: { type: String },
    provincia: { type: String },
    distrito: { type: String },
    direccion: { type: String },
    // 2. Datos del bien adquirido
    tipoBien: { type: String },
    vin: { type: String },
    placa: { type: String },
    sedeCompra: { type: String },
    sedeDealer: { type: Schema.Types.ObjectId, ref: "Sucursal" },
    moneda: { type: String },
    importeBien: { type: Number },
    descripcionBien: { type: String },
    // 3. Detalle del reclamo y solicitud del reclamante
    tipoSolicitud: { type: String },
    detalleSolicitud: { type: String },
    pedidoSolicitud: { type: String },
    isConforme: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Reclamo = models.Reclamo || model<iReclamo>("Reclamo", reclamoSchema);

export default Reclamo;
