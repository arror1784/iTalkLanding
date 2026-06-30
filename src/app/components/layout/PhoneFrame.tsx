import { ReactNode } from "react";

// iPhone 15 프레임 390×844
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#dfeef5] p-4">
      <div
        className="relative bg-bg-light overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 44,
          boxShadow: "0 30px 80px rgba(20,40,60,0.25)",
          border: "10px solid #1b1b1f",
        }}
      >
        {/* 다이나믹 아일랜드 */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-28 h-7 bg-[#1b1b1f] rounded-full" />
        {children}
      </div>
    </div>
  );
}
