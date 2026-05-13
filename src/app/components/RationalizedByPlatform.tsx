import React from "react";
import { C, FONT } from "../tokens";

const platforms = [
  { name: "Posit Connect",    rationalized: 1200, total: 1890, pct: 63.5 },
  { name: "Qlik Sense",       rationalized:  850, total: 1502, pct: 56.6 },
  { name: "Business Objects", rationalized:  797, total: 1000, pct: 79.7 },
];
const totals = { name: "Total", rationalized: 2847, total: 4392, pct: 64.8 };

function PlatformBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 overflow-hidden" style={{ background: `${color}20`, height: 8 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

export function RationalizedByPlatform() {
  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
      <div className="mb-4">
        <p className="font-semibold" style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12 }}>
          Rationalized Assets by Platform
        </p>
        <p className="mt-0.5" style={{ ...FONT.axisLabel, color: C.muted }}>
          Count of assets with rationalization decision · grouped by platform
        </p>
      </div>

      {/* Column headers */}
      <div
        className="grid gap-3 px-3 py-2 text-xs font-semibold"
        style={{
          gridTemplateColumns: "1fr 72px 72px 100px",
          background: C.navy,
          color: "#fff",
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 10,
        }}
      >
        <span>Platform</span>
        <span className="text-right">Rationalized</span>
        <span className="text-right">Total</span>
        <span className="pl-1">Rate</span>
      </div>

      {/* Rows */}
      {platforms.map((row, i) => {
        const barColor = row.pct >= 70 ? C.green : row.pct >= 60 ? C.midBlue : C.cyan;
        return (
          <div
            key={row.name}
            className="grid gap-3 px-3 py-2.5 items-center"
            style={{
              gridTemplateColumns: "1fr 72px 72px 100px",
              borderBottom: `0.5px solid ${C.border}`,
              background: i % 2 === 0 ? C.bg : `${C.navy}04`,
              fontSize: 11,
              fontFamily: "'Segoe UI', sans-serif",
            }}
          >
            <span style={{ color: C.fg, fontWeight: 500 }}>{row.name}</span>
            <span className="text-right tabular-nums" style={{ color: C.fg }}>
              {row.rationalized.toLocaleString()}
            </span>
            <span className="text-right tabular-nums" style={{ color: C.muted }}>
              {row.total.toLocaleString()}
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center mb-0.5" style={{ fontSize: 10 }}>
                <span style={{ color: barColor, fontWeight: 700 }}>{row.pct}%</span>
                <span style={{ color: C.muted }}>({row.rationalized.toLocaleString()})</span>
              </div>
              <PlatformBar pct={row.pct} color={barColor} />
            </div>
          </div>
        );
      })}

      {/* Total row */}
      <div
        className="grid gap-3 px-3 py-2.5 items-center mt-0"
        style={{
          gridTemplateColumns: "1fr 72px 72px 100px",
          borderTop: `2px solid ${C.border}`,
          background: `${C.navy}08`,
          fontSize: 11,
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <span style={{ color: C.fg, fontWeight: 700 }}>{totals.name}</span>
        <span className="text-right tabular-nums font-bold" style={{ color: C.fg }}>
          {totals.rationalized.toLocaleString()}
        </span>
        <span className="text-right tabular-nums font-bold" style={{ color: C.muted }}>
          {totals.total.toLocaleString()}
        </span>
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center mb-0.5" style={{ fontSize: 10 }}>
            <span style={{ color: C.pink, fontWeight: 700 }}>{totals.pct}%</span>
            <span style={{ color: C.muted }}>({totals.rationalized.toLocaleString()})</span>
          </div>
          <PlatformBar pct={totals.pct} color={C.pink} />
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-3" style={{ fontSize: 9, color: C.muted, fontFamily: "'Segoe UI', sans-serif" }}>
        Source: Gene (Helix) · as of Apr 28, 2026
      </p>
    </div>
  );
}
