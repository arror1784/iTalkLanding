import { Bell, Settings, ChevronLeft } from "lucide-react";
import { useApp } from "../../state/AppContext";

// 상단 헤더 — 로고형 또는 뒤로가기형
export function AppHeader({
  title,
  showLogo = false,
  showBack = false,
  showActions = false,
}: {
  title?: string;
  showLogo?: boolean;
  showBack?: boolean;
  showActions?: boolean;
}) {
  const { back } = useApp();
  return (
    <div className="flex items-center justify-between px-5 pt-14 pb-3 bg-bg-light">
      <div className="flex items-center gap-2 min-w-[60px]">
        {showBack && (
          <button onClick={back} className="active:scale-95 transition-transform">
            <ChevronLeft size={26} className="text-ink" />
          </button>
        )}
        {showLogo && (
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 20, fontWeight: 700 }} className="text-sky-dark">
              아이톡
            </span>
            <span style={{ fontSize: 18 }}>🐣</span>
          </div>
        )}
      </div>
      {title && (
        <span style={{ fontSize: 17, fontWeight: 600 }} className="text-ink">
          {title}
        </span>
      )}
      <div className="flex items-center gap-3 min-w-[60px] justify-end">
        {showActions && (
          <>
            <button className="relative active:scale-95 transition-transform">
              <Bell size={22} className="text-ink" strokeWidth={2} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-coral rounded-full" />
            </button>
            <button className="active:scale-95 transition-transform">
              <Settings size={22} className="text-ink" strokeWidth={2} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
