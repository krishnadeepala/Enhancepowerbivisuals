import React from "react";
import { C, FONT } from "../tokens";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cohortTrends = [
  { week: "Wk 1", newUsers: 3450, returningUsers: 8880, powerUsers: 3700 },
  { week: "Wk 2", newUsers: 3920, returningUsers: 9200, powerUsers: 3850 },
  { week: "Wk 3", newUsers: 4250, returningUsers: 9600, powerUsers: 4000 },
  { week: "Wk 4", newUsers: 4880, returningUsers: 10100, powerUsers: 4200 },
];

const cohortMatrix = [
  { cohort: "Jan 2025", users: 4200, m1: 100, m2: 62, m3: 45, m4: 34 },
  { cohort: "Feb 2025", users: 3800, m1: 100, m2: 58, m3: 42, m4: null },
  { cohort: "Mar 2025", users: 4500, m1: 100, m2: 64, m3: null, m4: null },
  { cohort: "Apr 2025", users: 5100, m1: 100, m2: null, m3: null, m4: null },
];

function getColor(v: number | null): string {
  if (v === null) return "transparent";
  if (v >= 95) return C.navy;
  if (v >= 55) return "#2980b9";
  if (v >= 40) return "#5dade2";
  if (v >= 25) return "#85c1e9";
  return "#d6eaf8";
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "8px 10px", fontSize: 11 }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 3px" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
          <span style={{ width: 10, height: 2, background: p.color, display: "inline-block" }} />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function CohortAnalysis() {
  const months = ["Month 1", "Month 2", "Month 3", "Month 4"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>Cohort Analysis</h2>
        <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
          User segment behavior over time grouped by acquisition cohort
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* Cohort Growth Trends */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Cohort Growth by Segment
          </p>
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            {[
              { label: "New Users",       color: C.navy  },
              { label: "Returning Users", color: C.cyan  },
              { label: "Power Users",     color: C.pink  },
            ].map((it) => (
              <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 14, height: 2, background: it.color, display: "inline-block" }} />
                <span style={{ fontSize: 9.5, color: C.muted }}>{it.label}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cohortTrends} margin={{ top: 4, right: 10, left: -14, bottom: 0 }}>
              <CartesianGrid key="ca-grid" stroke={C.grid} vertical={false} />
              <XAxis key="ca-x" dataKey="week" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
              <YAxis key="ca-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip key="ca-tip" content={<ChartTooltip />} />
              <Line key="ca-new" type="monotone" dataKey="newUsers" name="New Users" stroke={C.navy} strokeWidth={2}
                dot={{ r: 3, fill: C.navy, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line key="ca-ret" type="monotone" dataKey="returningUsers" name="Returning Users" stroke={C.cyan} strokeWidth={2}
                dot={{ r: 3, fill: C.cyan, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line key="ca-pow" type="monotone" dataKey="powerUsers" name="Power Users" stroke={C.pink} strokeWidth={2}
                dot={{ r: 3, fill: C.pink, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Cohort Retention Matrix */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Monthly Cohort Retention Matrix
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10.5 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "5px 8px", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>Cohort</th>
                <th style={{ textAlign: "right", padding: "5px 8px", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>Users</th>
                {months.map((m) => (
                  <th key={m} style={{ textAlign: "center", padding: "5px 8px", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortMatrix.map((row, ri) => {
                const vals = [row.m1, row.m2, row.m3, row.m4] as (number | null)[];
                return (
                  <tr key={row.cohort} style={{ background: ri % 2 === 0 ? "#fff" : C.canvas }}>
                    <td style={{ padding: "5px 8px", color: C.fg, fontSize: 10 }}>{row.cohort}</td>
                    <td style={{ padding: "5px 8px", textAlign: "right", fontWeight: 600, color: C.fg }}>{row.users.toLocaleString()}</td>
                    {vals.map((v, vi) => (
                      <td key={vi} style={{ padding: "3px 4px", textAlign: "center" }}>
                        {v !== null ? (
                          <div style={{ padding: "4px 0", background: getColor(v), color: (v ?? 0) >= 40 ? "#fff" : C.fg, fontWeight: 700 }}>
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