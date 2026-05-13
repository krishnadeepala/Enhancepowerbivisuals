import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { C, FONT } from "../tokens";

const data = [
  { field: "Owner",              count: 10 },
  { field: "Description",        count: 7  },
  { field: "Business Domain",    count: 4  },
  { field: "Data Classification",count: 3  },
  { field: "Refresh Frequency",  count: 2  },
];

const COLORS = [C.deepPink, C.pink, C.orange, C.midBlue, C.cyan];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: "10px 12px", fontSize: 11, fontFamily: "'Segoe UI', sans-serif" }}>
      <p style={{ fontWeight: 600, color: C.fg }}>{payload[0]?.payload?.field}</p>
      <p style={{ color: C.muted, marginTop: 4 }}>
        Missing: <span style={{ fontWeight: 700, color: C.deepPink }}>{payload[0]?.value}</span>
      </p>
    </div>
  );
};

export function MissingMetadataChart() {
  return (
    <div className="flex flex-col h-full" style={{ background: C.bg, border: `0.5px solid ${C.border}`, padding: 16 }}>
      <div className="mb-3">
        <p style={{ ...FONT.pageTitle, color: C.fg, fontSize: 12, fontWeight: 600 }}>Missing Metadata by Field Type</p>
        <p style={{ ...FONT.axisLabel, color: C.muted, marginTop: 2 }}>Incomplete records requiring attention</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 44, left: 8, bottom: 4 }} barSize={16}>
          <CartesianGrid key="grid" strokeDasharray="none" horizontal={false} stroke={C.grid} strokeWidth={1} />
          <XAxis key="xaxis" type="number" domain={[0, 12]} tick={{ ...FONT.axisLabel, fill: C.muted } as any} tickLine={false} axisLine={{ stroke: C.grid }} />
          <YAxis key="yaxis" type="category" dataKey="field" tick={{ ...FONT.axisLabel, fill: C.muted } as any} tickLine={false} axisLine={false} width={112} />
          <Tooltip key="tooltip" content={<CustomTooltip />} cursor={{ fill: `${C.navy}06` }} />
          <Bar key="bar" dataKey="count" radius={0}>
            {data.map((entry, index) => <Cell key={entry.field} fill={COLORS[index]} />)}
            <LabelList dataKey="count" position="right" style={{ fontSize: 10, fontWeight: 700, fill: C.muted, fontFamily: "'Segoe UI', sans-serif" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}