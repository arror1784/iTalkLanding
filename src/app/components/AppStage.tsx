import { AnimatePresence, motion } from "motion/react";
import { useApp, Screen } from "../state/AppContext";
import { BottomTabBar } from "./layout/BottomTabBar";

import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ChildProfileScreen } from "./screens/ChildProfileScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { RecordScreen } from "./screens/RecordScreen";
import { AnalyzingScreen } from "./screens/AnalyzingScreen";
import { ReportScreen } from "./screens/ReportScreen";
import { CoachingScreen } from "./screens/CoachingScreen";
import { LessonDetailScreen } from "./screens/LessonDetailScreen";
import { PlayScreen } from "./screens/PlayScreen";
import { StoryScreen } from "./screens/StoryScreen";
import { WordChainScreen } from "./screens/WordChainScreen";
import { ReportsScreen } from "./screens/ReportsScreen";
import { MyPageScreen } from "./screens/MyPageScreen";

const TAB_VISIBLE: Screen[] = ["home", "coaching", "play", "my"];

const screens: Record<Screen, React.ComponentType> = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  profile: ChildProfileScreen,
  home: HomeScreen,
  record: RecordScreen,
  analyzing: AnalyzingScreen,
  report: ReportScreen,
  coaching: CoachingScreen,
  lesson: LessonDetailScreen,
  play: PlayScreen,
  story: StoryScreen,
  wordchain: WordChainScreen,
  reports: ReportsScreen,
  my: MyPageScreen,
};

// 390×844 프레임 내부의 화면 전환 무대 (외부 폰 프레임은 포함하지 않음)
export function AppStage() {
  const { state } = useApp();
  const Current = screens[state.screen];
  const showTabBar = TAB_VISIBLE.includes(state.screen);

  return (
    <div className="relative w-full h-full overflow-hidden bg-bg-light">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Current />
        </motion.div>
      </AnimatePresence>
      {showTabBar && <BottomTabBar />}
    </div>
  );
}
