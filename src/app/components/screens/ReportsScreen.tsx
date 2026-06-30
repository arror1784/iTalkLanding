import { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { FadeUp } from "../common/FadeUp";
import { TrendChart } from "../common/TrendChart";
import { trendWeekly, trendMonthly, itemChanges, reportHistory, playHistory } from "../../state/dummyData";

export function ReportsScreen() {
  const { go } = useApp();
  const [range, setRange] = useState<"week" | "month">("week");

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="성장 추이" showBack />
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {/* 토글 */}
        <FadeUp delay={0.02} className="flex justify-center mt-2 mb-4">
          <div className="flex bg-white rounded-full p-1" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}>
            {(["week", "month"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="relative px-6 h-9 rounded-full"
                style={{ fontSize: 14, fontWeight: 600 }}
              >
                {range === r && <motion.span layoutId="rangeTab" className="absolute inset-0 bg-sky rounded-full" />}
                <span className={`relative ${range === r ? "text-white" : "text-gray"}`}>{r === "week" ? "주간" : "월간"}</span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* 추이 그래프 */}
        <FadeUp delay={0.08}>
          <div className="rounded-[22px] bg-white p-5" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}>
            <p className="text-ink mb-1" style={{ fontSize: 16, fontWeight: 600 }}>소통 점수 추이</p>
            <p className="text-green mb-2" style={{ fontSize: 13, fontWeight: 600 }}>꾸준히 좋아지고 있어요!</p>
            <TrendChart data={range === "week" ? trendWeekly : trendMonthly} />
          </div>
        </FadeUp>

        {/* 항목별 변화 */}
        <FadeUp delay={0.16} className="mt-4">
          <p className="text-ink mb-3" style={{ fontSize: 16, fontWeight: 600 }}>항목별 변화</p>
          <div className="grid grid-cols-2 gap-3">
            {itemChanges.map((it) => (
              <div key={it.label} className="bg-white rounded-2xl p-3.5 flex items-center justify-between" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}>
                <span className="text-ink" style={{ fontSize: 14 }}>{it.label}</span>
                <span className={`flex items-center gap-1 ${it.trend === "up" ? "text-green" : "text-coral"}`} style={{ fontSize: 14, fontWeight: 700 }}>
                  {it.trend === "up" ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                  {it.value}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* 놀이 활동 누적 */}
        <FadeUp delay={0.2} className="mt-6">
          <p className="text-ink mb-3" style={{ fontSize: 16, fontWeight: 600 }}>놀이 활동</p>
          <div className="grid grid-cols-3 gap-3">
            {playHistory.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 flex flex-col items-center text-center" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}>
                <span style={{ fontSize: 20 }}>{p.emoji}</span>
                <span className="text-ink mt-1" style={{ fontSize: 17, fontWeight: 700 }}>{p.value}</span>
                <span className="text-gray" style={{ fontSize: 11 }}>{p.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* 분석 히스토리 */}
        <FadeUp delay={0.28} className="mt-6">
          <p className="text-ink mb-3" style={{ fontSize: 16, fontWeight: 600 }}>분석 히스토리</p>
          <div className="flex flex-col gap-2">
            {reportHistory.map((r) => (
              <motion.button
                key={r.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => go("report")}
                className="w-full text-left bg-white rounded-2xl p-4 flex items-center gap-3"
                style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-light flex flex-col items-center justify-center shrink-0">
                  <span className="text-sky-dark" style={{ fontSize: 16, fontWeight: 700 }}>{r.score}</span>
                  <span className="text-gray" style={{ fontSize: 10 }}>점</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-ink" style={{ fontSize: 13, fontWeight: 600 }}>{r.date}</span>
                    <span className={r.delta >= 0 ? "text-green" : "text-coral"} style={{ fontSize: 12, fontWeight: 600 }}>
                      {r.delta >= 0 ? `+${r.delta}` : r.delta}
                    </span>
                  </div>
                  <p className="text-gray truncate" style={{ fontSize: 13 }}>{r.summary}</p>
                </div>
                <ChevronRight size={18} className="text-gray shrink-0" />
              </motion.button>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
