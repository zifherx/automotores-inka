import { Document, model, models, Schema } from "mongoose";

import { iCliente } from "./Cliente";

export interface iCybermotor extends Document {
    customer: iCliente
    resultado: number
    premio: string
    fTirarDado: Date
}

const cybermotorSchema: Schema = new Schema<iCybermotor>({
    customer: { type: Schema.Types.ObjectId, ref: "Cliente"},
    resultado: { type: Number },
    premio: { type: String },
    fTirarDado: { type: Date, default: new Date()}
},{
    versionKey: false,
    timestamps: true
})

const Cybermotor = models.Cybermotor || model<iCybermotor>("Cybermotor", cybermotorSchema)

export default Cybermotor