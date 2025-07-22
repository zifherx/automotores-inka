import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { TEmailCotizacion } from "@/components/Shared/T-Email-Cotizacion";
import { iMailSystem, iTEmailCotizacion } from "@/types";
import { SystemEmail } from "@/models";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const dataForm: iTEmailCotizacion = await req.json();

  let systemMail: iMailSystem | null;

  systemMail = await SystemEmail.findOne({
    area: "Comercial",
    isActive: true,
  });

  if (!systemMail)
    return NextResponse.json({ message: `Mail Comercial no encontrado` });

  try {
    const { data, error } = await resend.emails.send({
      from: `Automotores Inka 🤖 <bot@ziphonex.com>`,
      to: [`${dataForm.email}`],
      bcc: [`automotores.inka@ziphonex.com`, `${systemMail.email}`],
      subject: `Nueva Cotización ✅ - ${dataForm.numeroDocumento}`,
      react: TEmailCotizacion({
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
        tcambio: 3.8,
      }),
      text: `Envío de cotización a ${dataForm.nombres}`,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    console.log("Q: ", data);

    return NextResponse.json({ message: "Mensaje enviado", mail: data });
  } catch (err: any) {
    console.log(err);
    console.log(err.message);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
