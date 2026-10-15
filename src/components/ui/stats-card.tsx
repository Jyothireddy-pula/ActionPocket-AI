import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  href?: string;
  color?: "indigo" | "green" | "red" | "yellow";
}

const colorClasses = {
  indigo: "text-indigo-600 bg-indigo-50",
  green: "text-green-600 bg-green-50",
  red: "text-red-600 bg-red-50",
  yellow: "text-yellow-600 bg-yellow-50",
};

export function StatsCard({ title, value, icon, href, color = "indigo" }: StatsCardProps) {
  const content = (
    <Card className={`p-4 ${href ? "hover:shadow-md" : ""}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#78716c] font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-[#1c1917]">{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
