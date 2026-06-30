import { motion } from "motion/react";
import { BookOpen, Type, ChevronRight, Sparkles } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { FadeUp } from "../common/FadeUp";
import { child, playHistory } from "../../state/dummyData";

const recommendStories = [
  { emoji: "🐰", title: "용감한 토끼 코코", theme: "용기" },
  { emoji: "🌙", title: "잠 안 오는 별님", theme: "잠자기" },
  { emoji: "🐳", title: "바다로 간 풍선", theme: "모험" },
  { emoji: "🦊", title: "거짓말 여우", theme: "정직" },
];

export function PlayScreen() {
  const { go } = useApp();

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="함께 놀기" />
      <div className="flex-1 overflow-y-auto px-5 pb-32">
        <FadeUp delay={0.02}>
          <h1 className="text-ink mt-1" style={{ fontSize: 22, fontWeight: 700 }}>
            {child.name}와 함께 놀아요
          </h1>
          <p className="text-gray mt-1 mb-4" style={{ fontSize: 14 }}>
            {child.age}세 맞춤 · 놀면서 말이 자라요.
          </p>
        </FadeUp>

        {/* 큰 카드 2개 */}
        <FadeUp delay={0.08} className="grid grid-cols-2 gap-3">
          <BigCard
            emoji="📖"
            title="동화 읽어주기"
            desc="대화식 책읽기"
            gradient="linear-gradient(135deg,#2BC4F0,#5FD6F7)"
            onClick={() => go("story")}
          />
          <BigCard
            emoji="🔤"
            title="끝말잇기"
            desc="소리·어휘 놀이"
            gradient="linear-gradient(135deg,#FBE07A,#F6C944)"
            dark
            onClick={() => go("wordchain")}
          />
        </FadeUp>

        {/* 추천 동화 */}
        <FadeUp delay={0.16} className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-ink" style={{ fontSize: 16, fontWeight: 600 }}>추천 동화</span>
            <Sparkles size={16} className="text-sky" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5" style={{ scrollbarWidth: "none" }}>
            {recommendStories.map((s, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                onClick={() => go("story")}
                className="shrink-0 w-32 text-left rounded-[18px] bg-white overflow-hidden"
                style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
              >
                <div className="h-24 bg-sky-light flex items-center justify-center" style={{ fontSize: 42 }}>
                  {s.emoji}
                </div>
                <div className="p-2.5">
                  <p className="text-ink truncate" style={{ fontSize: 13, fontWeight: 600 }}>{s.title}</p>
                  <p className="text-gray" style={{ fontSize: 11 }}>{s.theme}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </FadeUp>

        {/* 지난 놀이 기록 */}
        <FadeUp delay={0.24} className="mt-5">
          <span className="text-ink" style={{ fontSize: 16, fontWeight: 600 }}>지난 놀이 기록</span>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {playHistory.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 flex flex-col items-center text-center" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <span className="text-ink mt-1" style={{ fontSize: 18, fontWeight: 700 }}>{p.value}</span>
                <span className="text-gray" style={{ fontSize: 11 }}>{p.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

function BigCard({
  emoji,
  title,
  desc,
  gradient,
  dark,
  onClick,
}: {
  emoji: string;
  title: string;
  desc: string;
  gradient: string;
  dark?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="rounded-[22px] p-4 h-40 flex flex-col justify-between text-left"
      style={{ background: gradient, boxShadow: "0 8px 24px rgba(20,40,60,0.1)" }}
    >
      <span style={{ fontSize: 40 }}>{emoji}</span>
      <div className={dark ? "text-ink" : "text-white"}>
        <p style={{ fontSize: 17, fontWeight: 700 }}>{title}</p>
        <div className="flex items-center gap-0.5" style={{ fontSize: 13 }}>
          {desc} <ChevronRight size={15} />
        </div>
      </div>
    </motion.button>
  );
}
