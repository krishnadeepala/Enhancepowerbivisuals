import React from "react";
import {
  ComposedChart, Line, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { C, FONT } from "../tokens";

// Jan 6 → May 31, 2026 (21 data points)
// Ideal: linear from 4392 to 0 over 21 weeks (−209/wk)
const allData = [
  { week: "6-Jan",  ideal: 4392, actual: 4392 },
  { week: "13-Jan", ideal: 4183, actual: 4150 },
  { week: "20-Jan", ideal: 3974, actual: 3800 },
  { week: "27-Jan", ideal: 3765, actual: 3500 },
  { week: "3-Feb",  ideal: 3556, actual: 3150 },
  { week: "10-Feb", ideal: 3347, actual: 2850 },
  { week: "17-Feb", ideal: 3138, actual: 2590 },
  { week: "24-Feb", ideal: 2929, actual: 2380 },
  { week: "3-Mar",  ideal: 2720, actual: 2200 },
  { week: "10-Mar", ideal: 2511, actual: 2055 },
  { week: "17-Mar", ideal: 2302, actual: 1910 },
  { week: "24-Mar", ideal: 2093, actual: 1800 },
  { week: "31-Mar", ideal: 1884, actual: 1720 },
  { week: "7-Apr",  ideal: 1675, actual: 1665 },
  { week: "14-Apr", ideal: 1466, actual: 1625 },
  { week: "21-Apr", ideal: 1257, actual: 1580 },
  { week: "28-Apr", ideal: 1048, actual: 1545 }, // ← current (behind ideal)
  { week: "5-May",  ideal: 839,  actual: null  },
  { week: "12-May", ideal: 630,  actual: null  },
  { week: "19-May", ideal: 421,  actual: null  },
  { week: "26-May", ideal: 209,  actual: null  },
  { week: "31-May", ideal: 0,    actual: null  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="text-xs p-3" style={{ background: C.bg, border: `0.5px solid ${C.border}` }}>
      <p className="font-semibold mb-2 pb-1" style={{ color: C.fg, borderBottom: `0.5px solid ${C.border}` }}>{label}</p>
      {payload.map((p: any) => (
        p.value != null && (
          <div key={p.name} className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-sm" style={{ background: p.color, display: "inline-block" }} />
            <span style={{ color: C.muted }}>{p.name}:</span>
            <span className="font-semibold" style={{ color: C.fg }}>{p.value?.toLocaleString()}</span>
          </div>
        )
      ))}
    </div>
  );
};

const CustomLegend = ({ payload }: any) => (
  <div className="flex items-center gap-5 mb-1" style={{ fontSize: 9, fontFamily: "'Segoe UI', sans-serif", color: C.muted }}>
    {payload?.map((p: any) => (
      <div key={p.value} className="flex items-center gap-1.5">
        <span style={{
          display: "inline-block", width: 20, height: 2,
          background: p.color,
          borderTop: p.value === "Ideal Burndown" ? `2px dashed ${p.color}` : `2px solid ${p.color}`,
        }} />
        {p.value}
      </div>
    ))}
  </div>
);

export function RationalizationBurndown() {
  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
      <div className="mb-3">
        <p className="font-semibold" style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12 }}>
          Rationalization Burndown
        </p>
        <p className="mt-0.5" style={{ ...FONT.axisLabel, color: C.muted }}>
          Remaining assets without a rationalization decision · Jan – May 2026
        </p>
      </div>

      {/* Gap alert */}
      <div
        className="flex items-center gap-2 px-3 py-2 mb-3 text-xs"
        style={{ background: `${C.pink}10`, border: `0.5px solid ${C.pink}50` }}
      >
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: C.pink }} />
        <span style={{ color: C.pink, fontWeight: 600 }}>
          497 behind ideal pace
        </span>
        <span style={{ color: C.muted }}>as of Apr 28 — requires acceleration to meet May 31 milestone</span>
      </div>

      <div className="flex-1" style={{ minHeight: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={allData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C.navy} stopOpacity={0.12} />
                <stop offset="95%" stopColor={C.navy} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              key="grid"
              strokeDasharray="none"
              stroke={C.grid}
              vertical={false}
              strokeWidth={1}
            />
            <XAxis
              key="xaxis"
              dataKey="week"
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={{ stroke: C.grid }}
              interval={2}
            />
            <YAxis
              key="yaxis"
              domain={[0, 4600]}
              tickFormatter={(v) => v.toLocaleString()}
              tick={{ ...FONT.axisLabel, fill: C.muted } as any}
              tickLine={false}
              axisLine={false}
              width={46}
            />
            <Tooltip key="tooltip" content={<CustomTooltip />} />
            <Legend key="legend" content={<CustomLegend />} verticalAlign="top" />
            <ReferenceLine
              key="ref-milestone"
              x="31-May"
              stroke={C.green}
              strokeDasharray="3 3"
              label={{ value: "Milestone", position: "top", fontSize: 9, fill: C.green }}
            />
            <ReferenceLine
              key="ref-zero"
              y={0}
              stroke={C.green}
              strokeWidth={1}
            />
            {/* Ideal burndown */}
            <Line
              key="line-ideal"
              type="monotone"
              dataKey="ideal"
              name="Ideal Burndown"
              stroke={C.cyan}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              connectNulls
            />
            {/* Actual with area fill */}
            <Area
              key="area-actual"
              type="monotone"
              dataKey="actual"
              name="Actual Remaining"
              stroke={C.navy}
              strokeWidth={2.5}
              fill="url(#actualFill)"
              dot={{ r: 2.5, fill: C.navy, strokeWidth: 0 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
