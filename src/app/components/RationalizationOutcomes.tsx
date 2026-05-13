import React from "react";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
  LabelList, ResponsiveContainer,
} from "recharts";
import { C, FONT } from "../tokens";

const outcomes = [
  { decision: "Migrate to Power BI", count: 1432, pct: 50.3, color: C.navy   },
  { decision: "Retire",              count:  821, pct: 28.8, color: C.pink   },
  { decision: "Consolidate",         count:  384, pct: 13.5, color: C.orange },
  { decision: "Keep / Other",        count:  210, pct:  7.4, color: C.green  },
];
const TOTAL_RATIONALIZED = 2847;

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: "10px 12px", fontSize: 11, fontFamily: "'Segoe UI', sans-serif" }}>
      <div className="flex items-center gap-2 mb-1.5" style={{ borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6 }}>
        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color, display: "inline-block" }} />
        <span style={{ fontWeight: 600, color: C.fg }}>{d.decision}</span>
      </div>
      <div style={{ color: C.muted }}>Count: <span style={{ fontWeight: 700, color: C.fg }}>{d.count.toLocaleString()}</span></div>
      <div style={{ color: C.muted }}>Share: <span style={{ fontWeight: 700, color: d.color }}>{d.pct}%</span></div>
      <div style={{ color: C.muted }}>of {TOTAL_RATIONALIZED.toLocaleString()} rationalized</div>
    </div>
  );
};

export function RationalizationOutcomes() {
  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
      <div className="mb-3">
        <p className="font-semibold" style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12 }}>
          Rationalization Outcomes
        </p>
        <p className="mt-0.5" style={{ ...FONT.axisLabel, color: C.muted }}>
          Distribution of rationalization decisions · {TOTAL_RATIONALIZED.toLocaleString()} total
        </p>
      </div>

      {/* Legend — top per CHOP spec */}
      <div className="flex flex-wrap gap-3 mb-2">
        {outcomes.map((o) => (
          <div key={o.decision} className="flex items-center gap-1.5" style={{ fontSize: 9, fontFamily: "'Segoe UI', sans-serif", color: C.muted }}>
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: o.color, display: "inline-block" }} />
            {o.decision}
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{ flex: 1, minHeight: 170 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={outcomes}
            layout="vertical"
            margin={{ top: 4, right: 60, left: 4, bottom: 4 }}
            barSize={22}
          >
            <CartesianGrid
              key="grid"
              strokeDasharray="none"
              horizontal={false}
              stroke={C.grid}
              strokeWidth={1}
            />
            <XAxis
              key="xaxis"
              type="number"
              domain={[0, 1600]}
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={{ stroke: C.grid }}
              tickFormatter={(v) => v.toLocaleString()}
            />
            <YAxis
              key="yaxis"
              type="category"
              dataKey="decision"
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={false}
              width={115}
            />
            <Tooltip key="tooltip" content={<CustomTooltip />} cursor={{ fill: `${C.navy}06` }} />
            <Bar key="bar" dataKey="count" radius={0}>
              {outcomes.map((o) => (
                <Cell key={o.decision} fill={o.color} />
              ))}
              {/* Show "% (n)" per CHOP requirement */}
              <LabelList
                dataKey="count"
                position="right"
                formatter={(v: number) => {
                  const pct = outcomes.find((o) => o.count === v)?.pct ?? 0;
                  return `${pct}%  (${v.toLocaleString()})`;
                }}
                style={{ fontSize: 10, fill: C.muted, fontFamily: "'Segoe UI', sans-serif", fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* BO milestone note */}
      <p
        className="mt-2 px-2 py-1.5 text-xs"
        style={{ background: `${C.orange}12`, borderLeft: `3px solid ${C.orange}`, color: C.muted, fontFamily: "'Segoe UI', sans-serif", fontSize: 10 }}
      >
        🎯 <strong style={{ color: C.orange }}>October 2026 BO Milestone:</strong> Business Objects assets in Retire/Consolidate/PowerBI pipeline — tracking 750 remaining BO assets
      </p>
    </div>
  );
}
