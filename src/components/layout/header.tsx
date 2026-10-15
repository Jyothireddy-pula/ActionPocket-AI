"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaptureModal } from "@/components/capture/capture-modal";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [captureOpen, setCaptureOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-[#e5e4e2] bg-white flex items-center justify-between px-4 sm:px-6">
        <h1 className="text-base font-semibold text-[#1c1917]">{title}</h1>
        <Button size="sm" onClick={() => setCaptureOpen(true)}>
          <Plus className="w-4 h-4" />
          Capture
        </Button>
      </header>
      <CaptureModal open={captureOpen} onClose={() => setCaptureOpen(false)} />
    </>
  );
}
