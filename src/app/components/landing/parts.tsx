import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "motion/react";

// 사전예약 구글폼 링크 (개발자가 실제 주소로 교체)
export const GOOGLE_FORM = "https://forms.gle/UiGMyNQwZEF7kHfj6";

// 섹션 진입 fade-up (stagger 지원)
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// 사전예약 CTA 버튼 — 모든 곳에서 동일 문구·동일 링크
export function CTAButton({
  label = "무료로 사전예약하기",
  size = "lg",
  variant = "primary",
  full = false,
  pulse = false,
}: {
  label?: string;
  size?: "lg" | "sm";
  variant?: "primary" | "cream";
  full?: boolean;
  pulse?: boolean;
}) {
  const isLg = size === "lg";
  const bg = variant === "cream" ? "bg-ink text-white" : "text-white";
  return (
    <motion.a
      href={GOOGLE_FORM}
      target="_blank"
      rel="noopener"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      animate={
        pulse
          ? {
              boxShadow: [
                "0 8px 24px rgba(43,196,240,0.35)",
                "0 10px 30px rgba(43,196,240,0.55)",
                "0 8px 24px rgba(43,196,240,0.35)",
              ],
            }
          : {}
      }
      transition={pulse ? { duration: 1.8, repeat: Infinity } : {}}
      className={`inline-flex items-center justify-center rounded-2xl ${bg} ${full ? "w-full" : ""}`}
      style={{
        background:
          variant === "primary"
            ? "linear-gradient(135deg,#2BC4F0,#5FD6F7)"
            : undefined,
        minHeight: isLg ? 56 : 44,
        padding: isLg ? "0 28px" : "0 18px",
        fontSize: isLg ? 17 : 14,
        fontWeight: 700,
        boxShadow: "0 8px 24px rgba(43,196,240,0.35)",
      }}
    >
      {label}
    </motion.a>
  );
}

// 안심 보조 문구
export function Reassure({
  text = "무료 · 30초면 끝나요",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p className={`text-gray ${className}`} style={{ fontSize: 13 }}>
      {text}
    </p>
  );
}

// 카운트업 숫자
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
