import { Document, model, models, Schema } from "mongoose";

interface iRequest {
  body: string;
  authorization: string;
  accept: string;
}

interface iResponse {
  body: string;
  code: number;
  statusText: string;
}

export interface iBitacora extends Document {
  request: iRequest;
  response: iResponse;
  method: string;
  url: string;
  date: Date;
}

const requestSchema: Schema = new Schema<iRequest>(
  {
    body: { type: String },
    authorization: { type: String },
    accept: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const responseSchema: Schema = new Schema<iResponse>(
  {
    body: { type: String },
    code: { type: Number },
    statusText: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const bitacoraSchema: Schema = new Schema<iBitacora>(
  {
    request: { type: requestSchema },
    response: { type: responseSchema },
    method: { type: String },
    url: { type: String },
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Bitacora =
  models.Bitacora || model<iBitacora>("Bitacora", bitacoraSchema);

export default Bitacora;
