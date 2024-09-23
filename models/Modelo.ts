import { Document, Schema, model, models } from "mongoose";
import { iBrand, iChasis } from "@/types";

export interface iColor {
  label: string;
  hex: string;
  carColor: string;
  isActive: boolean;
}

export interface iFeatures {
  feature1: iFeature[];
  feature2: iFeature[];
}

export interface iFeature {
  superTitle: string;
  mainTitle: string;
  subTitle: string;
}

export interface iGallery {
  id: number;
  name: string;
  imageUrl: string;
}

export interface iModel extends Document {
  name: string;
  slug: string;
  imageUrl: string;
  precioBase: number;
  fichaTecnica: string;
  marca: iBrand;
  carroceria: iChasis;
  isEntrega48H: boolean;
  isGLP: boolean;
  colores: iColor[];
  features: iFeatures;
  galeria: iGallery[];
  isActive: boolean;
  createdBy: string;
}

const modeloSchema: Schema = new Schema<iModel>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    imageUrl: { type: String },
    precioBase: { type: Number },
    fichaTecnica: { type: String },
    isEntrega48H: { type: Boolean },
    isGLP: { type: Boolean },
    colores: [
      {
        label: { type: String },
        hex: { type: String },
        carColor: { type: String },
        isActive: { type: Boolean },
      },
    ],
    features: {
      feature1: [
        {
          superTitle: { type: String },
          mainTitle: { type: String },
          subTitle: { type: String },
        },
      ],
      feature2: [
        {
          superTitle: { type: String },
          mainTitle: { type: String },
          subTitle: { type: String },
        },
      ],
    },
    galeria: [
      {
        name: { type: String },
        imageUrl: { type: String },
      },
    ],
    marca: { type: Schema.Types.ObjectId, ref: "Marca" },
    carroceria: { type: Schema.Types.ObjectId, ref: "Carroceria" },
    isActive: { type: Boolean },
    createdBy: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default models.Modelo || model<iModel>("Modelo", modeloSchema);
