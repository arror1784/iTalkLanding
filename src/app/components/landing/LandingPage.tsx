import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Mic,
  Sparkles,
  BarChart3,
  MessageSquareHeart,
  Gamepad2,
  Gift,
  Ticket,
  Crown,
  ChevronDown,
  Heart,
} from "lucide-react";
import { Mascot } from "../common/Mascot";
import { AppPreview } from "./HeroAppPreview";
import { Reveal, CTAButton, Reassure, CountUp, GOOGLE_FORM } from "./parts";

// 외부 데모(라이브 배포) 링크
const DEMO_URL = "https://i-talk-sable.vercel.app/";

export function LandingPage() {
  return (
    <div
      className="min-h-screen bg-bg-light text-ink"
      style={{ fontFamily: "'Pretendard', system-ui, sans-serif" }}
    >
      <Header />
      <main className="pb-28 md:pb-0">
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Evidence />
        <SocialProof />
        <Benefits />
        <Faq />
        <Closing />
        <Footer />
      </main>
      <MobileStickyCTA />
    </div>
  );
}

/* ── 상단 고정 헤더 ── */
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#eaf3f8]">
      <div className="mx-auto max-w-5xl px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            style={{ fontSize: 20, fontWeight: 800 }}
            className="text-sky-dark"
          >
            아이톡
          </span>
          <span style={{ fontSize: 18 }}>🐣</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener"
            className="rounded-xl px-4 h-9 flex items-center border border-[#2BC4F0] text-sky-dark hover:bg-sky-light transition-colors"
            style={{ fontSize: 14, fontWeight: 600 }}
          >
            데모 체험 ▶
          </a>
          <a
            href={GOOGLE_FORM}
            target="_blank"
            rel="noopener"
            className="rounded-xl text-white px-4 h-9 flex items-center"
            style={{
              background: "linear-gradient(135deg,#2BC4F0,#5FD6F7)",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            사전예약
          </a>
        </div>
      </div>
    </header>
  );
}

/* ── ① 히어로 ── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-light to-bg-light" />
      <div className="relative mx-auto max-w-5xl px-5 pt-12 pb-16 md:pt-20 md:pb-24 md:grid md:grid-cols-2 md:gap-10 md:items-center">
        <div>
          <Reveal>
            <p
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 mb-5"
              style={{
                fontSize: 13,
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(20,40,60,0.06)",
              }}
            >
              <Sparkles size={14} className="text-sky" /> 부모-자녀 대화 코칭 앱
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="whitespace-pre-line"
              style={{
                fontSize: "clamp(28px,7vw,52px)",
                fontWeight: 800,
                lineHeight: 1.25,
                wordBreak: "keep-all",
              }}
            >
              {/* {"오늘도 아이에게\u00A0욱하고,\n밤에 혼자 미안했나요?"} */}
              {"아이의 언어발달지연을 예방하는 솔루션"}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              className="text-gray mt-5"
              style={{ fontSize: "clamp(16px,2.4vw,18px)", lineHeight: 1.5 }}
            >
              {"아이톡이 대화를 분석해, 더 다정하게 말하는 법을 함께 연습해요."}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-col items-start gap-3">
              <CTAButton />
              <Reassure text="무료 · 30초면 끝나요" />
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <p
              className="text-gray mt-6 flex items-center gap-1.5"
              style={{ fontSize: 13 }}
            >
              <Heart size={14} className="text-coral" fill="var(--coral)" />
              출시를 기다리는 부모 100+
            </p>
          </Reveal>
        </div>

        {/* 앱 목업 + 마스코트 — 실제로 만져볼 수 있는 라이브 데모 */}
        <div className="mt-12 md:mt-0 flex flex-col items-center">
          <div className="relative">
            <AppPreview screen="home" tab="home" interactive width={264} />
            <div className="absolute -bottom-4 -left-6 md:-left-10 pointer-events-none">
              <Mascot size={84} expression="happy" />
            </div>
            <span
              className="absolute -top-3 right-2 bg-cream text-ink rounded-full px-3 py-1 pointer-events-none"
              style={{
                fontSize: 12,
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(20,40,60,0.12)",
              }}
            >
              직접 만져보세요 👆
            </span>
          </div>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener"
            className="mt-6 rounded-xl px-5 h-11 flex items-center gap-1.5 bg-white text-sky-dark border border-[#cfe9f4] hover:bg-sky-light transition-colors"
            style={{
              fontSize: 14,
              fontWeight: 700,
              position: "relative",
              boxShadow: "0 8px 24px rgba(20,40,60,0.08)",
            }}
          >
            <span>▶</span> 실제 데모 사이트에서 체험하기
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── ② 문제 공감 ── */
const problems = [
  "욱하고 나서 자책한 적",
  "어떻게 말해야 할지 막막한 적",
  "책 읽어주다 무슨 질문을 할지 모르겠는 적",
  "내 말투가 아이에게 어떨지 불안한 적",
];

function Problem() {
  return (
    <Section>
      <Reveal>
        <H2>혹시, 이런 적 있으신가요?</H2>
      </Reveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto">
        {problems.map((p, i) => (
          <Reveal key={p} delay={i * 0.08}>
            <div
              className="flex items-center gap-3 bg-white rounded-[20px] p-4"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
            >
              <span className="w-8 h-8 rounded-full bg-sky-light flex items-center justify-center shrink-0">
                <Check size={18} className="text-sky-dark" strokeWidth={3} />
              </span>
              <span style={{ fontSize: 16, lineHeight: 1.4 }}>{p}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div
          className="mt-8 max-w-3xl mx-auto bg-cream rounded-[24px] p-6 text-center"
          style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}
        >
          <p
            style={{
              fontSize: "clamp(17px,2.4vw,20px)",
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            당신이 부족해서가 아니에요.
            <br className="hidden sm:block" />
            부모 대화법은 누구도 알려주지 않았을 뿐이에요.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── ③ 해결책 3스텝 + Before→After ── */
const steps = [
  { n: 1, t: "대화를 들려주세요", icon: Mic },
  { n: 2, t: "AI가 분석해요", icon: BarChart3 },
  { n: 3, t: "더 좋은 한마디를 알려드려요", icon: MessageSquareHeart },
];

const beforeAfter = [
  { before: "빨리 해!", after: "5분 뒤에 할까, 지금 할까?" },
  { before: "조용히 해!", after: "무슨 일이 있었는지 말해줄래?" },
];

function Solution() {
  const [showAfter, setShowAfter] = useState(false);
  return (
    <Section tint>
      <Reveal>
        <H2>아이톡은 이렇게 도와요</H2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div
              className="bg-white rounded-[20px] p-5 text-center h-full"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
            >
              <span className="inline-flex w-12 h-12 rounded-full bg-sky-light items-center justify-center mb-3">
                <s.icon size={24} className="text-sky-dark" />
              </span>
              <p
                className="text-sky-dark mb-1"
                style={{ fontSize: 13, fontWeight: 800 }}
              >
                STEP {s.n}
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
                {s.t}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Before → After */}
      <Reveal delay={0.1}>
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex bg-white rounded-full p-1"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
            >
              {(["before", "after"] as const).map((k) => {
                const active = (k === "after") === showAfter;
                return (
                  <button
                    key={k}
                    onClick={() => setShowAfter(k === "after")}
                    className="relative px-6 h-9 rounded-full"
                    style={{ fontSize: 14, fontWeight: 700 }}
                  >
                    {active && (
                      <motion.span
                        layoutId="baToggle"
                        className="absolute inset-0 bg-sky rounded-full"
                      />
                    )}
                    <span
                      className={`relative ${active ? "text-white" : "text-gray"}`}
                    >
                      {k === "before" ? "Before" : "After"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {beforeAfter.map((b, i) => (
              <div
                key={i}
                className="rounded-[22px] overflow-hidden"
                style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showAfter ? "a" : "b"}
                    initial={{ opacity: 0, x: showAfter ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`p-5 ${showAfter ? "bg-gradient-to-br from-[#2BC4F0] to-[#5FD6F7] text-white" : "bg-white"}`}
                  >
                    <p
                      style={{ fontSize: 12, fontWeight: 700 }}
                      className={showAfter ? "text-white/85" : "text-gray"}
                    >
                      {showAfter ? "이렇게 바꿔보세요" : "이렇게 말했어요"}
                    </p>
                    <p
                      className="mt-1"
                      style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.4 }}
                    >
                      "{showAfter ? b.after : b.before}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── ④ 핵심 기능 3 ── */
const features = [
  {
    icon: BarChart3,
    t: "대화 분석 리포트",
    d: "내 말투가 아이에게 어떤지, 처음으로 객관적으로.",
    screen: "report" as const,
    tab: undefined,
  },
  {
    icon: MessageSquareHeart,
    t: "맞춤 코칭",
    d: "막연한 다짐 대신, 오늘 당장 쓸 한마디를.",
    screen: "coaching" as const,
    tab: "coaching" as const,
  },
  {
    icon: Gamepad2,
    t: "함께 놀기",
    d: "동화 읽어주기·끝말잇기로 즐겁게 언어를 키워요.",
    screen: "play" as const,
    tab: "play" as const,
  },
];

function Features() {
  return (
    <Section>
      <Reveal>
        <H2>아이톡이 주는 세 가지</H2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.1}>
            <div
              className="bg-white rounded-[22px] p-6 h-full flex flex-col"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
            >
              <span
                className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg,#E6F7FD,#fff)" }}
              >
                <f.icon size={26} className="text-sky-dark" />
              </span>
              <p style={{ fontSize: 18, fontWeight: 700 }}>{f.t}</p>
              <p
                className="text-gray mt-2"
                style={{ fontSize: 15, lineHeight: 1.5 }}
              >
                {f.d}
              </p>
              <div className="mt-5 flex justify-center">
                <AppPreview screen={f.screen} tab={f.tab} width={176} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── ⑤ 신뢰·근거 ── */
function Evidence() {
  return (
    <Section tint>
      <Reveal>
        <H2>느낌이 아니라, 근거로 코칭해요</H2>
      </Reveal>
      <Reveal delay={0.08}>
        <p
          className="text-gray text-center mt-4 max-w-2xl mx-auto"
          style={{ fontSize: 17, lineHeight: 1.6 }}
        >
          전문가들이 권하는 '열린 질문', '대화식 책읽기'를 부모가 쓰기 쉽게
          바꿨어요.
        </p>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["열린 질문", "PEER", "CROWD"].map((c) => (
            <span
              key={c}
              className="rounded-full bg-white px-4 py-2 text-sky-dark"
              style={{
                fontSize: 14,
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(20,40,60,0.06)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="mt-8 max-w-3xl mx-auto bg-white rounded-[22px] p-6 text-center border border-dashed border-[#cfe9f4]">
          <p className="text-gray" style={{ fontSize: 14 }}>
            전문가 자문 · 추천사 자리
          </p>
          <div className="flex justify-center gap-3 mt-3 opacity-60">
            {["👩‍⚕️", "📚", "🎓"].map((e, i) => (
              <span
                key={i}
                className="w-12 h-12 rounded-full bg-sky-light flex items-center justify-center"
                style={{ fontSize: 22 }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── ⑥ 사회적 증거 ── */
const reviews = [
  {
    name: "지영 · 5세 엄마",
    text: "출시되면 제일 먼저 써보고 싶어요. 매번 욱하고 후회했거든요.",
  },
  {
    name: "현우 · 6세 아빠",
    text: "아이에게 어떻게 질문해야 할지 늘 막막했는데 기대돼요.",
  },
  { name: "수진 · 4세 엄마", text: "동화 읽어주기 코칭이 특히 궁금해요!" },
];

function SocialProof() {
  return (
    <Section>
      <Reveal>
        <p
          className="text-center"
          style={{ fontSize: "clamp(26px,5vw,40px)", fontWeight: 800 }}
        >
          <span className="text-sky-dark">
            <CountUp to={100} suffix="+" />
          </span>{" "}
          부모가
          <br className="sm:hidden" /> 기다리고 있어요
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div
              className="bg-cream rounded-[22px] p-5 h-full"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.06)" }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.55 }}>"{r.text}"</p>
              <p
                className="text-ink/70 mt-3"
                style={{ fontSize: 13, fontWeight: 600 }}
              >
                {r.name}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── ⑦ 사전예약 혜택 ── */
const benefits = [
  { icon: Ticket, t: "베타 우선 참여", d: "정식 출시 전 먼저 써보기" },
  { icon: Gift, t: "사전예약 선물", d: "아이와 함께 보는 동화 e-book" },
  {
    icon: Crown,
    t: "출시 후 프리미엄 무료",
    d: "출시 시 프리미엄 1~3개월 무료",
  },
];

function Benefits() {
  return (
    <Section tint>
      <Reveal>
        <H2>지금 사전예약하면, 이 혜택을 드려요</H2>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
        {benefits.map((b, i) => (
          <Reveal key={b.t} delay={i * 0.1}>
            <div
              className="bg-cream rounded-[22px] p-6 h-full"
              style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.08)" }}
            >
              <span className="inline-flex w-12 h-12 rounded-2xl bg-white items-center justify-center mb-3">
                <b.icon size={24} className="text-[#d99e00]" />
              </span>
              <p style={{ fontSize: 17, fontWeight: 700 }}>{b.t}</p>
              <p
                className="text-ink/75 mt-1.5"
                style={{ fontSize: 14, lineHeight: 1.5 }}
              >
                {b.d}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-col items-center gap-2">
          <CTAButton label="무료로 사전예약하고 혜택 받기" />
          <Reassure text="질문 2개면 끝나요" />
        </div>
      </Reveal>
    </Section>
  );
}

/* ── ⑧ FAQ ── */
const faqs = [
  {
    q: "언제 출시되나요?",
    a: "올해 안 정식 출시를 목표로 준비 중이에요. 사전예약하시면 베타 오픈 소식을 가장 먼저 알려드려요.",
  },
  {
    q: "정말 무료인가요?",
    a: "사전예약은 100% 무료이고, 출시 후에도 핵심 기능은 무료로 쓰실 수 있어요.",
  },
  {
    q: "녹음한 대화는 안전한가요?",
    a: "대화 데이터는 분석 목적으로만 안전하게 처리하며, 동의 없이 외부에 제공하지 않아요.",
  },
  {
    q: "몇 살 아이에게 맞나요?",
    a: "영유아부터 초등 저학년까지 폭넓게 맞춰져 있어요. 연령대에 따라 코칭과 놀이가 달라져요.",
  },
  {
    q: "사전예약하면 뭐가 좋아요?",
    a: "베타 우선 참여, 동화 e-book 선물, 출시 후 프리미엄 무료 혜택을 드려요.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section>
      <Reveal>
        <H2>자주 묻는 질문</H2>
      </Reveal>
      <div className="mt-8 max-w-2xl mx-auto flex flex-col gap-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className="bg-white rounded-[18px] overflow-hidden"
                style={{ boxShadow: "0 8px 24px rgba(20,40,60,0.05)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={20} className="text-sky-dark shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p
                        className="text-gray px-4 pb-4"
                        style={{ fontSize: 15, lineHeight: 1.55 }}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ── ⑨ 마지막 CTA + 푸터 ── */
function Closing() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-[#2BC4F0] to-[#15A6D8] text-white">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24 text-center">
          <Reveal>
            <Mascot size={72} expression="cheer" />
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mt-5"
              style={{
                fontSize: "clamp(22px,4vw,34px)",
                fontWeight: 800,
                lineHeight: 1.4,
              }}
            >
              완벽한 부모는 없어요.
              <br />
              오늘보다 한 마디 더 다정하면 충분해요.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center gap-2">
              <CTAButton variant="cream" />
              <p className="text-white/80" style={{ fontSize: 13 }}>
                무료 · 30초면 끝나요 · 질문 2개
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-[#eaf3f8]">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="flex items-center gap-1.5">
          <span
            style={{ fontSize: 18, fontWeight: 800 }}
            className="text-sky-dark"
          >
            아이톡
          </span>
          <span style={{ fontSize: 16 }}>🐣</span>
        </div>
        <p className="text-gray mt-2" style={{ fontSize: 14 }}>
          부모와 아이가 더 다정하게 대화하도록 돕는 코칭 앱.
        </p>
        <div
          className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-gray"
          style={{ fontSize: 13 }}
        >
          <a href="mailto:strata03@naver.com" className="hover:text-sky-dark">
            문의: strata03@naver.com
          </a>
          <a href="#" className="hover:text-sky-dark">
            개인정보처리방침
          </a>
        </div>
        <p className="text-gray mt-6" style={{ fontSize: 12 }}>
          © 2026 아이톡(iTalk). All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ── 모바일 하단 고정 CTA ── */
function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-[#eaf3f8] px-4 pt-3 pb-5">
      <CTAButton full pulse />
      <Reassure className="text-center mt-1.5" />
    </div>
  );
}

/* ── 공통 레이아웃 ── */
function Section({
  children,
  tint,
}: {
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <section className={tint ? "bg-sky-light" : ""}>
      <div className="mx-auto max-w-5xl px-5 py-14 md:py-20">{children}</div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center"
      style={{
        fontSize: "clamp(22px,4vw,34px)",
        fontWeight: 800,
        lineHeight: 1.35,
        wordBreak: "keep-all",
      }}
    >
      {children}
    </h2>
  );
}
