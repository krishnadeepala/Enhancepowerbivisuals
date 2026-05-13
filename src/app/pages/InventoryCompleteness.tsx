import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, LabelList,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { C, FONT } from "../tokens";

// ── Data ─────────────────────────────────────────────────────────────────────

const platformGroups = [
  {
    id: "qlik",
    name: "qlik sense",
    total: 868, complete: 55, pct: 6.34,
    children: [
      { name: "Crystal Reports", total: null,  complete: null, pct: 0.00, hl: false },
      { name: "dashboard",       total: 868,   complete: 55,   pct: 6.34, hl: true  },
      { name: "email",           total: null,  complete: null, pct: 0.00, hl: false },
      { name: "Publication",     total: null,  complete: null, pct: 0.00, hl: false },
      { name: "report",          total: null,  complete: null, pct: 0.00, hl: false },
    ],
  },
  { id: "posit", name: "posit connect", total: 1165, complete: 25,   pct: 2.15, children: [] },
  { id: "other", name: "other",         total: null, complete: null, pct: 0.00, children: [] },
  { id: "lake",  name: "lake",          total: null, complete: null, pct: 0.00, children: [] },
  { id: "dbt",   name: "dbt",           total: null, complete: null, pct: 0.00, children: [] },
  { id: "misc",  name: "",              total: 824,  complete: null, pct: 0.00, children: [] },
];

const missingMetadata = [
  { field: "Missing Rat. Decision",   count: 2777 },
  { field: "Missing Content Owner",   count: 2070 },
  { field: "Missing Technical Owner", count: 2002 },
  { field: "Missing Developer",       count:  876 },
  { field: "Missing Gene URL",        count:  824 },
];

const rationalizationOutcomes = [
  { outcome: "Migrate to PowerBI",       count: 30 },
  { outcome: "Consolidate in PowerBI",   count: 17 },
  { outcome: "No Change, Stay in Posit", count: 16 },
  { outcome: "Retire",                   count: 11 },
  { outcome: "Consolidate in Posit",     count:  6 },
];

const kpiCards = [
  {
    label:        "Analytics Assets Rationalized",
    value:        "2.80%",
    detail:       "Total Assets",
    detailNum:    "2857",
    accent:       C.green,
    valueColor:   C.navy,
  },
  {
    label:        "% of Assets recommended for Retire",
    value:        "3%",
    detail:       "# of Assets recommended for Retire",
    detailNum:    "80",
    accent:       C.pink,
    valueColor:   C.pink,
  },
  {
    label:        "% of eligible Assets Modernized to PBI",
    value:        "3%",
    detail:       "# of eligible Assets Modernized to PBI",
    detailNum:    "80",
    accent:       C.cyan,
    valueColor:   C.cyan,
  },
  {
    label:        "Business Objects Remaining",
    value:        "812",
    detail:       "Total Assets Modernized to PBI",
    detailNum:    "21",
    accent:       C.navy,
    valueColor:   C.navy,
  },
];

const SLICER_LABELS = ["Content Owner", "Technical Owner", "Current Developer", "Domain"];

// ── CHOP Logo ─────────────────────────────────────────────────────────────────
function CHOPLogo() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      {/* Outer circle */}
      <circle cx="23" cy="23" r="21" stroke={C.navy} strokeWidth="3" fill="none" />
      {/* C arc */}
      <path
        d="M28 10 A16 16 0 1 0 28 36"
        stroke={C.navy} strokeWidth="3.5" fill="none"
        strokeLinecap="round"
      />
      {/* H */}
      <line x1="27" y1="12" x2="27" y2="34" stroke={C.navy} strokeWidth="3" strokeLinecap="round" />
      <line x1="35" y1="12" x2="35" y2="34" stroke={C.navy} strokeWidth="3" strokeLinecap="round" />
      <line x1="27" y1="23" x2="35" y2="23" stroke={C.navy} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Slicer Dropdown ───────────────────────────────────────────────────────────
function SlicerDropdown({ label }: { label: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>
      <div style={{
        background: C.navy, color: "#fff",
        fontSize: 10, fontWeight: 700,
        padding: "5px 9px",
        fontFamily: "'Segoe UI', sans-serif", letterSpacing: 0.2,
      }}>
        {label}
      </div>
      <div style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        borderTop: "none",
        padding: "5px 9px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer",
      }}>
        <span style={{ fontSize: 10.5, color: C.fg, fontFamily: "'Segoe UI', sans-serif" }}>All</span>
        <ChevronDown size={12} style={{ color: C.muted, flexShrink: 0 }} />
      </div>
    </div>
  );
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KPICard({ label, value, detail, detailNum, accent, valueColor }: {
  label: string; value: string; detail: string; detailNum: string;
  accent: string; valueColor: string;
}) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${C.border}`,
      borderLeft: `5px solid ${accent}`,
      padding: "13px 16px 12px",
      display: "flex", flexDirection: "column", gap: 4,
      boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
    }}>
      <div style={{
        fontSize: 10, color: C.muted,
        fontFamily: "'Segoe UI', sans-serif",
        lineHeight: 1.4, minHeight: 28,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 34, fontWeight: 700,
        color: valueColor,
        fontFamily: "Arial, sans-serif",
        lineHeight: 1, marginTop: 2,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 9.5, color: C.muted, fontFamily: "'Segoe UI', sans-serif", marginTop: 4 }}>
        {detail}{" "}
        <strong style={{ color: C.fg, fontWeight: 700 }}>{detailNum}</strong>
      </div>
      {/* Accent bar at bottom */}
      <div style={{ height: 2, background: accent, marginTop: 8, opacity: 0.3 }} />
    </div>
  );
}

// ── Platform Table ────────────────────────────────────────────────────────────
function PlatformTable() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ qlik: true });
  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{
      display: "flex", flexDirection: "column", overflow: "hidden",
      background: "#fff", border: `1px solid ${C.border}`,
    }}>
      <div style={{
        padding: "9px 12px 7px",
        borderBottom: `2px solid ${C.navy}`,
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: 12, fontWeight: 700, color: C.fg,
      }}>
        Inventory Completeness by Platform
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <table style={{
          width: "100%", borderCollapse: "collapse",
          fontSize: 10.5, fontFamily: "'Segoe UI', sans-serif",
        }}>
          <thead>
            <tr style={{ background: C.navy }}>
              <th style={{ textAlign: "left",  padding: "6px 10px", color: "#fff", fontWeight: 600, fontSize: 10 }}>Platform</th>
              <th style={{ textAlign: "right", padding: "6px 10px", color: "#fff", fontWeight: 600, fontSize: 10 }}>Total</th>
              <th style={{ textAlign: "right", padding: "6px 10px", color: "#fff", fontWeight: 600, fontSize: 10, whiteSpace: "normal", lineHeight: 1.2 }}>Complet&shy;e</th>
              <th style={{ textAlign: "right", padding: "6px 10px", color: "#fff", fontWeight: 600, fontSize: 10 }}>% Complete</th>
            </tr>
          </thead>
          <tbody>
            {platformGroups.map((grp, gi) => (
              <React.Fragment key={grp.id}>
                {/* ── Parent row ── */}
                <tr
                  onClick={() => grp.children.length > 0 && toggle(grp.id)}
                  style={{
                    background: gi % 2 === 0 ? "#dce9f1" : "#e8f1f7",
                    cursor: grp.children.length > 0 ? "pointer" : "default",
                  }}
                >
                  <td style={{ padding: "5px 8px", color: C.fg, fontWeight: 600 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      {grp.children.length > 0 ? (
                        <span style={{
                          width: 13, height: 13, flexShrink: 0,
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          background: C.navy, color: "#fff",
                          fontSize: 14, lineHeight: 1, fontWeight: 700,
                        }}>
                          {expanded[grp.id] ? "−" : "+"}
                        </span>
                      ) : (
                        <span style={{ width: 13, display: "inline-block", flexShrink: 0 }}>
                          <span style={{
                            width: 8, height: 8, display: "inline-block",
                            border: `1.5px solid ${C.navy}`, marginLeft: 2,
                          }} />
                        </span>
                      )}
                      <span style={{ fontSize: 10.5 }}>{grp.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "right", color: C.fg, fontWeight: 600 }}>
                    {grp.total ?? ""}
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "right", color: C.fg, fontWeight: 600 }}>
                    {grp.complete ?? ""}
                  </td>
                  <td style={{ padding: "5px 10px", textAlign: "right", color: C.fg, fontWeight: 600 }}>
                    {grp.pct > 0 ? `${grp.pct.toFixed(2)}%` : "0.00%"}
                  </td>
                </tr>

                {/* ── Child rows ── */}
                {expanded[grp.id] && grp.children.map((child, ci) => (
                  <tr key={`${grp.id}-c${ci}`} style={{ background: ci % 2 === 0 ? "#fff" : "#f7f9fa" }}>
                    <td style={{ padding: "4px 8px 4px 28px", color: C.fg }}>
                      {child.name}
                    </td>
                    <td style={{ padding: "4px 10px", textAlign: "right", color: C.fg }}>
                      {child.total ?? ""}
                    </td>
                    <td style={{ padding: "4px 10px", textAlign: "right", color: C.fg }}>
                      {child.complete ?? ""}
                    </td>
                    <td style={{
                      padding: "4px 10px", textAlign: "right",
                      background: child.hl ? C.green : "transparent",
                      color: child.hl ? "#fff" : C.fg,
                      fontWeight: child.hl ? 700 : 400,
                    }}>
                      {child.pct > 0 ? `${child.pct.toFixed(2)}%` : "0.00%"}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* ── Total row ── */}
            <tr style={{ background: "#c8dce9", borderTop: `2px solid ${C.navy}` }}>
              <td style={{ padding: "6px 8px 6px 28px", color: C.fg, fontWeight: 700 }}>Total</td>
              <td style={{ padding: "6px 10px", textAlign: "right", color: C.fg, fontWeight: 700 }}>2857</td>
              <td style={{ padding: "6px 10px", textAlign: "right", color: C.fg, fontWeight: 700 }}>80</td>
              <td style={{ padding: "6px 10px", textAlign: "right", color: C.fg, fontWeight: 700 }}>2.80%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Horizontal Bar Tooltip ────────────────────────────────────────────────────
const HBarTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: `0.5px solid ${C.border}`,
      padding: "6px 10px", fontSize: 10.5,
      fontFamily: "'Segoe UI', sans-serif",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}>
      <p style={{ fontWeight: 600, color: C.fg, margin: "0 0 2px" }}>{label}</p>
      <span style={{ color: C.muted }}>Count: </span>
      <strong style={{ color: C.fg }}>{payload[0].value?.toLocaleString()}</strong>
    </div>
  );
};

// ── Missing Metadata Chart ────────────────────────────────────────────────────
function MissingMetadataChart() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", overflow: "hidden",
      background: "#fff", border: `1px solid ${C.border}`,
    }}>
      <div style={{
        padding: "9px 12px 7px",
        borderBottom: `2px solid ${C.navy}`,
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: 12, fontWeight: 700, color: C.fg,
      }}>
        Missing Metadata by Field Type
      </div>
      <div style={{ flex: 1, padding: "10px 0" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={missingMetadata}
            layout="vertical"
            margin={{ top: 4, right: 52, left: 4, bottom: 10 }}
          >
            <CartesianGrid key="mm-grid" stroke={C.grid} horizontal={false} strokeDasharray="none" />
            <XAxis
              key="mm-x"
              type="number"
              domain={[0, 3000]}
              ticks={[0, 2000]}
              tickFormatter={(v) => v === 0 ? "0K" : "2K"}
              tick={{ fontSize: 9, fill: C.muted } as any}
              tickLine={false}
              axisLine={{ stroke: C.grid }}
            />
            <YAxis
              key="mm-y"
              type="category"
              dataKey="field"
              width={156}
              tick={{ fontSize: 9.5, fill: C.fg } as any}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip key="mm-tip" content={<HBarTip />} cursor={{ fill: "rgba(0,85,135,0.06)" }} />
            <Bar key="mm-bar" dataKey="count" name="Count" fill={C.navy} radius={0} barSize={20}>
              <LabelList
                dataKey="count"
                position="right"
                style={{ fontSize: 10, fill: C.fg, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Rationalization Outcomes Chart ────────────────────────────────────────────
function RationalizationChart() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", overflow: "hidden",
      background: "#fff", border: `1px solid ${C.border}`,
    }}>
      <div style={{
        padding: "9px 12px 7px",
        borderBottom: `2px solid ${C.navy}`,
        fontFamily: "'Segoe UI', sans-serif",
        fontSize: 12, fontWeight: 700, color: C.fg,
      }}>
        Rationalization Outcomes
      </div>
      <div style={{ flex: 1, padding: "10px 0" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rationalizationOutcomes}
            layout="vertical"
            margin={{ top: 4, right: 44, left: 4, bottom: 10 }}
          >
            <CartesianGrid key="ro-grid" stroke={C.grid} horizontal={false} strokeDasharray="none" />
            <XAxis
              key="ro-x"
              type="number"
              domain={[0, 35]}
              ticks={[0, 20]}
              tick={{ fontSize: 9, fill: C.muted } as any}
              tickLine={false}
              axisLine={{ stroke: C.grid }}
            />
            <YAxis
              key="ro-y"
              type="category"
              dataKey="outcome"
              width={144}
              tick={{ fontSize: 9.5, fill: C.fg } as any}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip key="ro-tip" content={<HBarTip />} cursor={{ fill: "rgba(65,182,230,0.08)" }} />
            <Bar key="ro-bar" dataKey="count" name="Count" fill={C.cyan} radius={0} barSize={20}>
              <LabelList
                dataKey="count"
                position="right"
                style={{ fontSize: 10, fill: C.fg, fontWeight: 700, fontFamily: "'Segoe UI', sans-serif" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function InventoryCompleteness() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"gene" | "info" | "chat">("gene");

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      background: "#f4f4f6",
    }}>

      {/* ── Narrow left icon rail ── */}
      <aside style={{
        width: 38, background: C.navy,
        display: "flex", flexDirection: "column",
        alignItems: "center", flexShrink: 0,
        paddingTop: 0,
      }}>
        {/* Gene tab */}
        <button
          onClick={() => { setActiveTab("gene"); navigate("/"); }}
          style={{
            width: "100%", padding: "10px 0",
            background: activeTab === "gene" ? "#fff" : "transparent",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderBottom: `1px solid rgba(255,255,255,0.15)`,
          }}
        >
          <span style={{
            writingMode: "vertical-rl", transform: "rotate(180deg)",
            fontSize: 10, fontWeight: 700,
            color: activeTab === "gene" ? C.navy : "rgba(255,255,255,0.7)",
            letterSpacing: 0.8,
          }}>Gene</span>
        </button>

        {/* Icon buttons */}
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Chat icon */}
          <button
            onClick={() => setActiveTab("chat")}
            style={{
              padding: "8px 0", width: 38, background: activeTab === "chat" ? "rgba(255,255,255,0.15)" : "none",
              border: "none", cursor: "pointer", display: "flex", justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          {/* Info icon */}
          <button
            onClick={() => setActiveTab("info")}
            style={{
              padding: "8px 0", width: 38, background: activeTab === "info" ? "rgba(255,255,255,0.15)" : "none",
              border: "none", cursor: "pointer", display: "flex", justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2.5" />
              <line x1="12" y1="12" x2="12" y2="16" />
            </svg>
          </button>
          {/* Filter icon */}
          <button
            style={{
              padding: "8px 0", width: 38, background: "none",
              border: "none", cursor: "pointer", display: "flex", justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── Header ── */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 18px 9px",
          background: "#fff",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.fg, lineHeight: 1.2, fontFamily: "'Segoe UI', sans-serif" }}>
              Inventory Completeness
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 10, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
              No User selections identified
            </p>
          </div>
          <CHOPLogo />
        </header>

        {/* ── Filter / Slicer Bar ── */}
        <div style={{
          display: "flex", gap: 10, padding: "10px 18px",
          background: "#ebebeb",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          {SLICER_LABELS.map((label) => (
            <SlicerDropdown key={label} label={label} />
          ))}
        </div>

        {/* ── KPI Cards ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10,
          padding: "12px 18px",
          flexShrink: 0,
        }}>
          {kpiCards.map((card) => (
            <KPICard key={card.label} {...card} />
          ))}
        </div>

        {/* ── Charts Area ── */}
        <div style={{
          flex: 1, display: "grid",
          gridTemplateColumns: "2fr 1.7fr 1.3fr",
          gap: 10, padding: "0 18px 14px",
          overflow: "hidden",
          minHeight: 0,
        }}>
          <PlatformTable />
          <MissingMetadataChart />
          <RationalizationChart />
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: "5px 18px",
          background: "#ebebeb",
          borderTop: `1px solid ${C.border}`,
          fontSize: 10, color: C.muted,
          fontFamily: "'Segoe UI', sans-serif",
          flexShrink: 0,
        }}>
          Last Refresh&nbsp; 5/8/2026 9:38:21 AM
        </div>
      </div>
    </div>
  );
}
