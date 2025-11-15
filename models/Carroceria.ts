import { Document, Model, Schema, model, models } from "mongoose";

export interface iCarroceria extends Document {
  name: string;
  slug: string;
  isActive: boolean;
  createdBy: string;
}

// interface CarroceriaDocument extends iCarroceria, Document {}
// interface CarroceriaModel extends Model<CarroceriaDocument> {}

const chasisSchema: Schema = new Schema<iCarroceria>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    isActive: { type: Boolean },
    createdBy: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Carroceria =
  models.Carroceria || model<iCarroceria>("Carroceria", chasisSchema);

export default Carroceria;
// export default models.Carroceria || model<iCarroceria>("Carroceria", chasisSchema);
