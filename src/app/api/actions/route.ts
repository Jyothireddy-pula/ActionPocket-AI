import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateActionSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).nullable().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]).default("pending"),
  due_date: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  capture_id: z.string().nullable().optional(),
});

function isDemoMode() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !url || url === "your_supabase_url";
}

export async function GET(req: NextRequest) {
  if (isDemoMode()) return NextResponse.json([]);
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");

    let query = supabase.from("actions").select("*").eq("user_id", user.id);

    if (status) query = query.eq("status", status);
    if (priority) query = query.eq("priority", priority);

    const now = new Date().toISOString().split("T")[0];
    if (filter === "today") {
      query = query.eq("due_date", now).neq("status", "completed");
    } else if (filter === "upcoming") {
      query = query.gt("due_date", now).neq("status", "completed");
    } else if (filter === "overdue") {
      query = query.lt("due_date", now).neq("status", "completed");
    }

    const { data } = await query.order("created_at", { ascending: false });
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as unknown;
    const parsed = CreateActionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    if (isDemoMode()) {
      return NextResponse.json({ ...parsed.data, id: `action-${Date.now()}`, user_id: "demo", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { status: 201 });
    }

    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabase.from("actions").insert({ ...parsed.data, user_id: user.id }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
