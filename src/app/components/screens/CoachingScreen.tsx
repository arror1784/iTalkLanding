import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { FadeUp } from "../common/FadeUp";
import { lessons, lessonCategories, LessonCategory } from "../../state/dummyData";

const gradients = [
  "linear-gradient(135deg,#C8E9F7,#2BC4F0)",
  "linear-gradient(135deg,#FFF3B0,#FBE07A)",
  "linear-gradient(135deg,#FFD9D2,#FF7A6B)",
  "linear-gradient(135deg,#FFE0B2,#FFB74D)",
  "linear-gradient(135deg,#D7F5DE,#34C759)",
  "linear-gradient(135deg,#E3E0FF,#A99BFF)",
  "linear-gradient(135deg,#CFEFF7,#5FD6F7)",
];

const levelColor: Record<string, string> = {
  초급: "text-green",
  중급: "text-sky-dark",
  고급: "text-coral",
};

export function CoachingScreen() {
  const { openLesson } = useApp();
  const [cat, setCat] = useState<LessonCategory>("대화·언어");
  const filtered = lessons.filter((l) => l.category === cat);

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="코칭 라이브러리" />

      {/* 카테고리 탭 */}
      <div className="px-5 mt-1">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {lessonCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`relative shrink-0 px-4 h-9 rounded-full ${
                cat === c ? "" : "bg-white text-gray border border-[#e2eef4]"
              }`}
              style={{ fontSize: 14, fontWeight: 600 }}
            >
              {cat === c && (
                <motion.span layoutId="catTab" className="absolute inset-0 bg-sky rounded-full" transition={{ type: "spring", stiffness: 320, damping: 26 }} />
              )}
              <span className={`relative ${cat === c ? "text-white" : ""}`}>{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-32 pt-3">
        <p className="text-gray mb-4" style={{ fontSize: 13, lineHeight: 1.5 }}>
          {cat === "대화·언어"
            ? "대화식 책읽기·열린 질문 등 언어발달 근거 레슨이에요."
            : cat === "감정·훈육"
            ? "감정을 먼저 읽어주는 다정한 훈육법이에요."
            : "동화·끝말잇기로 놀며 말이 자라는 레슨이에요."}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-3"
          >
            {filtered.map((lesson, i) => (
              <FadeUp key={lesson.id} delay={0.04 + i * 0.05}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openLesson(lesson.id)}
                  className="w-full h-full text-left rounded-[20px] bg-white overflow-hidden flex flex-col"
                  style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
                >
                  <div
                    className="h-20 flex items-center justify-center shrink-0"
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    <span style={{ fontSize: 36 }}>{lesson.emoji}</span>
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-ink" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
                      {lesson.title}
                    </p>
                    <p className="text-gray mt-1 mb-2 line-clamp-2" style={{ fontSize: 11, lineHeight: 1.4 }}>
                      {lesson.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="flex items-center gap-1 text-gray" style={{ fontSize: 12 }}>
                        <Clock size={12} /> {lesson.duration}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 600 }} className={levelColor[lesson.level]}>
                        {lesson.level}
                      </span>
                    </div>
                  </div>
                </motion.button>
              </FadeUp>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
