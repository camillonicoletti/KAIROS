import { useState, useRef, useEffect } from "react";
import { Send, Lock } from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
} from "recharts";
import { weeklyReport, achievements, user } from "../data/mockData";

interface ChatMsg { role: "user" | "lucy"; text: string; }

const lucyReplies: Record<string, string> = {
  default:    "Posso aiutarti a capire i tuoi dati, spiegare un pattern o darti consigli personalizzati. Prova a chiedermi qualcosa!",
  bnpl:       "Le tue rate BNPL attive costano €131/mese, il 22% del reddito stimato. Ti consiglio di non aprire nuovi piani finché non chiudi almeno quello di Scalapay.",
  delivery:   "Questa settimana hai evitato 3 ordini per €53 risparmiati. Il tuo frigo aveva ingredienti per 2 ricette — continua così!",
  tiktok:     "TikTok è correlato al 40% in più di acquisti impulsivi nelle ore successive. Il limite da 45 min che hai impostato sta funzionando: −60% acquisti correlati.",
  risparmio:  "Hai già risparmiato €284 dall'attivazione. Al tuo obiettivo di €300 mancano solo €16 — ce la fai questa settimana!",
  budget:     "Hai usato €1111 su €1130 di budget mensile. Stai andando bene, ma attenzione: hai ancora 16 giorni e impegni fissi (barbiere, palestra, lenti) in arrivo.",
  abbonamenti:"Hai 4 abbonamenti attivi per €31/mese. Hai già cancellato 2 abbonamenti risparmiando €36/mese. Vuoi che analizzi quelli ancora attivi?",
};

const suggestions = ["Come sto con i risparmi?", "Analizza i miei BNPL", "Com'è il mio budget?"];

function getBotReply(msg: string): string {
  const low = msg.toLowerCase();
  if (low.includes("bnpl") || low.includes("rata") || low.includes("klarna") || low.includes("scalapay")) return lucyReplies.bnpl;
  if (low.includes("delivery") || low.includes("ordine") || low.includes("food") || low.includes("frigo")) return lucyReplies.delivery;
  if (low.includes("tiktok") || low.includes("social") || low.includes("acquisti")) return lucyReplies.tiktok;
  if (low.includes("risparmio") || low.includes("risparmiato") || low.includes("obiettivo")) return lucyReplies.risparmio;
  if (low.includes("budget") || low.includes("spese") || low.includes("mese")) return lucyReplies.budget;
  if (low.includes("abbonament") || low.includes("netflix") || low.includes("spotify")) return lucyReplies.abbonamenti;
  return lucyReplies.default;
}

const radarData = [
  { area: "Finanza",   score: 100 - weeklyReport.finance.bnplIncome },
  { area: "Food",      score: 100 - Math.round((weeklyReport.food.deliveryOrders / 5) * 100) },
  { area: "Social",    score: 100 - weeklyReport.social.impulsiveCorrelation },
  { area: "Risparmio", score: Math.min(Math.round((284.6 / 300) * 100), 100) },
  { area: "Abitudini", score: 72 },
];

export default function ReportScreen() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "lucy", text: "Ciao! Sono Lucy 👋 Chiedimi tutto sulle tue spese, i tuoi pattern o i tuoi risparmi. Sono qui per aiutarti." },
  ]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    setMsgs(prev => [
      ...prev,
      { role: "user", text: t },
      { role: "lucy", text: getBotReply(t) },
    ]);
    setInput("");
  }

  function openChat() {
    setChatOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Scrollable content — hidden when chat is open */}
      <div className="flex flex-col gap-4 px-4 py-4 overflow-y-auto flex-1 min-h-0" style={{ display: chatOpen ? "none" : undefined }}>

        {/* Header */}
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Briefing settimanale</p>
          <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>Settimana {user.weekNumber} 📊</h1>
        </div>

        {/* Radar banner */}
        <div className="rounded-2xl p-4" style={{ background: "#1e2235" }}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: "#e2e8f0" }}>Overview comportamentale</h3>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>Score questa settimana su 5 aree</p>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2d3347" />
              <PolarAngleAxis dataKey="area" tick={{ fill: "#6b7280", fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: "#1e2235", border: "1px solid #2d3347", borderRadius: 8 }}
                labelStyle={{ color: "#e2e8f0", fontSize: 11 }}
                itemStyle={{ color: "#818cf8", fontSize: 11 }}
              />
              <Radar name="Score" dataKey="score" stroke="#818cf8" fill="#818cf8" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl p-4" style={{ background: "#1e2235" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "#e2e8f0" }}>🏆 Achievement</h3>
          <div className="flex flex-col gap-2">
            {achievements.map((a) => (
              <div
                key={a.id}
                className="rounded-xl p-3 flex items-center gap-3"
                style={{ background: a.unlocked ? "#141824" : "#0d0f1a", opacity: a.unlocked ? 1 : 0.6 }}
              >
                <span className="text-2xl">{a.unlocked ? a.icon : "🔒"}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium" style={{ color: a.unlocked ? "#e2e8f0" : "#4b5563" }}>{a.title}</p>
                  {a.unlocked ? (
                    <p className="text-[10px] mt-0.5" style={{ color: "#34d399" }}>Sbloccato · {a.date}</p>
                  ) : (
                    <div className="mt-1.5">
                      <div className="h-1 rounded-full w-full" style={{ background: "#2d3347" }}>
                        <div className="h-1 rounded-full" style={{ width: `${a.progress}%`, background: "#818cf8" }} />
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color: "#6b7280" }}>{a.progress}% completato</p>
                    </div>
                  )}
                </div>
                {!a.unlocked && <Lock size={12} style={{ color: "#4b5563" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Lucy — collapsed bar inside scroll so appare in fondo */}
        <button
          onClick={openChat}
          className="flex items-center gap-3 px-4 rounded-2xl flex-shrink-0 mb-2"
          style={{ height: 52, background: "#1e2235", border: "1px solid rgba(167,139,250,0.25)", width: "100%" }}
        >
          <div
            className="flex items-center justify-center rounded-full font-extrabold flex-shrink-0"
            style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontSize: 12 }}
          >
            L
          </div>
          <span style={{ flex: 1, fontSize: 12, color: "#6b7280", textAlign: "left" }}>Chiedi qualcosa a Lucy…</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontSize: 9, color: "#34d399" }}>online</span>
          </div>
        </button>

      </div>

      {/* Lucy — expanded chat (full screen when open) */}
      {chatOpen && (
        <div className="flex flex-col flex-1 min-h-0 mx-4 mb-2 rounded-2xl overflow-hidden" style={{ background: "#1e2235", border: "1px solid rgba(167,139,250,0.25)" }}>
          {/* Header with back button */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ borderBottom: "1px solid #2d3347", background: "linear-gradient(135deg,#1a1235,#1e2235)" }}>
            <button
              onClick={() => setChatOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#2d3347" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div
              className="flex items-center justify-center rounded-full font-extrabold flex-shrink-0"
              style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontSize: 12 }}
            >
              L
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>Lucy</p>
              <p style={{ fontSize: 10, color: "#a78bfa" }}>Assistente personale</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
              <span style={{ fontSize: 9, color: "#34d399" }}>online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto flex-1 min-h-0">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "lucy" && (
                  <div
                    className="flex items-center justify-center rounded-full font-extrabold flex-shrink-0 self-end"
                    style={{ width: 22, height: 22, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontSize: 10 }}
                  >
                    L
                  </div>
                )}
                <div
                  className="max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed"
                  style={
                    m.role === "user"
                      ? { background: "#818cf8", color: "#fff", borderBottomRightRadius: 4 }
                      : { background: "#141824", color: "#d1d5db", borderBottomLeftRadius: 4 }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {msgs.length <= 2 && (
            <div className="flex gap-2 px-4 pb-2 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: "none" }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { send(s); }}
                  className="rounded-full px-3 py-1.5 text-[11px] font-medium whitespace-nowrap"
                  style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)", flexShrink: 0 }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0" style={{ borderTop: "1px solid #2d3347" }}>
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-xs outline-none"
              style={{ color: "#e2e8f0" }}
              placeholder="Scrivi a Lucy…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
            />
            <button
              onClick={() => send(input)}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: input.trim() ? "linear-gradient(135deg,#7c3aed,#a78bfa)" : "#2d3347" }}
            >
              <Send size={13} style={{ color: input.trim() ? "#fff" : "#4b5563" }} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
