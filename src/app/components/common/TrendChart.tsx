import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

// 소통 점수 추이 — 왼→오 그려지는 라인 그래프
export function TrendChart({
  data,
}: {
  data: { period: string; score: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--sky-light)" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12, fill: "var(--gray)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 90]}
            tick={{ fontSize: 11, fill: "var(--gray)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 8px 24px rgba(20,40,60,0.12)",
              fontSize: 12,
            }}
          />
          <Line
            key="line-score"
            type="monotone"
            dataKey="score"
            stroke="var(--sky)"
            strokeWidth={3}
            dot={{ r: 4, fill: "var(--sky)", strokeWidth: 2, stroke: "#fff" }}
            isAnimationActive
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
