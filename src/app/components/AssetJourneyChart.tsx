import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { ArrowRight } from "lucide-react";

const todayData = [
  { platform: "Posit Connect", assets: 1890, fill: "#0095C8" },
  { platform: "Qlik Sense",    assets: 1502, fill: "#00A3AD" },
  { platform: "Business Obj.", assets: 1000, fill: "#F5A623" },
];

const futureData = [
  { category: "Power BI",    assets: 1432, fill: "#0095C8" },
  { category: "Retained",    assets: 210,  fill: "#78BE20" },
  { category: "Retired",     assets: 821,  fill: "#E63946" },
  { category: "Consolidated",assets: 384,  fill: "#F5A623" },
  { category: "Pending",     assets: 1545, fill: "#d1d5db" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-gray-600">
          Assets: <span className="font-bold text-gray-800">{payload[0]?.value?.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function AssetJourneyChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Asset Portfolio Transformation</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          From high-volume multi-platform today → consolidated, manageable future state
        </p>
      </div>

      <div className="flex items-stretch gap-3 flex-1">
        {/* Today */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Today</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#003087", color: "#fff" }}>
              4,392 assets
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={todayData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid key="grid-today" strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis key="xaxis-today" dataKey="platform" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <YAxis key="yaxis-today" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <Tooltip key="tooltip-today" content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
              <Bar key="bar-today" dataKey="assets" radius={[4, 4, 0, 0]} maxBarSize={52}>
                {todayData.map((d) => (
                  <Cell key={d.platform} fill={d.fill} />
                ))}
                <LabelList dataKey="assets" position="top" style={{ fontSize: 9, fontWeight: 700, fill: "#6b7280" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center justify-center gap-1 px-1">
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full shadow"
            style={{ backgroundColor: "#003087" }}
          >
            <ArrowRight size={13} color="#fff" />
          </div>
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Future */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Future State</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#78BE20", color: "#fff" }}>
              −1,205 rationalized
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={futureData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid key="grid-future" strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis key="xaxis-future" dataKey="category" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <YAxis key="yaxis-future" tick={{ fontSize: 9, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <Tooltip key="tooltip-future" content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
              <Bar key="bar-future" dataKey="assets" radius={[4, 4, 0, 0]} maxBarSize={44}>
                {futureData.map((d) => (
                  <Cell key={d.category} fill={d.fill} />
                ))}
                <LabelList dataKey="assets" position="top" style={{ fontSize: 9, fontWeight: 700, fill: "#6b7280" }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {[
          { label: "Migrate to PBI", value: "1,432", color: "#0095C8" },
          { label: "Retire",         value: "821",   color: "#E63946" },
          { label: "Consolidate",    value: "384",   color: "#F5A623" },
        ].map((chip) => (
          <div
            key={chip.label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
            style={{ backgroundColor: `${chip.color}12`, border: `1px solid ${chip.color}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: chip.color }} />
            <span className="text-gray-600">{chip.label}:</span>
            <span className="font-bold" style={{ color: chip.color }}>{chip.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
