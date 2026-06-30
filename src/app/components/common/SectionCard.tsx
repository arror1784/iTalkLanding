import { ReactNode } from "react";
import { motion } from "motion/react";

type Variant = "white" | "cream" | "blue";

const styles: Record<Variant, string> = {
  white: "bg-white text-ink",
  cream: "bg-cream text-ink",
  blue: "bg-gradient-to-br from-[#2BC4F0] to-[#5FD6F7] text-white",
};

// 카드 — 크림 응원형 / 화이트 정보형 / 블루 액션형
export function SectionCard({
  variant = "white",
  children,
  className = "",
  onClick,
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      className={`rounded-[22px] p-5 ${styles[variant]} ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}
    >
      {children}
    </motion.div>
  );
}
