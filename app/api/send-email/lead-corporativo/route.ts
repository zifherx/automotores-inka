import { EmailLeadCorporativo } from "@/components/Shared/Email-Lead-Corporativo";
import { SystemEmail } from "@/models";
import { iMailSystem, LeadCorporativoRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body: LeadCorporativoRequest = await req.json();

  let corporativoMail: iMailSystem | null;

  corporativoMail = await SystemEmail.findOne({
    area: "Corporativo",
    isActive: true,
  });

  if (!corporativoMail) {
    return NextResponse.json({ message: `Mail Corporativo no encontrado` });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Automotores Inka 🤖 <bot@ziphonex.com>`,
      // to: [`${body.correoElectronico}`],
      to: [`${corporativoMail.email}`],
      bcc: [`automotores.inka@ziphonex.com`],
      subject: `Lead Corporativo ✅ - ${body.ruc}`,
      react: EmailLeadCorporativo({
        nombreCompleto: body.nombreCompleto,
        dni: body.dni,
        correoElectronico: body.correoElectronico,
        celular: body.celular,
        razonSocial: body.razonSocial,
        ruc: body.ruc,
        marcaText: body.marcaText,
        intencionCompra: body.intencionCompra,
      }),
      text: `Envío de cotización corporativa a ${body.razonSocial}`,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json({
      message: "Mensaje enviado",
      data,
    });
  } catch (err: any) {
    // console.log(err);
    // console.log(err.message);
    console.error(err.message);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
