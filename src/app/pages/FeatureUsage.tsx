import React from "react";
import { C, FONT } from "../tokens";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const featureUsageData = [
  { feature: "Dashboard",     dau: 1984, wau: 5920,  mau: 16316 },
  { feature: "Search",        dau: 1116, wau: 3330,  mau: 9396  },
  { feature: "Reports",       dau: 868,  wau: 2590,  mau: 7308  },
  { feature: "Data Upload",   dau: 620,  wau: 1850,  mau: 5230  },
  { feature: "Notifications", dau: 434,  wau: 1295,  mau: 3661  },
  { feature: "Export",        dau: 248,  wau: 740,   mau: 2092  },
];

const adoptionTrend = [
  { week: "Wk 1", pct: 18 },
  { week: "Wk 2", pct: 22 },
  { week: "Wk 3", pct: 26 },
  { week: "Wk 4", pct: 29 },
  { week: "Wk 5", pct: 32 },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "8px 10px", fontSize: 11 }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 4px" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 8, height: 8, background: p.fill || p.color, display: "inline-block" }} />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const COLORS = [C.navy, C.midBlue, C.cyan, C.green, C.orange, C.pink];

export default function FeatureUsage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>Feature Usage</h2>
        <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
          Feature adoption rates, usage frequency, and engagement depth
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10 }}>
        {/* Feature Usage by Users */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Feature Usage by User Count
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={featureUsageData} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid key="fu-grid" stroke={C.grid} vertical={false} />
              <XAxis key="fu-x" dataKey="feature" tick={{ fontSize: 9.5, fill: C.fg } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
              <YAxis key="fu-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip key="fu-tip" content={<ChartTooltip />} />
              <Bar key="fu-bar" dataKey="mau" name="MAU Users" radius={0}>
                {featureUsageData.map((_, i) => <Cell key={`fu-cell-${i}`} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Adoption Summary */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 12px" }}>
            Feature Adoption Summary
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {featureUsageData.map((f, i) => (
              <div key={f.feature}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10.5, color: C.fg }}>{f.feature}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: C.fg }}>
                    {((f.mau / 52300) * 100).toFixed(0)}%
                  </span>
                </div>
                <div style={{ height: 8, background: C.canvas }}>
                  <div style={{
                    width: `${(f.mau / 52300) * 100}%`,
                    height: "100%", background: COLORS[i],
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}