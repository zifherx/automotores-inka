import { EmailTemplate } from "@/components/Shared/Email-Template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const dataForm = await req.json();

  try {
    // console.log(dataForm);

    const { data, error } = await resend.emails.send({
      from: `Automotores Inka 🤖 <bot@ziphonex.com>`,
      to: ["automotores.inka@ziphonex.com", `${dataForm.email}`],
      subject: `Nueva Cotización ✅ - ${dataForm.numeroDocumento}`,
      react: EmailTemplate({
        nombres: dataForm.nombres,
        tipoDocumento: dataForm.tipoDocumento,
        numeroDocumento: dataForm.numeroDocumento,
        celular: dataForm.celular,
        email: dataForm.email,
        departamento: dataForm.departamento,
        concesionario: dataForm.concesionario,
        intencionCompra: dataForm.intencionCompra,
        checkDatosPersonales: dataForm.checkDatosPersonales,
        checkPromociones: dataForm.checkPromociones,
        marca: dataForm.marca,
        modelo: dataForm.modelo,
        imageUrl: dataForm.imageUrl,
        precioBase: dataForm.precioBase,
      }),
      text: `Envío de cotización a ${dataForm.nombres}`,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json({ message: "Mensaje enviado", mail: data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
