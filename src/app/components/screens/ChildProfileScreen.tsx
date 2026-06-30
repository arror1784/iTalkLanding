import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { AppHeader } from "../layout/AppHeader";

const ages = ["영유아", "유아", "초등 저학년", "초등 고학년"];
const relations = ["엄마", "아빠", "기타"];
const emojis = ["🐣", "🐤", "🐰", "🐻", "🦊", "🐱", "🐯", "🐸"];

export function ChildProfileScreen() {
  const { go } = useApp();
  const [name, setName] = useState("채이");
  const [age, setAge] = useState("유아");
  const [relation, setRelation] = useState("엄마");
  const [emoji, setEmoji] = useState("🐣");

  return (
    <div className="w-full h-full flex flex-col bg-bg-light">
      <AppHeader title="자녀 프로필 설정" />
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <p className="text-gray mt-2 mb-6" style={{ fontSize: 14, lineHeight: 1.5 }}>
          아이에 맞춘 코칭을 위해 정보를 알려주세요.
        </p>

        {/* 이모지 선택 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-cream flex items-center justify-center mb-4" style={{ fontSize: 48 }}>
            {emoji}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {emojis.map((e) => (
              <motion.button
                key={e}
                whileTap={{ scale: 0.9 }}
                onClick={() => setEmoji(e)}
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  emoji === e ? "bg-sky-light ring-2 ring-sky" : "bg-white"
                }`}
                style={{ fontSize: 22 }}
              >
                {e}
              </motion.button>
            ))}
          </div>
        </div>

        <Label>자녀 이름</Label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          className="w-full h-12 rounded-[14px] bg-white border border-[#e2eef4] px-4 mb-5 outline-none focus:border-sky text-ink"
          style={{ fontSize: 15 }}
        />

        <Label>연령대</Label>
        <ChipRow options={ages} value={age} onChange={setAge} className="mb-5" />

        <Label>관계</Label>
        <ChipRow options={relations} value={relation} onChange={setRelation} className="mb-6" />

        <button className="w-full h-12 rounded-[14px] border-2 border-dashed border-sky/40 text-sky-dark flex items-center justify-center gap-1.5" style={{ fontSize: 14, fontWeight: 600 }}>
          <Plus size={18} /> 자녀 추가하기
        </button>
      </div>

      <div className="px-5 pb-10 pt-3 bg-bg-light">
        <motion.button
          onClick={() => go("home", "home")}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 rounded-2xl text-white"
          style={{
            background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)",
            fontSize: 17,
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(43,196,240,0.35)",
          }}
        >
          완료
        </motion.button>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink mb-2" style={{ fontSize: 14, fontWeight: 600 }}>
      {children}
    </p>
  );
}

function ChipRow({
  options,
  value,
  onChange,
  className = "",
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((o) => (
        <motion.button
          key={o}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(o)}
          className={`px-4 h-10 rounded-full ${
            value === o ? "bg-sky text-white" : "bg-white text-gray border border-[#e2eef4]"
          }`}
          style={{ fontSize: 14, fontWeight: value === o ? 600 : 400 }}
        >
          {o}
        </motion.button>
      ))}
    </div>
  );
}
