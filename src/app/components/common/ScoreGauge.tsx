import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";

// 소통 점수 원형 게이지 — 0→점수 원호 채움 + 숫자 카운트업
export function ScoreGauge({
  score,
  size = 180,
}: {
  score: number;
  size?: number;
}) {
  const radius = (size - 22) / 2;
  const circumference = 2 * Math.PI * radius;
  const [display, setDisplay] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, score, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [score]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--sky-light)"
          strokeWidth="14"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--sky)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontSize: 44, fontWeight: 700 }} className="text-ink leading-none">
          {display}
        </span>
        <span className="text-gray" style={{ fontSize: 13 }}>
          소통 점수
        </span>
      </div>
    </div>
  );
}
