# 아이톡(iTalk) 하이파이 프로토타입 — 구현 계획

## Context
부모-자녀 대화를 분석해 더 나은 소통법을 코칭하는 모바일 앱 "아이톡"의 인터랙티브 프로토타입을 만든다. 영어교육 앱 링글의 `기록 → AI 분석 → 피드백 리포트 → 복습·연습` 루프를 소통 코칭에 적용한 컨셉. iPhone 15 프레임(390×844), 한국어 UI, 밝은 스카이블루 + 크림 옐로우 톤. 사용자가 **전체 12화면 풀 구현**을 요청함.

환경: React + Tailwind v4 + Vite(Figma Make). 진입점 `src/app/App.tsx`(default export). shadcn/ui 컴포넌트 보유. motion/recharts/lucide-react/canvas-confetti 사용 가능. `@make-kits` 디자인 시스템은 실제 미설치 → shadcn/ui + 커스텀으로 구현. PureFrontend(백엔드 불필요, 더미 데이터).

## 네비게이션 방식
react-router 대신 **단일 App 화면 상태머신**(Context + useReducer). 폰 프레임 프로토타입에서 URL 라우팅은 불필요하고 탭바+모달 스택 모델과 충돌. 타입드 `Screen` 유니온을 `AnimatePresence`로 전환. 상태: `screen`, `activeTab`, `recordMode`, `selectedLessonId`, `lastReport`, 뒤로가기용 history 스택.

## 컬러 토큰 & 폰트
- `src/styles/theme.css` `:root`에 raw 변수 추가(`--sky #2BC4F0`, `--sky-dark #15A6D8`, `--sky-light #E6F7FD`, `--cream #FBEFA8`, `--cream-strong #FBE07A`, `--ink #1B1B1F`, `--gray #6B7280`, `--bg-light #F6FBFE`, `--green #34C759`, `--coral #FF7A6B`). `@theme inline`에 `--color-sky` 등으로 노출해 `bg-sky`/`text-ink` 유틸 생성. `--primary`/`--background`/`--foreground`/`--ring` 재지정. `.dark`는 그대로(라이트 전용).
- `src/styles/fonts.css` 최상단에 Pretendard CDN(jsdelivr) import + body font-family.

## 파일 구조 (모두 신규 `.tsx`)
- `state/AppContext.tsx` — reducer/Provider/useApp 훅
- `state/dummyData.ts` — 지영(엄마)/채이(5세), 주간점수 78, 리포트 82(+6), 응원·코칭·교정 문구, 레슨 목록, 차트 데이터 등 모든 한국어 카피 집중
- `components/layout/PhoneFrame.tsx` — 390×844 프레임 + 상태바
- `components/layout/AppHeader.tsx` — 로고/알림/설정
- `components/layout/BottomTabBar.tsx` — 5탭 + 중앙 블루 FAB 라디얼 메뉴(spring)
- `components/common/`: `Mascot.tsx`(expression prop 인라인 SVG), `FadeUp.tsx`(stagger), `SectionCard.tsx`(크림/화이트/블루 변형), `ScoreGauge.tsx`(원형 게이지+카운트업), `EmotionLineChart.tsx`, `AnalysisBars.tsx`, `TrendChart.tsx`, `Waveform.tsx`, `ChatBubble.tsx`
- `components/screens/`: `SplashScreen`, `OnboardingScreen`, `LoginScreen`, `ChildProfileScreen`, `HomeScreen`, `RecordScreen`, `AnalyzingScreen`, `ReportScreen`, `CoachingScreen`, `LessonDetailScreen`, `ReportsScreen`, `MyPageScreen`

## 재사용 자산
- shadcn/ui: `tabs`, `switch`, `progress`, `avatar`, `badge`, `button`, `input`, `textarea`, `card`, `dialog`, `scroll-area`
- `components/figma/ImageWithFallback.tsx` — 레슨 썸네일 등 이미지(Unsplash 검색해 사용)
- recharts `ui/chart.tsx` 래퍼 — 게이지(RadialBarChart), 감정 톤/추이(LineChart, 그려지는 애니), 분석 막대(BarChart). 프레임 내 컨테이너에 명시적 높이.

## 애니메이션 (motion/react)
화면 전환 `AnimatePresence mode="wait"` cross-fade · 홈 카드 stagger fade-up · 스플래시 로고 spring bounce · 게이지 0→82 카운트업(`useMotionValue`+`animate`) · 막대 grow / 라인 draw / 도넛 회전 · 녹음 ripple 펄스+실시간 waveform · FAB 라디얼 spring · 리포트 저장 시 canvas-confetti · 버튼 tap scale 0.96. 전환 ease-out 240~320ms.

## 구현 순서
1. theme.css 토큰 + fonts.css → 2. AppContext + dummyData → 3. PhoneFrame/TabBar 셸 + App 배선 → 4. 프리오스(스플래시·온보딩·로그인·프로필) → 5. 홈 → 6. 핵심 루프(기록→분석로딩→리포트) → 7. 코칭·레슨상세 → 8. 리포트모음·마이 → 9. 폴리시.

## 검증
- dev 서버는 이미 실행 중(수동 실행 금지). 프리뷰 surface에서 확인.
- 흐름 점검: 스플래시 → 온보딩 → 로그인 → 프로필 → 홈; FAB → 기록 → 분석로딩 → 리포트 → 코칭 받기 → 레슨 롤플레이; 탭바 4개 화면 전환; 게이지/차트 애니, 녹음 파형, confetti 동작 확인.
- 콘솔 에러 없음, 한국어 텍스트 깨짐 없음, 390×844 프레임 내 스크롤 정상 확인.
