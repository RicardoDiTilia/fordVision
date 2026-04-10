"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Map, Radar, Package, Trophy } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import DealerPanel from "@/components/command/DealerPanel";
import LeadsRadar from "@/components/command/LeadsRadar";
import StockControl from "@/components/command/StockControl";
import Performance from "@/components/command/Performance";
import { Dealership } from "@/data/dealerships";
import { getRole } from "@/lib/auth";

const VisionMap = dynamic(() => import("@/components/command/VisionMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-black">
      <div className="text-ford-blue-light text-xs uppercase tracking-[0.3em] animate-pulse">
        Carregando mapa Vision...
      </div>
    </div>
  ),
});

type Section = "map" | "leads" | "stock" | "performance";

const SECTIONS: { id: Section; label: string; icon: any }[] = [
  { id: "map", label: "Mapa Vision", icon: Map },
  { id: "leads", label: "Radar de Leads", icon: Radar },
  { id: "stock", label: "Estoque", icon: Package },
  { id: "performance", label: "Performance", icon: Trophy },
];

export default function CommandPage() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("map");
  const [selected, setSelected] = useState<Dealership | null>(null);
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
      <div className="border-b border-ford-blue/40 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between h-12">
          <div className="flex items-center gap-1">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const active = section === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`px-3 py-1.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] transition-colors border-b-2 ${
                    active
                      ? "border-ford-blue-light text-white"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>
          <div className="font-mono-tech flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400">SYS·ONLINE</span>
            <span className="text-white/30">·</span>
            <span>{new Date().toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {section === "map" && (
          <div className="relative h-[calc(100vh-104px)]">
            <VisionMap selected={selected} onSelect={setSelected} />
            <div className="absolute top-4 left-4 bg-black/90 border border-ford-blue/60 p-3 z-[1000] font-mono-tech text-[10px] uppercase tracking-wider space-y-1.5 bracket">
              <div className="text-ford-blue-light mb-2">// SERVICE SHARE</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                ALTO &gt; 70%
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                MÉDIO 40-70%
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-ford-red" />
                BAIXO &lt; 40%
              </div>
            </div>
            <AnimatePresence>
              {selected && (
                <DealerPanel
                  dealer={selected}
                  onClose={() => setSelected(null)}
                />
              )}
            </AnimatePresence>
          </div>
        )}
        {section === "leads" && (
          <div className="max-w-[1600px] mx-auto px-6 py-6">
            <LeadsRadar />
          </div>
        )}
        {section === "stock" && (
          <div className="max-w-[1600px] mx-auto px-6 py-6">
            <StockControl />
          </div>
        )}
        {section === "performance" && (
          <div className="max-w-[1600px] mx-auto px-6 py-6">
            <Performance />
          </div>
        )}
      </main>
    </div>
  );
}
