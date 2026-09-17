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
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Invalid input.";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    await db.contactMessage.create({ data: { name, email, message } });

    notifyNewLead({ name, email, message }).catch((err) =>
      console.error("[contact] lead notification failed:", err)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed:", err);
    return NextResponse.json(
      { error: "Could not send the message right now." },
      { status: 500 }
    );
  }
}
