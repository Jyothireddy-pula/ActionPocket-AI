"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isDemoMode } from "@/lib/demo-store";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Header title="Settings" />
      <div className="p-4 sm:p-6 max-w-xl space-y-4">
        {isDemoMode() && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Demo mode — settings changes won&apos;t persist. Configure Supabase in .env.local to save data.
          </div>
        )}
        <Card>
          <CardHeader><h2 className="text-sm font-semibold text-[#1c1917]">Profile</h2></CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <Input label="Full name" defaultValue="Demo User" placeholder="Your full name" />
              <Input label="Email" type="email" defaultValue="demo@example.com" placeholder="your@email.com" />
              <Input label="Timezone" defaultValue="UTC" placeholder="e.g. Asia/Kolkata" />
              {saved && <p className="text-sm text-green-600">Saved!</p>}
              <Button type="submit">Save profile</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="text-sm font-semibold text-[#1c1917]">Account</h2></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-[#78716c]">Manage your account data and preferences.</p>
            <Button variant="danger" onClick={() => alert("Export data feature coming soon")}>
              Export all data
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
