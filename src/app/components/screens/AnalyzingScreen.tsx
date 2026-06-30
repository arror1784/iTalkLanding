import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { Mascot } from "../common/Mascot";

const steps = ["음성 인식", "감정 톤 분석", "질문·표현 분석", "코칭 생성"];

export function AnalyzingScreen() {
  const { go } = useApp();
  const [done, setDone] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) => setTimeout(() => setDone(i + 1), (i + 1) * 900));
    const finish = setTimeout(() => go("report"), steps.length * 900 + 700);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-bg-light px-8">
      <div className="relative mb-8">
        <motion.div
          className="absolute inset-0 -m-6 rounded-full bg-sky-light"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <Mascot size={130} expression="listening" float />
        </div>
      </div>

      <h2 className="text-ink text-center" style={{ fontSize: 22, fontWeight: 700 }}>
        대화를 분석하고 있어요
      </h2>
      <div className="flex gap-1.5 mt-3 mb-10">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-sky"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="w-full flex flex-col gap-3">
        {steps.map((s, i) => {
          const complete = i < done;
          const active = i === done;
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex items-center gap-3 px-4 h-14 rounded-2xl bg-white ${active ? "ring-2 ring-sky" : ""}`}
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
            >
              <motion.span
                className={`w-7 h-7 rounded-full flex items-center justify-center ${complete ? "bg-green" : "bg-sky-light"}`}
                animate={complete ? { scale: [0.6, 1.2, 1] } : {}}
              >
                {complete ? (
                  <Check size={16} className="text-white" strokeWidth={3} />
                ) : (
                  <span className="text-sky-dark" style={{ fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
                )}
              </motion.span>
              <span className="text-ink" style={{ fontSize: 15, fontWeight: complete ? 600 : 400 }}>
                {s}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
