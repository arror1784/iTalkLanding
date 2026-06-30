// 아이톡 더미 데이터 — 모든 한국어 카피와 프로토타입 데이터 집중

export const user = {
  name: "지영",
  relation: "엄마",
};

export const child = {
  name: "채이",
  age: 5,
  emoji: "🐣",
};

export const weeklyStats = {
  analyzeCount: 12,
  score: 78,
  scoreDelta: 5,
  openQuestionPct: 64,
};

export const cheerMessage =
  "어제 채이가 세 번이나 웃었어요. 엄마의 다정한 목소리 덕분이에요.";

// 오늘의 코칭 — 열린 질문 권유
export const coachMessage =
  "어제는 닫힌 질문이 많았어요. 오늘은 '왜', '어떻게'로 물어볼까요?";

// 함께 놀기 추천
export const todayStory = {
  title: "용감한 토끼 코코",
  meta: "5세 · 용기 주제",
  emoji: "🐰",
};

// 최신 분석 리포트
export const latestReport = {
  score: 82,
  delta: 6,
  emotionTone: [
    { t: "0:00", 부모: 60, 아이: 40 },
    { t: "0:30", 부모: 55, 아이: 35 },
    { t: "1:00", 부모: 50, 아이: 25 },
    { t: "1:30", 부모: 65, 아이: 45 },
    { t: "2:00", 부모: 78, 아이: 70 },
    { t: "2:30", 부모: 85, 아이: 82 },
  ],
  // 소통 분석 비율 (열린 질문 강조)
  analysis: [
    { label: "열린 질문", value: 32, color: "var(--sky)", highlight: true },
    { label: "폐쇄형 질문", value: 18, color: "var(--gray)" },
    { label: "공감 표현", value: 22, color: "var(--green)" },
    { label: "칭찬·격려", value: 18, color: "var(--cream-strong)" },
    { label: "지시·명령", value: 10, color: "var(--coral)" },
  ],
  good: {
    title: "아이의 감정을 먼저 알아줬어요",
    quote: "많이 속상했구나",
  },
  // 원리 태그 + 근거가 있는 교정 제안
  suggestions: [
    {
      tag: "열린 질문",
      before: "재밌었어?",
      beforeNote: "예/아니오로 끝나요",
      after: "오늘 뭐가 제일 재밌었어?",
      reason: "열린 질문은 더 긴 말과 새 어휘를 끌어내요.",
    },
    {
      tag: "선택 질문",
      before: "빨리 해!",
      beforeNote: "명령형",
      after: "5분 뒤에 할까, 지금 할까?",
      reason: "명령 대신 선택지를 주면 스스로 정하는 힘이 자라요.",
    },
    {
      tag: "확장·되돌려주기",
      before: "멍멍 가 (아이 말)",
      beforeNote: "짧은 발화",
      after: "응, 강아지가 집으로 가는구나",
      reason: "바르고 길게 되돌려주면 문장 모델이 돼요.",
    },
  ],
};

export type LessonCategory = "대화·언어" | "감정·훈육" | "놀이로 배우기";

export type Lesson = {
  id: string;
  category: LessonCategory;
  title: string;
  emoji: string;
  duration: string;
  level: "초급" | "중급" | "고급";
  summary: string; // 핵심 원리 1줄
  points: string[];
  example: { speaker: "부모" | "아이"; text: string }[];
};

export const lessons: Lesson[] = [
  // 대화·언어 (언어교육학 근거)
  {
    id: "open-q",
    category: "대화·언어",
    title: "열린 질문으로 대화 늘리기",
    emoji: "💬",
    duration: "5분",
    level: "초급",
    summary: "예/아니오로 끝나지 않는 질문이 더 긴 말과 새 어휘를 끌어내요.",
    points: [
      "'왜', '어떻게', '무엇'으로 시작해 보세요.",
      "예/아니오 질문 뒤엔 한 번 더 물어 확장하세요.",
      "아이의 대답을 평가하지 말고 더 듣는 데 집중하세요.",
    ],
    example: [
      { speaker: "부모", text: "오늘 어린이집에서 뭐가 제일 재밌었어?" },
      { speaker: "아이", text: "블록으로 큰 성 만들었어!" },
    ],
  },
  {
    id: "peer",
    category: "대화·언어",
    title: "대화식 책읽기 PEER 4단계",
    emoji: "📖",
    duration: "6분",
    level: "중급",
    summary: "질문하기 → 인정 → 확장 → 반복으로 책읽기를 대화로 바꿔요.",
    points: [
      "Prompt: 그림을 보고 질문해요.",
      "Evaluate & Expand: 아이 답을 인정하고 한 마디 더해요.",
      "Repeat: 늘어난 문장을 다시 말하게 해요.",
    ],
    example: [
      { speaker: "부모", text: "이 토끼는 지금 뭘 하고 있을까?" },
      { speaker: "아이", text: "뛰어!" },
    ],
  },
  {
    id: "crowd",
    category: "대화·언어",
    title: "CROWD 질문 5종",
    emoji: "🎴",
    duration: "5분",
    level: "중급",
    summary: "완성·회상·열린질문·육하원칙·연결 다섯 가지로 질문을 다양화해요.",
    points: [
      "완성형: 문장 끝을 아이가 채우게 해요.",
      "회상·육하원칙: 방금 일을 떠올려 말하게 해요.",
      "연결: 이야기를 아이의 삶과 이어주세요.",
    ],
    example: [
      { speaker: "부모", text: "토끼는 깡충깡충 ___로 갔어요. 뭐라고 했을까?" },
      { speaker: "아이", text: "숲으로!" },
    ],
  },
  {
    id: "recast",
    category: "대화·언어",
    title: "확장·되돌려주기 (recast)",
    emoji: "🔁",
    duration: "4분",
    level: "초급",
    summary: "아이 말을 바르고 길게 되돌려주면 문장 모델이 돼요.",
    points: [
      "틀린 말을 지적하지 말고 바른 문장으로 되돌려주세요.",
      "한두 단어를 더해 문장을 늘려주세요.",
      "새 낱말을 자연스럽게 반복해 주세요.",
    ],
    example: [
      { speaker: "아이", text: "멍멍 가." },
      { speaker: "부모", text: "응, 강아지가 집으로 가는구나." },
    ],
  },
  {
    id: "wait",
    category: "대화·언어",
    title: "5초만 기다려주기",
    emoji: "⏳",
    duration: "3분",
    level: "초급",
    summary: "질문 뒤 5초쯤 기다리면 아이가 스스로 말할 기회를 가져요.",
    points: [
      "질문 후 마음속으로 천천히 다섯을 세어보세요.",
      "대신 말해주고 싶은 마음을 잠시 참아요.",
      "아이가 말을 시작하면 끝까지 들어주세요.",
    ],
    example: [
      { speaker: "부모", text: "이건 왜 그럴까? (5초 기다림)" },
      { speaker: "아이", text: "음… 무거워서 떨어진 거 같아." },
    ],
  },
  // 감정·훈육
  {
    id: "tantrum",
    category: "감정·훈육",
    title: "떼쓰고 울 때",
    emoji: "😭",
    duration: "5분",
    level: "초급",
    summary: "옳고 그름을 따지기 전에 감정을 먼저 말로 읽어주세요.",
    points: [
      "먼저 아이의 감정을 말로 읽어주세요.",
      "공감이 먼저, 훈육은 그 다음이에요.",
      "선택지를 주어 스스로 진정하게 도와주세요.",
    ],
    example: [
      { speaker: "아이", text: "싫어! 안 갈 거야!" },
      { speaker: "부모", text: "가기 싫어서 많이 속상하구나. 무엇이 제일 싫어?" },
    ],
  },
  {
    id: "praise",
    category: "감정·훈육",
    title: "칭찬·격려하는 법",
    emoji: "🌟",
    duration: "4분",
    level: "초급",
    summary: "결과보다 과정과 노력을 구체적으로 칭찬하세요.",
    points: [
      "결과보다 과정과 노력을 칭찬하세요.",
      "구체적으로 무엇을 잘했는지 말해주세요.",
      "아이의 감정을 함께 기뻐해 주세요.",
    ],
    example: [
      { speaker: "아이", text: "엄마, 나 그림 다 그렸어!" },
      { speaker: "부모", text: "색을 정말 정성껏 칠했네. 끝까지 해낸 게 멋지다!" },
    ],
  },
  {
    id: "discipline",
    category: "감정·훈육",
    title: "훈육이 필요할 때",
    emoji: "🧭",
    duration: "6분",
    level: "중급",
    summary: "행동과 사람을 분리하고, 규칙은 짧고 분명하게 전달하세요.",
    points: [
      "행동과 사람을 분리해서 말하세요.",
      "규칙은 짧고 분명하게 전달하세요.",
      "감정이 가라앉은 뒤 이유를 설명하세요.",
    ],
    example: [
      { speaker: "아이", text: "동생 거 내가 가질 거야!" },
      { speaker: "부모", text: "갖고 싶었구나. 그래도 친구 물건은 먼저 물어봐야 해." },
    ],
  },
  {
    id: "angry",
    category: "감정·훈육",
    title: "화난 아이 공감하기",
    emoji: "🔥",
    duration: "5분",
    level: "중급",
    summary: "화는 나쁜 감정이 아니라고 알려주고 대신 말로 표현해 주세요.",
    points: [
      "화는 나쁜 감정이 아니라고 알려주세요.",
      "아이의 화를 대신 말로 표현해 주세요.",
      "차분해진 뒤 해결책을 함께 찾으세요.",
    ],
    example: [
      { speaker: "아이", text: "다 미워!" },
      { speaker: "부모", text: "지금 정말 화가 많이 났구나. 천천히 이야기해도 돼." },
    ],
  },
  {
    id: "sibling",
    category: "감정·훈육",
    title: "형제 다툼 중재",
    emoji: "👧🧒",
    duration: "6분",
    level: "고급",
    summary: "누구의 편도 들지 말고 각자의 입장을 번갈아 들어주세요.",
    points: [
      "누구의 편도 들지 말고 중립을 지키세요.",
      "각자의 입장을 번갈아 들어주세요.",
      "스스로 해결책을 제안하게 도와주세요.",
    ],
    example: [
      { speaker: "아이", text: "형이 먼저 그랬어!" },
      { speaker: "부모", text: "둘 다 속상했겠다. 어떻게 하면 좋을지 같이 정해볼까?" },
    ],
  },
  // 놀이로 배우기
  {
    id: "story-vocab",
    category: "놀이로 배우기",
    title: "동화로 어휘 늘리기",
    emoji: "📚",
    duration: "5분",
    level: "초급",
    summary: "그림책 속 새 낱말을 짚어주고 반복하면 어휘가 자라요.",
    points: [
      "새 낱말이 나오면 멈추고 함께 말해보세요.",
      "그림을 가리키며 낱말을 연결해 주세요.",
      "읽은 뒤 오늘 만난 낱말을 다시 떠올려요.",
    ],
    example: [
      { speaker: "부모", text: "'용감한'은 무섭지만 씩씩한 거야. 코코처럼!" },
      { speaker: "아이", text: "나도 용감해!" },
    ],
  },
  {
    id: "wordchain-lesson",
    category: "놀이로 배우기",
    title: "끝말잇기로 소리 익히기",
    emoji: "🔤",
    duration: "4분",
    level: "초급",
    summary: "낱말의 끝소리에 주목하면 음운인식과 어휘가 함께 자라요.",
    points: [
      "끝 글자 소리에 또박또박 집중하게 해주세요.",
      "막히면 쉬운 낱말로 힌트를 주세요.",
      "새 낱말은 어휘 노트에 담아 다시 써보세요.",
    ],
    example: [
      { speaker: "부모", text: "'사과'의 끝소리는 '과'! '과'로 시작하는 말은?" },
      { speaker: "아이", text: "과자!" },
    ],
  },
];

export const lessonCategories: LessonCategory[] = ["대화·언어", "감정·훈육", "놀이로 배우기"];

// AI 롤플레이 시나리오 (AI가 아이 역할)
export const roleplayScript: {
  child: string;
  hint: string;
  goodReply: string;
}[] = [
  {
    child: "엄마 미워! 나 안 잘 거야!",
    hint: "공감 먼저! 아이의 감정을 읽어주세요.",
    goodReply: "아직 더 놀고 싶어서 속상하구나.",
  },
  {
    child: "조금만 더 놀면 안 돼? 응?",
    hint: "선택지를 주어 스스로 정하게 해보세요.",
    goodReply: "그럼 책 한 권 읽고 잘까, 아니면 지금 바로 누울까?",
  },
  {
    child: "음… 책 읽고!",
    hint: "약속을 지킨 걸 인정하고 칭찬해 주세요.",
    goodReply: "좋아, 스스로 정했네. 정말 멋지다!",
  },
];

// === 놀이: 동화 읽어주기 ===
export type StoryPage = {
  emoji: string;
  text: string;
  newWord?: string;
  coaching: { type: string; question: string };
};

export const story = {
  title: "용감한 토끼 코코",
  meta: "5세 · 용기 주제",
  pages: [
    {
      emoji: "🐰",
      text: "코코는 작은 토끼예요. 오늘은 혼자 숲으로 모험을 떠나요.",
      newWord: "모험",
      coaching: { type: "완성형", question: "코코는 깡충깡충 ___로 갔어요. 뭐라고 했을까?" },
    },
    {
      emoji: "🌲",
      text: "깊은 숲에서 코코는 커다란 곰을 만났어요. 가슴이 콩닥콩닥 뛰었죠.",
      newWord: "콩닥콩닥",
      coaching: { type: "회상", question: "방금 코코가 숲에서 누굴 만났지?" },
    },
    {
      emoji: "🐻",
      text: "\"안녕? 나는 길을 잃었어.\" 곰이 슬프게 말했어요.",
      coaching: { type: "열린질문", question: "코코는 왜 무서웠을까? 어떻게 생각해?" },
    },
    {
      emoji: "🤝",
      text: "코코는 용기를 내어 곰에게 집으로 가는 길을 알려주었어요.",
      newWord: "용기",
      coaching: { type: "육하원칙", question: "여기서 누가 제일 용감했어?" },
    },
    {
      emoji: "🌈",
      text: "곰은 고맙다고 인사했어요. 코코는 오늘 정말 용감했답니다.",
      coaching: { type: "연결", question: "채이도 무서웠던 적 있어? 언제였어?" },
    },
  ] as StoryPage[],
  newWords: ["모험", "콩닥콩닥", "용기"],
};

// PEER 가이드
export const peerGuide = [
  { step: "P", label: "질문하기", desc: "그림을 보고 물어보세요." },
  { step: "E", label: "인정하기", desc: "아이 답을 받아주세요." },
  { step: "E", label: "확장하기", desc: "한 마디 더해 길게." },
  { step: "R", label: "반복하기", desc: "새 낱말을 다시 말해요." },
];

// === 놀이: 끝말잇기 ===
export const wordChainStart = ["사과", "과자", "자전거"];
// 이어서 나올 AI/추천 낱말
export const wordChainSuggest: Record<string, string[]> = {
  거: ["거북이", "거미", "거울"],
  이: ["이불", "이마", "이사"],
  불: ["불고기", "불꽃"],
};
export const phonicsTip = "끝소리에 집중해요 — '사과'의 끝소리는 '과'예요!";

export const vocabNote = ["자전거", "거북이", "모험", "용기"];

// === 성장 추이 ===
export const trendWeekly = [
  { period: "월", score: 70 },
  { period: "화", score: 72 },
  { period: "수", score: 69 },
  { period: "목", score: 75 },
  { period: "금", score: 78 },
  { period: "토", score: 80 },
  { period: "일", score: 82 },
];

export const trendMonthly = [
  { period: "1주", score: 68 },
  { period: "2주", score: 72 },
  { period: "3주", score: 76 },
  { period: "4주", score: 82 },
];

export const reportHistory = [
  { id: "r1", date: "6월 28일", score: 82, delta: 6, summary: "열린 질문이 크게 늘었어요" },
  { id: "r2", date: "6월 26일", score: 76, delta: -2, summary: "닫힌 질문이 조금 많았어요" },
  { id: "r3", date: "6월 24일", score: 78, delta: 4, summary: "확장·되돌려주기가 좋았어요" },
  { id: "r4", date: "6월 21일", score: 74, delta: 3, summary: "칭찬으로 따뜻하게 마무리했어요" },
];

export const itemChanges = [
  { label: "열린 질문", trend: "up", value: "+14%" },
  { label: "확장 표현", trend: "up", value: "+8%" },
  { label: "공감 표현", trend: "up", value: "+5%" },
  { label: "지시·명령", trend: "down", value: "-9%" },
];

// 놀이 활동 누적
export const playHistory = [
  { id: "p1", label: "읽은 동화", value: "8권", emoji: "📖" },
  { id: "p2", label: "끝말잇기", value: "12판", emoji: "🔤" },
  { id: "p3", label: "새 어휘", value: "47개", emoji: "✨" },
];

export const myStats = {
  totalAnalyze: 48,
  streak: 7,
  vocabCount: 47,
};
