import { useRef, useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { ArrowUpRight, ThumbsUp, MessageSquareQuote, ArrowRight } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { FadeUp } from "../common/FadeUp";
import { SectionCard } from "../common/SectionCard";
import { ScoreGauge } from "../common/ScoreGauge";
import { EmotionLineChart } from "../common/EmotionLineChart";
import { AnalysisBars } from "../common/AnalysisBars";
import { latestReport } from "../../state/dummyData";

export function ReportScreen() {
  const { go } = useApp();
  const saveRef = useRef<HTMLButtonElement>(null);
  const [saving, setSaving] = useState(false);

  const onSave = () => {
    if (saving) return;
    setSaving(true);
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 0.85 },
      colors: ["#2BC4F0", "#FBE07A", "#34C759"],
    });
    toast.success("리포트를 저장했어요! 홈으로 돌아갑니다.");
    // 저장 후 홈으로 이동
    setTimeout(() => go("home", "home"), 1100);
  };

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="분석 리포트" showBack />
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        {/* 게이지 */}
        <FadeUp delay={0.05} className="flex flex-col items-center mt-2">
          <ScoreGauge score={latestReport.score} />
          <div className="flex items-center gap-1 mt-2 text-green" style={{ fontSize: 14, fontWeight: 600 }}>
            <ArrowUpRight size={16} /> 지난 대화보다 +{latestReport.delta}점
          </div>
        </FadeUp>

        {/* 감정 톤 곡선 */}
        <FadeUp delay={0.15} className="mt-6">
          <Card title="감정 톤 곡선" legend>
            <EmotionLineChart data={latestReport.emotionTone} />
          </Card>
        </FadeUp>

        {/* 소통 분석 막대 */}
        <FadeUp delay={0.22} className="mt-4">
          <Card title="소통 분석">
            <AnalysisBars items={latestReport.analysis} />
          </Card>
        </FadeUp>

        {/* 잘한 점 */}
        <FadeUp delay={0.3} className="mt-4">
          <SectionCard variant="white" className="!bg-[#eafaef]">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp size={18} className="text-green" />
              <span className="text-green" style={{ fontSize: 14, fontWeight: 700 }}>잘한 점</span>
            </div>
            <p className="text-ink" style={{ fontSize: 15, lineHeight: 1.5 }}>
              {latestReport.good.title} — <span style={{ fontWeight: 600 }}>'{latestReport.good.quote}'</span>
            </p>
          </SectionCard>
        </FadeUp>

        {/* 이렇게 말해보세요 */}
        <FadeUp delay={0.38} className="mt-4">
          <SectionCard variant="blue">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquareQuote size={18} className="text-white" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>이렇게 말해보세요</span>
            </div>
            <p className="text-white/80 mb-3" style={{ fontSize: 12 }}>
              언어교육학에 근거한 표현 코칭이에요.
            </p>
            <div className="flex flex-col gap-3">
              {latestReport.suggestions.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-sky-light text-sky-dark mb-2" style={{ fontSize: 11, fontWeight: 700 }}>
                    〔{s.tag}〕
                  </span>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray line-through" style={{ fontSize: 13 }}>"{s.before}"</span>
                    <span className="text-gray" style={{ fontSize: 11 }}>{s.beforeNote}</span>
                  </div>
                  <div className="flex items-start gap-1.5 mb-1.5">
                    <ArrowRight size={15} className="text-sky shrink-0 mt-0.5" />
                    <span className="text-ink" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>"{s.after}"</span>
                  </div>
                  <p className="text-sky-dark" style={{ fontSize: 12, lineHeight: 1.45 }}>💡 {s.reason}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </FadeUp>
      </div>

      {/* 하단 액션 */}
      <div className="px-5 pb-10 pt-3 bg-bg-light flex gap-3">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => go("coaching", "coaching")}
          className="flex-1 h-14 rounded-2xl bg-sky text-white"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          이 상황 코칭 받기
        </motion.button>
        <motion.button
          ref={saveRef}
          whileTap={{ scale: 0.96 }}
          onClick={onSave}
          disabled={saving}
          className="px-6 h-14 rounded-2xl bg-white text-sky-dark border border-[#cfe9f4] disabled:opacity-60"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          {saving ? "저장됨" : "저장"}
        </motion.button>
      </div>
    </div>
  );
}

function Card({ title, children, legend }: { title: string; children: React.ReactNode; legend?: boolean }) {
  return (
    <div className="rounded-[22px] bg-white p-5" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-ink" style={{ fontSize: 16, fontWeight: 600 }}>{title}</span>
        {legend && (
          <div className="flex gap-3" style={{ fontSize: 12 }}>
            <span className="flex items-center gap-1 text-gray"><i className="inline-block w-2.5 h-2.5 rounded-full bg-sky" />부모</span>
            <span className="flex items-center gap-1 text-gray"><i className="inline-block w-2.5 h-2.5 rounded-full bg-cream-strong" />아이</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
