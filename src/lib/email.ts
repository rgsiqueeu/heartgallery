import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface NewLeadInput {
  name: string;
  email: string;
  message: string;
}

export async function notifyNewLead({ name, email, message }: NewLeadInput) {
  if (!resend || !process.env.STUDIO_NOTIFY_EMAIL) {
    console.warn(
      "[email] RESEND_API_KEY or STUDIO_NOTIFY_EMAIL not set — skipping lead notification email."
    );
    return;
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "HeartGallery Site <onboarding@resend.dev>",
    to: process.env.STUDIO_NOTIFY_EMAIL,
    replyTo: email,
    subject: `Nova ideia recebida — ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
  });
}
