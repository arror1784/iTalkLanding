import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Send, Lightbulb, Sparkles, RotateCcw } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { phonicsTip, wordChainSuggest } from "../../state/dummyData";

type Turn = { who: "부모" | "아이" | "AI"; word: string };

const initialChain: Turn[] = [
  { who: "아이", word: "사과" },
  { who: "부모", word: "과자" },
];

const pictureHints: Record<string, string> = {
  자: "🚲 자전거",
  거: "🐢 거북이",
  이: "🛏️ 이불",
  과: "🍪 과자",
  불: "🔥 불꽃",
};

export function WordChainScreen() {
  const { go } = useApp();
  const [chain, setChain] = useState<Turn[]>(initialChain);
  const [text, setText] = useState("");
  const [vocab, setVocab] = useState<string[]>([]);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastWord = chain[chain.length - 1].word;
  const reqChar = lastWord[lastWord.length - 1];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [chain]);

  const aiReply = (fromWord: string) => {
    const need = fromWord[fromWord.length - 1];
    const options = wordChainSuggest[need] ?? [];
    const used = new Set(chain.map((c) => c.word).concat(fromWord));
    const pick = options.find((w) => !used.has(w)) ?? `${need}리`;
    setTimeout(() => {
      setChain((c) => [...c, { who: "아이", word: pick }]);
      if ((wordChainSuggest[need] ?? []).includes(pick)) {
        setVocab((v) => (v.includes(pick) ? v : [...v, pick]));
      }
    }, 600);
  };

  const submit = () => {
    const w = text.trim();
    if (!w) return;
    if (w[0] !== reqChar) {
      setError(`'${reqChar}'(으)로 시작하는 낱말을 말해보세요!`);
      return;
    }
    if (chain.some((c) => c.word === w)) {
      setError("이미 나온 낱말이에요!");
      return;
    }
    setError("");
    confetti({ particleCount: 24, spread: 50, origin: { y: 0.7 }, colors: ["#2BC4F0", "#FBE07A"] });
    setChain((c) => [...c, { who: "부모", word: w }]);
    setText("");
    aiReply(w);
  };

  const reset = () => {
    setChain(initialChain);
    setVocab([]);
    setError("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="끝말잇기" showBack />

      {/* 차례 표시 */}
      <div className="px-5 py-2 bg-sky-light flex items-center justify-between">
        <span className="text-sky-dark" style={{ fontSize: 13, fontWeight: 600 }}>
          이어간 낱말 {chain.length}개 · 새 어휘 {vocab.length}개
        </span>
        <button onClick={reset} className="flex items-center gap-1 text-gray" style={{ fontSize: 12 }}>
          <RotateCcw size={13} /> 다시
        </button>
      </div>

      {/* 체인 보드 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {chain.map((t, i) => (
          <Bubble key={i} turn={t} />
        ))}

        {/* 그림 힌트 */}
        <motion.div
          key={`hint-${reqChar}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="self-center flex items-center gap-2 bg-white rounded-full px-4 py-2"
          style={{ boxShadow: "0 4px 12px rgba(20,40,60,0.08)" }}
        >
          <Sparkles size={14} className="text-sky" />
          <span className="text-gray" style={{ fontSize: 13 }}>
            힌트: <span className="text-ink" style={{ fontWeight: 700 }}>'{reqChar}'</span>로 시작 — {pictureHints[reqChar] ?? "무엇이 있을까?"}
          </span>
        </motion.div>
      </div>

      {/* 음운인식 코칭 팁 */}
      <div className="px-5">
        <div className="bg-cream rounded-[18px] p-3 flex items-start gap-2">
          <Lightbulb size={16} className="text-[#d99e00] shrink-0 mt-0.5" />
          <p className="text-ink" style={{ fontSize: 13, lineHeight: 1.45 }}>{phonicsTip}</p>
        </div>
      </div>

      {/* 입력 */}
      <div className="px-5 pb-10 pt-3">
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-coral mb-2 ml-1"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={`'${reqChar}'(으)로 시작하는 낱말`}
            className="flex-1 h-12 rounded-[14px] bg-white border border-[#e2eef4] px-4 outline-none focus:border-sky text-ink"
            style={{ fontSize: 15 }}
          />
          <button onClick={submit} className="w-12 h-12 rounded-[14px] bg-sky flex items-center justify-center">
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Bubble({ turn }: { turn: Turn }) {
  const isParent = turn.who === "부모";
  const align = isParent ? "justify-end" : "justify-start";
  const bg =
    turn.who === "부모"
      ? "bg-sky text-white"
      : turn.who === "아이"
      ? "bg-cream text-ink"
      : "bg-white text-ink border border-[#e2eef4]";
  const last = turn.word[turn.word.length - 1];
  const head = turn.word.slice(0, -1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`flex ${align}`}
    >
      <div className="max-w-[78%]">
        <span className={`block mb-1 text-gray ${isParent ? "text-right" : "text-left"}`} style={{ fontSize: 11 }}>
          {turn.who}
        </span>
        <div className={`px-4 py-2.5 rounded-[18px] ${bg}`} style={{ fontSize: 18, fontWeight: 600 }}>
          {head}
          <motion.span
            className={turn.who === "부모" ? "text-cream-strong" : "text-sky-dark"}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-block", fontWeight: 800 }}
          >
            {last}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
