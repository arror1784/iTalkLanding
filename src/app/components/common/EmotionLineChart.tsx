import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// 감정 톤 곡선 — 부모/아이 라인, 그려지는 애니메이션
export function EmotionLineChart({
  data,
}: {
  data: { t: string; 부모: number; 아이: number }[];
}) {
  return (
    <div style={{ width: "100%", height: 180 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <XAxis
            dataKey="t"
            tick={{ fontSize: 11, fill: "var(--gray)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 8px 24px rgba(20,40,60,0.12)",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="부모"
            stroke="var(--sky)"
            strokeWidth={3}
            dot={{ r: 3, fill: "var(--sky)" }}
            isAnimationActive
            animationDuration={1400}
          />
          <Line
            type="monotone"
            dataKey="아이"
            stroke="var(--cream-strong)"
            strokeWidth={3}
            dot={{ r: 3, fill: "var(--cream-strong)" }}
            isAnimationActive
            animationDuration={1400}
            animationBegin={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
