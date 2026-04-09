"use client";

import { motion } from "framer-motion";
import { MessageCircle, ChevronRight, Sparkles } from "lucide-react";

interface Props {
  onFinish: () => void;
}

export default function Onboarding({ onFinish }: Props) {
  return (
    <div className="px-5 py-6 space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0d2818] border border-green-700/50 rounded-xl p-3"
      >
        <div className="flex items-start gap-2">
          <MessageCircle className="w-4 h-4 text-green-400 mt-0.5" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-green-400">
              WhatsApp · Ford Pulse
            </div>
            <p className="text-xs text-white/90 mt-1 leading-relaxed">
              Olá Rafael! Sua Ford Ranger já está pronta. Toque aqui pra ativar
              seu Ford Pulse e fazer o tour digital do seu carro.
            </p>
            <div className="text-[9px] text-white/40 mt-1">há 48h</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-ford-blue-light" />
          <h2 className="text-lg font-bold tracking-wide">Unboxing Digital</h2>
        </div>
        <p className="text-xs text-white/60 leading-relaxed mb-4">
          Vamos te apresentar todos os recursos do seu novo Ford Ranger 2024
          Limited e conectar seu veículo ao Pulse.
        </p>

        <div className="space-y-2">
          {[
            { n: 1, t: "Conectar SYNC", d: "Pareamos com seu carro" },
            { n: 2, t: "Configurar perfil", d: "Suas preferências de uso" },
            { n: 3, t: "Tour interativo", d: "Conheça cada recurso" },
            { n: 4, t: "Ativar alertas", d: "Receba o que importa" },
          ].map((s) => (
            <div
              key={s.n}
              className="ford-card p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-ford-blue/30 border border-ford-blue-light flex items-center justify-center text-ford-blue-light font-bold text-sm">
                {s.n}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.t}</div>
                <div className="text-[10px] text-white/50">{s.d}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </div>
          ))}
        </div>

        <button
          onClick={onFinish}
          className="w-full mt-6 py-3 bg-ford-blue hover:bg-ford-blue-light text-white font-bold tracking-[0.2em] uppercase text-xs border border-ford-blue-light"
        >
          Começar
        </button>
      </motion.div>
    </div>
  );
}
