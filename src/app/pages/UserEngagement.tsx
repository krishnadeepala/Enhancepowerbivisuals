import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { C, FONT } from "../tokens";

const sessionData = [
  { date: "Apr 21", sessions: 24000, duration: 320 },
  { date: "Apr 28", sessions: 25200, duration: 334 },
  { date: "May 05", sessions: 26400, duration: 348 },
  { date: "May 12", sessions: 27800, duration: 362 },
  { date: "May 19", sessions: 28760, duration: 384 },
];

const pageData = [
  { page: "Dashboard",   views: 42000, bounce: 18 },
  { page: "Reports",     views: 31000, bounce: 22 },
  { page: "Analytics",   views: 27000, bounce: 15 },
  { page: "Settings",    views: 18000, bounce: 35 },
  { page: "Profile",     views: 12000, bounce: 28 },
];

const kpis = [
  { label: "Avg. Pages / Session",   value: "4.2",   change: "+6.7%",  color: C.navy  },
  { label: "Bounce Rate",            value: "32.6%", change: "↓ 4.8%", color: C.green },
  { label: "Session Duration",       value: "6m 24s",change: "+9.3%",  color: C.pink  },
  { label: "Daily Active Sessions",  value: "28,760",change: "+10.2%", color: C.cyan  },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "8px 10px", fontSize: 11 }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 4px" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 10, height: 2, background: p.color, display: "inline-block" }} />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function UserEngagement() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>User Engagement</h2>
        <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
          Session depth, interaction patterns, and user behavior metrics
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: "14px 16px" }}
          >
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.fg, lineHeight: 1, fontFamily: "Arial, sans-serif" }}>
              {k.value}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
              <TrendingUp size={10} style={{ color: C.green }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: C.green }}>{k.change}</span>
            </div>
            <div style={{ height: 3, background: C.canvas, marginTop: 8 }}>
              <div style={{ width: "70%", height: "100%", background: k.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* Sessions Over Time */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Sessions Over Time
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={sessionData} margin={{ top: 4, right: 10, left: -14, bottom: 0 }}>
              <CartesianGrid key="ue-s-grid" stroke={C.grid} vertical={false} />
              <XAxis key="ue-s-x" dataKey="date" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
              <YAxis key="ue-s-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip key="ue-s-tip" content={<ChartTooltip />} />
              <Line key="ue-s-line" type="monotone" dataKey="sessions" name="Sessions" stroke={C.navy}
                strokeWidth={2.5} dot={{ r: 3, fill: C.navy, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pages by Views */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 14 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 10px" }}>
            Top Pages by Views
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={pageData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
            >
              <CartesianGrid key="ue-p-grid" stroke={C.grid} horizontal={false} />
              <XAxis key="ue-p-x" type="number" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis key="ue-p-y" type="category" dataKey="page" tick={{ fontSize: 10, fill: C.fg } as any} tickLine={false} axisLine={false} width={68} />
              <Tooltip key="ue-p-tip" content={<ChartTooltip />} />
              <Bar key="ue-p-bar" dataKey="views" name="Page Views" fill={C.navy} radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}