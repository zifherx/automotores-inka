import { model, models, Schema } from "mongoose";

export interface iSystemEmail extends Document {
  email: string;
  createdBy: string;
  isActive: boolean;
}

const emailSchema: Schema = new Schema<iSystemEmail>(
  {
    email: { type: String, required: true },
    createdBy: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

export const SystemEmail =
  models.SystemEmail || model<iSystemEmail>("SystemEmail", emailSchema);
