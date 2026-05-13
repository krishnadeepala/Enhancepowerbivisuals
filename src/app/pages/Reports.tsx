import React from "react";
import { C, FONT } from "../tokens";
import { FileText, Download, Calendar, RefreshCw, Clock } from "lucide-react";

const reports = [
  {
    id: "r1", name: "Weekly Engagement Summary",
    description: "DAU/WAU/MAU trends, session metrics, and engagement overview",
    lastRun: "May 19, 2025", frequency: "Weekly", status: "Ready",
    size: "2.4 MB",
  },
  {
    id: "r2", name: "Feature Adoption Report",
    description: "Feature usage breakdown, adoption rates, and power user analysis",
    lastRun: "May 19, 2025", frequency: "Weekly", status: "Ready",
    size: "1.8 MB",
  },
  {
    id: "r3", name: "User Retention Cohort Analysis",
    description: "Weekly and monthly cohort retention matrices with trend analysis",
    lastRun: "May 18, 2025", frequency: "Monthly", status: "Ready",
    size: "3.1 MB",
  },
  {
    id: "r4", name: "Conversion Funnel Report",
    description: "Full registration and purchase funnel metrics with drop-off analysis",
    lastRun: "May 17, 2025", frequency: "Bi-weekly", status: "Ready",
    size: "1.2 MB",
  },
  {
    id: "r5", name: "Platform Performance Report",
    description: "Web vs. mobile breakdown, platform-specific engagement metrics",
    lastRun: "May 15, 2025", frequency: "Monthly", status: "Scheduled",
    size: "—",
  },
  {
    id: "r6", name: "User Segment Deep Dive",
    description: "New, returning, and power user behavior comparison and trends",
    lastRun: "May 12, 2025", frequency: "Monthly", status: "Ready",
    size: "4.5 MB",
  },
];

export default function Reports() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>Reports</h2>
          <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
            Scheduled and on-demand analytics reports for GENE platform
          </p>
        </div>
        <button
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", background: C.navy,
            color: "#fff", border: "none", fontSize: 11,
            fontWeight: 600, cursor: "pointer",
          }}
        >
          <RefreshCw size={12} />
          Run All Reports
        </button>
      </div>

      {/* Summary Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {[
          { icon: FileText,  label: "Total Reports",      value: "6",         color: C.navy  },
          { icon: Clock,     label: "Scheduled",          value: "1",         color: C.orange},
          { icon: Download,  label: "Ready to Download",  value: "5",         color: C.green },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "#fff", border: `0.5px solid ${C.border}`,
              padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <div
              style={{
                width: 36, height: 36, background: `${card.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              <card.icon size={16} style={{ color: card.color }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.fg, lineHeight: 1, fontFamily: "Arial, sans-serif" }}>
                {card.value}
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Report List */}
      <div style={{ background: "#fff", border: `0.5px solid ${C.border}` }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto auto",
            gap: 0,
            padding: "8px 14px",
            background: C.canvas,
            borderBottom: `1px solid ${C.border}`,
            fontSize: 10,
            fontWeight: 600,
            color: C.muted,
          }}
        >
          <span>Report Name</span>
          <span style={{ textAlign: "center", width: 90 }}>Frequency</span>
          <span style={{ textAlign: "center", width: 100 }}>Last Run</span>
          <span style={{ textAlign: "center", width: 70 }}>Status</span>
          <span style={{ textAlign: "center", width: 80 }}>Actions</span>
        </div>
        {reports.map((r, i) => (
          <div
            key={r.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto auto",
              gap: 0,
              padding: "10px 14px",
              borderBottom: i < reports.length - 1 ? `0.5px solid ${C.border}` : "none",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: C.fg }}>{r.name}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{r.description}</div>
            </div>
            <div style={{ width: 90, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <Calendar size={11} style={{ color: C.muted }} />
              <span style={{ fontSize: 10, color: C.muted }}>{r.frequency}</span>
            </div>
            <div style={{ width: 100, textAlign: "center", fontSize: 10, color: C.muted }}>{r.lastRun}</div>
            <div style={{ width: 70, textAlign: "center" }}>
              <span
                style={{
                  fontSize: 9.5, fontWeight: 600, padding: "2px 8px",
                  background: r.status === "Ready" ? `${C.green}18` : `${C.orange}18`,
                  color: r.status === "Ready" ? C.green : C.orange,
                  border: `0.5px solid ${r.status === "Ready" ? C.green : C.orange}40`,
                }}
              >
                {r.status}
              </span>
            </div>
            <div style={{ width: 80, textAlign: "center" }}>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 8px", border: `1px solid ${C.border}`,
                  background: "#fff", fontSize: 10, color: C.navy,
                  cursor: r.status === "Ready" ? "pointer" : "default",
                  opacity: r.status === "Ready" ? 1 : 0.4,
                }}
                disabled={r.status !== "Ready"}
              >
                <Download size={11} /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
