import { useState } from "react";
import { Home, BookOpen, Gamepad2, User, Plus, Mic, Type, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp, Tab, RecordMode } from "../../state/AppContext";

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: "home", label: "홈", icon: Home },
  { key: "coaching", label: "코칭", icon: BookOpen },
  { key: "play", label: "놀이", icon: Gamepad2 },
  { key: "my", label: "마이", icon: User },
];

const radial: { mode: RecordMode; label: string; icon: typeof Mic; angle: number }[] = [
  { mode: "voice", label: "음성 녹음", icon: Mic, angle: -150 },
  { mode: "text", label: "텍스트", icon: Type, angle: -90 },
  { mode: "upload", label: "캡쳐", icon: ImageIcon, angle: -30 },
];

export function BottomTabBar() {
  const { state, go, setRecordMode } = useApp();
  const [open, setOpen] = useState(false);

  const handleRecord = (mode: RecordMode) => {
    setRecordMode(mode);
    setOpen(false);
    go("record");
  };

  return (
    <>
      {/* 라디얼 메뉴 백드롭 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-50">
        {/* 라디얼 옵션 */}
        <div className="relative h-0">
          <AnimatePresence>
            {open &&
              radial.map((item, i) => {
                const rad = (item.angle * Math.PI) / 180;
                const dist = 96;
                return (
                  <motion.button
                    key={item.mode}
                    onClick={() => handleRecord(item.mode)}
                    className="absolute left-1/2 bottom-7 flex flex-col items-center gap-1"
                    initial={{ x: -24, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{
                      x: Math.cos(rad) * dist - 24,
                      y: Math.sin(rad) * dist,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ x: -24, y: 0, opacity: 0, scale: 0.4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22, delay: i * 0.04 }}
                  >
                    <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 8px 20px rgba(20,40,60,0.18)" }}>
                      <item.icon size={22} className="text-sky-dark" strokeWidth={2.2} />
                    </span>
                    <span className="text-white" style={{ fontSize: 11, fontWeight: 600 }}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
          </AnimatePresence>
        </div>

        {/* 탭바 */}
        <div
          className="relative bg-white px-2 pt-2 pb-6"
          style={{ boxShadow: "0 -4px 20px rgba(20,40,60,0.06)" }}
        >
          <div className="flex items-end justify-around">
            {tabs.slice(0, 2).map((t) => (
              <TabButton key={t.key} tab={t} active={state.activeTab === t.key} onClick={() => go(t.key, t.key)} />
            ))}
            <div className="w-16" />
            {tabs.slice(2).map((t) => (
              <TabButton key={t.key} tab={t} active={state.activeTab === t.key} onClick={() => go(t.key, t.key)} />
            ))}
          </div>

          {/* 중앙 FAB */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)",
              boxShadow: "0 10px 24px rgba(43,196,240,0.45)",
            }}
          >
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              {open ? <X size={30} className="text-white" /> : <Plus size={30} className="text-white" strokeWidth={2.5} />}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </>
  );
}

function TabButton({
  tab,
  active,
  onClick,
}: {
  tab: { key: Tab; label: string; icon: typeof Home };
  active: boolean;
  onClick: () => void;
}) {
  const Icon = tab.icon;
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 w-14 py-1">
      <motion.span animate={active ? { y: [0, -4, 0] } : {}} transition={{ duration: 0.4 }}>
        <Icon size={23} strokeWidth={2.2} className={active ? "text-sky" : "text-gray"} />
      </motion.span>
      <span style={{ fontSize: 11, fontWeight: active ? 600 : 400 }} className={active ? "text-sky" : "text-gray"}>
        {tab.label}
      </span>
    </button>
  );
}
