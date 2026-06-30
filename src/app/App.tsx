import { useState } from "react";
import { LandingPage } from "./components/landing/LandingPage";
import { AppDemo } from "./components/AppDemo";

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <AppDemo onBack={() => setShowDemo(false)} />;
  }

  return <LandingPage onTryDemo={() => setShowDemo(true)} />;
}
