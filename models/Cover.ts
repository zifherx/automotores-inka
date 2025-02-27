import { Document, Schema, model, models } from "mongoose";

export interface iCover extends Document {
  name: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
  createdBy: string;
}

const coverSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    imageUrl: { type: String },
    isActive: { type: Boolean },
    createdBy: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Cover = models.Cover || model<iCover>("Cover", coverSchema);
