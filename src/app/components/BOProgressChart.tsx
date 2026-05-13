import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Target } from "lucide-react";

// Monthly BO assets remaining (not yet migrated or retired)
const data = [
  { month: "Jan",  remaining: 1000 },
  { month: "Feb",  remaining: 980  },
  { month: "Mar",  remaining: 940  },
  { month: "Apr",  remaining: 880  },
  { month: "May",  remaining: 800  },
  { month: "Jun",  remaining: 700  },
  { month: "Jul",  remaining: 580  },
  { month: "Aug",  remaining: 430  },
  { month: "Sep",  remaining: 270  },
  { month: "Oct",  remaining: 100  }, // milestone target
];

// Current month is Apr — split actual vs. projected
const actualData = data.slice(0, 5); // Jan–Apr (actual)
const projectedData = data.slice(4);  // Apr–Oct (projected)

const CHOP_ORANGE = "#F5A623";
const CHOP_NAVY   = "#003087";
const CHOP_BLUE   = "#0095C8";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0]?.value ?? payload[1]?.value;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label} 2026</p>
        <p className="text-gray-600">
          BO Remaining:{" "}
          <span className="font-bold text-orange-500">{val?.toLocaleString()}</span>
        </p>
        <p className="text-gray-400 mt-0.5">
          Migrated / Retired:{" "}
          <span className="font-semibold text-gray-600">{(1000 - val)?.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function BOProgressChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
      <div className="mb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">BO Asset Retirement Progress</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Tracking towards October 2026 milestone
            </p>
          </div>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: "#FFF3CD", color: "#856404", border: "1px solid #FFDA6A" }}
          >
            <Target size={11} />
            Oct Target
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Total BO", value: "1,000", color: CHOP_NAVY },
          { label: "Cleared", value: "250",   color: "#78BE20" },
          { label: "Remaining", value: "750", color: CHOP_ORANGE },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-2 text-center"
            style={{ backgroundColor: `${s.color}10`, border: `1px solid ${s.color}25` }}
          >
            <p className="text-base font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={175}>
        <AreaChart margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={CHOP_ORANGE} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHOP_ORANGE} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={CHOP_BLUE} stopOpacity={0.1} />
              <stop offset="95%" stopColor={CHOP_BLUE} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            key="xaxis"
            dataKey="month"
            data={data}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            key="yaxis"
            domain={[0, 1100]}
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip key="tooltip" content={<CustomTooltip />} />
          <ReferenceLine
            key="ref-target"
            y={0}
            stroke="#78BE20"
            strokeDasharray="4 4"
            label={{ value: "Target: 0", position: "insideTopRight", fontSize: 9, fill: "#78BE20" }}
          />
          <Area
            key="area-projected"
            data={projectedData}
            dataKey="remaining"
            stroke={CHOP_BLUE}
            strokeWidth={1.5}
            strokeDasharray="5 4"
            fill="url(#projGrad)"
            dot={false}
            name="Projected"
          />
          <Area
            key="area-actual"
            data={actualData}
            dataKey="remaining"
            stroke={CHOP_ORANGE}
            strokeWidth={2.5}
            fill="url(#actualGrad)"
            dot={{ r: 3, fill: CHOP_ORANGE, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            name="Actual"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 rounded" style={{ backgroundColor: CHOP_ORANGE, display: "inline-block" }} />
          Actual
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-px rounded" style={{ backgroundColor: CHOP_BLUE, display: "inline-block", borderTop: `2px dashed ${CHOP_BLUE}` }} />
          Projected
        </div>
      </div>
    </div>
  );
}
