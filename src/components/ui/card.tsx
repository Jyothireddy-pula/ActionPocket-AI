import React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({ className = "", children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[8px] border border-[#e5e4e2] ${onClick ? "cursor-pointer hover:shadow-sm transition-shadow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`px-4 py-3 border-b border-[#e5e4e2] ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
