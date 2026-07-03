import { resend, FROM } from '../client'
export const sendWelcome = (to: string, name: string) =>
  resend.emails.send({
    from: FROM, to,
    subject: 'Welcome to Tera-Tech Ltd',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h1 style="color:#0072CE">Welcome, ${name}!</h1>
        <p>Thank you for joining Tera-Tech Ltd. Please verify your email to activate your account.</p>
        <p style="color:#666;font-size:13px">Tera-Tech Ltd · Sonac Street, Bamenda, Cameroon</p>
      </div>
    `,
  })
