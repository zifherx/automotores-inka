import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib";

import Concurso from "@/models/Concurso";
import { iContest } from "@/types";

export async function GET(req: NextRequest){
    await dbConnect()

    try {
        const query = await Concurso.find({})
        .sort({ fechaConcurso: 1})

        return NextResponse.json({total: query.length, obj: query})
    } catch (err) {
        console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
}
}

export async function POST(req: NextRequest){
    await dbConnect()
    const dataForm = await req.json()
    
    try {

        const newConcurso = new Concurso({
            ...dataForm
        }) as iContest

        const query = await newConcurso.save()

        return NextResponse.json({
            message: `Concurso ${dataForm.title} creado con éxito`,
            obj: query
        })
        
    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}