export type ServiceShareLevel = "high" | "mid" | "low";

export interface Dealership {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  vinShare: number;
  level: ServiceShareLevel;
  activeClients: number;
  pendingLeads: number;
  returnRate: number;
  history: { month: string; share: number }[];
  criticalStock: { part: string; qty: number; status: "ok" | "low" | "out" }[];
}

const lvl = (v: number): ServiceShareLevel =>
  v >= 70 ? "high" : v >= 40 ? "mid" : "low";

const histFor = (base: number) =>
  Array.from({ length: 6 }).map((_, i) => ({
    month: ["Out", "Nov", "Dez", "Jan", "Fev", "Mar"][i],
    share: Math.max(15, Math.min(95, base + (i - 3) * 2 + (i % 2 === 0 ? -3 : 4))),
  }));

export const dealerships: Dealership[] = [
  {
    id: "ford-pacaembu",
    name: "Ford Pacaembu",
    city: "São Paulo",
    state: "SP",
    lat: -23.5505,
    lng: -46.6333,
    vinShare: 72,
    level: lvl(72),
    activeClients: 4820,
    pendingLeads: 137,
    returnRate: 81,
    history: histFor(72),
    criticalStock: [
      { part: "Pastilha de freio Ranger", qty: 24, status: "ok" },
      { part: "Filtro de óleo Territory", qty: 6, status: "low" },
      { part: "Correia dentada Maverick", qty: 12, status: "ok" },
    ],
  },
  {
    id: "ford-pioneira",
    name: "Ford Pioneira",
    city: "Campinas",
    state: "SP",
    lat: -22.9099,
    lng: -47.0626,
    vinShare: 58,
    level: lvl(58),
    activeClients: 2410,
    pendingLeads: 89,
    returnRate: 64,
    history: histFor(58),
    criticalStock: [
      { part: "Pneu 265/65 R17", qty: 14, status: "ok" },
      { part: "Bateria 60Ah", qty: 3, status: "low" },
    ],
  },
  {
    id: "ford-brasilia",
    name: "Ford Brasília",
    city: "Brasília",
    state: "DF",
    lat: -15.7942,
    lng: -47.8822,
    vinShare: 45,
    level: lvl(45),
    activeClients: 1890,
    pendingLeads: 112,
    returnRate: 52,
    history: histFor(45),
    criticalStock: [
      { part: "Filtro de ar", qty: 18, status: "ok" },
      { part: "Pastilha de freio", qty: 0, status: "out" },
    ],
  },
  {
    id: "ford-tropical",
    name: "Ford Tropical",
    city: "Manaus",
    state: "AM",
    lat: -3.119,
    lng: -60.0217,
    vinShare: 31,
    level: lvl(31),
    activeClients: 940,
    pendingLeads: 156,
    returnRate: 38,
    history: histFor(31),
    criticalStock: [
      { part: "Correia dentada", qty: 0, status: "out" },
      { part: "Filtro de combustível", qty: 4, status: "low" },
    ],
  },
  {
    id: "ford-niteroi",
    name: "Ford Niterói",
    city: "Niterói",
    state: "RJ",
    lat: -22.8833,
    lng: -43.1036,
    vinShare: 67,
    level: lvl(67),
    activeClients: 3120,
    pendingLeads: 74,
    returnRate: 76,
    history: histFor(67),
    criticalStock: [
      { part: "Óleo motor 5W30", qty: 42, status: "ok" },
      { part: "Velas de ignição", qty: 28, status: "ok" },
    ],
  },
  {
    id: "ford-sulamericana",
    name: "Ford Sulamericana",
    city: "Porto Alegre",
    state: "RS",
    lat: -30.0346,
    lng: -51.2177,
    vinShare: 55,
    level: lvl(55),
    activeClients: 2680,
    pendingLeads: 96,
    returnRate: 61,
    history: histFor(55),
    criticalStock: [
      { part: "Amortecedor dianteiro", qty: 9, status: "low" },
      { part: "Disco de freio", qty: 16, status: "ok" },
    ],
  },
  {
    id: "ford-sertao",
    name: "Ford Sertão",
    city: "Recife",
    state: "PE",
    lat: -8.0476,
    lng: -34.877,
    vinShare: 38,
    level: lvl(38),
    activeClients: 1320,
    pendingLeads: 143,
    returnRate: 41,
    history: histFor(38),
    criticalStock: [
      { part: "Pneu 235/55 R18", qty: 2, status: "low" },
      { part: "Filtro de cabine", qty: 11, status: "ok" },
    ],
  },
  {
    id: "ford-minas",
    name: "Ford Minas",
    city: "Belo Horizonte",
    state: "MG",
    lat: -19.9167,
    lng: -43.9345,
    vinShare: 63,
    level: lvl(63),
    activeClients: 2950,
    pendingLeads: 88,
    returnRate: 70,
    history: histFor(63),
    criticalStock: [
      { part: "Bateria 70Ah", qty: 18, status: "ok" },
      { part: "Pastilha Bronco Sport", qty: 7, status: "low" },
    ],
  },
  {
    id: "ford-pantanal",
    name: "Ford Pantanal",
    city: "Cuiabá",
    state: "MT",
    lat: -15.601,
    lng: -56.0974,
    vinShare: 49,
    level: lvl(49),
    activeClients: 1480,
    pendingLeads: 102,
    returnRate: 55,
    history: histFor(49),
    criticalStock: [
      { part: "Filtro de ar Ranger", qty: 22, status: "ok" },
      { part: "Óleo câmbio automático", qty: 0, status: "out" },
    ],
  },
  {
    id: "ford-marajo",
    name: "Ford Marajó",
    city: "Belém",
    state: "PA",
    lat: -1.4558,
    lng: -48.4902,
    vinShare: 28,
    level: lvl(28),
    activeClients: 820,
    pendingLeads: 168,
    returnRate: 33,
    history: histFor(28),
    criticalStock: [
      { part: "Pneu 255/70 R16", qty: 1, status: "low" },
      { part: "Correia poly-V", qty: 0, status: "out" },
    ],
  },
];
