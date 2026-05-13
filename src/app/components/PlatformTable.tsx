import React from "react";
import { C, FONT } from "../tokens";

const platforms = [
  { name: "Posit Connect",    complete: 1882, total: 1890, pct: 99.6 },
  { name: "Qlik Sense",       complete: 1488, total: 1502, pct: 99.1 },
  { name: "Business Objects", complete:  996, total: 1000, pct: 99.6 },
];
const total = { name: "Total", complete: 4366, total: 4392, pct: 99.4 };

function PctBar({ value }: { value: number }) {
  const color = value >= 99.5 ? C.green : value >= 99 ? C.navy : C.orange;
  return (
    <div className="flex items-center gap-2">
      <div style={{ flex: 1, background: `${color}20`, height: 6, minWidth: 48 }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, minWidth: 36, textAlign: "right", color, fontFamily: "'Segoe UI', sans-serif" }}>
        {value}%
      </span>
    </div>
  );
}

export function PlatformTable() {
  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
      <div className="mb-3">
        <p style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12, fontWeight: 600 }}>Completeness by Platform</p>
        <p style={{ ...FONT.axisLabel, color: C.muted, marginTop: 2 }}>Gene metadata coverage</p>
      </div>
      <table style={{ width: "100%", fontSize: 11, fontFamily: "'Segoe UI', sans-serif", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.navy }}>
            {["Platform", "Complete", "Total", "Rate"].map((h, i) => (
              <th
                key={h}
                style={{ color: "#fff", fontSize: 10, fontWeight: 600, padding: "6px 8px", textAlign: i === 0 ? "left" : "right" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {platforms.map((row, i) => (
            <tr key={row.name} style={{ borderBottom: `0.5px solid ${C.border}`, background: i % 2 === 0 ? C.bg : `${C.navy}04` }}>
              <td style={{ padding: "6px 8px", color: C.fg, fontWeight: 500 }}>{row.name}</td>
              <td style={{ padding: "6px 8px", textAlign: "right", color: C.fg }}>{row.complete.toLocaleString()}</td>
              <td style={{ padding: "6px 8px", textAlign: "right", color: C.muted }}>{row.total.toLocaleString()}</td>
              <td style={{ padding: "6px 8px" }}><PctBar value={row.pct} /></td>
            </tr>
          ))}
          <tr style={{ borderTop: `2px solid ${C.border}`, background: `${C.navy}08` }}>
            <td style={{ padding: "6px 8px", color: C.fg, fontWeight: 700 }}>{total.name}</td>
            <td style={{ padding: "6px 8px", textAlign: "right", color: C.fg, fontWeight: 700 }}>{total.complete.toLocaleString()}</td>
            <td style={{ padding: "6px 8px", textAlign: "right", color: C.muted, fontWeight: 700 }}>{total.total.toLocaleString()}</td>
            <td style={{ padding: "6px 8px" }}><PctBar value={total.pct} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}