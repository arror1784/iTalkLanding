import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Pause, Check, Send, ImagePlus, Plus } from "lucide-react";
import { useApp, RecordMode } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";
import { Waveform } from "../common/Waveform";
import { ChatBubble } from "../common/ChatBubble";

const tabs: { key: RecordMode; label: string }[] = [
  { key: "voice", label: "음성 녹음" },
  { key: "text", label: "텍스트 입력" },
  { key: "upload", label: "캡쳐 업로드" },
];

export function RecordScreen() {
  const { state, setRecordMode, go } = useApp();
  const mode = state.recordMode;

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="대화 기록" showBack />
      {/* 탭 */}
      <div className="px-5 mt-2">
        <div className="flex bg-white rounded-2xl p-1" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setRecordMode(t.key)}
              className="relative flex-1 h-10 rounded-xl"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {mode === t.key && (
                <motion.span layoutId="recTab" className="absolute inset-0 bg-sky rounded-xl" transition={{ type: "spring", stiffness: 300, damping: 26 }} />
              )}
              <span className={`relative ${mode === t.key ? "text-white" : "text-gray"}`}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {mode === "voice" && <VoicePanel onDone={() => go("analyzing")} />}
            {mode === "text" && <TextPanel onDone={() => go("analyzing")} />}
            {mode === "upload" && <UploadPanel onDone={() => go("analyzing")} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VoicePanel({ onDone }: { onDone: () => void }) {
  const [recording, setRecording] = useState(true);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const mmss = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center pt-6">
      <p className="text-gray mb-10" style={{ fontSize: 15 }}>
        {recording ? "지금 대화를 녹음하고 있어요" : "일시정지됨"}
      </p>

      {/* 마이크 + ripple */}
      <div className="relative flex items-center justify-center mb-8" style={{ width: 200, height: 200 }}>
        {recording &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border-2 border-sky/40"
              style={{ width: 120, height: 120 }}
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
            />
          ))}
        <motion.div
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)", boxShadow: "0 12px 30px rgba(43,196,240,0.45)" }}
          animate={recording ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: recording ? Infinity : 0 }}
        >
          <Mic size={48} className="text-white" />
        </motion.div>
      </div>

      <div className="w-full bg-sky rounded-2xl px-5 py-3 mb-2">
        <Waveform active={recording} />
      </div>
      <span className="text-ink mb-10" style={{ fontSize: 30, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
        {mmss}
      </span>

      <div className="flex items-center gap-5">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setRecording((v) => !v)}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: "0 8px 20px rgba(20,40,60,0.1)" }}
        >
          {recording ? <Pause size={26} className="text-ink" fill="var(--ink)" /> : <Mic size={26} className="text-sky-dark" />}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onDone}
          className="px-8 h-16 rounded-full bg-sky text-white flex items-center gap-2"
          style={{ fontSize: 16, fontWeight: 600, boxShadow: "0 8px 20px rgba(43,196,240,0.4)" }}
        >
          <Check size={22} /> 완료
        </motion.button>
      </div>
    </div>
  );
}

function TextPanel({ onDone }: { onDone: () => void }) {
  const [msgs, setMsgs] = useState<{ speaker: "부모" | "아이"; text: string }[]>([
    { speaker: "아이", text: "엄마 나 이거 하기 싫어!" },
    { speaker: "부모", text: "그렇구나, 왜 하기 싫은지 말해줄래?" },
  ]);
  const [speaker, setSpeaker] = useState<"부모" | "아이">("부모");
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { speaker, text }]);
    setText("");
  };

  return (
    <div className="flex flex-col" style={{ minHeight: 480 }}>
      <div className="flex-1 flex flex-col gap-3 mb-3">
        {msgs.map((m, i) => (
          <ChatBubble key={i} speaker={m.speaker} text={m.text} />
        ))}
      </div>

      <div className="flex gap-2 mb-2">
        {(["부모", "아이"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSpeaker(s)}
            className={`px-3 h-8 rounded-full ${speaker === s ? "bg-sky text-white" : "bg-white text-gray border border-[#e2eef4]"}`}
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={`${speaker} 발화를 입력하세요`}
          className="flex-1 h-12 rounded-[14px] bg-white border border-[#e2eef4] px-4 outline-none focus:border-sky text-ink"
          style={{ fontSize: 15 }}
        />
        <button onClick={send} className="w-12 h-12 rounded-[14px] bg-sky flex items-center justify-center">
          <Send size={20} className="text-white" />
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onDone}
        className="w-full h-14 rounded-2xl text-white"
        style={{ background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)", fontSize: 17, fontWeight: 600 }}
      >
        분석 요청하기
      </motion.button>
    </div>
  );
}

function UploadPanel({ onDone }: { onDone: () => void }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex flex-col items-center pt-4">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setAdded(true)}
        className="w-full rounded-3xl border-2 border-dashed border-sky/40 bg-sky-light flex flex-col items-center justify-center gap-3"
        style={{ height: 280 }}
      >
        {added ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-40 h-52 rounded-2xl bg-white flex flex-col gap-2 p-3" style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.1)" }}>
              <span className="self-end px-3 py-1.5 bg-cream rounded-2xl rounded-tr-sm" style={{ fontSize: 11 }}>빨리 좀 해!</span>
              <span className="self-start px-3 py-1.5 bg-sky-light rounded-2xl rounded-tl-sm" style={{ fontSize: 11 }}>싫어어어</span>
              <span className="self-end px-3 py-1.5 bg-cream rounded-2xl rounded-tr-sm" style={{ fontSize: 11 }}>지금 안 하면 안 돼?</span>
            </div>
            <span className="text-sky-dark" style={{ fontSize: 13, fontWeight: 600 }}>대화 캡쳐 1장 첨부됨</span>
          </div>
        ) : (
          <>
            <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <ImagePlus size={30} className="text-sky-dark" />
            </span>
            <p className="text-ink" style={{ fontSize: 15, fontWeight: 600 }}>카톡 대화 캡쳐를 올려주세요</p>
            <p className="text-gray" style={{ fontSize: 13 }}>탭하여 이미지 선택</p>
          </>
        )}
      </motion.button>

      <button className="mt-4 flex items-center gap-1.5 text-gray" style={{ fontSize: 14 }}>
        <Plus size={18} /> 이미지 더 추가
      </button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onDone}
        disabled={!added}
        className="w-full h-14 rounded-2xl text-white mt-8 disabled:opacity-40"
        style={{ background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)", fontSize: 17, fontWeight: 600 }}
      >
        분석 요청하기
      </motion.button>
    </div>
  );
}
