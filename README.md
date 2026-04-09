# Ford Pulse

Protótipo de estudo de uma plataforma de retenção inteligente para concessionárias Ford. Conecta dados do veículo (telemetria) a um motor de IA preditivo que entrega leads prontos para a equipe de contato no momento certo.

> Projeto acadêmico / portfólio. Não é um produto oficial da Ford Motor Company. Marcas e logotipos pertencem aos seus respectivos donos e são usados aqui apenas para fins de demonstração visual.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **TailwindCSS** com paleta institucional Ford (azul `#003478`, azul claro `#0068D6`, vermelho `#C41E3A`)
- **Framer Motion** para transições e micro-animações
- **Recharts** para gráficos
- **Leaflet / React-Leaflet** para o mapa do Command Center (limitado ao Brasil)
- **Lucide React** para ícones

## Telas

| Rota        | Descrição |
|-------------|-----------|
| `/`         | Login HUD com animação PULSE / ECG. Credenciais de demo abaixo. |
| `/app`      | App do cliente final (mockado em `PhoneShell`): Meu Ford, Alertas, Pontos, Histórico, Momentos-chave. |
| `/command`  | Command Center para a equipe Ford: Mapa Pulse (Brasil), Radar de Leads, Estoque integrado, Performance / Ranking. |
| `/motor`    | Diagrama da arquitetura do Motor de IA Ford Pulse. |

## Credenciais de demo

| Usuário   | Senha     | Destino     |
|-----------|-----------|-------------|
| `cliente` | `cliente` | `/app`      |
| `gerente` | `gerente` | `/command`  |

## Como rodar

Pré-requisito: Node.js 18+.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

### Outros scripts

```bash
npm run build   # build de produção
npm run start   # roda o build
npm run lint    # lint
```

## Estrutura

```
app/
  page.tsx           # login
  app/page.tsx       # app cliente
  command/page.tsx   # command center
  motor/page.tsx     # diagrama do motor de IA
  globals.css        # tema HUD + helpers tailwind
components/
  app/               # telas do app cliente (MyFord, Alerts, Points, ...)
  command/           # telas do command center (PulseMap, DealerPanel, ...)
  shared/            # Navbar, FordLogo
data/                # mocks (cliente, concessionárias, leads)
lib/auth.ts          # auth fake (localStorage)
```

## Conceito de design

Visual HUD inspirado em painéis automotivos / centros de comando:

- **60% azul Ford** — navbar, cards, bordas ativas, ícones, gráficos
- **30% preto / cinza** — fundos e superfícies
- **10% vermelho** — apenas em alertas críticos, status negativos, animação de marca no login e no botão "Iniciar Sessão"

Tipografia: *Chakra Petch* (display), *Archivo* (sans), *JetBrains Mono* (mono técnica).

## Disclaimer

Este repositório é um trabalho de estudo. Os dados, clientes, concessionárias e métricas exibidos são fictícios. Ford, Ford Pulse e o logotipo da Ford são marcas registradas da Ford Motor Company e não há qualquer afiliação oficial com este projeto.
