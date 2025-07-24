import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { TEmailReclamo } from "@/components/Shared/T-Email-Reclamo";
import { iMailSystem, tClaimAll } from "@/types";
import { SystemEmail } from "@/models";
import { makePDFCorreoReclamo } from "@/lib/makePdf";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const dataForm: tClaimAll = await req.json();

  const pdfOutput = makePDFCorreoReclamo(dataForm);

  let systemMail: iMailSystem | null;

  systemMail = await SystemEmail.findOne({
    area: "Reclamos",
    isActive: true,
  });

  if (!systemMail)
    return NextResponse.json({ message: `Mail Reclamos no encontrado` });

  try {
    const { data, error } = await resend.emails.send({
      from: `Automotores Inka 🤖 <bot@ziphonex.com>`,
      to: [`marco.julca@automotoresinka.com`],
      // bcc: [`automotores.inka@ziphonex.com`],
      bcc: [
        `automotores.inka@ziphonex.com`,
        `${systemMail.email}`,
        `${dataForm.email ? dataForm.email : ""}`,
      ],
      subject: `Nuevo Reclamo ❗ - ${dataForm.numeroDocumento}`,
      react: TEmailReclamo({
        nombres: dataForm.nombres,
        apellidos: dataForm.apellidos,
        fecha: dataForm.fecha,
        hora: dataForm.hora,
        numeroReclamo: dataForm.numeroReclamo,
        sedeCompra: dataForm.sedeCompra,
        razonSocial: dataForm.razonSocial,
        direccionSede: dataForm.direccionSede,
      }),
      text: `Envío de cotización a ${dataForm.nombres}`,
      attachments: [
        {
          filename: `${dataForm.numeroReclamo}-${dataForm.numeroDocumento}.pdf`,
          content: Buffer.from(pdfOutput),
        },
      ],
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    console.log("Q:", data);

    return NextResponse.json({ message: "Mensaje enviado", mail: data });
  } catch (err: any) {
    console.log(err);
    console.log(err.message);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
