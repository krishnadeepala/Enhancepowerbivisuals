import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";

const migrationData = [
  { platform: "Posit Connect", eligible: 720, migrated: 487, pct: 67.6 },
  { platform: "Qlik Sense",    eligible: 512, migrated: 289, pct: 56.4 },
  { platform: "Business Obj.", eligible: 200, migrated: 100, pct: 50.0 },
];

const totals = { eligible: 1432, migrated: 876, pct: 61.2 };

const CHOP_BLUE = "#0095C8";
const CHOP_NAVY = "#003087";
const LIGHT_BLUE = "#B3DFF0";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const row = migrationData.find((d) => d.platform === label) ?? totals as any;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-2 border-b border-gray-100 pb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center justify-between gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: p.fill ?? p.color }} />
              <span className="text-gray-600">{p.name}</span>
            </div>
            <span className="font-bold text-gray-800">{p.value?.toLocaleString()}</span>
          </div>
        ))}
        <div className="mt-2 pt-1 border-t border-gray-100 text-gray-500">
          Migration rate: <span className="font-bold" style={{ color: CHOP_BLUE }}>
            {((payload[0]?.value / (payload[0]?.value + (payload[1]?.value ?? 0))) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function PBIMigrationChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800">PBI Migration Progress by Platform</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Eligible (PowerBI-rationalized) assets vs. successfully migrated
        </p>
      </div>

      {/* Summary bar */}
      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: "#f0f8ff" }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">Overall Migration Progress</span>
          <span className="text-xs font-bold" style={{ color: CHOP_BLUE }}>
            {totals.migrated.toLocaleString()} / {totals.eligible.toLocaleString()} ({totals.pct}%)
          </span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${totals.pct}%`,
              background: `linear-gradient(90deg, ${CHOP_NAVY}, ${CHOP_BLUE})`,
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0</span>
          <span className="text-red-400 font-medium">{(totals.eligible - totals.migrated).toLocaleString()} remaining</span>
          <span>{totals.eligible.toLocaleString()}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={migrationData}
          layout="vertical"
          margin={{ top: 4, right: 60, left: 8, bottom: 4 }}
          barSize={16}
          barCategoryGap="30%"
        >
          <CartesianGrid key="grid" strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
          <XAxis key="xaxis" type="number" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
          <YAxis key="yaxis" type="category" dataKey="platform" tick={{ fontSize: 10, fill: "#6b7280" }} tickLine={false} axisLine={false} width={100} />
          <Tooltip key="tooltip" content={<CustomTooltip />} cursor={{ fill: "#f9fafb" }} />
          <Bar key="bar-eligible" dataKey="eligible" name="Eligible" fill={LIGHT_BLUE} radius={[0, 4, 4, 0]}>
            <LabelList dataKey="eligible" position="right" style={{ fontSize: 10, fill: "#9ca3af" }} />
          </Bar>
          <Bar key="bar-migrated" dataKey="migrated" name="Migrated" fill={CHOP_BLUE} radius={[0, 4, 4, 0]}>
            <LabelList dataKey="migrated" position="right" style={{ fontSize: 10, fontWeight: 700, fill: CHOP_NAVY }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: LIGHT_BLUE }} />
          Eligible for PBI
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: CHOP_BLUE }} />
          Migrated to PBI
        </div>
      </div>
    </div>
  );
}
