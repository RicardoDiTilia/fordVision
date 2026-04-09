"use client";

export type Role = "cliente" | "gerente";

const KEY = "ford-pulse-auth";

export function login(user: string, pass: string): Role | null {
  if (user === "cliente" && pass === "cliente") {
    localStorage.setItem(KEY, "cliente");
    return "cliente";
  }
  if (user === "gerente" && pass === "gerente") {
    localStorage.setItem(KEY, "gerente");
    return "gerente";
  }
  return null;
}

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  return v === "cliente" || v === "gerente" ? v : null;
}

export function logout() {
  localStorage.removeItem(KEY);
}
