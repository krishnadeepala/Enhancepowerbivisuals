import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  Users, UserPlus, Clock, BarChart2,
  TrendingUp, TrendingDown, ChevronRight,
} from "lucide-react";
import { C, FONT } from "../tokens";

// ── Data ─────────────────────────────────────────────────────────────────────

const trendData = [
  { date: "Apr 21", dau: 5800,  wau: 17200, mau: 49000 },
  { date: "Apr 28", dau: 5950,  wau: 17600, mau: 50200 },
  { date: "May 05", dau: 6100,  wau: 17900, mau: 51000 },
  { date: "May 12", dau: 6050,  wau: 18200, mau: 51800 },
  { date: "May 19", dau: 10000, wau: 21000, mau: 52300 },
];

const adoptionData = [
  { date: "Apr 21", dashboard: 28, search: 15, reports: 10, export: 2  },
  { date: "Apr 28", dashboard: 30, search: 16, reports: 12, export: 3  },
  { date: "May 05", dashboard: 32, search: 17, reports: 13, export: 3  },
  { date: "May 12", dashboard: 31, search: 18, reports: 14, export: 4  },
  { date: "May 19", dashboard: 32, search: 18, reports: 14, export: 4  },
];

const platformData = [
  { name: "Web",    value: 72, count: 13320 },
  { name: "Mobile", value: 28, count: 5180  },
];
const PLATFORM_COLORS = [C.navy, C.green];

const featureData = [
  { name: "Dashboard",     pct: 32 },
  { name: "Search",        pct: 18 },
  { name: "Reports",       pct: 14 },
  { name: "Data Upload",   pct: 10 },
  { name: "Notifications", pct: 7  },
  { name: "Export",        pct: 4  },
];

const segmentData = [
  { name: "New Users",       value: 32, count: 5920 },
  { name: "Returning Users", value: 48, count: 8880 },
  { name: "Power Users",     value: 20, count: 3700 },
];
const SEGMENT_COLORS = [C.navy, C.cyan, C.pink];

const funnelSteps = [
  { label: "Visited Site",         count: 35420, pct: 100  },
  { label: "Signed Up",            count: 22180, pct: 62.6 },
  { label: "Verified Email",       count: 18760, pct: 51.0 },
  { label: "Completed Onboarding", count: 12980, pct: 35.6 },
  { label: "Active User",          count: 10000, pct: 17.5 },
];

const cohortData = [
  { cohort: "Apr 21 – Apr 27", users: 3450, weeks: [100, 48, 32, 24, 18, 12]         },
  { cohort: "Apr 28 – May 04", users: 3920, weeks: [100, 50, 33, 23, 17, null]        },
  { cohort: "May 05 – May 11", users: 4250, weeks: [100, 52, 34, null, null, null]    },
  { cohort: "May 12 – May 18", users: 4880, weeks: [100, null, null, null, null, null]},
];

const engagementRows = [
  { label: "Sessions",              value: "28,760", barPct: 88, change: "+10.2%", up: true  },
  { label: "Avg. Session Duration", value: "6m 24s", barPct: 72, change: "+9.3%",  up: true  },
  { label: "Pages / Session",       value: "4.2",    barPct: 60, change: "+6.7%",  up: true  },
  { label: "Bounce Rate",           value: "32.6%",  barPct: 33, change: "4.8%",   up: false },
];

const kpiCards = [
  {
    id: "dau", Icon: Users, iconColor: C.navy,
    label: "Active Users (DAU)", value: "10,000",
    change: "+8.6%", positive: true, comparison: "vs Apr 14 – May 12",
    spark: [5400, 5550, 5650, 5800, 5900, 5850, 5950, 6100, 6050, 10000],
    sparkColor: C.navy,
  },
  {
    id: "wau", Icon: Users, iconColor: C.midBlue,
    label: "Active Users (WAU)", value: "21,000",
    change: "+7.9%", positive: true, comparison: "vs Apr 14 – May 12",
    spark: [16200, 16600, 16900, 17200, 17400, 17600, 17800, 18000, 18300, 21000],
    sparkColor: C.midBlue,
  },
  {
    id: "mau", Icon: Users, iconColor: C.pink,
    label: "Active Users (MAU)", value: "52,300",
    change: "+6.1%", positive: true, comparison: "vs Apr 14 – May 12",
    spark: [48500, 49000, 49500, 50000, 50400, 50800, 51200, 51600, 52000, 52300],
    sparkColor: C.pink,
  },
  {
    id: "new-users", Icon: UserPlus, iconColor: C.green,
    label: "New Users", value: "3,450",
    change: "+12.4%", positive: true, comparison: "vs Apr 14 – May 12",
    spark: [2800, 2900, 2980, 3050, 3100, 3180, 3250, 3350, 3400, 3450],
    sparkColor: C.green,
  },
  {
    id: "avg-session", Icon: Clock, iconColor: C.orange,
    label: "Avg. Session Duration", value: "6m 24s",
    change: "+9.3%", positive: true, comparison: "vs Apr 14 – May 12",
    spark: [320, 335, 345, 350, 358, 362, 368, 374, 378, 384],
    sparkColor: C.orange,
  },
  {
    id: "sessions", Icon: BarChart2, iconColor: C.cyan,
    label: "Sessions", value: "28,760",
    change: "+10.2%", positive: true, comparison: "vs Apr 14 – May 12",
    spark: [24000, 24800, 25400, 26000, 26500, 27000, 27500, 28000, 28400, 28760],
    sparkColor: C.cyan,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 90, h = 30;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 2 - ((v - min) / range) * (h - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Panel({
  title, subtitle, children, style,
}: {
  title?: string; subtitle?: string;
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fff", border: `0.5px solid ${C.border}`,
        padding: 14, display: "flex", flexDirection: "column", ...style,
      }}
    >
      {title && (
        <div style={{ marginBottom: 10 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: 0 }}>{title}</p>
          {subtitle && (
            <p style={{ fontSize: 9.5, color: C.muted, margin: "2px 0 0", fontFamily: "'Segoe UI', sans-serif" }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff", border: `0.5px solid ${C.border}`,
        padding: "8px 10px", fontSize: 11, fontFamily: "'Segoe UI', sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 4px" }}>{label}</p>
      {payload.map((p: any) => (
        <div
          key={p.name}
          style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}
        >
          <span
            style={{ display: "inline-block", width: 10, height: 2, background: p.color }}
          />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

function InlineLegend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 12,
        fontSize: 9.5, fontFamily: "'Segoe UI', sans-serif",
        color: C.muted, marginBottom: 6,
      }}
    >
      {items.map((it) => (
        <div key={it.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ display: "inline-block", width: 16, height: 2, background: it.color }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}

function getHeatmapBg(val: number | null): string {
  if (val === null) return "transparent";
  if (val >= 95) return C.navy;
  if (val >= 45) return "#1a7ab5";
  if (val >= 30) return "#4fa0cc";
  if (val >= 20) return "#7ec0df";
  if (val >= 10) return "#b3d9ef";
  return "#daeef8";
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KPICard({
  Icon, iconColor, label, value, change, positive, comparison, spark, sparkColor,
}: typeof kpiCards[0]) {
  return (
    <div
      style={{
        background: "#fff", border: `0.5px solid ${C.border}`,
        padding: "12px 14px", display: "flex", flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 28, height: 28, background: `${iconColor}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 3, marginBottom: 6,
        }}
      >
        <Icon size={14} style={{ color: iconColor }} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.fg, lineHeight: 1, fontFamily: "Arial, sans-serif" }}>
        {value}
      </div>
      <div style={{ ...FONT.kpiLabel, color: C.muted, marginTop: 3, marginBottom: 6, lineHeight: 1.3 }}>
        {label}
      </div>
      <Sparkline data={spark} color={sparkColor} />
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
        {positive
          ? <TrendingUp size={10} style={{ color: C.green }} />
          : <TrendingDown size={10} style={{ color: C.deepPink }} />
        }
        <span style={{ fontSize: 10, fontWeight: 700, color: positive ? C.green : C.deepPink }}>
          {change}
        </span>
        <span style={{ fontSize: 9, color: C.muted }}>{comparison}</span>
      </div>
    </div>
  );
}

function ActiveUsersTrend() {
  return (
    <Panel title="Active Users Trend">
      <InlineLegend items={[
        { label: "DAU", color: C.navy },
        { label: "WAU", color: C.pink },
        { label: "MAU", color: C.cyan },
      ]} />
      <ResponsiveContainer width="100%" height={195}>
        <LineChart data={trendData} margin={{ top: 4, right: 10, left: -14, bottom: 0 }}>
          <CartesianGrid key="aut-grid" stroke={C.grid} strokeDasharray="none" vertical={false} />
          <XAxis
            key="aut-x"
            dataKey="date"
            tick={{ fontSize: 9, fill: C.muted } as any}
            tickLine={false}
            axisLine={{ stroke: C.grid }}
          />
          <YAxis
            key="aut-y"
            tick={{ fontSize: 9, fill: C.muted } as any}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
          />
          <Tooltip key="aut-tip" content={<ChartTooltip />} />
          <Line key="aut-dau" type="monotone" dataKey="dau" name="DAU" stroke={C.navy}
            strokeWidth={2} dot={{ r: 3, fill: C.navy, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          <Line key="aut-wau" type="monotone" dataKey="wau" name="WAU" stroke={C.pink}
            strokeWidth={2} dot={{ r: 3, fill: C.pink, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          <Line key="aut-mau" type="monotone" dataKey="mau" name="MAU" stroke={C.cyan}
            strokeWidth={2} dot={{ r: 3, fill: C.cyan, strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
}

function UserEngagementOverview() {
  return (
    <Panel title="User Engagement Overview">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, justifyContent: "space-around" }}>
        {engagementRows.map((row) => (
          <div key={row.label}>
            <div
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 10.5, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
                {row.label}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.fg }}>{row.value}</span>
                <span
                  style={{
                    fontSize: 10, fontWeight: 700,
                    color: row.up ? C.green : C.deepPink,
                    display: "flex", alignItems: "center", gap: 2,
                  }}
                >
                  {row.up ? "↑" : "↓"} {row.change}
                </span>
              </div>
            </div>
            <div style={{ height: 7, background: C.grid }}>
              <div
                style={{
                  width: `${row.barPct}%`, height: "100%",
                  background: C.navy, transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function TopPlatforms() {
  return (
    <Panel title="Top Platforms">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <PieChart width={130} height={130}>
            <Pie
              data={platformData}
              cx={60} cy={60}
              innerRadius={38} outerRadius={58}
              startAngle={90} endAngle={-270}
              dataKey="value"
            >
              {platformData.map((_, i) => (
                <Cell key={`platform-cell-${i}`} fill={PLATFORM_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
          <div
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center", pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: C.fg, lineHeight: 1 }}>72%</div>
            <div style={{ fontSize: 8.5, color: C.muted }}>Web</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, width: "100%", padding: "0 4px" }}>
          {platformData.map((d, i) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 9, height: 9, background: PLATFORM_COLORS[i],
                  display: "inline-block", flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 10.5, color: C.fg, flex: 1 }}>{d.name}</span>
              <span style={{ fontSize: 10.5, color: C.muted }}>
                {d.value}% ({d.count.toLocaleString()})
              </span>
            </div>
          ))}
          <div style={{ marginTop: 6, fontSize: 10, color: C.muted, borderTop: `0.5px solid ${C.border}`, paddingTop: 6 }}>
            Total Users<br />
            <span style={{ fontSize: 16, fontWeight: 700, color: C.fg }}>21,000</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function TopFeaturesByUsage() {
  const maxPct = 40;
  return (
    <Panel title="Top Features by Usage">
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {featureData.map((f) => (
          <div key={f.name}>
            <div
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 3,
              }}
            >
              <span style={{ fontSize: 10.5, color: C.fg }}>{f.name}</span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: C.fg }}>{f.pct}%</span>
            </div>
            <div style={{ height: 10, background: C.canvas }}>
              <div
                style={{
                  width: `${(f.pct / maxPct) * 100}%`,
                  height: "100%", background: C.navy,
                }}
              />
            </div>
          </div>
        ))}
        <button
          style={{
            fontSize: 10.5, color: C.cyan, background: "none",
            border: "none", cursor: "pointer", textAlign: "left",
            padding: "3px 0", fontWeight: 600,
          }}
        >
          View all features →
        </button>
      </div>
      <div style={{ marginTop: 6, fontSize: 9, color: C.muted, textAlign: "right" }}>% of Users</div>
    </Panel>
  );
}

function FeatureAdoptionOverTime() {
  return (
    <Panel title="Feature Adoption Over Time">
      <InlineLegend items={[
        { label: "Dashboard", color: C.navy   },
        { label: "Search",    color: C.pink   },
        { label: "Reports",   color: C.green  },
        { label: "Export",    color: C.orange },
      ]} />
      <ResponsiveContainer width="100%" height={185}>
        <LineChart data={adoptionData} margin={{ top: 4, right: 10, left: -18, bottom: 0 }}>
          <CartesianGrid key="fat-grid" stroke={C.grid} strokeDasharray="none" vertical={false} />
          <XAxis
            key="fat-x"
            dataKey="date"
            tick={{ fontSize: 9, fill: C.muted } as any}
            tickLine={false}
            axisLine={{ stroke: C.grid }}
          />
          <YAxis
            key="fat-y"
            tick={{ fontSize: 9, fill: C.muted } as any}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip key="fat-tip" content={<ChartTooltip />} />
          <Line key="fat-dashboard" type="monotone" dataKey="dashboard" name="Dashboard" stroke={C.navy}
            strokeWidth={2} dot={{ r: 3, fill: C.navy,   strokeWidth: 0 }} />
          <Line key="fat-search"    type="monotone" dataKey="search"    name="Search"    stroke={C.pink}
            strokeWidth={2} dot={{ r: 3, fill: C.pink,   strokeWidth: 0 }} />
          <Line key="fat-reports"   type="monotone" dataKey="reports"   name="Reports"   stroke={C.green}
            strokeWidth={2} dot={{ r: 3, fill: C.green,  strokeWidth: 0 }} />
          <Line key="fat-export"    type="monotone" dataKey="export"    name="Export"    stroke={C.orange}
            strokeWidth={2} dot={{ r: 3, fill: C.orange, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
}

function UserSegmentDistribution() {
  return (
    <Panel title="User Segment Distribution">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <PieChart width={140} height={120}>
            <Pie
              data={segmentData}
              cx={68} cy={58}
              innerRadius={38} outerRadius={56}
              startAngle={90} endAngle={-270}
              dataKey="value"
            >
              {segmentData.map((_, i) => (
                <Cell key={`segment-cell-${i}`} fill={SEGMENT_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
          <div
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center", pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: C.fg, lineHeight: 1 }}>21,000</div>
            <div style={{ fontSize: 8, color: C.muted }}>Total Users</div>
          </div>
        </div>
        <div
          style={{
            display: "flex", flexDirection: "column",
            gap: 6, width: "100%", padding: "4px 2px 0",
          }}
        >
          {segmentData.map((d, i) => (
            <div
              key={d.name}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 8, height: 8, background: SEGMENT_COLORS[i],
                    display: "inline-block", flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 10, color: C.fg }}>{d.name}</span>
              </div>
              <span style={{ fontSize: 10, color: C.muted }}>
                {d.value}% ({d.count.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function UserJourneyFunnel() {
  const maxCount = funnelSteps[0].count;
  const BAR_MAX = 72;
  const BAR_MIN = 18;
  return (
    <Panel title="User Journey Funnel (Registration to Active User)">
      <div
        style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", padding: "4px 0 0",
        }}
      >
        {funnelSteps.map((step, i) => {
          const barH = BAR_MIN + ((step.count / maxCount) * (BAR_MAX - BAR_MIN));
          return (
            <React.Fragment key={step.label}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.fg, lineHeight: 1 }}>
                  {step.count.toLocaleString()}
                </div>
                {i > 0 && (
                  <div style={{ fontSize: 9.5, color: C.muted, fontWeight: 600 }}>
                    {step.pct}%
                  </div>
                )}
                <div
                  style={{
                    width: 56,
                    height: barH,
                    background: i === 0
                      ? C.navy
                      : i === 1 ? "#1a6fa3"
                      : i === 2 ? "#3a8fc0"
                      : i === 3 ? "#62a8d4"
                      : C.cyan,
                  }}
                />
                <div
                  style={{
                    fontSize: 9, color: C.muted, textAlign: "center",
                    width: 64, lineHeight: 1.35,
                  }}
                >
                  {step.label}
                </div>
              </div>
              {i < funnelSteps.length - 1 && (
                <ChevronRight
                  size={14}
                  style={{ color: C.muted, flexShrink: 0, marginBottom: 38, opacity: 0.6 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Panel>
  );
}

function RetentionCohort() {
  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
  return (
    <Panel title="User Retention Cohort Analysis">
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%", borderCollapse: "collapse",
            fontSize: 10.5, fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left", padding: "6px 10px",
                  color: C.muted, fontWeight: 600,
                  borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap",
                }}
              >
                Cohort (Week of)
              </th>
              <th
                style={{
                  textAlign: "right", padding: "6px 10px",
                  color: C.muted, fontWeight: 600,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                Users
              </th>
              {weekLabels.map((wl) => (
                <th
                  key={wl}
                  style={{
                    textAlign: "center", padding: "6px 8px",
                    color: C.muted, fontWeight: 600,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {wl}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row, ri) => (
              <tr key={row.cohort} style={{ background: ri % 2 === 0 ? "#fff" : C.canvas }}>
                <td style={{ padding: "6px 10px", color: C.fg, whiteSpace: "nowrap" }}>
                  {row.cohort}
                </td>
                <td style={{ padding: "6px 10px", color: C.fg, textAlign: "right", fontWeight: 600 }}>
                  {row.users.toLocaleString()}
                </td>
                {row.weeks.map((val, wi) => (
                  <td key={wi} style={{ padding: "4px 5px", textAlign: "center" }}>
                    {val !== null ? (
                      <div
                        style={{
                          padding: "4px 2px",
                          background: getHeatmapBg(val),
                          color: (val ?? 0) >= 25 ? "#fff" : C.fg,
                          fontWeight: 700,
                          fontSize: 10.5,
                        }}
                      >
                        {val}%
                      </div>
                    ) : (
                      <span style={{ color: C.muted, fontSize: 11 }}>–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function GENEOverview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Row 1: KPI Cards (6-up) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 8,
        }}
      >
        {kpiCards.map((k) => (
          <KPICard key={k.id} {...k} />
        ))}
      </div>

      {/* Row 2: Active Users Trend | User Engagement Overview | Top Platforms */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.6fr 1fr", gap: 8 }}>
        <ActiveUsersTrend />
        <UserEngagementOverview />
        <TopPlatforms />
      </div>

      {/* Row 3: Top Features | Feature Adoption Over Time | User Segment */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 8 }}>
        <TopFeaturesByUsage />
        <FeatureAdoptionOverTime />
        <UserSegmentDistribution />
      </div>

      {/* Row 4: User Journey Funnel | Retention Cohort Analysis */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 8 }}>
        <UserJourneyFunnel />
        <RetentionCohort />
      </div>

      {/* Footer note */}
      <p style={{ fontSize: 9, color: C.muted, fontFamily: "'Segoe UI', sans-serif", margin: 0 }}>
        ⓘ All times are in IST. Data shown is based on selected date range and filters.
      </p>
    </div>
  );
}