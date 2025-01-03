import { iLead } from "@/types"
import { Schema, Document, models, model } from "mongoose"

export interface iCorreo extends Document{
    from: string
    to: string[]
    subject: string
    text: string
    cotizacion: iLead 
}

const correoSchema: Schema = new Schema<iCorreo>({
    from: { type: String },
    to: [{ type: String }],
    subject: { type: String },
    text: { type: String },
    cotizacion: { type: Schema.Types.ObjectId, ref: 'Cotizacion'}
}, {
    versionKey: false,
    timestamps: true
})

const Correo = models.Correo || model<iCorreo>("Correo", correoSchema)

export default Correo