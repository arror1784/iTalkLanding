import { motion } from "motion/react";
import { MessageCircle, Apple, Mail } from "lucide-react";
import { useApp } from "../../state/AppContext";
import { Mascot } from "../common/Mascot";

export function LoginScreen() {
  const { go } = useApp();

  return (
    <div className="w-full h-full flex flex-col bg-bg-light pt-24 pb-12 px-6">
      <div className="flex flex-col items-center mb-12">
        <Mascot size={96} expression="happy" float />
        <h1 className="mt-5 text-ink" style={{ fontSize: 26, fontWeight: 700 }}>
          반가워요!
        </h1>
        <p className="mt-2 text-gray text-center" style={{ fontSize: 15, lineHeight: 1.5 }}>
          간편하게 시작하고
          <br />
          오늘의 대화를 코칭받아 보세요.
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <motion.button
          onClick={() => go("profile")}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2"
          style={{ background: "#FEE500", color: "#191600", fontSize: 16, fontWeight: 600 }}
        >
          <MessageCircle size={20} fill="#191600" />
          카카오로 시작하기
        </motion.button>
        <motion.button
          onClick={() => go("profile")}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 bg-ink text-white"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          <Apple size={20} fill="#fff" />
          Apple로 시작하기
        </motion.button>
        <motion.button
          onClick={() => go("profile")}
          whileTap={{ scale: 0.97 }}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 bg-white text-ink border border-[#e2eef4]"
          style={{ fontSize: 16, fontWeight: 600 }}
        >
          <Mail size={20} className="text-sky-dark" />
          이메일로 로그인
        </motion.button>
        <p className="text-center text-gray mt-3" style={{ fontSize: 12 }}>
          가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
