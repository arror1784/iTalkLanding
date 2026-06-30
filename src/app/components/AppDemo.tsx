import { ArrowLeft } from "lucide-react";
import { AppProvider } from "../state/AppContext";
import { AppStage } from "./AppStage";

interface Props {
  onBack: () => void;
}

export function AppDemo({ onBack }: Props) {
  return (
    <div
      className="min-h-screen bg-[#1a2a3a] flex flex-col items-center justify-start py-6 px-4"
      style={{ fontFamily: "'Pretendard', system-ui, sans-serif" }}
    >
      {/* 상단 바 */}
      <div className="w-full max-w-sm mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          <ArrowLeft size={16} />
          랜딩으로 돌아가기
        </button>
        <span className="text-white/40 text-xs">인터랙티브 데모</span>
      </div>

      {/* 폰 프레임 */}
      <div
        className="relative rounded-[44px] overflow-hidden shadow-2xl"
        style={{
          width: 390,
          height: 844,
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100dvh - 120px)",
          background: "#0d1a27",
          boxShadow:
            "0 0 0 10px #0d1a27, 0 0 0 12px #2a3f54, 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* 노치 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
          style={{
            width: 120,
            height: 34,
            background: "#0d1a27",
            borderRadius: "0 0 20px 20px",
          }}
        />

        {/* 앱 본체 */}
        <div
          className="absolute inset-0"
          style={{ borderRadius: 44, overflow: "hidden" }}
        >
          <AppProvider>
            <AppStage />
          </AppProvider>
        </div>
      </div>

      <p
        className="mt-5 text-white/35 text-xs text-center"
        style={{ maxWidth: 320, whiteSpace: "pre-line" }}
      >
        {"실제 앱과 동일한 인터랙션을 체험해보세요.\n모든 데이터는 샘플입니다."}
      </p>
    </div>
  );
}
