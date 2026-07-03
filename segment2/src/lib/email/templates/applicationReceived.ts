import { resend, FROM } from '../client'
export const sendApplicationReceived = (to:string, name:string, track:string) =>
  resend.emails.send({
    from:FROM, to,
    subject:'Application received — Tera-Tech Ltd',
    html:`<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0072CE;padding:24px 32px"><h1 style="color:#fff;font-weight:300;font-size:22px;margin:0">Tera-Tech Ltd</h1></div>
      <div style="padding:32px">
        <p>Hi ${name},</p>
        <p style="margin-top:12px">We received your application for <strong>${track}</strong>. Our team will review it within 3–5 business days.</p>
        <a href="${process.env.NEXTAUTH_URL}/portal/status" style="display:inline-block;margin-top:24px;padding:10px 20px;background:#0072CE;color:#fff;text-decoration:none;border-radius:4px;font-size:14px">Track your application</a>
        <p style="font-size:13px;color:#888;margin-top:24px">Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div></div>`,
  })
