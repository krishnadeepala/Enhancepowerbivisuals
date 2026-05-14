import React from "react";
import { C, FONT } from "../tokens";
import { ChevronRight, ArrowDown } from "lucide-react";

const journeySteps = [
  { label: "Visited Site",          count: 35420, pct: 100,  dropoff: 0    },
  { label: "Signed Up",             count: 22180, pct: 62.6, dropoff: 37.4 },
  { label: "Verified Email",        count: 18760, pct: 51.0, dropoff: 11.6 },
  { label: "Completed Onboarding",  count: 12980, pct: 35.6, dropoff: 15.4 },
  { label: "First Dashboard View",  count: 9840,  pct: 27.0, dropoff: 8.6  },
  { label: "Active User",           count: 10000, pct: 17.5, dropoff: 9.5  },
];

const pathData = [
  { from: "Homepage",   to: "Dashboard",  count: 14200, pct: 40 },
  { from: "Homepage",   to: "Reports",    count: 8900,  pct: 25 },
  { from: "Homepage",   to: "Features",   count: 7100,  pct: 20 },
  { from: "Homepage",   to: "Other",      count: 5220,  pct: 15 },
];

export default function UserJourney() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <h2 style={{ ...FONT.pageTitle, color: C.fg, margin: 0 }}>User Journey</h2>
        <p style={{ fontSize: 11, color: C.muted, margin: "3px 0 0" }}>
          End-to-end user flow analysis, conversion paths, and drop-off points
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 10 }}>
        {/* Funnel */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 16 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 16px" }}>
            Conversion Funnel
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {journeySteps.map((step, i) => {
              const w = Math.max(30, step.pct);
              return (
                <div key={step.label}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                    <div
                      style={{
                        width: `${w}%`, height: 36,
                        background: i === 0 ? C.navy
                          : i === 1 ? "#1a6fa3"
                          : i === 2 ? "#3289bc"
                          : i === 3 ? "#4da3d5"
                          : i === 4 ? "#6fbbe6"
                          : C.cyan,
                        display: "flex", alignItems: "center", paddingLeft: 10,
                        transition: "width 0.6s ease",
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
                        {step.count.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: C.fg }}>{step.label}</div>
                      <div style={{ fontSize: 9.5, color: C.muted }}>{step.pct}% of total</div>
                    </div>
                  </div>
                  {i < journeySteps.length - 1 && step.dropoff > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 0 2px 12px", marginBottom: 2 }}>
                      <ArrowDown size={10} style={{ color: C.deepPink }} />
                      <span style={{ fontSize: 9.5, color: C.deepPink }}>
                        {journeySteps[i + 1].dropoff}% drop-off ({(journeySteps[i].count - journeySteps[i + 1].count).toLocaleString()} users)
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Page Flow */}
        <div style={{ background: "#fff", border: `0.5px solid ${C.border}`, padding: 16 }}>
          <p style={{ ...FONT.pageTitle, fontSize: 11.5, color: C.fg, margin: "0 0 14px" }}>
            Top Navigation Paths from Homepage
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pathData.map((p, i) => (
              <div key={p.to}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontSize: 10.5, color: C.muted }}>{p.from}</span>
                    <ChevronRight size={11} style={{ color: C.muted }} />
                    <span style={{ fontSize: 10.5, fontWeight: 600, color: C.fg }}>{p.to}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.fg }}>{p.count.toLocaleString()}</span>
                    <span style={{ fontSize: 9.5, color: C.muted, marginLeft: 4 }}>({p.pct}%)</span>
                  </div>
                </div>
                <div style={{ height: 8, background: C.canvas }}>
                  <div style={{ width: `${p.pct}%`, height: "100%", background: [C.navy, C.midBlue, C.cyan, C.muted][i] }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "10px 12px", background: `${C.navy}08`, border: `0.5px solid ${C.border}` }}>
            <div style={{ fontSize: 10, color: C.muted }}>Total Homepage Exits</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.fg }}>35,420</div>
            <div style={{ fontSize: 9.5, color: C.muted, marginTop: 2 }}>
              Avg. time on page: <strong style={{ color: C.fg }}>2m 14s</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
