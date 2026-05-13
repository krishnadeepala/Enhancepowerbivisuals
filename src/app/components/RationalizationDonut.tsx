import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const decisions = [
  { name: "Migrate to Power BI", value: 1432, color: "#0095C8" },
  { name: "Retire",              value: 821,  color: "#E63946" },
  { name: "Consolidate",         value: 384,  color: "#F5A623" },
  { name: "Keep / Other",        value: 210,  color: "#78BE20" },
  { name: "Pending Decision",    value: 1545, color: "#e5e7eb" },
];

const total = 4392;
const rationalized = 2847;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
          <span className="font-semibold text-gray-800">{d.name}</span>
        </div>
        <p className="text-gray-600">
          Assets: <span className="font-bold text-gray-800">{d.value.toLocaleString()}</span>
        </p>
        <p className="text-gray-600">
          Share: <span className="font-bold text-gray-800">{((d.value / total) * 100).toFixed(1)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, color }: any) => {
  if (value < 250) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
      {((value / total) * 100).toFixed(0)}%
    </text>
  );
};

export function RationalizationDonut() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Rationalization Decision Breakdown</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {rationalized.toLocaleString()} of {total.toLocaleString()} assets have a recorded decision
        </p>
      </div>
      <div className="flex items-center gap-4 flex-1">
        <div className="relative" style={{ width: 180, height: 180, flexShrink: 0 }}>
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                key="donut-pie"
                data={decisions}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={82}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {decisions.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="donut-tooltip" content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-black" style={{ color: "#003087" }}>64.8%</span>
            <span className="text-[9px] text-gray-400 text-center leading-tight">Rationalized</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-2 flex-1">
          {decisions.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-gray-600 leading-tight">{d.name}</span>
              </div>
              <span className="text-xs font-semibold text-gray-800 tabular-nums">{d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
