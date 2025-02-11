import { iOracion } from "@/interfaces";
import { iParrafo } from "@/types";
import { Document, model, models, Schema } from "mongoose";

export interface iNoticia extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: iParrafo[];
  category: unknown;
  date: Date;
  imagePortada: string;
  createdBy: string;
  isActive: boolean;
}

const OracionSchema: Schema = new Schema<iOracion>(
  {
    oracion: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ParrafoSchema: Schema = new Schema<iParrafo>(
  {
    id: { type: Number },
    title: { type: String },
    parrafos: [OracionSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const noticiaSchema: Schema = new Schema<iNoticia>(
  {
    title: { type: String },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: [ParrafoSchema],
    category: { type: String, default: null },
    date: { type: Date, default: Date.now },
    imagePortada: { type: String, required: true },
    createdBy: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Noticia =
  models.Noticia || model<iNoticia>("Noticia", noticiaSchema);
