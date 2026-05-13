import React, { useState } from "react";
import {
  ComposedChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, TrendingUp, TrendingDown, Info } from "lucide-react";
import { C, FONT } from "../tokens";

// ── Data ────────────────────────────────────────────────────────────────────
const trendData = [
  { week: "14-Oct", pct: 66.2, count: 2890 },
  { week: "21-Oct", pct: 68.1, count: 2950 },
  { week: "28-Oct", pct: 70.3, count: 3020 },
  { week: "4-Nov",  pct: 72.0, count: 3090 },
  { week: "11-Nov", pct: 74.5, count: 3160 },
  { week: "18-Nov", pct: 83.2, count: 3340 },
  { week: "25-Nov", pct: 79.1, count: 3310 },
  { week: "2-Dec",  pct: 78.5, count: 3280 },
  { week: "9-Dec",  pct: 82.4, count: 3430 },
  { week: "16-Dec", pct: 85.6, count: 3590 },
  { week: "23-Dec", pct: 87.3, count: 3690 },
  { week: "30-Dec", pct: 88.9, count: 3740 },
  { week: "6-Jan",  pct: 90.7, count: 3870 },
  { week: "13-Jan", pct: 92.4, count: 3970 },
  { week: "20-Jan", pct: 94.1, count: 4080 },
  { week: "27-Jan", pct: 95.3, count: 4140 },
  { week: "3-Feb",  pct: 96.2, count: 4195 },
  { week: "10-Feb", pct: 97.1, count: 4240 },
  { week: "17-Feb", pct: 97.8, count: 4290 },
  { week: "24-Feb", pct: 98.5, count: 4340 },
  { week: "3-Mar",  pct: 99.4, count: 4366 },
];

// ── KPIs ────────────────────────────────────────────────────────────────────
const kpis = [
  {
    id: "pct-complete",
    label: "% Assets Complete Metadata",
    value: "99.4%",
    sub: "4,366 of 4,392 total",
    trend: "+0.4% vs prior week",
    up: true,
    good: true,
    dot: C.pink,
  },
  {
    id: "total-assets",
    label: "Total Assets in Gene",
    value: "4,392",
    sub: "All platforms",
    trend: "+26 since last week",
    up: true,
    good: true,
    dot: C.navy,
  },
  {
    id: "missing",
    label: "Assets Missing Metadata",
    value: "26",
    sub: "Incomplete records",
    trend: "−6 vs prior week",
    up: false,
    good: true,
    dot: C.deepPink,
  },
  {
    id: "target",
    label: "Target Completion",
    value: "100%",
    sub: "Goal: May 31, 2026",
    trend: "On Track",
    up: true,
    good: true,
    dot: C.green,
    badge: "On Track",
  },
];

// ── Slicer ──────────────────────────────────────────────────────────────────
function Slicer({ label, active, options }: { label: string; active?: boolean; options?: string[] }) {
  return (
    <div className="flex flex-col" style={{ minWidth: 140 }}>
      <span className="mb-1" style={{ fontFamily: "Calibri, sans-serif", fontSize: 10, fontWeight: 700, color: C.navy }}>
        {label}
      </span>
      <button
        className="flex items-center justify-between gap-2 px-2 py-1.5"
        style={{
          fontFamily: "Calibri, sans-serif", fontSize: 10,
          background: C.bg, border: `1px solid ${C.cyan}`,
          color: C.fg, minWidth: 130,
        }}
      >
        <span>{active ?? "All"}</span>
        <ChevronDown size={11} style={{ color: C.cyan }} />
      </button>
    </div>
  );
}

// ── KPI Card (CHOP spec) ─────────────────────────────────────────────────────
function KPICard({ label, value, sub, trend, up, good, dot, badge }: typeof kpis[0]) {
  const TrendIcon = up ? TrendingUp : TrendingDown;
  const trendColor = good ? C.green : C.deepPink;
  return (
    <div
      className="flex flex-col"
      style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16, minHeight: 114 }}
    >
      {/* Indicator dot + label */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="flex-shrink-0" style={{ width: 10, height: 3, background: dot, display: "inline-block" }} />
        <span style={{ ...FONT.kpiLabel, color: C.muted }}>{label}</span>
        {badge && (
          <span
            className="ml-auto text-xs px-1.5 py-0.5"
            style={{ background: `${C.green}18`, color: C.green, fontSize: 9, fontWeight: 700, border: `0.5px solid ${C.green}40` }}
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

// ── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: "10px 12px", fontSize: 11, fontFamily: "'Segoe UI', sans-serif" }}>
      <p className="mb-2 pb-1 font-semibold" style={{ borderBottom: `0.5px solid ${C.border}`, color: C.fg }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mt-1">
          <span className="inline-block w-2.5 h-0.5" style={{ background: p.color }} />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>
            {p.name.startsWith("%") ? `${p.value}%` : p.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex items-center gap-5 mb-1" style={{ fontSize: 9, fontFamily: "'Segoe UI', sans-serif", color: C.muted }}>
    {payload?.map((p: any) => (
      <div key={p.value} className="flex items-center gap-1.5">
        <span style={{ display: "inline-block", width: 20, height: 2, background: p.color }} />
        {p.value}
      </div>
    ))}
  </div>
);

// ── Page ─────────────────────────────────────────────────────────────────────
export default function InventoryTracking() {
  return (
    <div className="flex flex-col gap-3">

      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ ...FONT.pageTitle, color: C.fg }}>Inventory Tracking</h2>
          <p style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif", marginTop: 2 }}>
            Share of analytics assets with required metadata fields populated · Gene (Helix)
          </p>
        </div>
        <span style={{ fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
          As of: <strong style={{ color: C.fg }}>Apr 28, 2026</strong>
        </span>
      </div>

      {/* Slicer row */}
      <div
        className="flex items-end gap-4 px-4 py-3"
        style={{ background: C.bg, border: `0.5px solid ${C.border}` }}
      >
        <Slicer label="Platform" active="All Platforms" />
        <Slicer label="Date Range" active="Oct 2025 – Apr 2026" />
        <Slicer label="Metadata Status" active="All Metadata" />
        <div className="flex gap-2 ml-auto">
          {["All Metadata", "Complete", "Incomplete"].map((f) => (
            <button
              key={f}
              className="px-3 py-1 text-xs"
              style={{
                fontFamily: "Calibri, sans-serif",
                fontSize: 10,
                background: f === "All Metadata" ? C.navy : C.bg,
                color: f === "All Metadata" ? "#fff" : C.fg,
                border: `1px solid ${f === "All Metadata" ? C.navy : C.border}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => <KPICard key={k.id} {...k} />)}
      </div>

      {/* Main chart: Double line — % left, count right */}
      <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
        <div className="mb-3">
          <p className="font-semibold" style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12 }}>
            % of Analytics Assets with Complete Metadata in Gene
          </p>
          <p className="mt-0.5" style={{ ...FONT.axisLabel, color: C.muted }}>
            Weekly · % complete (left axis) vs. count of complete assets (right axis) · Oct 2025 – Mar 2026
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={trendData} margin={{ top: 8, right: 60, left: 4, bottom: 4 }}>
            <CartesianGrid
              key="grid"
              strokeDasharray="none"
              stroke={C.grid}
              vertical={false}
              strokeWidth={1}
            />
            <XAxis
              key="xaxis"
              dataKey="week"
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={{ stroke: C.grid }}
              interval={2}
            />
            <YAxis
              key="yaxis-left"
              yAxisId="left"
              domain={[60, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={false}
              width={38}
            />
            <YAxis
              key="yaxis-right"
              yAxisId="right"
              orientation="right"
              domain={[2800, 4600]}
              tickFormatter={(v) => v.toLocaleString()}
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={false}
              width={52}
            />
            <Tooltip key="tooltip" content={<CustomTooltip />} />
            <Legend key="legend" content={<CustomLegend />} verticalAlign="top" />
            <ReferenceLine
              key="ref-current"
              yAxisId="left"
              y={99.4}
              stroke={C.green}
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{ value: "99.4% current", position: "insideTopRight", fontSize: 9, fill: C.green }}
            />
            {/* Count line (right axis) */}
            <Line
              key="line-count"
              yAxisId="right"
              type="monotone"
              dataKey="count"
              name="# Assets w/ Complete Metadata"
              stroke={C.midBlue}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            {/* % line (left axis) */}
            <Line
              key="line-pct"
              yAxisId="left"
              type="monotone"
              dataKey="pct"
              name="% Complete Metadata"
              stroke={C.navy}
              strokeWidth={2.5}
              dot={{ r: 2.5, fill: C.navy, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Source note */}
      <p style={{ fontSize: 9, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
        Source: Gene (Helix) · Refreshed Apr 28, 2026 9:00 AM · Required metadata fields: Owner, Description, Business Domain, Data Classification, Refresh Frequency
      </p>
    </div>
  );
}
