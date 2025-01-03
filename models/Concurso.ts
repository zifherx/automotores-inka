import { Document, model, models, Schema } from "mongoose";

export interface iPremio{
    name: string
}

export interface iConcurso extends Document {
    codex: string
    title: string
    bases: string
    premios: iPremio[]
    fechaConcurso: Date
}

const concursoSchema: Schema = new Schema<iConcurso>({
    codex: { type: String, required: true},
    title: { type: String, required: true},
    bases: { type: String, required: true},
    premios: [
        {
            name: { type: String}
        }
    ],
    fechaConcurso: { type: Date, default: new Date()}
},{
    versionKey: false,
    timestamps: true
})

const Concurso = models.Concurso || model<iConcurso>("Concurso", concursoSchema)

export default Concurso