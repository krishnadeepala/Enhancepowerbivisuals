import React, { useState } from "react";
import { ChevronDown, TrendingUp, TrendingDown, Info } from "lucide-react";
import { RationalizationDonut } from "../components/RationalizationDonut";
import { AssetJourneyChart } from "../components/AssetJourneyChart";
import { PBIMigrationChart } from "../components/PBIMigrationChart";
import { BOProgressChart } from "../components/BOProgressChart";
import { C, FONT } from "../tokens";

// ── KPI data ─────────────────────────────────────────────────────────────────
const kpis = [
  {
    id: "rationalized",
    label: "% Assets Rationalized",
    value: "64.8%",
    sub: "2,847 / 4,392",
    formula: "Assets with rationalization decision in Gene (Helix) / Total assets in Gene",
    trend: "+3.2% vs last month",
    up: true, good: true,
    dot: C.pink,
    progress: 64.8,
  },
  {
    id: "retire-consolidate",
    label: "% Recommended Retire / Consolidate",
    value: "27.4%",
    sub: "1,205 / 4,392",
    formula: "Assets flagged as %Consolidate% or %Retire% in Gene / Total assets",
    trend: "+1.1% vs last month",
    up: true, good: true,
    dot: C.deepPink,
    progress: 27.4,
  },
  {
    id: "pbi-modernized",
    label: "% Eligible Assets Modernized to PBI",
    value: "61.2%",
    sub: "876 / 1,432",
    formula: "Assets with %PowerBI% decision AND migrated / Assets with %PowerBI% decision",
    trend: "+5.4% vs last month",
    up: true, good: true,
    dot: C.navy,
    progress: 61.2,
  },
  {
    id: "bo-remaining",
    label: "% BO Assets Remaining",
    value: "75.0%",
    sub: "750 / 1,000",
    formula: "BO assets NOT migrated to PBI/Cogito or Retired / Total BO assets in Gene",
    trend: "−5.0% vs last month",
    up: false, good: true,
    dot: C.orange,
    progress: 75,
    badge: "Oct 2026 Target",
  },
];

// ── Components ────────────────────────────────────────────────────────────────
function KpiTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ color: C.muted, lineHeight: 0 }}
      >
        <Info size={11} />
      </button>
      {show && (
        <div
          className="absolute z-50 left-4 top-0 w-60 text-xs leading-relaxed"
          style={{ background: C.fg, color: "#fff", padding: "8px 10px", fontSize: 10, fontFamily: "'Segoe UI', sans-serif" }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

function KPICard({ label, value, sub, formula, trend, up, good, dot, progress, badge }: typeof kpis[0]) {
  const TrendIcon = up ? TrendingUp : TrendingDown;
  const trendColor = good ? C.green : C.deepPink;
  return (
    <div
      className="flex flex-col"
      style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16, minHeight: 114 }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <span className="flex-shrink-0" style={{ width: 10, height: 3, background: dot, display: "inline-block" }} />
        <span style={{ ...FONT.kpiLabel, color: C.muted, flex: 1, lineHeight: "1.3" }}>{label}</span>
        {badge && (
          <span style={{ fontSize: 8, fontWeight: 700, background: `${C.orange}18`, color: C.orange, border: `0.5px solid ${C.orange}40`, padding: "1px 6px", fontFamily: "'Segoe UI', sans-serif" }}>
            {badge}
          </span>
        )}
        <KpiTooltip text={formula} />
      </div>
      <p style={{ ...FONT.kpiValue, color: C.pink, lineHeight: 1 }}>{value}</p>
      <p className="mt-1" style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>{sub} assets</p>
      {/* Progress bar */}
      <div className="mt-2" style={{ background: `${C.border}`, height: 3 }}>
        <div style={{ width: `${progress}%`, height: "100%", background: dot, transition: "width 0.7s ease" }} />
      </div>
      <div className="flex items-center gap-1 mt-auto pt-2" style={{ color: trendColor }}>
        <TrendIcon size={11} strokeWidth={2.5} />
        <span style={{ fontSize: 10, fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}>{trend}</span>
      </div>
    </div>
  );
}

function Slicer({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col" style={{ minWidth: 130 }}>
      <span style={{ fontFamily: "Calibri, sans-serif", fontSize: 10, fontWeight: 700, color: C.navy, marginBottom: 3 }}>{label}</span>
      <button
        className="flex items-center justify-between gap-2 px-2 py-1.5"
        style={{ fontFamily: "Calibri, sans-serif", fontSize: 10, background: C.bg, border: `1px solid ${C.cyan}`, color: C.fg }}
      >
        {value} <ChevronDown size={11} style={{ color: C.cyan }} />
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ExecSummary() {
  return (
    <div className="flex flex-col gap-3">

      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ ...FONT.pageTitle, color: C.fg }}>Executive Summary</h2>
          <p style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif", marginTop: 2 }}>
            Tracking rationalization, modernization, and BO milestone progress · Gene (Helix)
          </p>
        </div>
        <span style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
          As of: <strong style={{ color: C.fg }}>Apr 28, 2026</strong>
        </span>
      </div>

      {/* Slicers */}
      <div
        className="flex items-end gap-4 px-4 py-3"
        style={{ background: C.bg, border: `0.5px solid ${C.border}` }}
      >
        <Slicer label="Platform" value="All Platforms" />
        <Slicer label="Date Range" value="All Dates" />
        <Slicer label="Decision Type" value="All Decisions" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => <KPICard key={k.id} {...k} />)}
      </div>

      {/* Row 2: Donut + Journey */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 2fr" }}>
        <RationalizationDonut />
        <AssetJourneyChart />
      </div>

      {/* Row 3: PBI Migration + BO Progress */}
      <div className="grid grid-cols-2 gap-3">
        <PBIMigrationChart />
        <BOProgressChart />
      </div>
    </div>
  );
}
