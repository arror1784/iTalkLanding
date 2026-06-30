import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../../state/AppContext";
import { Mascot } from "../common/Mascot";

const slides = [
  {
    emoji: "🎙️",
    expr: "happy" as const,
    title: "우리 아이와의 대화,\n그대로 들려주세요",
    desc: "녹음하거나 캡쳐만 올리면 돼요. 준비는 그게 전부예요.",
  },
  {
    emoji: "🤖",
    expr: "listening" as const,
    title: "AI가 소통 방식을\n분석해 드려요",
    desc: "공감·질문·칭찬·지시를 분석해 한눈에 보여드려요.",
  },
  {
    emoji: "💛",
    expr: "cheer" as const,
    title: "오늘부터 더\n다정한 대화 연습",
    desc: "상황별 코칭과 AI 롤플레이로 함께 연습해요.",
  },
];

export function OnboardingScreen() {
  const { go } = useApp();
  const [idx, setIdx] = useState(0);
  const last = idx === slides.length - 1;

  const next = () => {
    if (last) go("login");
    else setIdx((i) => i + 1);
  };

  const slide = slides[idx];

  return (
    <div className="w-full h-full flex flex-col bg-bg-light pt-20 pb-10 px-6">
      <div className="flex justify-end">
        <button onClick={() => go("login")} className="text-gray" style={{ fontSize: 14 }}>
          건너뛰기
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-10">
              <motion.div
                className="absolute inset-0 -m-6 rounded-full bg-sky-light"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative">
                <Mascot size={140} expression={slide.expr} float />
              </div>
            </div>
            <h2
              className="text-center whitespace-pre-line text-ink"
              style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.35 }}
            >
              {slide.title}
            </h2>
            <p className="text-center mt-4 text-gray px-4" style={{ fontSize: 15, lineHeight: 1.5 }}>
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <motion.span
            key={i}
            className="h-2 rounded-full"
            animate={{
              width: i === idx ? 24 : 8,
              backgroundColor: i === idx ? "#2BC4F0" : "#cfe9f4",
            }}
          />
        ))}
      </div>

      <motion.button
        onClick={next}
        whileTap={{ scale: 0.96 }}
        className="w-full h-14 rounded-2xl text-white"
        style={{
          background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)",
          fontSize: 17,
          fontWeight: 600,
          boxShadow: "0 8px 24px rgba(43,196,240,0.35)",
        }}
      >
        {last ? "시작하기" : "다음"}
      </motion.button>
    </div>
  );
}
