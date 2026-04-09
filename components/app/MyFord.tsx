"use client";

import { motion } from "framer-motion";
import { Car, Gauge, MapPin } from "lucide-react";
import { client } from "@/data/client";
import HealthRing from "./HealthRing";

const STATUS_COLOR = {
  good: "text-green-400",
  warn: "text-yellow-400",
  bad: "text-ford-red",
};

const STATUS_DOT = {
  good: "bg-green-400",
  warn: "bg-yellow-400",
  bad: "bg-ford-red",
};

export default function MyFord() {
  const v = client.vehicle;
  return (
    <div className="px-5 py-5 space-y-5">
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
          Olá, {client.name.split(" ")[0]}
        </div>
        <h1 className="font-display text-3xl font-bold tracking-[0.05em] mt-1 uppercase">
          Meu <span className="text-ford-blue-light">Ford</span>
        </h1>
      </div>

      {/* Vehicle card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="ford-card bracket p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-ford-blue/30 border border-ford-blue flex items-center justify-center">
            <Car className="w-6 h-6 text-ford-blue-light" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">{v.model}</div>
            <div className="text-[10px] text-white/50">{v.color}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-ford-gray-mid">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/40 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> Placa
            </div>
            <div className="font-mono-tech text-sm mt-0.5">{v.plate}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/40 flex items-center gap-1">
              <Gauge className="w-2.5 h-2.5" /> Hodômetro
            </div>
            <div className="font-mono-tech text-sm mt-0.5">
              {v.km.toLocaleString("pt-BR")} km
            </div>
          </div>
        </div>
      </motion.div>

      {/* Health ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="ford-card p-5 flex flex-col items-center"
      >
        <HealthRing systems={client.systems} size={220} />
        <div className="w-full mt-4 space-y-2">
          {client.systems.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${STATUS_DOT[s.status]}`}
                />
                <span className="text-white/80">{s.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/50">{s.detail}</span>
                <span className={`font-mono font-bold ${STATUS_COLOR[s.status]}`}>
                  {s.health}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="text-center text-[9px] text-white/30">
        Dados sincronizados via FordPass · há 2 min
      </div>
    </div>
  );
}
