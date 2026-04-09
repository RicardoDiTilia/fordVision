# PROMPT — Geração do Site Ford Pulse

Crie um site completo chamado **FORD PULSE — Retenção Inteligente, do Veículo ao Serviço** usando **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. O site será hospedado na Vercel e serve como protótipo funcional para apresentação a uma banca universitária em parceria com a Ford. Todos os dados são mockados, mas devem ser realistas (nomes reais de cidades, concessionárias plausíveis, KPIs verossímeis).

---

## PÁGINA INICIAL — Login (`/`)

Tela de impacto máximo. Fundo **preto absoluto (#000000)**. No centro da tela, bem grande e dominante:

- **Logo da Ford** (o óvalo azul clássico) em tamanho grande (~250px de largura).
- Logo abaixo, a palavra **"PULSE"** em tipografia bold, caixa alta, tracking largo, tamanho enorme (~80-100px). **A palavra DEVE pulsar continuamente com animação CSS infinita** — o efeito é um ciclo de escala (scale 1.0 → 1.05 → 1.0) combinado com um glow de text-shadow vermelho (#C41E3A) que intensifica e suaviza ritmicamente, simulando um batimento cardíaco (duração ~1.5s, ease-in-out, infinite). O resultado visual é a palavra "respirando" na tela como algo vivo. Implementar com `@keyframes pulse` em CSS ou `animate` do Framer Motion.
- Uma **linha vermelha fina** (#C41E3A — vermelho Ford) pulsa horizontalmente abaixo do logo, como uma linha de ECG/batimento cardíaco, reforçando o conceito.
- Efeito de **partículas vermelhas sutis** ou um leve vignette vermelho nas bordas da tela para dar a sensação intimidadora e premium.

**Formulário de login** aparece abaixo do logo, minimalista (campos com borda fina, fundo transparente, texto branco):
- Campo: **Usuário**
- Campo: **Senha**
- Botão: **"ENTRAR"** (fundo vermelho Ford #C41E3A, hover escurece)

**Credenciais e roteamento:**
- `usuario: cliente` / `senha: cliente` → redireciona para `/app` (Face do Cliente)
- `usuario: gerente` / `senha: gerente` → redireciona para `/command` (Face do Command Center)
- Credencial errada → mensagem de erro sutil com shake animation no formulário.

A tela de login **não tem navbar**. É uma experiência full-screen imersiva. A navbar só aparece após o login.

**Animação de entrada:** ao carregar a página, o logo surge com fade-in lento (1.5s), depois a palavra PULSE aparece letra por letra, depois a linha de ECG se desenha da esquerda pra direita. O formulário aparece por último com um slide-up suave.

---

## ESTRUTURA DO SITE (pós-login)

O site tem **duas faces** acessíveis por navegação principal (visível após login):

### FACE 1 — App do Cliente (`/app`)
Simula a interface mobile (centralizar em tela com max-width ~420px, bordas arredondadas, visual de celular) que o dono de um veículo Ford usaria.

**Telas:**

1. **Onboarding (tela inicial do fluxo)**
   - Simulação de mensagem recebida via WhatsApp 48h após a compra, com link para o app.
   - "Unboxing digital" do carro: tour interativo com dicas de uso, configuração do perfil e conexão com dados do veículo.

2. **Meu Ford (tela principal)**
   - O veículo aparece como um "avatar digital".
   - **Anel de saúde estilo Apple Watch**: anel circular (SVG) mostrando o estado de cada sistema — motor, óleo, freios, pneus, bateria. Cada sistema tem uma porcentagem e cor (verde/amarelo/vermelho).
   - Os dados simulam vir do veículo conectado (FordPass/SYNC).
   - Exibir modelo do carro, placa, km rodados.

3. **Alertas Inteligentes**
   - Cards de notificação com contexto real. Exemplo:
     > "Seu óleo está a 73% da vida útil. Na sua média de uso, a troca ideal é em ~40 dias. A concessionária [nome] tem peça em estoque. Agendar com 15% off?"
   - Cada alerta tem: dado do carro (contexto) + previsão por ML (urgência) + desconto (incentivo) + disponibilidade de estoque (garantia).
   - Botão de agendamento direto.

4. **Programa de Pontos**
   - Saldo de pontos visível (ex: R$400 acumulados).
   - Cada serviço na rede Ford = pontos.
   - Pontos viram desconto em peças, acessórios ou abatimento no próximo Ford.
   - Barra de progresso visual mostrando o acúmulo.

5. **Histórico Transparente**
   - Timeline visual do veículo: cada revisão, troca, serviço — com data, km, nota fiscal e selo Ford.
   - Design de timeline vertical com ícones por tipo de serviço.
   - Argumento de valorização na revenda.

6. **Momentos-chave Automatizados (seção dentro do app)**
   - Lista visual dos gatilhos automáticos:
     - Fim da garantia → oferta de extensão
     - Aniversário da compra → mensagem + benefício
     - Troca de estação → check-up sazonal
     - Recall → alerta urgente com agendamento direto
     - Silêncio prolongado → contato preditivo (equipe Ford liga via WhatsApp/telefone)

---

### FACE 2 — Command Center (`/command`)
Dashboard profissional em tela cheia para a equipe Ford e concessionárias.

**Telas/Seções:**

1. **Mapa Pulse (tela principal)**
   - **Mapa interativo do Brasil** (usar Leaflet com React-Leaflet ou SVG do Brasil com D3.js).
   - Concessionárias plotadas como pontos que **pulsam** com animação (CSS/Framer Motion):
     - 🟢 Verde = Service Share alto (>70%)
     - 🟡 Amarelo = Service Share médio (40-70%)
     - 🔴 Vermelho = Service Share baixo (<40%)
   - Ao clicar em uma concessionária, abre um **painel lateral** com:
     - Nome da concessionária, cidade, estado
     - Métricas: VIN Share %, clientes ativos, leads pendentes, taxa de retorno
     - Estoque resumido (peças críticas)
     - Mini-gráfico de evolução do Service Share nos últimos 6 meses

2. **Radar de Leads (para equipe de contato Ford)**
   - Fila rankeada de clientes para contatar, gerada diariamente pelo sistema.
   - Cada card de lead mostra:
     - Nome do cliente, veículo, km estimado
     - Probabilidade de precisar de serviço (barra de %, gerada por ML)
     - Serviço provável + peças necessárias
     - Status do estoque na concessionária mais próxima (✅ disponível / ⚠️ parcial / ❌ indisponível)
     - Script sugerido de abordagem
     - Canal preferido (ícone WhatsApp ou telefone)
   - Filtros por região, urgência, tipo de serviço.

3. **Controle de Estoque Integrado**
   - Tabela/dashboard mostrando previsão de demanda vs. estoque disponível.
   - Exemplo visual: "Modelo prevê 15 trocas de pastilha de freio em 30 dias. Estoque atual: 8 kits. **Alerta: solicitar transferência.**"
   - Indicador de rastreamento global de peças Ford (simular localização de peças vindas de outras unidades/países).

4. **Painel de Performance**
   - Ranking gamificado entre concessionárias:
     - Quem está convertendo mais leads
     - Quem melhorou o Service Share
     - Quem tem melhor taxa de retorno
   - Visual de leaderboard com posições, setas de subida/descida, badges.
   - Gráficos comparativos (barras horizontais ou radar chart).

---

### PÁGINA EXTRA — Motor de IA (`/motor` ou seção na landing)
Diagrama visual e interativo explicando a arquitetura do sistema:

```
VEÍCULO CONECTADO (SYNC/FordPass)
       │ dados de telemetria
       ▼
┌──────────────────┐
│   FORD PULSE AI  │ ← Modelo de ML (segmentação + predição)
│                  │
│  • Classifica cliente (fiel/econômico/esquecido/abandono)
│  • Prevê próximo serviço necessário
│  • Calcula urgência e melhor momento de contato
│  • Cruza com estoque disponível
└───────┬──────────┘
        │
  ┌─────┴─────┐
  ▼           ▼
APP CLIENTE   COMMAND CENTER
(push/wpp)    (equipe Ford)
```

Renderizar como diagrama animado (nós conectados com linhas que pulsam dados fluindo). Mostrar como o ML classifica clientes e alimenta ambos os lados.

---

## DESIGN E IDENTIDADE VISUAL

- **Paleta de cores Ford com identidade agressiva**:
  - **Preto absoluto** (#000000) — fundo principal das telas de impacto (login, headers)
  - **Azul Ford escuro** (#003478) — cor institucional, usada em navbar, painéis, cards
  - **Vermelho Ford** (#C41E3A) — cor de destaque agressiva. Usar em: botões de ação, bordas de alertas críticos, glow effects, linhas decorativas, ícones de urgência, hover states. O vermelho dá o tom "amedrontador" e sério ao sistema.
  - **Vermelho escuro** (#8B0000) — para sombras, gradients e efeitos de profundidade sobre o vermelho principal
  - **Branco** (#FFFFFF) — texto principal sobre fundos escuros
  - **Cinza escuro** (#1A1A1A) — fundo de cards e painéis secundários
  - **Cinza médio** (#2D2D2D) — bordas, separadores
  - Verde/Amarelo/Vermelho para status operacionais (Service Share)
  - **Regra geral de cor**: o site deve ter atmosfera **dark mode por padrão**, com o preto e azul escuro dominando e o vermelho aparecendo como destaque em elementos interativos, bordas, linhas decorativas e animações de pulso. O visual deve transmitir poder, controle e tecnologia — como um painel de comando militar ou cockpit.
- **Tipografia**: Inter ou similar sans-serif moderna.
- **Estilo geral**: dark, agressivo, premium. Atmosfera de cockpit/centro de comando. Fundos escuros, texto claro, acentos em vermelho. Inspiração visual: dashboards da Datadog em dark mode, Tesla UI, painéis militares.
- **Animações**: usar Framer Motion para transições entre páginas, hover effects, e o pulsar dos pontos no mapa. Na tela de login, animação de glow vermelho pulsante na palavra PULSE, linha de ECG animada, e partículas sutis. Botões com hover em vermelho. Cards com borda vermelha sutil ao hover.
- **Responsividade**: a Face 1 (App Cliente) deve parecer um celular mesmo no desktop (mockup mobile centralizado). A Face 2 (Command Center) é desktop-first.
- **Navbar**: navegação superior com logo "FORD PULSE", links para App Cliente / Command Center / Motor IA. Indicador visual de qual face está ativa.

---

## DADOS MOCKADOS (usar estes como base)

**Concessionárias (mínimo 10):**
- Ford Pacaembu — São Paulo, SP — VIN Share 72% 🟢
- Ford Pioneira — Campinas, SP — VIN Share 58% 🟡
- Ford Brasília — Brasília, DF — VIN Share 45% 🟡
- Ford Tropical — Manaus, AM — VIN Share 31% 🔴
- Ford Niterói — Niterói, RJ — VIN Share 67% 🟢
- Ford Sulamericana — Porto Alegre, RS — VIN Share 55% 🟡
- Ford Sertão — Recife, PE — VIN Share 38% 🔴
- Ford Minas — Belo Horizonte, MG — VIN Share 63% 🟡
- Ford Pantanal — Cuiabá, MT — VIN Share 49% 🟡
- Ford Marajó — Belém, PA — VIN Share 28% 🔴

**Cliente mockado (para o App):**
- Nome: Rafael Mendes
- Veículo: Ford Ranger 2024 Limited
- Placa: ABC-1D23
- Km: 18.420 km
- Pontos acumulados: 1.840 pts (equivalente a R$368)
- Próximo serviço previsto: Troca de óleo em ~40 dias

**Leads mockados (para o Radar, mínimo 6):**
- Carlos Oliveira — Ranger 2023 — 32.100 km — 89% prob. troca pastilha de freio — estoque ✅
- Ana Costa — Territory 2024 — 15.800 km — 76% prob. revisão 15k — estoque ✅
- Pedro Santos — Maverick 2023 — 41.200 km — 92% prob. troca correia — estoque ⚠️
- Julia Ferreira — Bronco Sport 2024 — 8.900 km — 45% prob. check-up sazonal — estoque ✅
- Marcos Lima — Ranger 2022 — 58.300 km — 85% prob. troca de pneus — estoque ❌
- Camila Rocha — Territory 2023 — 27.600 km — 71% prob. troca filtro de ar — estoque ✅

---

## BIBLIOTECAS OBRIGATÓRIAS

- `next` 14+ (App Router)
- `typescript`
- `tailwindcss`
- `react-leaflet` + `leaflet` (mapa interativo) OU `d3` (mapa SVG do Brasil)
- `recharts` (gráficos do Command Center)
- `framer-motion` (animações, pulsar, transições)
- `lucide-react` (ícones)

---

## REQUISITOS TÉCNICOS

- Deploy-ready para Vercel (next.config.js configurado).
- Sem backend real — tudo client-side com dados mockados em arquivos `/data/*.ts`.
- Componentes bem separados (`/components/app/`, `/components/command/`, `/components/shared/`).
- Mobile-first na Face 1, desktop-first na Face 2.
- Performance: lazy loading no mapa, code splitting por rota.
- Acessibilidade básica: labels, contraste, navegação por teclado.

---

## FRASE DE IMPACTO (exibir na landing ou no pitch)

> "O Ford Pulse não espera o cliente lembrar da revisão. Ele sabe antes do cliente que o carro precisa de atenção, confirma que a peça está disponível, e entrega o lead pronto na mão da equipe de contato."
