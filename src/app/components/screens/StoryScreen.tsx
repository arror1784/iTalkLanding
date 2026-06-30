import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ChevronLeft, ChevronRight, Gauge, Lightbulb, X } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { story, peerGuide } from "../../state/dummyData";

const speeds = [0.75, 1, 1.25];

export function StoryScreen() {
  const { go } = useApp();
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [wordIdx, setWordIdx] = useState(-1);
  const [speed, setSpeed] = useState(1);
  const [showPeer, setShowPeer] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = story.pages[page];
  const words = current.text.split(" ");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 읽기 단어 하이라이트
  useEffect(() => {
    if (!playing) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => {
      setWordIdx((i) => {
        if (i + 1 >= words.length) {
          clearInterval(timer.current!);
          setPlaying(false);
          return words.length - 1;
        }
        return i + 1;
      });
    }, 520 / speed);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, page, speed]);

  const goPage = (p: number) => {
    if (p < 0) return;
    if (p >= story.pages.length) {
      setFinished(true);
      return;
    }
    setPage(p);
    setWordIdx(-1);
    setPlaying(false);
  };

  if (finished) {
    return (
      <div className="w-full h-full flex flex-col bg-bg-light">
        <AppHeader title="동화 완성!" showBack />
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 12 }} style={{ fontSize: 72 }}>
            🎉
          </motion.span>
          <h2 className="text-ink mt-4" style={{ fontSize: 22, fontWeight: 700 }}>「{story.title}」 다 읽었어요</h2>
          <div className="w-full bg-cream rounded-[22px] p-5 mt-6" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}>
            <p className="text-ink mb-3" style={{ fontSize: 15, fontWeight: 700 }}>오늘 만난 낱말</p>
            <div className="flex flex-wrap gap-2">
              {story.newWords.map((w) => (
                <span key={w} className="px-3 py-1.5 bg-white rounded-full text-ink" style={{ fontSize: 14, fontWeight: 600 }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => go("wordchain")}
            className="w-full h-14 rounded-2xl text-white mt-6"
            style={{ background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)", fontSize: 17, fontWeight: 600 }}
          >
            끝말잇기로 이어가기 🔤
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title={story.title} showBack />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* 그림책 페이지 */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, rotateY: 25, x: 40 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: -25, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-[24px] bg-white overflow-hidden"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}
            >
              <div className="h-56 bg-sky-light flex items-center justify-center" style={{ fontSize: 96 }}>
                <motion.span animate={playing ? { scale: [1, 1.06, 1] } : {}} transition={{ duration: 1, repeat: Infinity }}>
                  {current.emoji}
                </motion.span>
              </div>
              <div className="p-5">
                <p style={{ fontSize: 17, lineHeight: 1.6 }} className="text-ink">
                  {words.map((w, i) => (
                    <span
                      key={i}
                      className={i === wordIdx ? "bg-cream-strong rounded px-0.5 transition-colors" : ""}
                      style={{ fontWeight: i === wordIdx ? 700 : 400 }}
                    >
                      {w}{" "}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* PEER 토글 버튼 */}
          <button
            onClick={() => setShowPeer(true)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center"
            style={{ boxShadow: "0 4px 12px rgba(20,40,60,0.12)" }}
          >
            <span className="text-sky-dark" style={{ fontSize: 11, fontWeight: 700 }}>PEER</span>
          </button>
        </div>

        {/* 함께 이야기해보세요 코칭 말풍선 */}
        <motion.div
          key={`coach-${page}`}
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
          className="bg-cream rounded-[20px] p-4 mt-4"
          style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lightbulb size={16} className="text-[#d99e00]" />
            <span className="text-ink" style={{ fontSize: 13, fontWeight: 700 }}>함께 이야기해보세요</span>
            <span className="px-2 py-0.5 rounded-full bg-white text-sky-dark" style={{ fontSize: 10, fontWeight: 700 }}>
              〔{current.coaching.type}〕
            </span>
          </div>
          <p className="text-ink" style={{ fontSize: 15, lineHeight: 1.5 }}>"{current.coaching.question}"</p>
        </motion.div>
      </div>

      {/* 플레이어 컨트롤 */}
      <div className="px-5 pb-10 pt-3">
        <div className="bg-white rounded-[20px] p-3 flex items-center justify-between" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}>
          <button onClick={() => goPage(page - 1)} disabled={page === 0} className="w-10 h-10 flex items-center justify-center disabled:opacity-30">
            <ChevronLeft size={24} className="text-ink" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSpeed((s) => speeds[(speeds.indexOf(s) + 1) % speeds.length]); }}
              className="flex items-center gap-1 px-2 h-8 rounded-full bg-sky-light text-sky-dark"
              style={{ fontSize: 12, fontWeight: 600 }}
            >
              <Gauge size={14} /> {speed}x
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { if (wordIdx >= words.length - 1) setWordIdx(-1); setPlaying((v) => !v); }}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)", boxShadow: "0 8px 20px rgba(43,196,240,0.4)" }}
            >
              {playing ? <Pause size={26} className="text-white" fill="#fff" /> : <Play size={26} className="text-white" fill="#fff" />}
            </motion.button>
            <span className="text-gray" style={{ fontSize: 12, width: 30, textAlign: "center" }}>
              {page + 1}/{story.pages.length}
            </span>
          </div>

          <button onClick={() => goPage(page + 1)} className="w-10 h-10 flex items-center justify-center">
            <ChevronRight size={24} className="text-ink" />
          </button>
        </div>
      </div>

      {/* PEER 가이드 시트 */}
      <AnimatePresence>
        {showPeer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPeer(false)} className="absolute inset-0 z-40 bg-black/30" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] p-6 pb-10"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-ink" style={{ fontSize: 18, fontWeight: 700 }}>PEER 가이드</span>
                <button onClick={() => setShowPeer(false)}><X size={22} className="text-gray" /></button>
              </div>
              <p className="text-gray mb-4" style={{ fontSize: 13 }}>대화식 책읽기 4단계로 함께 읽어요.</p>
              <div className="flex flex-col gap-3">
                {peerGuide.map((g, i) => (
                  <div key={i} className="flex items-center gap-3 bg-sky-light rounded-2xl p-3">
                    <span className="w-9 h-9 rounded-full bg-sky text-white flex items-center justify-center" style={{ fontSize: 16, fontWeight: 700 }}>{g.step}</span>
                    <div>
                      <p className="text-ink" style={{ fontSize: 14, fontWeight: 600 }}>{g.label}</p>
                      <p className="text-gray" style={{ fontSize: 13 }}>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
