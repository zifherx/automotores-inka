import { NextRequest, NextResponse } from "next/server"
import Cybermotor from "@/models/Cybermotor"
import { dbConnect } from "@/lib"
import { iCustomer, tCybermotor } from "@/types"
import Cliente from "@/models/Cliente"

export async function POST(req: NextRequest){
    await dbConnect()
    const dataForm = await req.json()
    let newCustomer = null;
    
    try {

        const customerFound = await Cliente.findOne({numeroDocumento: dataForm.documento,});
          if (!customerFound) {
            const qCustomer = new Cliente({
              name: dataForm.name,
              tipoDocumento: "DNI",
              numeroDocumento: dataForm.documento,
              celular: dataForm.celular,
              email: dataForm.email,
              usoDatosPersonales: true,
              aceptaPromociones: true,
            }) as iCustomer;
      
            newCustomer = await qCustomer.save();
          }

        const newConcurso = new Cybermotor({
            ...dataForm,
            customer: customerFound ? customerFound._id : newCustomer?._id
        }) as tCybermotor

        const query = await newConcurso.save()

        return NextResponse.json({
            message: `Juego ${customerFound ? customerFound.name : newCustomer?.name} guardado con éxito`,
            obj: query
        })
        
    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}