import { createContext, useContext, useReducer, ReactNode } from "react";

export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "profile"
  | "home"
  | "record"
  | "analyzing"
  | "report"
  | "coaching"
  | "lesson"
  | "play"
  | "story"
  | "wordchain"
  | "reports"
  | "my";

export type Tab = "home" | "coaching" | "play" | "my";
export type RecordMode = "voice" | "text" | "upload";

type State = {
  screen: Screen;
  activeTab: Tab;
  recordMode: RecordMode;
  selectedLessonId: string | null;
  history: Screen[];
};

type Action =
  | { type: "GO"; screen: Screen; tab?: Tab }
  | { type: "BACK" }
  | { type: "SET_RECORD_MODE"; mode: RecordMode }
  | { type: "OPEN_LESSON"; id: string };

const initialState: State = {
  screen: "splash",
  activeTab: "home",
  recordMode: "voice",
  selectedLessonId: null,
  history: [],
};

// 탭바가 보이는 메인 화면들
export const TAB_SCREENS: Record<Tab, Screen> = {
  home: "home",
  coaching: "coaching",
  play: "play",
  my: "my",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GO":
      return {
        ...state,
        history: [...state.history, state.screen],
        screen: action.screen,
        activeTab: action.tab ?? state.activeTab,
      };
    case "BACK": {
      const history = [...state.history];
      const prev = history.pop() ?? "home";
      return { ...state, screen: prev, history };
    }
    case "SET_RECORD_MODE":
      return { ...state, recordMode: action.mode };
    case "OPEN_LESSON":
      return {
        ...state,
        history: [...state.history, state.screen],
        selectedLessonId: action.id,
        screen: "lesson",
      };
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  go: (screen: Screen, tab?: Tab) => void;
  back: () => void;
  setRecordMode: (mode: RecordMode) => void;
  openLesson: (id: string) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({
  children,
  initialScreen,
  initialTab,
}: {
  children: ReactNode;
  initialScreen?: Screen;
  initialTab?: Tab;
}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...(initialScreen ? { screen: initialScreen } : {}),
    ...(initialTab ? { activeTab: initialTab } : {}),
  });
  const value: Ctx = {
    state,
    go: (screen, tab) => dispatch({ type: "GO", screen, tab }),
    back: () => dispatch({ type: "BACK" }),
    setRecordMode: (mode) => dispatch({ type: "SET_RECORD_MODE", mode }),
    openLesson: (id) => dispatch({ type: "OPEN_LESSON", id }),
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
