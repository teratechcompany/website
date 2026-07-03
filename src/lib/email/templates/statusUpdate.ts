import { resend, FROM } from '../client'
const COPY: Record<string,{subject:string;body:string}> = {
  screening:{ subject:'Your application is under review', body:'Good news — your application has moved to screening. We are reviewing your background and portfolio.' },
  interview:{ subject:'Interview invitation from Tera-Tech', body:'Congratulations! You have been selected for a technical interview. Our team will contact you to schedule.' },
  offered:  { subject:'You have received an offer', body:'We are pleased to extend you an offer. Log in to your portal to view and accept it.' },
  accepted: { subject:'Welcome to Tera-Tech Ltd!', body:'Your offer has been accepted. Welcome to the team! Your onboarding coordinator will be in touch shortly.' },
  rejected: { subject:'Update on your application', body:'Thank you for applying. After careful review, we are unable to move forward at this time. We encourage you to apply in a future cycle.' },
}
export const sendStatusUpdate = (to:string, name:string, status:string) => {
  const c = COPY[status]; if (!c) return Promise.resolve(null)
  return resend.emails.send({
    from:FROM, to, subject:c.subject,
    html:`<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0072CE;padding:24px 32px"><h1 style="color:#fff;font-weight:300;font-size:22px;margin:0">Tera-Tech Ltd</h1></div>
      <div style="padding:32px"><p>Hi ${name},</p><p style="margin-top:12px">${c.body}</p>
        <a href="${process.env.NEXTAUTH_URL}/portal/status" style="display:inline-block;margin-top:24px;padding:10px 20px;background:#0072CE;color:#fff;text-decoration:none;border-radius:4px">View Portal</a>
        <p style="font-size:13px;color:#888;margin-top:24px">Tera-Tech Ltd · contact@teratechcompany.tech</p>
      </div></div>`,
  })
}
