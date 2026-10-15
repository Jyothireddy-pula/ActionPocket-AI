"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Inbox, CalendarDays, ListTodo, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/today", label: "Today", icon: CalendarDays },
  { href: "/actions", label: "Actions", icon: ListTodo },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e4e2] flex items-center justify-around px-2 h-16 z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs transition-colors ${
              isActive ? "text-indigo-600" : "text-[#78716c]"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
