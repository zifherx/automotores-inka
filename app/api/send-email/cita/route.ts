import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SystemEmail } from "@/models";
import { iMailSystem } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const dataForm = await req.json();

  const getSystemMail: iMailSystem[] = await SystemEmail.find({
    isActive: true,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: `Automotores Inka 🤖 <bot@ziphonex.com>`,
      to: [`${dataForm.email}`],
      bcc: [`automotores.inka@ziphonex.com`, `${getSystemMail[0].email}`],
      subject: `Nueva Cita ✅ - ${dataForm.numeroDocumento}`,
      react: null,
      text: `Registro de cita por ${dataForm.nombres}`,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json({ message: "Mensaje enviado", mail: data });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
