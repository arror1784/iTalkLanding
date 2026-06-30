import { motion } from "motion/react";

// 실시간 음성 파형 — 맥동하는 막대 애니메이션
export function Waveform({ active = true, bars = 28 }: { active?: boolean; bars?: number }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {Array.from({ length: bars }).map((_, i) => {
        const base = 6 + ((i * 7) % 24);
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-white"
            animate={
              active
                ? { height: [base, base + 22, base] }
                : { height: base }
            }
            transition={{
              duration: 0.7 + (i % 5) * 0.12,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{ height: base }}
          />
        );
      })}
    </div>
  );
}
