import { useState } from "react";
import { ChevronRight, AlertTriangle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { accounts, budgetCategories, bnplInstallments, subscriptions } from "../data/mockData";

const subLogoFiles: Record<string, string> = {
  "Netflix":      "/loghi/apps_media_netflix_logo_website_movie_series_multimedia_streaming_stream_icon_182738.png",
  "Spotify":      "/loghi/Spotify_logo_without_text.svg.png",
  "Amazon Prime": "/loghi/prime-video-logo-prime-video-icon-transparent-logo-free-png.png",
  "iCloud 50GB":  "/loghi/4202118icloudlogosocialsocialmedia-115699_115602.png",
};

function SubIcon({ name, emoji, size = 40 }: { name: string; emoji: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const src = subLogoFiles[name];
  const r = size * 0.25;
  return (
    <div style={{ width: size, height: size, borderRadius: r, background: "#141824", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {src && !failed ? (
        <img src={src} alt={name} width={size * 0.75} height={size * 0.75} style={{ objectFit: "contain" }} onError={() => setFailed(true)} />
      ) : (
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      )}
    </div>
  );
}

// Lucy-detected recurring fixed expenses
const lucyFixedExpenses = [
  { id: "b1", icon: "✂️", label: "Barbiere",        amount: 18,  dayOfMonth: 22, note: "ogni ~5 settimane" },
  { id: "b2", icon: "👁️", label: "Lenti a contatto", amount: 35,  dayOfMonth: 28, note: "ogni mese" },
  { id: "b3", icon: "🏋️", label: "Palestra",         amount: 45,  dayOfMonth: 27, note: "quota mensile" },
];

function BudgetDetail({ onClose }: { onClose: () => void }) {
  const [activePeriod, setActivePeriod] = useState("1 sett");
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
  const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);

  // Lucy prediction: current daily rate + known upcoming fixed expenses
  const todayDay = 15;
  const remainingDays = 31 - todayDay;
  const dailyRate = totalSpent / todayDay; // ~74/day
  const upcomingFixed = lucyFixedExpenses.reduce((s, e) => s + e.amount, 0);
  const predictedTotal = Math.round(totalSpent + dailyRate * remainingDays * 0.7 + upcomingFixed);

  // Chart geometry
  const W = 320, H = 140, PAD_L = 8, PAD_R = 32, PAD_T = 16, PAD_B = 24;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const prevData: [number, number][] = [
    [1,0],[3,60],[5,140],[7,260],[9,380],[11,520],[13,640],[15,750],
    [17,870],[19,960],[21,1050],[23,1150],[25,1240],[27,1310],[29,1370],[30,1390],
  ];
  const currData: [number, number][] = [
    [1,0],[2,45],[3,90],[4,160],[5,240],[6,310],[7,390],[8,460],
    [9,540],[10,620],[11,700],[12,800],[13,900],[14,1010],[15,totalSpent],
  ];
  // Predicted continuation (dashed)
  const predData: [number, number][] = [
    [15,totalSpent],[18,1175],[20,1210],[22,1245],[23,1263],[25,1290],[27,1330],[28,1365],[31,predictedTotal],
  ];

  const allVals = [...prevData.map(d => d[1]), ...predData.map(d => d[1])];
  const maxVal = Math.max(...allVals) * 1.12;
  const totalDays = 31;

  const toX = (day: number) => PAD_L + ((day - 1) / (totalDays - 1)) * chartW;
  const toY = (val: number) => PAD_T + chartH - (val / maxVal) * chartH;

  const polyline = (data: [number, number][]) =>
    data.map(([d, v]) => `${toX(d)},${toY(v)}`).join(" ");

  const areaPath = (data: [number, number][]) => {
    const pts = data.map(([d, v]) => `${toX(d)},${toY(v)}`).join(" L ");
    const lastX = toX(data[data.length - 1][0]);
    return `M ${toX(data[0][0])},${toY(0)} L ${pts} L ${lastX},${toY(0)} Z`;
  };

  const dotX = toX(todayDay);
  const dotY = toY(totalSpent);
  const predEndX = toX(31);
  const predEndY = toY(predictedTotal);

  const diffVsPrev = totalSpent - 1390;
  const diffLabel = diffVsPrev < 0
    ? `↓ €${Math.abs(diffVsPrev)} vs aprile`
    : `↑ €${diffVsPrev} vs aprile`;

  const periods = ["Oggi", "1 sett", "3 mesi"];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto" style={{ background: "#0a0b14" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1e2235" }}>
          <ArrowLeft size={18} style={{ color: "#e2e8f0" }} />
        </button>
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Banking</p>
          <h2 className="text-lg font-bold" style={{ color: "#f1f5f9" }}>Pianifica il mese</h2>
        </div>
      </div>

      {/* Spending summary */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-sm" style={{ color: "#9ca3af" }}>Hai speso</p>
        <p className="text-4xl font-extrabold" style={{ color: "#f1f5f9", lineHeight: 1.1 }}>€{totalSpent.toLocaleString("it-IT")}</p>
        <p className="text-sm mt-1" style={{ color: diffVsPrev < 0 ? "#34d399" : "#f87171" }}>{diffLabel}</p>
      </div>

      {/* Period tabs */}
      <div className="flex gap-1 px-5 mb-3">
        {periods.map(p => (
          <button
            key={p}
            onClick={() => setActivePeriod(p)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activePeriod === p ? "#2563eb" : "#1e2235",
              color: activePeriod === p ? "#fff" : "#6b7280",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="px-3 mb-1">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="currGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis max */}
          <text x={W - PAD_R + 4} y={PAD_T + 4} fontSize="8" fill="#4b5563" textAnchor="start">
            {(Math.round(maxVal / 100) / 10).toFixed(1)}k
          </text>
          {/* Predicted end label */}
          <text x={W - PAD_R + 4} y={predEndY + 4} fontSize="8" fill="#a78bfa" textAnchor="start">{predictedTotal}</text>

          {/* X-axis */}
          {[1, 6, 11, 16, 21, 26, 31].map(d => (
            <text key={d} x={toX(d)} y={H - 4} fontSize="8" fill="#4b5563" textAnchor="middle">{d}</text>
          ))}

          {/* Vertical divider at today */}
          <line x1={dotX} y1={PAD_T} x2={dotX} y2={toY(0)} stroke="#374151" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />

          {/* Previous month */}
          <path d={areaPath(prevData)} fill="#374151" opacity="0.18" />
          <polyline points={polyline(prevData)} fill="none" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />

          {/* Current month area + line */}
          <path d={areaPath(currData)} fill="url(#currGrad)" />
          <polyline points={polyline(currData)} fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {/* Prediction area + dashed line */}
          <path d={areaPath(predData)} fill="url(#predGrad)" />
          <polyline points={polyline(predData)} fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeDasharray="5 3" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />

          {/* Predicted end dot */}
          <circle cx={predEndX} cy={predEndY} r="3.5" fill="#0a0b14" stroke="#a78bfa" strokeWidth="2" />

          {/* Today dot */}
          <circle cx={dotX} cy={dotY} r="4" fill="#0a0b14" stroke="#2dd4bf" strokeWidth="2" />
          <circle cx={dotX} cy={dotY} r="2" fill="#2dd4bf" />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-5 mb-4">
        <div className="flex items-center gap-1.5">
          <div style={{ width: 16, height: 2, background: "#2dd4bf", borderRadius: 1 }} />
          <span style={{ fontSize: 10, color: "#9ca3af" }}>Maggio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 16, height: 2, background: "#374151", borderRadius: 1 }} />
          <span style={{ fontSize: 10, color: "#9ca3af" }}>Aprile</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="4"><line x1="0" y1="2" x2="16" y2="2" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 2" /></svg>
          <span style={{ fontSize: 10, color: "#9ca3af" }}>Previsione</span>
        </div>
      </div>

      {/* Lucy prediction banner */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #1a1235 0%, #1e1a35 100%)", border: "1px solid rgba(167,139,250,0.25)" }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center rounded-full text-xs font-bold" style={{ width: 22, height: 22, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontSize: 11 }}>L</div>
          <p className="text-xs font-semibold" style={{ color: "#a78bfa" }}>Lucy prevede</p>
        </div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-2xl font-extrabold" style={{ color: "#f1f5f9" }}>€{predictedTotal.toLocaleString("it-IT")}</p>
            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>a fine mese · ancora 16 giorni</p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: upcomingFixed > 0 ? "#f59e0b" : "#6b7280" }}>+€{upcomingFixed} impegni fissi</p>
            <p className="text-[10px] mt-0.5" style={{ color: "#4b5563" }}>già inclusi</p>
          </div>
        </div>
        {/* Fixed expense list */}
        <div className="flex flex-col" style={{ gap: 6 }}>
          {lucyFixedExpenses.map(e => (
            <div key={e.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 14 }}>{e.icon}</span>
                <div>
                  <p style={{ fontSize: 11, color: "#d1d5db", fontWeight: 500 }}>{e.label}</p>
                  <p style={{ fontSize: 9, color: "#4b5563" }}>{e.note} · giorno {e.dayOfMonth}</p>
                </div>
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>€{e.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Per categoria */}
      <p className="px-5 mb-2 text-xs font-semibold" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>PER CATEGORIA</p>
      <div className="flex flex-col px-4 mb-8" style={{ gap: 2 }}>
        {budgetCategories.map((cat) => {
          const share = Math.round((cat.spent / totalSpent) * 100);
          const over = cat.spent > cat.budget;
          return (
            <div key={cat.id} className="flex items-center px-2 py-3 rounded-xl" style={{ gap: 12 }}>
              {/* Icon circle */}
              <div className="flex items-center justify-center rounded-full" style={{ width: 38, height: 38, background: cat.color + "22", flexShrink: 0 }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
              </div>
              {/* Name + bar */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="text-sm font-medium" style={{ color: "#e2e8f0", marginBottom: 4 }}>{cat.label}</p>
                <div className="h-1 rounded-full w-full" style={{ background: "#1e2235" }}>
                  <div className="h-1 rounded-full" style={{ width: `${Math.min(share * 2, 100)}%`, background: over ? "#f87171" : cat.color }} />
                </div>
              </div>
              {/* Amount + pct */}
              <div className="flex flex-col items-end" style={{ flexShrink: 0 }}>
                <p className="text-sm font-bold" style={{ color: over ? "#f87171" : "#f1f5f9" }}>€{cat.spent}</p>
                <p style={{ fontSize: 10, color: "#6b7280" }}>{share}%</p>
              </div>
            </div>
          );
        })}
        {/* Budget summary row */}
        <div className="flex items-center justify-between px-2 pt-3 mt-1" style={{ borderTop: "1px solid #1e2235" }}>
          <span style={{ fontSize: 12, color: "#6b7280" }}>Budget totale</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: totalSpent > totalBudget ? "#f87171" : "#34d399" }}>
            €{totalSpent} / €{totalBudget}
          </span>
        </div>
      </div>
    </div>
  );
}

function BnplDetail({ onClose }: { onClose: () => void }) {
  const totalMonthly = bnplInstallments.reduce((s, b) => s + b.monthlyRate, 0);
  const totalResiduo = bnplInstallments.reduce((s, b) => s + b.monthlyRate * b.remaining, 0);
  const maxMonths = Math.max(...bnplInstallments.map(b => b.remaining));
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
  const ringPct = Math.min(totalMonthly / totalSpent, 1);
  const r = 44;
  const circ = 2 * Math.PI * r;

  const providerColors: Record<string, string> = {
    Klarna: "#f97316",
    Scalapay: "#818cf8",
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto" style={{ background: "#0a0b14" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-4">
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1e2235" }}>
          <ArrowLeft size={18} style={{ color: "#e2e8f0" }} />
        </button>
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Banking</p>
          <h2 className="text-lg font-bold" style={{ color: "#f1f5f9" }}>Rate BNPL attive</h2>
        </div>
      </div>

      {/* Ring + summary */}
      <div className="mx-4 mb-4 rounded-2xl p-4 flex items-center gap-5" style={{ background: "#1e2235" }}>
        {/* Ring */}
        <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
          <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="bnplGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r={r} fill="none" stroke="#2d3347" strokeWidth="8" />
            <circle cx="50" cy="50" r={r} fill="none" stroke="url(#bnplGrad)" strokeWidth="8"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - ringPct)} strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#f1f5f9", fontSize: 15, fontWeight: 800, margin: 0, lineHeight: 1 }}>
              {Math.round(ringPct * 100)}%
            </p>
            <p style={{ color: "#6b7280", fontSize: 9, margin: 0 }}>delle spese</p>
          </div>
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-2.5 flex-1">
          <div>
            <p className="text-[10px]" style={{ color: "#6b7280" }}>Debito residuo totale</p>
            <p className="text-xl font-bold" style={{ color: "#f97316" }}>€{totalResiduo.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px]" style={{ color: "#6b7280" }}>Rata mensile</p>
            <p className="text-sm font-bold" style={{ color: "#e2e8f0" }}>€{totalMonthly.toFixed(2)}/mese</p>
          </div>
        </div>
      </div>

      {/* Installment cards */}
      <p className="px-4 mb-2 text-xs font-semibold" style={{ color: "#6b7280" }}>LE TUE RATE</p>
      <div className="flex flex-col gap-3 px-4 mb-6">
        {bnplInstallments.map((b) => {
          const total = Math.round(b.totalAmount / b.monthlyRate);
          const paid = total - b.remaining;
          const pct = paid / total;
          const color = providerColors[b.provider] ?? "#818cf8";
          return (
            <div key={b.id} className="rounded-2xl p-4" style={{ background: "#1e2235", borderLeft: `3px solid ${color}` }}>
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: color + "22", color }}>
                      {b.provider}
                    </span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>{b.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color }}>€{b.monthlyRate.toFixed(2)}</p>
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>/mese</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>{paid} di {total} rate pagate</p>
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>{b.remaining} rimaste</p>
                </div>
                <div className="h-2 rounded-full w-full" style={{ background: "#2d3347" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${pct * 100}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between mt-3 pt-2.5" style={{ borderTop: "1px solid #2d3347" }}>
                <div>
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>Residuo</p>
                  <p className="text-xs font-semibold" style={{ color: "#e2e8f0" }}>€{(b.monthlyRate * b.remaining).toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>Totale articolo</p>
                  <p className="text-xs font-semibold" style={{ color: "#e2e8f0" }}>€{b.totalAmount.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>Prossima rata</p>
                  <p className="text-xs font-semibold" style={{ color: b.daysLeft <= 10 ? "#f87171" : "#34d399" }}>{b.nextDue} · {b.daysLeft}gg</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubscriptionsDetail({ onClose }: { onClose: () => void }) {
  const active = subscriptions.filter((s) => s.status === "active");
  const cancelled = subscriptions.filter((s) => s.status === "cancelled");
  const monthlyTotal = active.reduce((s, sub) => s + sub.monthly, 0);
  const yearlyTotal = monthlyTotal * 12;
  const savedCancelled = cancelled.reduce((s, sub) => s + sub.monthly, 0);

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "#0a0b14" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-4">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#1e2235" }}
        >
          <ArrowLeft size={18} style={{ color: "#e2e8f0" }} />
        </button>
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Banking</p>
          <h2 className="text-lg font-bold" style={{ color: "#f1f5f9" }}>Abbonamenti ricorrenti</h2>
        </div>
      </div>

      {/* Summary banner */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #1a1535 0%, #1e2235 100%)", border: "1px solid rgba(129,140,248,0.2)" }}>
        <p className="text-xs mb-3" style={{ color: "#6b7280" }}>Riepilogo spesa abbonamenti</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold" style={{ color: "#f1f5f9" }}>€{monthlyTotal.toFixed(2)}</p>
            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>al mese · €{yearlyTotal.toFixed(2)} l'anno</p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#6b7280" }}>{active.length} attivi</p>
            {savedCancelled > 0 && (
              <p className="text-xs mt-1 font-semibold" style={{ color: "#34d399" }}>
                +€{savedCancelled.toFixed(2)}/m risparmiati
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Active subscriptions */}
      <p className="px-4 mb-2 text-xs font-semibold" style={{ color: "#6b7280" }}>ATTIVI</p>
      <div className="flex flex-col gap-2 px-4 mb-5">
        {active.map((sub) => (
          <div
            key={sub.id}
            className="rounded-2xl px-4 py-3.5 flex items-center justify-between"
            style={{ background: "#1e2235" }}
          >
            <div className="flex items-center gap-3">
              <SubIcon name={sub.name} emoji={sub.icon} size={40} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>{sub.name}</p>
                <p className="text-xs" style={{ color: "#6b7280" }}>€{(sub.monthly * 12).toFixed(2)}/anno</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: "#818cf8" }}>€{sub.monthly.toFixed(2)}</p>
              <p className="text-[10px]" style={{ color: "#4b5563" }}>/mese</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

const cardMeta = [
  { gradient: "linear-gradient(135deg, #c2185b 0%, #3949ab 60%, #1a237e 100%)", brand: "VISA", last4: "6775", chip: true },
  { gradient: "linear-gradient(135deg, #003087 0%, #009cde 100%)",              brand: "PayPal", last4: null, chip: false },
  { gradient: "linear-gradient(135deg, #f5a623 0%, #e84c3d 100%)",              brand: "VISA", last4: "3623", chip: true },
];

export default function BankingScreen({ onOpenAmazon }: { onOpenAmazon?: () => void }) {
  const [hidden, setHidden] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [showSubs, setShowSubs] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showBnpl, setShowBnpl] = useState(false);

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const totalBnpl = bnplInstallments.reduce((s, b) => s + b.monthlyRate, 0);
  const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
  const subsTotal = activeSubscriptions.reduce((s, sub) => s + sub.monthly, 0);

  if (showBudget) return <BudgetDetail onClose={() => setShowBudget(false)} />;
  if (showBnpl) return <BnplDetail onClose={() => setShowBnpl(false)} />;
  if (showSubs) return <SubscriptionsDetail onClose={() => setShowSubs(false)} />;

  return (
    <div className="flex flex-col gap-4 py-4 overflow-y-auto flex-1">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Modulo Banking</p>
          <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>Conti & Budget 💳</h1>
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#1e2235" }}
          onClick={() => setHidden((h) => !h)}
        >
          {hidden ? <EyeOff size={18} style={{ color: "#818cf8" }} /> : <Eye size={18} style={{ color: "#818cf8" }} />}
        </button>
      </div>

      {/* Revolut-style Card Carousel */}
      <div>
        <div
          style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", gap: 12, paddingBottom: 4, scrollbarWidth: "none" }}
          onScroll={(e) => {
            const el = e.currentTarget;
            const cardW = el.scrollWidth / accounts.length;
            const idx = Math.round(el.scrollLeft / cardW);
            setActiveCard(Math.min(Math.max(idx, 0), accounts.length - 1));
          }}
        >
          {accounts.map((acc, i) => {
            const meta = cardMeta[i];
            return (
              <div key={acc.id} style={{ flexShrink: 0, width: "calc(100% - 80px)", scrollSnapAlign: "center", marginLeft: i === 0 ? 40 : 0, marginRight: i === accounts.length - 1 ? 40 : 0 }}>
                <div style={{
                  background: meta.gradient,
                  borderRadius: 20,
                  padding: "22px 22px 20px",
                  height: 190,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Decorative circles */}
                  <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                  <div style={{ position: "absolute", top: 20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 700, margin: 0 }}>{acc.name}</p>
                    {meta.chip && (
                      <div style={{ width: 32, height: 24, borderRadius: 4, background: "linear-gradient(135deg, #d4a843 0%, #f0c060 50%, #c8922a 100%)", opacity: 0.9 }} />
                    )}
                  </div>

                  {/* Balance */}
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, margin: "0 0 4px", fontWeight: 500 }}>Saldo disponibile</p>
                    <p style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
                      {hidden ? "•••••" : `€${acc.balance.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 600, margin: 0, letterSpacing: 2 }}>
                      {meta.last4 ? `•• ${meta.last4}` : acc.type}
                    </p>
                    <p style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: 0, fontStyle: meta.brand === "VISA" ? "italic" : "normal", letterSpacing: meta.brand === "VISA" ? 1 : 0 }}>
                      {meta.brand}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
          {accounts.map((_, i) => (
            <div key={i} style={{ width: i === activeCard ? 18 : 6, height: 6, borderRadius: 3, background: i === activeCard ? "#818cf8" : "#2d3347", transition: "all 0.2s ease" }} />
          ))}
        </div>

        {/* Total */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <p style={{ color: "#4b5563", fontSize: 11, margin: 0 }}>
            Totale su 3 conti:{" "}
            <span style={{ color: "#818cf8", fontWeight: 700 }}>
              {hidden ? "•••" : `€${totalBalance.toLocaleString("it-IT", { minimumFractionDigits: 2 })}`}
            </span>
          </p>
        </div>
      </div>

      {/* Pianifica il mese banner */}
      {(() => {
        const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
        const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);
        const overCount = budgetCategories.filter((c) => c.spent > c.budget).length;
        const pct = Math.min((totalSpent / totalBudget) * 100, 100);
        const over = totalSpent > totalBudget;
        return (
          <div className="mx-4 rounded-2xl p-4" onClick={() => setShowBudget(true)} style={{ background: "#1e2235", cursor: "pointer" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📅</span>
                <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Pianifica il mese</p>
              </div>
              <ChevronRight size={16} style={{ color: "#818cf8" }} />
            </div>
            <div className="h-1.5 rounded-full w-full mb-2.5" style={{ background: "#2d3347" }}>
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: over ? "#f87171" : "#818cf8" }} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {overCount > 0 && <AlertTriangle size={11} style={{ color: "#f87171" }} />}
                <p className="text-xs" style={{ color: overCount > 0 ? "#f87171" : "#6b7280" }}>
                  {overCount > 0 ? `${overCount} categori${overCount === 1 ? "a" : "e"} sforat${overCount === 1 ? "a" : "e"}` : "Nei limiti"}
                </p>
              </div>
              <p className="text-xs font-semibold" style={{ color: "#e2e8f0" }}>
                €{totalSpent}{" "}
                <span style={{ color: "#4b5563", fontWeight: 400 }}>/ €{totalBudget}</span>
              </p>
            </div>
          </div>
        );
      })()}

      {/* BNPL banner */}
      <div className="mx-4 rounded-2xl p-4" onClick={() => setShowBnpl(true)} style={{ background: "#1e2235", cursor: "pointer" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">💳</span>
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Rate BNPL attive</p>
          </div>
          <ChevronRight size={16} style={{ color: "#818cf8" }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {bnplInstallments.map((b) => (
              <div key={b.id} className="rounded-lg px-2 py-1" style={{ background: "#141824", borderLeft: `2px solid ${b.color}` }}>
                <p className="text-[10px] font-medium" style={{ color: "#9ca3af" }}>{b.provider}</p>
                <p className="text-xs font-bold" style={{ color: b.color }}>€{b.monthlyRate.toFixed(0)}/m</p>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: "#6b7280" }}>{bnplInstallments.length} rate</p>
            <p className="text-sm font-bold" style={{ color: "#c084fc" }}>€{totalBnpl.toFixed(2)}/mese</p>
          </div>
        </div>
      </div>

      {/* Subscriptions banner — Spending Ring */}
      {(() => {
        const savedCancelled = subscriptions.filter(s => s.status === "cancelled").reduce((s, sub) => s + sub.monthly, 0);
        const ringTotal = subsTotal + savedCancelled;
        const pct = ringTotal > 0 ? subsTotal / ringTotal : 0;
        const r = 30;
        const circ = 2 * Math.PI * r;
        return (
          <div className="mx-4 mb-4 rounded-2xl p-4" onClick={() => setShowSubs(true)} style={{ background: "#1e2235", cursor: "pointer" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Abbonamenti ricorrenti</p>
              <ChevronRight size={16} style={{ color: "#818cf8" }} />
            </div>
            <div className="flex items-center gap-4">
              {/* Ring */}
              <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <circle cx="40" cy="40" r={r} fill="none" stroke="#2d3347" strokeWidth="7" />
                  <circle
                    cx="40" cy="40" r={r} fill="none"
                    stroke="url(#ringGrad)" strokeWidth="7"
                    strokeDasharray={circ}
                    strokeDashoffset={circ * (1 - pct)}
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 800, lineHeight: 1, margin: 0 }}>€{subsTotal.toFixed(0)}</p>
                  <p style={{ color: "#6b7280", fontSize: 9, margin: 0 }}>/mese</p>
                </div>
              </div>
              {/* Right side */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-2">
                  {activeSubscriptions.map((sub) => (
                    <SubIcon key={sub.id} name={sub.name} emoji={sub.icon} size={36} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#0f2318", color: "#34d399" }}>
                    +€{savedCancelled.toFixed(2)}/m risparmiati
                  </span>
                </div>
                <p style={{ color: "#4b5563", fontSize: 10 }}>{activeSubscriptions.length} attivi · {subscriptions.length - activeSubscriptions.length} cancellati</p>
              </div>
            </div>

          </div>
        );
      })()}

      {/* Amazon simulation trigger */}
      {onOpenAmazon && (
        <button
          onClick={onOpenAmazon}
          className="mx-4 mb-2 rounded-2xl px-4 py-3.5 flex items-center gap-3"
          style={{ background: "#131921", border: "1px solid #2d3347", cursor: "pointer", width: "calc(100% - 32px)" }}
        >
          <span style={{ fontSize: 22 }}>🛒</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Simula acquisto Amazon</p>
            <p style={{ fontSize: 11, color: "#6b7280" }}>Lucy ti avvisa prima che tu paghi</p>
          </div>
          <div
            className="flex items-center justify-center rounded-full font-extrabold"
            style={{ width: 24, height: 24, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontSize: 11, flexShrink: 0 }}
          >
            L
          </div>
        </button>
      )}
    </div>
  );
}
