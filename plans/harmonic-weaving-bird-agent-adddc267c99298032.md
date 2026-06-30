# 아이톡(iTalk) Hi-Fi Prototype — Implementation Plan

## Environment facts (verified)
- Entry: `__figma__entrypoint__.ts` imports `src/styles/index.css` then lazy-loads `src/app/App.tsx` (default export). `App.tsx` is currently an empty centered div.
- `src/styles/index.css` imports `fonts.css`, `tailwind.css`, `theme.css` in that order. `fonts.css` and `globals.css` are EMPTY.
- `theme.css` is default shadcn (Tailwind v4 `@theme inline` with `--color-*` mapped to `--*` tokens). This is where new color tokens go.
- `tailwind.css` uses `@import 'tailwindcss' source(none)` + `@source '../**/*.{js,ts,jsx,tsx}'`, so any class used under `src/` is scanned.
- Full shadcn/ui set present in `src/app/components/ui` (button, card, tabs, input, textarea, badge, avatar, switch, progress, slider, separator, scroll-area, sonner, chart.tsx recharts wrapper, etc.). `figma/ImageWithFallback.tsx` available for all images.
- Libs confirmed in package.json: motion 12, recharts 2.15, lucide-react, canvas-confetti, react-slick, embla-carousel-react, sonner, react-router 7 (available but NOT recommended — see below).
- `@` alias -> `src`. SVG raw import enabled.

## Navigation / state decision
RECOMMENDATION: single `App.tsx` screen state machine, NOT react-router.
Rationale: it's a 390x844 phone-frame prototype with (a) a linear pre-auth flow (splash -> onboarding -> login -> profile setup) and (b) a 4-tab post-auth shell with stacked detail screens. URL routing adds no value inside a Figma Make canvas frame, complicates the phone-frame wrapper, and fights the bottom-tab + modal-stack model. A typed reducer is simpler and gives full control over motion transitions (AnimatePresence keyed on screen).

State shape (in `src/app/state/`):
- `Screen` union type: `'splash' | 'onboarding' | 'login' | 'profileSetup' | 'home' | 'record' | 'analyzing' | 'report' | 'coaching' | 'lessonDetail' | 'reports' | 'mypage'`.
- `AppContext` (React Context + useReducer) holding: `screen`, `activeTab` ('home'|'coaching'|'reports'|'mypage'), `recordMode` ('voice'|'text'|'image'), `selectedLessonId`, `lastReport`, plus `navigate(screen)`, `setTab`, `goBack` (maintain a small history stack for detail screens).
- Tab bar maps tab -> base screen; FAB radial menu sets `recordMode` then navigates to `record`.
- Pre-auth screens are full-bleed (no tab bar). Post-auth screens render inside the tab-bar shell. `analyzing`, `report`, `record`, `lessonDetail` are "stacked" screens shown over/instead of the tab content with a back affordance; tab bar hidden on `record`/`analyzing`, shown elsewhere as desired.

## File structure (all under src/app)
```
App.tsx                         # AppProvider + PhoneFrame + AnimatePresence screen switch
state/
  AppContext.tsx                # context, reducer, useApp() hook, Screen/Tab types
  dummyData.ts                  # 지영/채이, weekly 78, report 82(+6), lessons[], reports history, Korean copy constants
components/
  layout/
    PhoneFrame.tsx              # 390x844 device frame, notch, rounded corners, overflow clip, status bar
    Screen.tsx                  # standard scroll container + optional AppHeader/back
    AppHeader.tsx               # title + back chevron (lucide ChevronLeft)
    BottomTabBar.tsx            # 홈/코칭/+FAB/리포트/마이 + radial FAB menu (음성/텍스트/캡쳐)
  common/
    Mascot.tsx                  # inline SVG mascot, props: size, expression ('happy'|'thinking'|'cheer'), animate
    SectionCard.tsx             # cream / blue / white card variants (token-driven)
    ScoreGauge.tsx              # recharts RadialBar + count-up number
    EmotionLineChart.tsx        # recharts LineChart with draw-on animation
    AnalysisBars.tsx            # recharts horizontal BarChart grow animation
    Waveform.tsx                # animated bars (motion) for recording
    FadeUp.tsx                  # motion stagger fade-up wrapper
  screens/
    SplashScreen.tsx
    OnboardingScreen.tsx        # embla-carousel-react 3 slides + dot indicator + 시작하기
    LoginScreen.tsx             # kakao/apple/email buttons + Mascot
    ProfileSetupScreen.tsx      # name input, age-group chips, relationship, emoji avatar picker, multi-child add
    HomeScreen.tsx              # greeting, 오늘의 응원 (cream), 오늘의 코칭 (cream), weekly stats 3-up, quick-record (blue)
    RecordScreen.tsx            # tabs 음성녹음/텍스트입력/캡쳐업로드 (shadcn Tabs)
    AnalyzingScreen.tsx         # Mascot + step checklist ①②③ + pulsing dots, auto-advance to report
    ReportScreen.tsx            # ScoreGauge 82 count-up, EmotionLineChart, AnalysisBars, 잘한점(green), 이렇게 말해보세요(blue), save + confetti
    CoachingScreen.tsx          # lesson grid (thumbnail/duration/difficulty) via ImageWithFallback
    LessonDetailScreen.tsx      # 3 key points + example dialogue + AI roleplay chat w/ instant feedback + score
    ReportsScreen.tsx           # weekly/monthly toggle, trend LineChart, item changes, history list
    MyPageScreen.tsx            # profile, child mgmt, cumulative stats/streak, notif switches, premium, support
```

## Tokens, fonts, animation, charts

### Color tokens (edit `src/styles/theme.css`)
Add to `:root` as raw vars AND expose in `@theme inline` so Tailwind generates utilities (e.g. `bg-sky`, `text-cream`):
```
--sky: #2BC4F0; --sky-dark: #15A6D8; --sky-light: #E6F7FD;
--cream: #FBEFA8; --cream-strong: #FBE07A;
--ink: #1B1B1F; --gray: #6B7280; --bg-light: #F6FBFE;
--green: #34C759; --coral: #FF7A6B;
```
In `@theme inline`: `--color-sky: var(--sky)`, `--color-cream: var(--cream)`, etc. Also override shadcn `--primary: var(--sky)`, `--primary-foreground:#fff`, `--background: var(--bg-light)`, `--foreground: var(--ink)`, `--ring: var(--sky)`, `--radius` bump (e.g. 1rem) for rounded mobile cards. Do NOT touch the `.dark` block (prototype is light-only).

### Fonts (edit `src/styles/fonts.css` ONLY)
Add `@font-face`/`@import` for Pretendard (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`). Then set the font family — add `--font-sans` via `@theme inline` in theme.css OR set `body { font-family: 'Pretendard', sans-serif }` in fonts.css. Keep all font rules out of theme.css per constraint; just reference the family token there if needed.

### Animation strategy (motion/react)
- Screen transitions: `AnimatePresence mode="wait"` in App.tsx keyed by `screen`; slide/fade per flow.
- `FadeUp` wrapper + parent `staggerChildren` for home cards, report sections.
- Splash: logo `scale`/`y` spring bounce-in (`type:'spring', bounce:0.5`), auto-navigate after ~1.8s timer.
- Gauge count-up: `useMotionValue` + `animate()` + `useTransform` to render integer; sync with RadialBar `value`.
- Emotion line "draw": recharts `Line` with `animationDuration`/`isAnimationActive`, or motion `pathLength` 0->1 on the path. Prefer recharts built-in animate first; fall back to SVG path overlay if needed.
- Bars grow: recharts `Bar animationDuration` + stagger via `animationBegin`.
- Record: `Waveform` bars animate height loops; mic ripple = expanding `motion.div` rings; timer via setInterval.
- FAB radial menu: 3 children spring out with stagger + rotate, backdrop fade.
- Report save success: `canvas-confetti` burst on button click.
- Pulsing dots (analyzing): repeating `opacity`/`scale` with staggered delays; steps check off sequentially via timeouts, then auto-navigate to `report`.

### Charts (recharts; reuse ui/chart.tsx wrapper where convenient)
- `ScoreGauge`: `RadialBarChart` single bar, startAngle 90/endAngle -270, rounded cap, `--color-sky` fill on `--color-sky-light` track; center text driven by count-up.
- `EmotionLineChart`: `LineChart` 감정톤 over turns; smooth `type="monotone"`, hide axes/grid for clean mobile look.
- `AnalysisBars`: horizontal `BarChart` (layout="vertical") for 공감/명확성/질문 등 항목, grow animation.
- `ReportsScreen` trend: `LineChart` weekly/monthly toggled dataset.

## Reusable existing pieces
- shadcn: `button`, `card`, `tabs`, `input`, `textarea`, `badge`, `avatar`, `switch`, `progress`, `slider`, `separator`, `scroll-area`, `sonner` (toasts), `ui/chart.tsx` (recharts theming).
- `figma/ImageWithFallback.tsx` for all lesson thumbnails / uploaded captures.
- `ui/utils.ts` `cn()` for class merging.

## Implementation sequencing
1. Tokens in theme.css + Pretendard in fonts.css (foundation; everything depends on it).
2. AppContext + dummyData + types.
3. PhoneFrame, Screen, AppHeader, BottomTabBar (+ FAB radial), App.tsx wiring with AnimatePresence + placeholder screens.
4. Pre-auth flow: Splash -> Onboarding -> Login -> ProfileSetup.
5. Home (cards, stats, quick-record) + common SectionCard, Mascot, FadeUp.
6. Record (tabs/waveform/text/upload) -> Analyzing (auto-advance) -> Report (gauge/line/bars/confetti) — the core loop.
7. Coaching grid -> LessonDetail (roleplay chat).
8. Reports trend + MyPage.
9. Polish: stagger timings, confetti, transitions, empty/long-text edge cases at 390px.

## Risks / notes
- recharts responsive sizing inside fixed 390px frame: give chart containers explicit heights to avoid 0-height render.
- Keep `.dark` untouched; force light.
- Mascot is a single inline SVG component with expression prop — no external asset, avoids load fls.
- All copy pulled from `state/dummyData.ts` constants so Korean text is centralized.

## Critical Files for Implementation
- /workspaces/default/code/src/app/App.tsx
- /workspaces/default/code/src/styles/theme.css
- /workspaces/default/code/src/styles/fonts.css
- /workspaces/default/code/src/app/state/AppContext.tsx (new)
- /workspaces/default/code/src/app/components/layout/PhoneFrame.tsx (new)
