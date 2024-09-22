import { Document, Model, Schema, model, models } from "mongoose";

export interface iMarca extends Document {
  name: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
  createdBy: string;
}

// interface MarcaDocument extends iMarca, Document {}
// interface MarcaModel extends Model<MarcaDocument> {}

const marcaSchema: Schema = new Schema<iMarca>(
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

const Marca = models.Marca || model<iMarca>("Marca", marcaSchema);

export default Marca;
