"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Gauge, MapPin, Droplets, Disc3, Shield, Cog } from "lucide-react";
import { client } from "@/data/client";

const CarViewer3D = dynamic(() => import("./CarViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-2 border-ford-blue-light/20 border-t-ford-blue-light rounded-full animate-spin" />
        <span className="font-mono-tech text-[9px] text-ford-blue-light/50 uppercase tracking-[0.3em]">
          Renderizando veículo...
        </span>
      </div>
    </div>
  ),
});

const STATUS_COLOR = {
  good: "text-green-400",
  warn: "text-yellow-400",
  bad: "text-ford-red",
};

const STATUS_BG = {
  good: "bg-green-400",
  warn: "bg-yellow-400",
  bad: "bg-ford-red",
};

const SYS_ICON: Record<string, any> = {
  "Óleo do Motor": Droplets,
  "Freios": Disc3,
  "Pneus": Shield,
  "Motor": Cog,
};

export default function MyFord() {
  const v = client.vehicle;
  const overall = Math.round(
    client.systems.reduce((s, x) => s + x.health, 0) / client.systems.length
  );

  return (
    <div className="relative bg-black" style={{ minHeight: 620 }}>
      {/* 3D car — top 60% */}
      <div className="relative" style={{ height: 340 }}>
        <CarViewer3D />

        {/* Top info card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-3 left-3 right-3 z-10 bg-black/60 backdrop-blur-sm border border-white/8 rounded-sm px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono-tech text-[8px] uppercase tracking-[0.3em] text-white/30">
                Olá, {client.name.split(" ")[0]}
              </div>
              <h1 className="font-display text-lg font-bold tracking-[0.08em] mt-0.5 uppercase leading-none">
                Meu <span className="text-ford-blue-light">Ford</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="font-display text-[10px] font-bold text-white/80 uppercase tracking-[0.1em]">
                {v.model}
              </div>
              <div className="font-mono-tech text-[8px] text-white/30 mt-0.5">
                {v.color}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-white/6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-2.5 h-2.5 text-white/25" />
                <span className="font-mono-tech text-[10px] text-white/50">{v.plate}</span>
              </div>
              <div className="w-px h-3 bg-white/8" />
              <div className="flex items-center gap-1.5">
                <Gauge className="w-2.5 h-2.5 text-white/25" />
                <span className="font-mono-tech text-[10px] text-white/50">{v.km.toLocaleString("pt-BR")} km</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 live-dot" />
              <span className="font-mono-tech text-[8px] text-green-400/60 uppercase">Conectado</span>
            </div>
          </div>
        </motion.div>

        {/* Gradient fade to info section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(transparent, #000000)" }}
        />
      </div>

      {/* Info section — bottom, on solid black */}
      <div className="relative z-10 px-5 pb-4 bg-black -mt-4">
        {/* Health header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between mb-4"
        >
          <span className="font-mono-tech text-[9px] text-white/30 uppercase tracking-[0.2em]">Saúde do veículo</span>
          <span className={`font-mono-tech text-xl font-bold ${overall >= 70 ? "text-green-400" : overall >= 50 ? "text-yellow-400" : "text-ford-red"}`}>
            {overall}%
          </span>
        </motion.div>

        {/* System health bars */}
        <div className="space-y-3">
          {client.systems.map((s, i) => {
            const Icon = SYS_ICON[s.name] || Shield;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <Icon className={`w-3.5 h-3.5 ${STATUS_COLOR[s.status]} shrink-0`} strokeWidth={2} />
                <span className="font-mono-tech text-[9px] text-white/45 w-14 shrink-0 uppercase tracking-wider">
                  {s.name.split(" ").pop()}
                </span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.health}%` }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${STATUS_BG[s.status]}`}
                    style={{ opacity: 0.75 }}
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono-tech text-[8px] text-white/30">{s.detail}</span>
                  <span className={`font-mono-tech text-[11px] font-bold w-9 text-right ${STATUS_COLOR[s.status]}`}>
                    {s.health}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sync footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between"
        >
          <span className="font-mono-tech text-[8px] text-white/20 uppercase tracking-[0.15em]">
            FordPass · Sincronizado há 2 min
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 live-dot" />
            <span className="font-mono-tech text-[8px] text-green-400/50 uppercase">Conectado</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
