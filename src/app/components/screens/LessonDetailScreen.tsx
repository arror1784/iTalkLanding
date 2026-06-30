import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { FadeUp } from "../common/FadeUp";
import { ChatBubble } from "../common/ChatBubble";
import { lessons, roleplayScript } from "../../state/dummyData";

export function LessonDetailScreen() {
  const { state } = useApp();
  const lesson = lessons.find((l) => l.id === state.selectedLessonId) ?? lessons[0];
  const [roleplay, setRoleplay] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title={lesson.title} showBack />
      <AnimatePresence mode="wait">
        {!roleplay ? (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <div className="flex items-center gap-3 mt-2 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center" style={{ fontSize: 30 }}>
                  {lesson.emoji}
                </div>
                <div>
                  <p className="text-ink" style={{ fontSize: 18, fontWeight: 700 }}>{lesson.title}</p>
                  <p className="text-gray" style={{ fontSize: 13 }}>{lesson.duration} · {lesson.level}</p>
                </div>
              </div>

              <FadeUp delay={0.05}>
                <p className="text-ink mb-3" style={{ fontSize: 16, fontWeight: 600 }}>핵심 포인트 3가지</p>
                <div className="flex flex-col gap-2 mb-6">
                  {lesson.points.map((p, i) => (
                    <div key={i} className="flex gap-2.5 items-start bg-white rounded-2xl p-3.5" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}>
                      <CheckCircle2 size={20} className="text-sky shrink-0 mt-0.5" />
                      <span className="text-ink" style={{ fontSize: 14, lineHeight: 1.45 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <p className="text-ink mb-3" style={{ fontSize: 16, fontWeight: 600 }}>예시 대화</p>
                <div className="flex flex-col gap-3 bg-white rounded-[22px] p-4" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}>
                  {lesson.example.map((m, i) => (
                    <ChatBubble key={i} speaker={m.speaker} text={m.text} />
                  ))}
                </div>
              </FadeUp>
            </div>

            <div className="px-5 pb-10 pt-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setRoleplay(true)}
                className="w-full h-14 rounded-2xl text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)", fontSize: 17, fontWeight: 600, boxShadow: "0 8px 24px rgba(43,196,240,0.35)" }}
              >
                <Sparkles size={20} /> AI와 연습하기
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="roleplay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
            <Roleplay />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Msg =
  | { kind: "child"; text: string }
  | { kind: "parent"; text: string }
  | { kind: "feedback"; text: string; score: number };

function Roleplay() {
  const [step, setStep] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([{ kind: "child", text: roleplayScript[0].child }]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const finished = step >= roleplayScript.length;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    if (!text.trim() || finished) return;
    const score = 85 + Math.floor(Math.random() * 12);
    const next: Msg[] = [
      ...msgs,
      { kind: "parent", text },
      { kind: "feedback", text: "공감 먼저! 아주 좋아요 👍", score },
    ];
    const nextStep = step + 1;
    if (nextStep < roleplayScript.length) {
      next.push({ kind: "child", text: roleplayScript[nextStep].child });
    } else {
      next.push({ kind: "feedback", text: "연습 완료! 오늘 정말 다정했어요 🎉", score: 95 });
    }
    setMsgs(next);
    setStep(nextStep);
    setText("");
  };

  return (
    <>
      <div className="px-5 py-2 bg-sky-light flex items-center gap-2">
        <span style={{ fontSize: 18 }}>🐣</span>
        <span className="text-sky-dark" style={{ fontSize: 13, fontWeight: 600 }}>
          AI가 '아이' 역할을 해요. 다정하게 답해보세요.
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {msgs.map((m, i) =>
          m.kind === "feedback" ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="self-center bg-green/10 border border-green/30 rounded-full px-4 py-1.5 flex items-center gap-2"
            >
              <span className="text-green" style={{ fontSize: 13, fontWeight: 600 }}>{m.text}</span>
              <span className="text-green" style={{ fontSize: 13, fontWeight: 700 }}>{m.score}점</span>
            </motion.div>
          ) : (
            <ChatBubble key={i} speaker={m.kind === "child" ? "아이" : "부모"} text={m.text} />
          )
        )}
      </div>

      {!finished ? (
        <div className="px-5 pb-10 pt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="다정하게 답해보세요"
            className="flex-1 h-12 rounded-[14px] bg-white border border-[#e2eef4] px-4 outline-none focus:border-sky text-ink"
            style={{ fontSize: 15 }}
          />
          <button onClick={send} className="w-12 h-12 rounded-[14px] bg-sky flex items-center justify-center">
            <Send size={20} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="px-5 pb-10 pt-2">
          <div className="w-full h-14 rounded-2xl bg-cream text-ink flex items-center justify-center" style={{ fontSize: 16, fontWeight: 600 }}>
            🎉 오늘의 연습을 완료했어요!
          </div>
        </div>
      )}
    </>
  );
}
