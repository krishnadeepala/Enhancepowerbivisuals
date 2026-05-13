import React from "react";
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { C, FONT } from "../tokens";
import { RationalizationBurndown } from "../components/RationalizationBurndown";
import { RationalizedByPlatform } from "../components/RationalizedByPlatform";
import { RationalizationOutcomes } from "../components/RationalizationOutcomes";

// ── KPI data ────────────────────────────────────────────────────────────────
const kpis = [
  {
    id: "pct-rationalized",
    label: "% Assets Rationalized",
    value: "64.8%",
    sub: "2,847 of 4,392 total",
    trend: "+3.2% vs last month",
    up: true, good: true,
    dot: C.pink,
    formula: "Assets w/ rationalization decision / Total assets in Gene",
  },
  {
    id: "count-rationalized",
    label: "Rationalized Count",
    value: "2,847",
    sub: "Decision documented in Gene",
    trend: "+142 since last month",
    up: true, good: true,
    dot: C.navy,
    formula: "Count of assets with any rationalization decision in Gene (Helix)",
  },
  {
    id: "pending",
    label: "Remaining / Pending",
    value: "1,545",
    sub: "No decision yet",
    trend: "−142 vs last month",
    up: false, good: true,
    dot: C.deepPink,
    formula: "Total assets minus assets with rationalization decision",
  },
  {
    id: "retire-consolidate",
    label: "% Retire / Consolidate",
    value: "27.4%",
    sub: "1,205 of 4,392",
    trend: "+1.1% vs last month",
    up: true, good: true,
    dot: C.orange,
    formula: "Assets with decision = %Retire% or %Consolidate% / Total assets in Gene",
    badge: "BO Milestone Tracked",
  },
];

// ── Slicer ──────────────────────────────────────────────────────────────────
function Slicer({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col" style={{ minWidth: 140 }}>
      <span
        className="mb-1"
        style={{ fontFamily: "Calibri, sans-serif", fontSize: 10, fontWeight: 700, color: C.navy }}
      >
        {label}
      </span>
      <button
        className="flex items-center justify-between gap-2 px-2 py-1.5"
        style={{ fontFamily: "Calibri, sans-serif", fontSize: 10, background: C.bg, border: `1px solid ${C.cyan}`, color: C.fg }}
      >
        <span>{value}</span>
        <ChevronDown size={11} style={{ color: C.cyan }} />
      </button>
    </div>
  );
}

// ── KPI Card (CHOP PBI spec) ─────────────────────────────────────────────────
function KPICard({ label, value, sub, trend, up, good, dot, badge, formula }: typeof kpis[0]) {
  const TrendIcon = up ? TrendingUp : TrendingDown;
  const trendColor = good ? C.green : C.deepPink;
  return (
    <div
      className="flex flex-col relative"
      style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16, minHeight: 114 }}
      title={formula}
    >
      {/* Indicator */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="flex-shrink-0" style={{ width: 10, height: 3, background: dot, display: "inline-block" }} />
        <span style={{ ...FONT.kpiLabel, color: C.muted, lineHeight: "1.3" }}>{label}</span>
        {badge && (
          <span
            className="ml-auto flex-shrink-0 px-1.5 py-0.5"
            style={{ fontSize: 8, fontWeight: 700, background: `${C.orange}18`, color: C.orange, border: `0.5px solid ${C.orange}40`, fontFamily: "'Segoe UI', sans-serif" }}
          >
            {badge}
          </span>
        )}
      </div>
      {/* Value */}
      <p style={{ ...FONT.kpiValue, color: C.pink, lineHeight: 1 }}>{value}</p>
      {/* Sub */}
      <p className="mt-1" style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>{sub}</p>
      {/* Trend */}
      <div className="flex items-center gap-1 mt-auto pt-2" style={{ color: trendColor }}>
        <TrendIcon size={11} strokeWidth={2.5} />
        <span style={{ fontSize: 10, fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}>{trend}</span>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function RationalizationTracking() {
  return (
    <div className="flex flex-col gap-3">

      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ ...FONT.pageTitle, color: C.fg }}>Rationalization Tracking</h2>
          <p style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif", marginTop: 2 }}>
            Progress towards May 31 rationalization milestone and October 2026 BO retirement target · Gene (Helix)
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ background: `${C.orange}10`, border: `0.5px solid ${C.orange}40` }}
        >
          <span style={{ fontSize: 9, color: C.orange, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif" }}>🎯 May 31 Milestone</span>
          <span style={{ fontSize: 9, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>497 assets behind ideal pace</span>
        </div>
      </div>

      {/* Slicer row */}
      <div
        className="flex items-end gap-4 px-4 py-3"
        style={{ background: C.bg, border: `0.5px solid ${C.border}` }}
      >
        <Slicer label="Platform" value="All Platforms" />
        <Slicer label="Date Range" value="Jan – Apr 2026" />
        <Slicer label="Decision Type" value="All Decisions" />
        <Slicer label="Milestone" value="All Milestones" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => <KPICard key={k.id} {...k} />)}
      </div>

      {/* Chart Row: Burndown (left, wider) + two right charts stacked */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Left: Burndown (tall) */}
        <div style={{ minHeight: 440 }}>
          <RationalizationBurndown />
        </div>

        {/* Right: Platform + Outcomes stacked */}
        <div className="flex flex-col gap-3">
          <div style={{ flex: 1 }}>
            <RationalizedByPlatform />
          </div>
          <div style={{ flex: 1 }}>
            <RationalizationOutcomes />
          </div>
        </div>
      </div>

      {/* Source note */}
      <p style={{ fontSize: 9, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
        Source: Gene (Helix) · Rationalization decision fields: %PowerBI%, %Retire%, %Consolidate%, %Keep% ·
        Refreshed Apr 28, 2026 9:00 AM
      </p>
    </div>
  );
}
