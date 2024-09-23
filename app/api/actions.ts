"use server"

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getEmailFromResend(idMail: string){
    const query = await resend.emails.get(idMail)

    if(query.error === null) return {
        email: query.data?.to[1],
        status: query.data?.last_event,
        createdAt: query.data?.created_at
    }
}