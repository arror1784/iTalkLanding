import { motion } from "motion/react";

type Expression = "happy" | "listening" | "sleepy" | "cheer";

// 아이톡 마스코트 — 둥근 블루 바탕에 크림색 눈웃음 캐릭터
export function Mascot({
  size = 96,
  expression = "happy",
  float = false,
}: {
  size?: number;
  expression?: Expression;
  float?: boolean;
}) {
  const body = (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* 몸통 */}
      <circle cx="60" cy="60" r="52" fill="var(--sky)" />
      <circle cx="60" cy="60" r="52" fill="url(#mascotGrad)" fillOpacity="0.35" />
      {/* 볼 */}
      <circle cx="38" cy="72" r="8" fill="var(--cream-strong)" fillOpacity="0.7" />
      <circle cx="82" cy="72" r="8" fill="var(--cream-strong)" fillOpacity="0.7" />
      {/* 눈 — ö 눈웃음 */}
      {expression === "sleepy" ? (
        <>
          <path d="M40 56 q8 6 16 0" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M64 56 q8 6 16 0" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M40 60 q8 -10 16 0" stroke="var(--cream)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M64 60 q8 -10 16 0" stroke="var(--cream)" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      )}
      {/* 입 */}
      <path
        d="M50 76 q10 10 20 0"
        stroke="var(--cream)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* 헤드폰 (listening) */}
      {expression === "listening" && (
        <>
          <path d="M22 60 a38 38 0 0 1 76 0" stroke="var(--sky-dark)" strokeWidth="6" fill="none" />
          <rect x="14" y="56" width="14" height="22" rx="7" fill="var(--sky-dark)" />
          <rect x="92" y="56" width="14" height="22" rx="7" fill="var(--sky-dark)" />
        </>
      )}
      {/* 손 흔들기 (cheer) */}
      {expression === "cheer" && (
        <circle cx="104" cy="44" r="10" fill="var(--cream-strong)" />
      )}
      <defs>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="120" y2="120">
          <stop stopColor="#5FD6F7" />
          <stop offset="1" stopColor="#2BC4F0" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (float) {
    return (
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {body}
      </motion.div>
    );
  }
  return body;
}
