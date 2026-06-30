import { motion } from "motion/react";

// 말풍선 — 부모=블루, 아이=크림
export function ChatBubble({
  speaker,
  text,
}: {
  speaker: "부모" | "아이";
  text: string;
}) {
  const isParent = speaker === "부모";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isParent ? "justify-end" : "justify-start"}`}
    >
      <div className="max-w-[78%]">
        <span
          className={`block mb-1 text-gray ${isParent ? "text-right" : "text-left"}`}
          style={{ fontSize: 11 }}
        >
          {speaker}
        </span>
        <div
          className={`px-4 py-2.5 ${
            isParent
              ? "bg-sky text-white rounded-[18px] rounded-tr-md"
              : "bg-cream text-ink rounded-[18px] rounded-tl-md"
          }`}
          style={{ fontSize: 15, lineHeight: 1.45 }}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}
