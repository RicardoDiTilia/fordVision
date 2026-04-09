"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Bell, Award, Clock, Sparkles, Home } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import PhoneShell from "@/components/app/PhoneShell";
import Onboarding from "@/components/app/Onboarding";
import MyFord from "@/components/app/MyFord";
import Alerts from "@/components/app/Alerts";
import Points from "@/components/app/Points";
import Timeline from "@/components/app/Timeline";
import KeyMoments from "@/components/app/KeyMoments";
import { getRole } from "@/lib/auth";

type Tab = "onboarding" | "myford" | "alerts" | "points" | "timeline" | "moments";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "myford", label: "Meu Ford", icon: Car },
  { id: "alerts", label: "Alertas", icon: Bell },
  { id: "points", label: "Pontos", icon: Award },
  { id: "timeline", label: "Histórico", icon: Clock },
  { id: "moments", label: "Momentos", icon: Sparkles },
];

export default function ClientAppPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("onboarding");
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const role = getRole();
    if (!role) router.push("/");
    else setAuthChecked(true);
  }, [router]);

  if (!authChecked) return null;

  return (
    <div className="grain min-h-screen bg-black flex flex-col relative">
      <div className="fixed inset-0 hud-grid opacity-50 pointer-events-none" />
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 px-4 relative">
        <div className="flex flex-col items-center gap-4">
          <PhoneShell>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {tab === "onboarding" && (
                  <Onboarding onFinish={() => setTab("myford")} />
                )}
                {tab === "myford" && <MyFord />}
                {tab === "alerts" && <Alerts />}
                {tab === "points" && <Points />}
                {tab === "timeline" && <Timeline />}
                {tab === "moments" && <KeyMoments />}
              </motion.div>
            </AnimatePresence>

            {tab !== "onboarding" && (
              <div className="border-t border-ford-gray-mid bg-black/95 backdrop-blur sticky bottom-0">
                <div className="grid grid-cols-5 px-2 py-2">
                  {TABS.map((t) => {
                    const Icon = t.icon;
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex flex-col items-center gap-0.5 py-1 transition-colors ${
                          active ? "text-ford-blue-light" : "text-white/40"
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
                        <span className="text-[8px] font-semibold tracking-wider uppercase">
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </PhoneShell>

          {tab === "onboarding" && (
            <button
              onClick={() => setTab("myford")}
              className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-ford-blue-light"
            >
              Pular onboarding →
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
