import { AppProvider, Screen, Tab } from "../../state/AppContext";
import { AppStage } from "../AppStage";

// 실제 앱(390×844)을 축소해 폰 베젤 안에 렌더하는 미리보기.
// 기본은 보기 전용(pointer-events 차단). interactive로 켤 수 있음.
export function AppPreview({
  screen = "home",
  tab,
  width = 248,
  interactive = false,
  island = true,
}: {
  screen?: Screen;
  tab?: Tab;
  width?: number;
  interactive?: boolean;
  island?: boolean;
}) {
  const FRAME_W = 390;
  const FRAME_H = 844;
  const scale = width / FRAME_W;
  const scaledH = FRAME_H * scale;
  const bezel = Math.max(6, Math.round(width * 0.04));

  return (
    <div
      className="bg-ink"
      style={{
        width: width + bezel * 2,
        padding: bezel,
        borderRadius: bezel + 30,
        boxShadow: "0 30px 70px rgba(20,40,60,0.25)",
      }}
    >
      <div
        className="relative overflow-hidden bg-bg-light"
        style={{ width, height: scaledH, borderRadius: 30 }}
      >
        {island && (
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 z-50 bg-ink rounded-full"
            style={{ width: width * 0.3, height: width * 0.075 }}
          />
        )}
        <div
          className={interactive ? "" : "pointer-events-none select-none"}
          style={{
            width: FRAME_W,
            height: FRAME_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <AppProvider initialScreen={screen} initialTab={tab}>
            <AppStage />
          </AppProvider>
        </div>
      </div>
    </div>
  );
}
