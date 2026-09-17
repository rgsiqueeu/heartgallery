import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { notifyNewLead } from "@/lib/email";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Please provide a valid email address.").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  // Persistir o lead é best-effort: em preview/prototype sem base de dados de
  // produção configurada (DATABASE_URL), isto não deve impedir o envio.
  try {
    await db.contactMessage.create({ data: { name, email, message } });
  } catch (err) {
    console.error("[contact] could not persist lead:", err);
  }

  notifyNewLead({ name, email, message }).catch((err) =>
    console.error("[contact] lead notification failed:", err)
  );

  return NextResponse.json({ ok: true });
}
