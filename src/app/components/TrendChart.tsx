import React from "react";
import {
  ComposedChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ReferenceLine, ResponsiveContainer,
} from "recharts";
import { C, FONT } from "../tokens";

const data = [
  { week: "14-Oct", pct: 66.2, assets: 2890 },
  { week: "21-Oct", pct: 68.1, assets: 2950 },
  { week: "28-Oct", pct: 70.3, assets: 3020 },
  { week: "4-Nov",  pct: 72.0, assets: 3090 },
  { week: "11-Nov", pct: 74.5, assets: 3160 },
  { week: "18-Nov", pct: 83.2, assets: 3340 },
  { week: "25-Nov", pct: 79.1, assets: 3310 },
  { week: "2-Dec",  pct: 78.5, assets: 3280 },
  { week: "9-Dec",  pct: 82.4, assets: 3430 },
  { week: "16-Dec", pct: 85.6, assets: 3590 },
  { week: "23-Dec", pct: 87.3, assets: 3690 },
  { week: "30-Dec", pct: 88.9, assets: 3740 },
  { week: "6-Jan",  pct: 90.7, assets: 3870 },
  { week: "13-Jan", pct: 92.4, assets: 3970 },
  { week: "20-Jan", pct: 94.1, assets: 4080 },
  { week: "27-Jan", pct: 95.3, assets: 4140 },
  { week: "3-Feb",  pct: 96.2, assets: 4195 },
  { week: "10-Feb", pct: 97.1, assets: 4240 },
  { week: "17-Feb", pct: 97.8, assets: 4290 },
  { week: "24-Feb", pct: 98.5, assets: 4340 },
  { week: "3-Mar",  pct: 99.4, assets: 4366 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: "10px 12px", fontSize: 11, fontFamily: "'Segoe UI', sans-serif" }}>
      <p className="mb-2 pb-1 font-semibold" style={{ borderBottom: `0.5px solid ${C.border}`, color: C.fg }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mt-1">
          <span className="inline-block" style={{ width: 10, height: 2, background: p.color }} />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>
            {p.name === "% Complete" ? `${p.value}%` : p.value.toLocaleString()}
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

export function TrendChart() {
  return (
    <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
      <div className="mb-3">
        <p className="font-semibold" style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12 }}>
          % of Analytics Assets with Complete Metadata in Gene
        </p>
        <p className="mt-0.5" style={{ ...FONT.axisLabel, color: C.muted }}>
          Weekly trend · Oct 2025 – Mar 2026 · % complete (left axis) + count of assets (right axis)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, right: 60, left: 4, bottom: 4 }}>
          <CartesianGrid key="grid" strokeDasharray="none" stroke={C.grid} vertical={false} strokeWidth={1} />
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
            width={50}
          />
          <Tooltip key="tooltip" content={<CustomTooltip />} />
          <Legend key="legend" content={<CustomLegend />} verticalAlign="top" />
          <ReferenceLine
            key="ref"
            yAxisId="left"
            y={99.4}
            stroke={C.green}
            strokeDasharray="4 4"
            strokeWidth={1}
            label={{ value: "Current 99.4%", position: "insideTopRight", fontSize: 9, fill: C.green }}
          />
          <Line
            key="line-assets"
            yAxisId="right"
            type="monotone"
            dataKey="assets"
            name="# Assets Complete"
            stroke={C.midBlue}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Line
            key="line-pct"
            yAxisId="left"
            type="monotone"
            dataKey="pct"
            name="% Complete"
            stroke={C.navy}
            strokeWidth={2.5}
            dot={{ r: 2.5, fill: C.navy, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
