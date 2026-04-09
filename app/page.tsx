"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FordLogo from "@/components/shared/FordLogo";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState<
    { left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 8}s`,
    }));
    setParticles(arr);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const role = login(user.trim(), pass.trim());
    if (!role) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    if (role === "cliente") router.push("/app");
    else router.push("/command");
  }

  return (
    <main className="grain relative min-h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center px-4">
      {/* HUD grid backdrop */}
      <div className="absolute inset-0 hud-grid opacity-70" />
      <div className="absolute inset-0 hud-grid-fine opacity-40" />

      {/* Crosshair lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ford-blue-light/20 to-transparent" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ford-blue-light/20 to-transparent" />

      {/* Corner brackets — full screen */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-ford-blue-light/70" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-ford-blue-light/70" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-ford-blue-light/70" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-ford-blue-light/70" />

      {/* HUD top label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 label-tech text-center">
        SECURE TERMINAL · v2.6 · NODE 0xPULSE
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 label-tech text-center">
        FORD MOTOR COMPANY · AUTHORIZED ACCESS ONLY
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              bottom: "-10px",
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Radar scan rings behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none">
        {[0, 1.3, 2.6].map((d, i) => (
          <div
            key={i}
            className="radar-ring scan"
            style={{
              width: 360,
              height: 360,
              top: -180,
              left: -180,
              animationDelay: `${d}s`,
            }}
          />
        ))}
        <div
          className="radar-ring"
          style={{ width: 360, height: 360, top: -180, left: -180 }}
        />
        <div
          className="radar-ring"
          style={{ width: 460, height: 460, top: -230, left: -230 }}
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Logo + PULSE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <FordLogo width={250} />

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ delay: 1.2, duration: 1 }}
          className="pulse-text mt-4 text-[80px] md:text-[100px] leading-none"
        >
          PULSE
        </motion.h1>

        {/* ECG line */}
        <svg
          viewBox="0 0 600 80"
          className="w-[420px] md:w-[520px] h-16 mt-2"
        >
          <path
            className="ecg-path"
            d="M 0 40 L 80 40 L 100 40 L 115 20 L 130 60 L 145 10 L 160 70 L 175 40 L 260 40 L 280 40 L 295 25 L 310 55 L 325 15 L 340 65 L 355 40 L 440 40 L 460 40 L 475 25 L 490 55 L 505 15 L 520 65 L 535 40 L 600 40"
          />
        </svg>

        <p className="font-display mt-4 text-[10px] tracking-[0.5em] text-ford-red/90 uppercase">
          Retenção Inteligente · Do Veículo ao Serviço
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        onSubmit={handleSubmit}
        className={`relative z-10 mt-12 w-full max-w-sm space-y-4 ${
          error ? "shake" : ""
        }`}
      >
        <div>
          <label className="font-display block text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
            <span className="text-ford-blue-light">[01]</span> Usuário
          </label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="font-mono-tech w-full bg-transparent border-b border-white/30 focus:border-ford-blue-light focus:outline-none py-2 text-white placeholder-white/25 transition-colors"
            placeholder="cliente / gerente"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="font-display block text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
            <span className="text-ford-blue-light">[02]</span> Senha
          </label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="font-mono-tech w-full bg-transparent border-b border-white/30 focus:border-ford-blue-light focus:outline-none py-2 text-white placeholder-white/25 transition-colors"
            placeholder="••••••"
            autoComplete="off"
          />
        </div>
        {error && (
          <p className="font-display text-ford-red text-xs tracking-[0.2em] uppercase">
            ⚠ Credenciais inválidas — acesso negado
          </p>
        )}
        <button
          type="submit"
          className="font-display w-full mt-6 py-3 bg-ford-red hover:bg-ford-red-dark text-white font-bold tracking-[0.4em] uppercase text-sm transition-colors duration-200 border border-ford-red hover:border-ford-red-dark relative group"
          style={{
            boxShadow: "0 0 30px rgba(196,30,58,0.4)",
            clipPath:
              "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          }}
        >
          ▸ Iniciar Sessão
        </button>
        <div className="font-mono-tech text-[10px] text-white/40 text-center pt-4 space-y-1">
          <div>cliente / cliente → /app</div>
          <div>gerente / gerente → /command</div>
        </div>
      </motion.form>
    </main>
  );
}
