import { motion } from "motion/react";

// 소통 분석 막대 — 아래에서 자라나는 가로 막대
export function AnalysisBars({
  items,
}: {
  items: { label: string; value: number; color: string; highlight?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="flex justify-between mb-1.5 items-center">
            <span
              style={{ fontSize: 14, fontWeight: item.highlight ? 700 : 400 }}
              className={item.highlight ? "text-sky-dark flex items-center gap-1" : "text-ink"}
            >
              {item.label}
              {item.highlight && (
                <span className="px-1.5 py-0.5 rounded-full bg-sky-light" style={{ fontSize: 10, fontWeight: 700 }}>
                  핵심
                </span>
              )}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600 }} className="text-gray">
              {item.value}%
            </span>
          </div>
          <div className="h-3 rounded-full bg-sky-light overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${item.value * 2.5}%` }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
