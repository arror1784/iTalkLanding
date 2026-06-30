import { useEffect } from "react";
import { motion } from "motion/react";
import { useApp } from "../../state/AppContext";
import { Mascot } from "../common/Mascot";

export function SplashScreen() {
  const { go } = useApp();

  useEffect(() => {
    const t = setTimeout(() => go("onboarding"), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg,#2BC4F0,#15A6D8)" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 12 }}
      >
        <Mascot size={120} expression="happy" />
      </motion.div>
      <motion.h1
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 14 }}
        className="mt-6"
        style={{ fontSize: 40, fontWeight: 700, color: "var(--cream-strong)" }}
      >
        아이톡
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-2 text-white/90"
        style={{ fontSize: 15 }}
      >
        우리 아이와의 다정한 대화 코칭
      </motion.p>
    </div>
  );
}
