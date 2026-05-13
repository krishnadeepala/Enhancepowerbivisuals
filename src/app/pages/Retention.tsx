import React from "react";
import { C, FONT } from "../tokens";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const retentionCurve = [
  { day: "Day 1",  pct: 100 },
  { day: "Day 3",  pct: 68  },
  { day: "Day 7",  pct: 48  },
  { day: "Day 14", pct: 34  },
  { day: "Day 21", pct: 26  },
  { day: "Day 30", pct: 21  },
  { day: "Day 60", pct: 16  },
  { day: "Day 90", pct: 13  },
];

const weeklyRetention = [
  { cohort: "Apr 21 – Apr 27", users: 3450,  w1: 100, w2: 48, w3: 32, w4: 24, w5: 18, w6: 12 },
  { cohort: "Apr 28 – May 04", users: 3920,  w1: 100, w2: 50, w3: 33, w4: 23, w5: 17, w6: null },
  { cohort: "May 05 – May 11", users: 4250,  w1: 100, w2: 52, w3: 34, w4: null, w5: null, w6: null },
  { cohort: "May 12 – May 18", users: 4880,  w1: 100, w2: null, w3: null, w4: null, w5: null, w6: null },
];

function getHeatBg(v: number | null): string {
  if (v === null) return "transparent";
  if (v >= 95) return C.navy;
  if (v >= 45) return "#1a7ab5";
  if (v >= 30) return "#4fa0cc";
  if (v >= 20) return "#7ec0df";
  return "#b3d9ef";
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "8px 10px", fontSize: 11 }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 3px" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", gap: 5, marginTop: 2 }}>
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Retention() {
  const wkLabels = ["W1", "W2", "W3", "W4", "W5", "W6"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>Retention</h2>
        <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
          Cohort retention rates, churn analysis, and user lifecycle metrics
        </p>
      </div>

      {/* Retention KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {[
          { label: "Day-1 Retention",  value: "100%", sub: "All new users" },
          { label: "Day-7 Retention",  value: "48%",  sub: "↑ 3.2% vs prev" },
          { label: "Day-30 Retention", value: "21%",  sub: "↑ 1.8% vs prev" },
          { label: "Day-90 Retention", value: "13%",  sub: "Stable" },
        ].map((k) => (
          <div key={k.label} style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 5 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.navy, lineHeight: 1, fontFamily: "Arial, sans-serif" }}>
              {k.value}
            </div>
            <div style={{ fontSize: 9.5, color: C.muted, marginTop: 5 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 10 }}>
        {/* Retention Curve */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Average Retention Curve
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={retentionCurve} margin={{ top: 4, right: 10, left: -14, bottom: 0 }}>
              <CartesianGrid key="ret-grid" stroke={C.grid} vertical={false} />
              <XAxis key="ret-x" dataKey="day" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
              <YAxis key="ret-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <Tooltip key="ret-tip" content={<ChartTooltip />} />
              <Line key="ret-line" type="monotone" dataKey="pct" name="Retention" stroke={C.navy}
                strokeWidth={2.5} dot={{ r: 3, fill: C.navy, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cohort Table */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Weekly Cohort Retention
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10.5 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "5px 8px", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>Cohort</th>
                <th style={{ textAlign: "right", padding: "5px 8px", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>Users</th>
                {wkLabels.map(w => (
                  <th key={w} style={{ textAlign: "center", padding: "5px 8px", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{w}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklyRetention.map((row, ri) => {
                const weeks = [row.w1, row.w2, row.w3, row.w4, row.w5, row.w6] as (number | null)[];
                return (
                  <tr key={row.cohort} style={{ background: ri % 2 === 0 ? "#fff" : C.canvas }}>
                    <td style={{ padding: "5px 8px", color: C.fg, whiteSpace: "nowrap", fontSize: 10 }}>{row.cohort}</td>
                    <td style={{ padding: "5px 8px", textAlign: "right", fontWeight: 600, color: C.fg }}>{row.users.toLocaleString()}</td>
                    {weeks.map((v, wi) => (
                      <td key={wi} style={{ padding: "3px 4px", textAlign: "center" }}>
                        {v !== null ? (
                          <div style={{ padding: "3px 0", background: getHeatBg(v), color: (v ?? 0) >= 25 ? "#fff" : C.fg, fontWeight: 700 }}>
                            {v}%
                          </div>
                        ) : <span style={{ color: C.muted }}>–</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}