import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendColor?: "green" | "red" | "yellow";
  badge?: string;
  badgeColor?: string;
  accentColor?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendDirection = "neutral",
  trendColor = "green",
  badge,
  badgeColor,
  accentColor = "#003087",
}: KPICardProps) {
  const trendColorMap = {
    green: "text-emerald-600",
    red: "text-red-500",
    yellow: "text-amber-500",
  };

  const TrendIcon =
    trendDirection === "up"
      ? TrendingUp
      : trendDirection === "down"
      ? TrendingDown
      : Minus;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow duration-200">
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: accentColor }}
      />
      <p className="text-xs text-gray-500 uppercase tracking-wide pl-1 truncate">{title}</p>
      <p
        className="text-4xl font-black pl-1"
        style={{ color: accentColor, letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      <p className="text-xs text-gray-500 pl-1">{subtitle}</p>
      {trend && (
        <div className={`flex items-center gap-1 pl-1 ${trendColorMap[trendColor]}`}>
          <TrendIcon size={13} strokeWidth={2.5} />
          <span className="text-xs font-semibold">{trend}</span>
        </div>
      )}
      {badge && (
        <span
          className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: badgeColor ? `${badgeColor}20` : "#78BE2020",
            color: badgeColor ?? "#78BE20",
            border: `1px solid ${badgeColor ?? "#78BE20"}40`,
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
