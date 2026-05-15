import { Bell, ChevronRight, TrendingDown } from "lucide-react";
import { user, activeAlerts, weeklyTrend } from "../data/mockData";

const alertCTA: Record<string, string> = {
  finance: "Vedi rata",
  food: "Cucina ora",
  social: "Imposta limite",
};

function Leaf({ x, y, rotation, size = 1, flip = false }: { x: number; y: number; rotation: number; size?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${flip ? -size : size} ${size})`}>
      <path
        d="M 0 0 Q 6 -6 14 -8 Q 22 -8 26 -4 Q 22 4 14 6 Q 6 4 0 0 Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M 0 0 Q 8 -4 24 -5"
        stroke="#065f46"
        strokeWidth="0.7"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path d="M 8 -2 Q 10 0 11 2" stroke="#065f46" strokeWidth="0.35" fill="none" opacity="0.5" />
      <path d="M 14 -4 Q 17 -2 18 0" stroke="#065f46" strokeWidth="0.35" fill="none" opacity="0.5" />
      <path
        d="M 2 -2 Q 8 -5 16 -6"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function GrowthPlant({ score }: { score: number }) {
  const stage = score < 20 ? 0 : score < 40 ? 1 : score < 60 ? 2 : score < 80 ? 3 : 4;

  return (
    <svg viewBox="0 0 140 180" width={120} height={155} className="flex-shrink-0">
      <defs>
        <linearGradient id="potBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a2818" />
          <stop offset="30%" stopColor="#a8643c" />
          <stop offset="55%" stopColor="#b87147" />
          <stop offset="80%" stopColor="#8a4d2c" />
          <stop offset="100%" stopColor="#3a1f10" />
        </linearGradient>
        <linearGradient id="potRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4956a" />
          <stop offset="100%" stopColor="#6b3e22" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <radialGradient id="petalGrad" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="55%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#be185d" />
        </radialGradient>
        <radialGradient id="pistilGrad">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="80%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </radialGradient>
        <radialGradient id="auraGlow" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background aura */}
      {stage >= 2 && (
        <ellipse cx="70" cy="80" rx="58" ry="68" fill="url(#auraGlow)" />
      )}

      {/* Pot shadow */}
      <ellipse cx="70" cy="172" rx="42" ry="3.5" fill="#000" opacity="0.45" />

      {/* Pot body */}
      <path d="M 33 128 L 107 128 L 99 168 L 41 168 Z" fill="url(#potBody)" />

      {/* Pot rim band */}
      <path d="M 28 121 L 112 121 L 109 132 L 31 132 Z" fill="url(#potRim)" />

      {/* Inner pot shadow / soil */}
      <ellipse cx="70" cy="122" rx="40" ry="5" fill="#1f0d05" />
      <ellipse cx="70" cy="122" rx="38" ry="3.5" fill="#3a1f0d" />
      {/* Soil texture */}
      <circle cx="55" cy="121.5" r="1.4" fill="#5a3220" />
      <circle cx="80" cy="123" r="1.1" fill="#5a3220" />
      <circle cx="65" cy="121" r="0.7" fill="#6b3e22" />
      <circle cx="88" cy="122" r="0.6" fill="#5a3220" />
      <circle cx="48" cy="122.5" r="0.7" fill="#6b3e22" />

      {/* Pot highlight (left) */}
      <path d="M 41 135 Q 39 150 45 165" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Pot shadow (right) */}
      <path d="M 95 135 Q 97 150 91 165" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* === STAGE 0: dry twig === */}
      {stage === 0 && (
        <g opacity="0.85">
          <path d="M 70 120 Q 67 105 64 88 Q 62 78 60 72" stroke="#7a6852" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 65 95 Q 60 90 55 85" stroke="#7a6852" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 67 108 Q 73 102 78 96" stroke="#7a6852" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* === STAGE 1: sprout === */}
      {stage === 1 && (
        <>
          <path d="M 70 120 Q 70 110 70 98" stroke="url(#stemGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <Leaf x={70} y={102} rotation={-145} size={0.6} />
          <Leaf x={70} y={102} rotation={-35} size={0.6} flip />
        </>
      )}

      {/* === STAGE 2: stem + 2 leaves === */}
      {stage === 2 && (
        <>
          <path
            d="M 70 120 Q 67 102 70 88 Q 73 74 70 64"
            stroke="url(#stemGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <Leaf x={68} y={100} rotation={-160} size={1} />
          <Leaf x={72} y={88} rotation={20} size={0.95} />
          <Leaf x={70} y={68} rotation={-130} size={0.7} />
        </>
      )}

      {/* === STAGE 3: lush === */}
      {stage === 3 && (
        <>
          <path
            d="M 70 120 Q 66 100 70 80 Q 74 60 70 50"
            stroke="url(#stemGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <Leaf x={68} y={104} rotation={-160} size={1.05} />
          <Leaf x={72} y={92} rotation={20} size={1} />
          <Leaf x={68} y={78} rotation={-150} size={0.9} />
          <Leaf x={72} y={66} rotation={25} size={0.85} />
          <Leaf x={70} y={54} rotation={-135} size={0.65} />
          <Leaf x={70} y={54} rotation={-45} size={0.65} flip />
        </>
      )}

      {/* === STAGE 4: blooming === */}
      {stage === 4 && (
        <>
          <path
            d="M 70 120 Q 65 95 70 70 Q 75 45 70 28"
            stroke="url(#stemGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <Leaf x={68} y={104} rotation={-160} size={1.1} />
          <Leaf x={72} y={92} rotation={20} size={1.05} />
          <Leaf x={68} y={78} rotation={-150} size={0.95} />
          <Leaf x={72} y={62} rotation={25} size={0.9} />
          <Leaf x={68} y={48} rotation={-140} size={0.75} />
          <Leaf x={72} y={38} rotation={30} size={0.7} />

          {/* Flower */}
          {[0, 72, 144, 216, 288].map((rot) => (
            <ellipse
              key={rot}
              cx="70"
              cy="18"
              rx="5.5"
              ry="10"
              fill="url(#petalGrad)"
              transform={`rotate(${rot} 70 28)`}
              opacity="0.95"
            />
          ))}
          <circle cx="70" cy="28" r="4.5" fill="url(#pistilGrad)" />
          {/* Tiny stamen dots */}
          <circle cx="68" cy="26" r="0.7" fill="#fef08a" />
          <circle cx="72" cy="26" r="0.7" fill="#fef08a" />
          <circle cx="70" cy="30" r="0.7" fill="#fef08a" />
        </>
      )}
    </svg>
  );
}

const stageLabels = [
  { label: "Pianta in difficoltà", emoji: "🥀" },
  { label: "Germoglio appena spuntato", emoji: "🌱" },
  { label: "Pianta giovane", emoji: "🌿" },
  { label: "Pianta rigogliosa", emoji: "🪴" },
  { label: "In fiore", emoji: "🌸" },
];

function getSubtitle(delta: number): string {
  if (delta >= 8) return "È spuntata una nuova foglia 🍃";
  if (delta >= 3) return "Cresce bene 🌱";
  if (delta >= 0) return "La pianta è stabile";
  if (delta >= -5) return "Serve un po' più di acqua 💧";
  return "Le foglie iniziano a cadere 🍂";
}

function getMotivation(delta: number): string {
  if (delta >= 8) return "Ottimo lavoro, vai così";
  if (delta >= 3) return "Procedi così, stai migliorando";
  if (delta >= 0) return "Continua, mantieni il ritmo";
  if (delta >= -3) return "Niente panico, riprendi piano piano";
  if (delta >= -7) return "Non stai andando benissimo, ce la puoi fare";
  return "Settimana storta — riparti da oggi";
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{title}</h3>
      {action && (
        <button className="flex items-center gap-0.5 text-xs" style={{ color: "#818cf8" }}>
          {action} <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

const glassCard = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.35)",
} as const;

const tintedGlass = (rgb: string) => ({
  background: `linear-gradient(180deg, rgba(${rgb},0.20) 0%, rgba(${rgb},0.04) 100%)`,
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: `1px solid rgba(${rgb},0.28)`,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 28px rgba(0,0,0,0.35), 0 0 30px rgba(${rgb},0.08)`,
});

export default function HomeScreen() {
  return (
    <div className="flex flex-col gap-4 px-4 py-4 overflow-y-auto flex-1 relative">
      <div className="relative flex flex-col gap-4" style={{ zIndex: 1 }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Giovedì, 15 maggio 2026</p>
          <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>
            Ciao, {user.name} 👋
          </h1>
        </div>
        <button
          className="relative w-10 h-10 rounded-full flex items-center justify-center"
          style={glassCard}
        >
          <Bell size={18} style={{ color: "#cbd5e1" }} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#f87171", boxShadow: "0 0 8px #f87171" }}
          />
        </button>
      </div>

      {/* Balance + Savings */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-4" style={glassCard}>
          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Saldo totale</p>
          <p className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
            €{user.balance.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>3 conti collegati</p>
        </div>
        <div className="rounded-2xl p-4" style={tintedGlass("52,211,153")}>
          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Risparmiati a maggio</p>
          <p className="text-2xl font-bold" style={{ color: "#34d399" }}>
            €{user.monthlySaved.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown size={12} style={{ color: "#34d399" }} />
            <p className="text-xs" style={{ color: "#34d399" }}>−23% vs aprile</p>
          </div>
        </div>
      </div>

      {/* Growth plant indicator */}
      {(() => {
        const avg = weeklyTrend.map((w) => 100 - Math.round((w.finance + w.food + w.social) / 3));
        const current = avg[avg.length - 1];
        const previous = avg[avg.length - 2];
        const delta = current - previous;
        const stage = current < 20 ? 0 : current < 40 ? 1 : current < 60 ? 2 : current < 80 ? 3 : 4;
        const stageInfo = stageLabels[stage];
        const deltaColor = delta >= 3 ? "#34d399" : delta >= 0 ? "#fbbf24" : "#f87171";

        return (
          <div
            className="rounded-2xl p-4 overflow-hidden relative flex-shrink-0"
            style={tintedGlass("52,211,153")}
          >
            <div className="flex gap-3 items-stretch">
              {/* Plant illustration */}
              <div
                className="flex items-end justify-center flex-shrink-0 rounded-xl"
                style={{
                  width: 110,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(52,211,153,0.06) 100%)",
                }}
              >
                <GrowthPlant score={current} />
              </div>

              {/* Right side: status + score */}
              <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                <div>
                  <p className="text-xs" style={{ color: "#6b7280" }}>
                    Come stai andando
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-lg">{stageInfo.emoji}</span>
                    <p className="text-sm font-bold leading-tight" style={{ color: "#34d399" }}>
                      {stageInfo.label}
                    </p>
                  </div>
                  <p className="text-[11px] mt-1 italic leading-snug" style={{ color: "#9ca3af" }}>
                    {getMotivation(delta)}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>
                      {current}
                    </p>
                    <span className="text-xs" style={{ color: "#6b7280" }}>/100</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded-full"
                    style={{ background: `${deltaColor}22` }}
                  >
                    {delta >= 0 ? (
                      <span style={{ color: deltaColor, fontSize: 10 }}>↑</span>
                    ) : (
                      <TrendingDown size={10} style={{ color: deltaColor }} />
                    )}
                    <span className="text-[10px] font-semibold" style={{ color: deltaColor }}>
                      {delta > 0 ? "+" : ""}{delta} punti
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle/motivation */}
            <div
              className="mt-3 pt-3 text-xs text-center"
              style={{
                color: "#d1d5db",
                borderTop: "1px dashed rgba(52,211,153,0.2)",
              }}
            >
              {getSubtitle(delta)}
            </div>
          </div>
        );
      })()}

      {/* Active Alerts */}
      <div>
        <SectionHeader title="Alert attivi" action="Vedi tutti" />
        <div className="flex flex-col gap-2.5">
          {activeAlerts.filter((a) => a.type !== "finance").map((alert) => {
            return (
            <div
              key={alert.id}
              className="rounded-2xl px-4 py-4 flex flex-col gap-3 flex-shrink-0 relative overflow-hidden"
              style={glassCard}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${alert.color}26` }}
                >
                  <span className="text-xl">{alert.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-semibold leading-tight" style={{ color: "#f1f5f9" }}>
                      {alert.title}
                    </p>
                    {alert.urgent && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
                        style={{ background: "#f8717122", color: "#f87171" }}
                      >
                        urgente
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1 leading-snug" style={{ color: "#cbd5e1" }}>
                    {alert.body}
                  </p>
                </div>
              </div>
              <button
                className="flex items-center justify-center gap-1 w-full px-3 py-2 rounded-lg text-xs font-semibold"
                style={{ background: `${alert.color}26`, color: alert.color, border: `1px solid ${alert.color}33` }}
              >
                {alertCTA[alert.type] ?? "Vedi"}
                <ChevronRight size={12} />
              </button>
            </div>
          );
          })}
        </div>
      </div>

      </div>
    </div>
  );
}
