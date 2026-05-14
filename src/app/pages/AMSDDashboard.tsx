import React, { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, GitBranch, Zap, AlertTriangle, FileText,
  Settings, ChevronDown, ChevronUp, CalendarDays,
  Bell, HelpCircle, User, RefreshCw, Database,
  CheckCircle2, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { C, FONT } from "../tokens";

// ── Tokens / palette ──────────────────────────────────────────────────────────
const STATUS_COLORS = [C.green, C.navy, C.orange, C.pink, "#9ca3af"];
const PLATFORM_COLORS = [C.navy, C.green];
const PRIORITY_DOT: Record<string, string> = {
  Critical: C.pink,
  High: C.orange,
  Medium: "#FBBF24",
  Low: C.green,
};
const STATUS_BADGE: Record<string, { bg: string; color: string }> = {
  "In Progress": { bg: "#dbeafe", color: C.navy     },
  "To Do":       { bg: "#fef3c7", color: "#92400e"  },
  "Done":        { bg: "#dcfce7", color: "#166534"  },
  "Blocked":     { bg: "#fee2e2", color: C.pink      },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const burndownData = [
  { date: "Apr 21", ideal: 120, remaining: 118, completed:  2  },
  { date: "Apr 28", ideal:  90, remaining:  88, completed: 25  },
  { date: "May 05", ideal:  60, remaining:  60, completed: 50  },
  { date: "May 12", ideal:  30, remaining:  42, completed: 80  },
  { date: "May 19", ideal:   0, remaining:  25, completed: 108 },
];

const velocityData = [
  { sprint: "Sprint 22", points: 110 },
  { sprint: "Sprint 23", points: 128 },
  { sprint: "Sprint 24", points:  96 },
  { sprint: "Sprint 25", points: 134 },
  { sprint: "Sprint 26", points: null },
];

const issueStatusData = [
  { name: "Done",        value: 885, pct: 71 },
  { name: "In Progress", value: 145, pct: 12 },
  { name: "To Do",       value: 110, pct:  9 },
  { name: "Blocked",     value:  75, pct:  6 },
  { name: "Reopened",    value:  25, pct:  2 },
];

const defectData = [
  { date: "Apr 21", raised: 45, resolved: 20 },
  { date: "Apr 28", raised: 60, resolved: 35 },
  { date: "May 05", raised: 52, resolved: 48 },
  { date: "May 12", raised: 75, resolved: 55 },
  { date: "May 19", raised: 65, resolved: 62 },
];

const activeUserData = [
  { date: "Apr 21", dau:  5800, wau: 17200, mau: 49000 },
  { date: "Apr 28", dau:  5950, wau: 17600, mau: 50200 },
  { date: "May 05", dau:  6100, wau: 17900, mau: 51000 },
  { date: "May 12", dau:  6050, wau: 18200, mau: 51800 },
  { date: "May 19", dau:  6200, wau: 18500, mau: 52300 },
];

const featureUsageData = [
  { name: "Dashboard View", pct: 32 },
  { name: "Search",         pct: 18 },
  { name: "Reports",        pct: 14 },
  { name: "Data Upload",    pct: 10 },
  { name: "Notifications",  pct:  7 },
  { name: "Export",         pct:  4 },
];

const topIssues = [
  { key: "AMSD-101", summary: "Login failure on SSO",        type: "Bug",  priority: "Critical", status: "In Progress", assignee: "Rajesh D.",  team: "Platform",    date: "19 May 2025" },
  { key: "AMSD-118", summary: "API timeout on data load",    type: "Bug",  priority: "High",     status: "To Do",       assignee: "Suresh K.",  team: "Integration", date: "18 May 2025" },
  { key: "AMSD-132", summary: "Dashboard load performance",  type: "Bug",  priority: "High",     status: "In Progress", assignee: "Anil N.",    team: "Platform",    date: "17 May 2025" },
  { key: "AMSD-145", summary: "Export to CSV not working",   type: "Task", priority: "Medium",   status: "To Do",       assignee: "Kavya M.",   team: "Reports",     date: "16 May 2025" },
  { key: "AMSD-150", summary: "UI alignment issue in modal", type: "Bug",  priority: "Low",      status: "Done",        assignee: "Meena R.",   team: "UI/UX",       date: "15 May 2025" },
];

const platformData = [
  { name: "Web",    value: 72, count: 13320 },
  { name: "Mobile", value: 28, count:  5180 },
];

const JIRA_FILTERS  = ["Project", "Sprint", "Issue Type", "Priority", "Status", "Assignee", "Team / Squad"];
const GENE_FILTERS  = ["Feature", "User Segment", "Platform", "Geography"];

const BOTTOM_TABS = [
  { id: "executive", label: "Executive Summary",      Icon: LayoutDashboard },
  { id: "jira",      label: "JIRA - Delivery Insights", Icon: GitBranch      },
  { id: "gene",      label: "GENE - Usage Analytics",   Icon: Zap            },
  { id: "issues",    label: "Issues Drill-down",       Icon: AlertTriangle   },
  { id: "adoption",  label: "Feature Adoption",        Icon: FileText        },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function Panel({ title, children, action, style }: {
  title: string; children: React.ReactNode;
  action?: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      background: "#fff", border: `0.5px solid ${C.border}`,
      padding: 12, display: "flex", flexDirection: "column", ...style,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ ...FONT.pageTitle, fontSize: 11, color: C.fg }}>{title}</span>
        {action ?? <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <AlertTriangle size={12} style={{ color: C.muted }} />
        </button>}
      </div>
      {children}
    </div>
  );
}

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: `0.5px solid ${C.border}`,
      padding: "6px 10px", fontSize: 10.5, fontFamily: "'Segoe UI', sans-serif",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 3px" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
          <span style={{ display: "inline-block", width: 8, height: 2, background: p.color }} />
          <span style={{ color: C.muted }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.fg }}>
            {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

function FilterDropdown({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ fontSize: 9, fontWeight: 600, color: C.muted, fontFamily: "'Segoe UI',sans-serif", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.4 }}>
        {label}
      </div>
      <button style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "4px 7px",
        background: "#fff", border: `1px solid ${C.border}`,
        fontSize: 10, color: C.fg, fontFamily: "'Segoe UI',sans-serif", cursor: "pointer",
      }}>
        <span>All</span>
        <ChevronDown size={10} style={{ color: C.muted }} />
      </button>
    </div>
  );
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KPICard({ icon, iconBg, label, value, change, positive, compare }: {
  icon: React.ReactNode; iconBg: string;
  label: string; value: string;
  change: string; positive: boolean; compare: string;
}) {
  return (
    <div style={{
      background: "#fff", border: `0.5px solid ${C.border}`,
      padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 40, height: 40, background: iconBg, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 9.5, color: C.muted, fontFamily: "'Segoe UI',sans-serif", marginBottom: 1 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.fg, fontFamily: "Arial,sans-serif", lineHeight: 1.1 }}>{value}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
          {positive
            ? <ArrowUpRight size={11} style={{ color: C.green }} />
            : <ArrowDownRight size={11} style={{ color: C.pink }} />}
          <span style={{ fontSize: 9.5, fontWeight: 700, color: positive ? C.green : C.pink }}>{change}</span>
          <span style={{ fontSize: 9, color: C.muted }}>{compare}</span>
        </div>
      </div>
    </div>
  );
}

// ── Sprint Burndown ───────────────────────────────────────────────────────────
function SprintBurndown() {
  return (
    <Panel title="Sprint Burndown">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        {[
          { label: "Ideal",     color: C.muted,   dash: true  },
          { label: "Remaining", color: C.navy,     dash: false },
          { label: "Completed", color: C.green,    dash: false },
        ].map(({ label, color, dash }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: C.muted, fontFamily: "'Segoe UI',sans-serif" }}>
            <svg width={16} height={2}>
              {dash
                ? <line x1="0" y1="1" x2="16" y2="1" stroke={color} strokeWidth={1.5} strokeDasharray="3 2" />
                : <line x1="0" y1="1" x2="16" y2="1" stroke={color} strokeWidth={1.5} />}
            </svg>
            {label}
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={175}>
        <LineChart data={burndownData} margin={{ top: 4, right: 10, left: -14, bottom: 0 }}>
          <CartesianGrid key="bd-grid" stroke={C.grid} strokeDasharray="none" vertical={false} />
          <XAxis key="bd-x" dataKey="date" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
          <YAxis key="bd-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false} domain={[0, 130]} />
          <Tooltip key="bd-tip" content={<ChartTip />} />
          <Line key="bd-ideal"     type="monotone" dataKey="ideal"     name="Ideal"     stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
          <Line key="bd-remaining" type="monotone" dataKey="remaining" name="Remaining" stroke={C.navy}  strokeWidth={2}   dot={{ r: 3, fill: C.navy,  strokeWidth: 0 }} />
          <Line key="bd-completed" type="monotone" dataKey="completed" name="Completed" stroke={C.green} strokeWidth={2}   dot={{ r: 3, fill: C.green, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
}

// ── Velocity ─────────────────────────────────────────────────────────────────
function VelocityChart() {
  return (
    <Panel title="Velocity (Story Points)">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={velocityData} margin={{ top: 14, right: 10, left: -14, bottom: 0 }}>
          <CartesianGrid key="vel-grid" stroke={C.grid} strokeDasharray="none" vertical={false} />
          <XAxis key="vel-x" dataKey="sprint" tick={{ fontSize: 8.5, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
          <YAxis key="vel-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false} domain={[0, 160]} />
          <Tooltip key="vel-tip" content={<ChartTip />} />
          <Bar key="vel-bar" dataKey="points" name="Story Points" maxBarSize={38} radius={[2, 2, 0, 0]}>
            {velocityData.map((entry, i) => (
              <Cell key={`vel-cell-${i}`} fill={i === 4 ? C.border : i === 3 ? C.cyan : C.navy} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  );
}

// ── Issue Status Distribution ─────────────────────────────────────────────────
function IssueStatusDist() {
  return (
    <Panel title="Issue Status Distribution">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Donut */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <PieChart width={130} height={130}>
            <Pie data={issueStatusData} cx={62} cy={62}
              innerRadius={40} outerRadius={60}
              startAngle={90} endAngle={-270} dataKey="value">
              {issueStatusData.map((_, i) => (
                <Cell key={`isd-cell-${i}`} fill={STATUS_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)", textAlign: "center",
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.fg, lineHeight: 1 }}>1,240</div>
            <div style={{ fontSize: 8, color: C.muted }}>Total</div>
          </div>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
          {issueStatusData.map((d, i) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 9, height: 9, background: STATUS_COLORS[i], display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 9.5, color: C.fg, fontFamily: "'Segoe UI',sans-serif" }}>{d.name}</span>
              </div>
              <span style={{ fontSize: 9.5, color: C.muted, fontFamily: "'Segoe UI',sans-serif" }}>
                {d.value.toLocaleString()} ({d.pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ── Defect Trend ─────────────────────────────────────────────────────────────
function DefectTrend() {
  return (
    <Panel title="Defect Trend">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        {[
          { label: "Bugs Raised",   color: C.pink  },
          { label: "Bugs Resolved", color: C.green },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: C.muted, fontFamily: "'Segoe UI',sans-serif" }}>
            <span style={{ display: "inline-block", width: 14, height: 2, background: color }} />
            {label}
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={defectData} margin={{ top: 4, right: 10, left: -14, bottom: 0 }}>
          <CartesianGrid key="dt-grid" stroke={C.grid} strokeDasharray="none" vertical={false} />
          <XAxis key="dt-x" dataKey="date" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
          <YAxis key="dt-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false} domain={[0, 90]} />
          <Tooltip key="dt-tip" content={<ChartTip />} />
          <Line key="dt-raised"   type="monotone" dataKey="raised"   name="Bugs Raised"   stroke={C.pink}  strokeWidth={2} dot={{ r: 3, fill: C.pink,  strokeWidth: 0 }} />
          <Line key="dt-resolved" type="monotone" dataKey="resolved" name="Bugs Resolved" stroke={C.green} strokeWidth={2} dot={{ r: 3, fill: C.green, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
}

// ── Active Users Trend ────────────────────────────────────────────────────────
function ActiveUsersTrend() {
  const [metric, setMetric] = useState<"dau" | "wau" | "mau">("wau");
  const metaMap = {
    dau: { label: "DAU", color: C.navy  },
    wau: { label: "WAU", color: C.cyan  },
    mau: { label: "MAU", color: C.pink  },
  };
  const { label, color } = metaMap[metric];
  return (
    <Panel title="Active Users Trend" action={
      <div style={{ display: "flex", gap: 2 }}>
        {(["dau", "wau", "mau"] as const).map((m) => (
          <button key={m} onClick={() => setMetric(m)} style={{
            padding: "2px 7px", fontSize: 9, fontWeight: 600,
            background: metric === m ? C.navy : "#f1f5f9",
            color: metric === m ? "#fff" : C.muted,
            border: "none", cursor: "pointer",
            fontFamily: "'Segoe UI',sans-serif",
          }}>
            {m.toUpperCase()}
          </button>
        ))}
      </div>
    }>
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={activeUserData} margin={{ top: 4, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid key="aut-grid" stroke={C.grid} strokeDasharray="none" vertical={false} />
          <XAxis key="aut-x" dataKey="date" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
          <YAxis key="aut-y" tick={{ fontSize: 9, fill: C.muted } as any} tickLine={false} axisLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
          <Tooltip key="aut-tip" content={<ChartTip />} />
          <Line key={`aut-line-${metric}`} type="monotone" dataKey={metric} name={label} stroke={color}
            strokeWidth={2} dot={{ r: 3, fill: color, strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
}

// ── Top Features by Usage ─────────────────────────────────────────────────────
function TopFeatures() {
  const max = 40;
  return (
    <Panel title="Top Features by Usage">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, justifyContent: "space-between" }}>
        {featureUsageData.map((f) => (
          <div key={f.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 9.5, color: C.fg, fontFamily: "'Segoe UI',sans-serif" }}>{f.name}</span>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: C.fg, fontFamily: "'Segoe UI',sans-serif" }}>{f.pct}%</span>
            </div>
            <div style={{ height: 9, background: C.canvas }}>
              <div style={{ width: `${(f.pct / max) * 100}%`, height: "100%", background: C.navy }} />
            </div>
          </div>
        ))}
        <div style={{ fontSize: 8.5, color: C.muted, textAlign: "right", fontFamily: "'Segoe UI',sans-serif", marginTop: 2 }}>
          0%&nbsp;&nbsp;&nbsp;10%&nbsp;&nbsp;&nbsp;20%&nbsp;&nbsp;&nbsp;30%&nbsp;&nbsp;&nbsp;40%<br />% of Users
        </div>
      </div>
    </Panel>
  );
}

// ── Top Issues Table ──────────────────────────────────────────────────────────
function TopIssuesTable() {
  const cols = ["Issue Key", "Summary", "Issue Type", "Priority", "Status", "Assignee", "Team", "Created Date"];
  return (
    <Panel title="Top Issues / Risks" style={{ flex: 1 }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, fontFamily: "'Segoe UI',sans-serif" }}>
          <thead>
            <tr style={{ background: C.canvas }}>
              {cols.map((col) => (
                <th key={col} style={{
                  textAlign: "left", padding: "5px 8px",
                  color: C.muted, fontWeight: 600, fontSize: 9.5,
                  borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap",
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topIssues.map((issue, ri) => (
              <tr key={issue.key} style={{ background: ri % 2 === 0 ? "#fff" : C.canvas }}>
                <td style={{ padding: "5px 8px", color: C.cyan, fontWeight: 600, whiteSpace: "nowrap" }}>
                  {issue.key}
                </td>
                <td style={{ padding: "5px 8px", color: C.fg, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {issue.summary}
                </td>
                <td style={{ padding: "5px 8px", color: C.muted }}>{issue.type}</td>
                <td style={{ padding: "5px 8px", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_DOT[issue.priority], display: "inline-block" }} />
                    <span style={{ color: C.fg }}>{issue.priority}</span>
                  </div>
                </td>
                <td style={{ padding: "5px 8px" }}>
                  <span style={{
                    padding: "2px 7px", fontSize: 9, fontWeight: 600,
                    background: STATUS_BADGE[issue.status]?.bg ?? C.canvas,
                    color: STATUS_BADGE[issue.status]?.color ?? C.muted,
                  }}>
                    {issue.status}
                  </span>
                </td>
                <td style={{ padding: "5px 8px", color: C.fg, whiteSpace: "nowrap" }}>{issue.assignee}</td>
                <td style={{ padding: "5px 8px", color: C.muted, whiteSpace: "nowrap" }}>{issue.team}</td>
                <td style={{ padding: "5px 8px", color: C.muted, whiteSpace: "nowrap" }}>{issue.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={{
          background: "none", border: "none", color: C.cyan, fontSize: 10,
          fontWeight: 600, cursor: "pointer", padding: "6px 0", fontFamily: "'Segoe UI',sans-serif",
        }}>
          View all issues →
        </button>
      </div>
    </Panel>
  );
}

// ── Platform Usage ────────────────────────────────────────────────────────────
function PlatformUsage() {
  return (
    <Panel title="Platform Usage (GENE)" style={{ width: 220, flexShrink: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <PieChart width={140} height={130}>
            <Pie data={platformData} cx={68} cy={62}
              innerRadius={42} outerRadius={60}
              startAngle={90} endAngle={-270} dataKey="value">
              {platformData.map((_, i) => (
                <Cell key={`pu-cell-${i}`} fill={PLATFORM_COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)", textAlign: "center",
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.fg, lineHeight: 1 }}>72%</div>
            <div style={{ fontSize: 8, color: C.muted }}>Web</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", padding: "0 4px" }}>
          {platformData.map((d, i) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 9, height: 9, background: PLATFORM_COLORS[i], display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: C.fg, flex: 1 }}>{d.name}</span>
              <span style={{ fontSize: 10, color: C.muted }}>{d.value}% ({d.count.toLocaleString()})</span>
            </div>
          ))}
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: `0.5px solid ${C.border}`, fontSize: 9.5, color: C.muted }}>
            Total Users<br />
            <span style={{ fontSize: 17, fontWeight: 700, color: C.fg }}>18,500</span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ── Sidebar NavItem ───────────────────────────────────────────────────────────
function SideNavItem({ Icon, label, isActive, onClick }: {
  Icon: React.ElementType; label: string; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        paddingTop: 9, paddingBottom: 9, paddingLeft: 17, paddingRight: 0,
        width: "100%",
        background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
        borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
        borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
        borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "transparent",
        borderLeftWidth: 3, borderLeftStyle: "solid",
        borderLeftColor: isActive ? C.cyan : "transparent",
        cursor: "pointer", textAlign: "left",
      }}
    >
      <Icon size={14} style={{ color: isActive ? C.cyan : "rgba(255,255,255,0.6)", flexShrink: 0 }} strokeWidth={isActive ? 2.5 : 1.8} />
      <span style={{ fontSize: 11, fontFamily: "'Segoe UI',sans-serif", color: isActive ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: isActive ? 600 : 400 }}>
        {label}
      </span>
    </button>
  );
}

// ── Placeholder for non-active tabs ──────────────────────────────────────────
function TabPlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 10, color: C.muted,
      fontFamily: "'Segoe UI',sans-serif",
    }}>
      <div style={{ fontSize: 32, opacity: 0.2 }}>📊</div>
      <div style={{ fontWeight: 600, fontSize: 14, color: C.fg }}>{label}</div>
      <div style={{ fontSize: 12 }}>This view is under construction.</div>
    </div>
  );
}

// ── Executive Summary Content ─────────────────────────────────────────────────
function ExecutiveSummaryContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        <KPICard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#005587" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>}
          iconBg="#dbeafe" label="Total Issues" value="1,240"
          change="+8.5%" positive compare="vs last 30 days"
        />
        <KPICard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E1176B" strokeWidth="2"><path d="M12 2c-1 0-2 .5-2.5 1.5C8 5 7 6 7 8c0 3 2 5 5 5s5-2 5-5c0-2-1-3-2.5-4.5C14 2.5 13 2 12 2z"/><path d="M12 13v9M8 18h8"/></svg>}
          iconBg="#fee2e2" label="Open Bugs" value="86"
          change="+12.2%" positive={false} compare="vs last 30 days"
        />
        <KPICard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          iconBg="#ede9fe" label="Active Users (WAU)" value="18,500"
          change="+8.3%" positive compare="vs last 7 days"
        />
        <KPICard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D7BBB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          iconBg="#dbeafe" label="Avg. Session Duration" value="6m 24s"
          change="+5.6%" positive compare="vs last 7 days"
        />
        <KPICard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
          iconBg="#fef3c7" label="Release Progress" value="72%"
          change="+7%" positive compare="vs last sprint"
        />
      </div>

      {/* Row 2: Sprint Burndown | Velocity | Issue Status */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1.4fr", gap: 8 }}>
        <SprintBurndown />
        <VelocityChart />
        <IssueStatusDist />
      </div>

      {/* Row 3: Defect Trend | Active Users Trend | Top Features */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1fr", gap: 8 }}>
        <DefectTrend />
        <ActiveUsersTrend />
        <TopFeatures />
      </div>

      {/* Row 4: Top Issues Table | Platform Usage */}
      <div style={{ display: "flex", gap: 8 }}>
        <TopIssuesTable />
        <PlatformUsage />
      </div>

      <p style={{ fontSize: 8.5, color: C.muted, fontFamily: "'Segoe UI',sans-serif", margin: 0 }}>
        ⓘ All times are in IST. Data reflects selected date range and filters. Last sync: 10:30 AM, 20 May 2025.
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AMSDDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("executive");
  const [jiraOpen, setJiraOpen] = useState(true);
  const [geneOpen, setGeneOpen] = useState(true);
  const [dataSource, setDataSource] = useState<"JIRA" | "GENE">("JIRA");

  const handleTab = (id: string) => {
    if (id === "gene") { navigate("/"); return; }
    setActiveTab(id);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', Arial, sans-serif", background: C.canvas }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 148, background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0, zIndex: 20 }}>
        {/* Logo */}
        <div style={{ padding: "14px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, background: C.cyan, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.5 6.5H14L10.5 9L11.8 13.5L8 11L4.2 13.5L5.5 9L2 6.5H6.5L8 2Z" fill="white" />
              </svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: 0.5, lineHeight: 1.2 }}>AMSD<br /><span style={{ fontSize: 9, fontWeight: 400, opacity: 0.7 }}>Executive</span></span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, paddingTop: 6, display: "flex", flexDirection: "column" }}>
          {BOTTOM_TABS.map(({ id, label, Icon }) => (
            <SideNavItem key={id} Icon={Icon} label={label} isActive={activeTab === id && id !== "gene"} onClick={() => handleTab(id)} />
          ))}
          {/* Divider → GENE link */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.12)", margin: "8px 0 4px" }} />
          <SideNavItem Icon={LayoutDashboard} label="GENE Analytics" isActive={false} onClick={() => navigate("/")} />
        </nav>

        {/* Settings */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingBottom: 6 }}>
          <SideNavItem Icon={Settings} label="Settings" isActive={false} onClick={() => {}} />
        </div>
      </aside>

      {/* ── Main column ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 14px", background: "#fff",
          borderBottom: `1px solid ${C.border}`, flexShrink: 0, minHeight: 50,
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.fg, lineHeight: 1.2 }}>
              AMSD Executive Dashboard
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: 10.5, color: C.muted }}>
              Unified JIRA + GENE analytics for sprint, quality &amp; user insights
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 9.5, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
              <RefreshCw size={11} style={{ color: C.cyan }} />
              Last refreshed: 20 May 2025 10:30 AM
            </div>
            {[Bell, HelpCircle, Settings, User].map((Icon, i) => (
              <button key={i} style={{
                padding: 6, background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center",
              }}>
                <Icon size={15} style={{ color: C.muted }} />
              </button>
            ))}
          </div>
        </header>

        {/* Content Row */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Filter Panel */}
          <aside style={{
            width: 175, background: "#fff",
            borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column",
            flexShrink: 0, overflowY: "auto",
          }}>
            <div style={{ padding: "11px 11px 0" }}>

              {/* Date */}
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 5 }}>Date</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                <button style={{
                  padding: "3px 6px", fontSize: 9.5, border: `1px solid ${C.border}`,
                  background: "#fff", color: C.fg, cursor: "pointer", flex: 1,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <CalendarDays size={9} style={{ color: C.navy }} />01 Apr 2025
                </button>
                <span style={{ fontSize: 9, color: C.muted }}>–</span>
                <button style={{
                  padding: "3px 6px", fontSize: 9.5, border: `1px solid ${C.border}`,
                  background: "#fff", color: C.fg, cursor: "pointer", flex: 1,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <CalendarDays size={9} style={{ color: C.navy }} />20 May 2025
                </button>
              </div>
              {/* Range slider */}
              <div style={{ position: "relative", height: 14, marginBottom: 10 }}>
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3, background: C.grid, transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "10%", right: "15%", height: 3, background: C.cyan, transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "10%", width: 9, height: 9, background: "#fff", borderRadius: "50%", border: `2px solid ${C.cyan}`, transform: "translate(-50%,-50%)" }} />
                <div style={{ position: "absolute", top: "50%", right: "15%", width: 9, height: 9, background: "#fff", borderRadius: "50%", border: `2px solid ${C.cyan}`, transform: "translate(50%,-50%)" }} />
              </div>

              {/* Data Source toggle */}
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 6 }}>Data Source</div>
              <div style={{ display: "flex", marginBottom: 12 }}>
                {(["JIRA", "GENE"] as const).map((src) => (
                  <button key={src} onClick={() => setDataSource(src)} style={{
                    flex: 1, padding: "5px 0", fontSize: 10.5, fontWeight: 700,
                    background: dataSource === src ? C.navy : "#f1f5f9",
                    color: dataSource === src ? "#fff" : C.muted,
                    border: "none", cursor: "pointer",
                    fontFamily: "'Segoe UI',sans-serif",
                  }}>
                    {src}
                  </button>
                ))}
              </div>

              <div style={{ height: 1, background: C.border, marginBottom: 10 }} />

              {/* JIRA Filters */}
              <button
                onClick={() => setJiraOpen(!jiraOpen)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", background: "none",
                  borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
                  borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
                  borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "transparent",
                  borderLeftWidth: 0, borderLeftStyle: "solid", borderLeftColor: "transparent",
                  cursor: "pointer", padding: 0, marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase" }}>JIRA Filters</span>
                {jiraOpen ? <ChevronUp size={11} style={{ color: C.muted }} /> : <ChevronDown size={11} style={{ color: C.muted }} />}
              </button>
              {jiraOpen && JIRA_FILTERS.map((f) => <FilterDropdown key={f} label={f} />)}

              <div style={{ height: 1, background: C.border, marginBottom: 10, marginTop: 2 }} />

              {/* GENE Filters */}
              <button
                onClick={() => setGeneOpen(!geneOpen)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", background: "none",
                  borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
                  borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
                  borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "transparent",
                  borderLeftWidth: 0, borderLeftStyle: "solid", borderLeftColor: "transparent",
                  cursor: "pointer", padding: 0, marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase" }}>GENE Filters</span>
                {geneOpen ? <ChevronUp size={11} style={{ color: C.muted }} /> : <ChevronDown size={11} style={{ color: C.muted }} />}
              </button>
              {geneOpen && GENE_FILTERS.map((f) => <FilterDropdown key={f} label={f} />)}
            </div>

            {/* Reset */}
            <div style={{ marginTop: "auto", padding: "10px 11px 12px", borderTop: `1px solid ${C.border}` }}>
              <button style={{
                width: "100%", padding: "7px 0",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                border: `1px solid ${C.navy}`, background: "#fff",
                color: C.navy, fontSize: 10.5, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Segoe UI',sans-serif",
              }}>
                <RefreshCw size={11} /> Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content Column */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: "auto", background: C.canvas, padding: 10 }}>
              {activeTab === "executive" && <ExecutiveSummaryContent />}
              {activeTab === "jira"      && <TabPlaceholder label="JIRA – Delivery Insights" />}
              {activeTab === "issues"    && <TabPlaceholder label="Issues Drill-down" />}
              {activeTab === "adoption"  && <TabPlaceholder label="Feature Adoption" />}
            </div>

            {/* Bottom Tab Bar */}
            <div style={{
              display: "flex", alignItems: "stretch",
              background: "#fff", borderTop: `1px solid ${C.border}`,
              flexShrink: 0, minHeight: 38,
            }}>
              {BOTTOM_TABS.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button key={id} onClick={() => handleTab(id)} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "0 16px",
                    background: "none",
                    borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
                    borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
                    borderLeftWidth: 0, borderLeftStyle: "solid", borderLeftColor: "transparent",
                    borderBottomWidth: 3, borderBottomStyle: "solid",
                    borderBottomColor: isActive ? C.cyan : "transparent",
                    color: isActive ? C.navy : C.muted,
                    fontSize: 11, fontWeight: isActive ? 700 : 400,
                    fontFamily: "'Segoe UI',sans-serif", cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}>
                    <Icon size={13} style={{ color: isActive ? C.cyan : C.muted }} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
