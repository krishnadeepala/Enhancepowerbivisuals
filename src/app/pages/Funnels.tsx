import React from "react";
import { C, FONT } from "../tokens";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const funnels = [
  {
    name: "Registration Funnel",
    steps: [
      { label: "Landing Page",  count: 35420, pct: 100  },
      { label: "Sign Up Form",  count: 24800, pct: 70.0 },
      { label: "Email Verify",  count: 18760, pct: 53.0 },
      { label: "Profile Setup", count: 14200, pct: 40.1 },
      { label: "Active",        count: 10000, pct: 17.5 },
    ],
  },
  {
    name: "Purchase Funnel",
    steps: [
      { label: "Product View", count: 18500, pct: 100  },
      { label: "Add to Cart",  count: 9200,  pct: 49.7 },
      { label: "Checkout",     count: 5800,  pct: 31.4 },
      { label: "Payment",      count: 4200,  pct: 22.7 },
      { label: "Purchased",    count: 3100,  pct: 16.8 },
    ],
  },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "8px 10px", fontSize: 11 }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 3px" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", gap: 5, marginTop: 2 }}>
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const STEP_COLORS = [C.navy, "#1a6fa3", "#3289bc", "#4da3d5", C.cyan];

export default function Funnels() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>Funnels</h2>
        <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
          Conversion funnel analysis across key user flows and purchase paths
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {funnels.map((funnel) => (
          <div key={funnel.name} style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
            <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 12px" }}>
              {funnel.name}
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={funnel.steps}
                margin={{ top: 4, right: 10, left: -10, bottom: 24 }}
              >
                <CartesianGrid key={`${funnel.name}-grid`} stroke={C.grid} vertical={false} />
                <XAxis
                  key={`${funnel.name}-x`}
                  dataKey="label"
                  tick={{ fontSize: 9, fill: C.muted } as any}
                  tickLine={false}
                  axisLine={{ stroke: C.grid }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis key={`${funnel.name}-y`} tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip key={`${funnel.name}-tip`} content={<ChartTooltip />} />
                <Bar key={`${funnel.name}-bar`} dataKey="count" name="Users" radius={0}>
                  {funnel.steps.map((_, i) => (
                    <Cell key={`${funnel.name}-cell-${i}`} fill={STEP_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              {funnel.steps.map((s, i) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 8, height: 8, background: STEP_COLORS[i], display: "inline-block" }} />
                  <span style={{ fontSize: 9.5, color: C.muted }}>{s.label}: <strong style={{ color: C.fg }}>{s.pct}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}