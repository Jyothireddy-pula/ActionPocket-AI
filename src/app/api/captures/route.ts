import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { extractActions } from "@/lib/ai/extractor";

const CreateCaptureSchema = z.object({
  text: z.string().min(1).max(50000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown;
    const parsed = CreateCaptureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }
    const { text } = parsed.data;

    // Try to save to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const isDemoMode = !supabaseUrl || supabaseUrl === "your_supabase_url";

    const extraction = await extractActions(text);

    if (!isDemoMode) {
      try {
        const { createClient } = await import("@/lib/supabase/server");
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("captures").insert({
            user_id: user.id,
            raw_text: text,
            processed: true,
          });
        }
      } catch {
        // ignore storage errors in demo
      }
    }

    return NextResponse.json({ extraction }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isDemoMode = !supabaseUrl || supabaseUrl === "your_supabase_url";
  if (isDemoMode) {
    return NextResponse.json([]);
  }
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data } = await supabase.from("captures").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
