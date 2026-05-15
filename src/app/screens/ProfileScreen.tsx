import { useState } from "react";
import { CheckCircle2, XCircle, Target, ChevronRight, Edit3 } from "lucide-react";
import { behaviorPatterns, profileStats } from "../data/mockData";

// ─── Obiettivi mock ───────────────────────────────────────────────────────────
const obiettivi = [
  { id: "o1", icon: "💰", label: "Risparmio mensile",      value: "€200",    sub: "target mensile",       color: "#34d399" },
  { id: "o2", icon: "📅", label: "Budget spese",           value: "€1.130",  sub: "limite mensile",       color: "#818cf8" },
  { id: "o3", icon: "🛵", label: "Max ordini delivery",    value: "2/sett",  sub: "limite settimanale",   color: "#fb923c" },
  { id: "o4", icon: "💳", label: "Max rate BNPL",          value: "€100/m",  sub: "soglia mensile",       color: "#f59e0b" },
];

export default function ProfileScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const saved = profileStats.find(s => s.label === "Totale risparmiato");

  return (
    <div className="flex flex-col gap-4 px-4 py-4 overflow-y-auto flex-1">

      {/* Header */}
      <div>
        <p className="text-xs" style={{ color: "#6b7280" }}>Modulo Profilazione</p>
        <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>Il tuo profilo 🧠</h1>
      </div>

      {/* Totale risparmiato — hero stat */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, #0f2318 0%, #1e2235 100%)", border: "1px solid rgba(52,211,153,0.2)" }}
      >
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>Totale risparmiato con Kairos</p>
        <p className="text-4xl font-extrabold" style={{ color: "#34d399", lineHeight: 1.1 }}>{saved?.value}</p>
        <p className="text-xs mt-1.5" style={{ color: "#4b5563" }}>Da quando usi l'app · maggio 2026</p>
      </div>

      {/* 3 stat pills */}
      <div className="grid grid-cols-3 gap-2">
        {profileStats.filter(s => s.label !== "Totale risparmiato").map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-3 flex flex-col items-center gap-1"
            style={{ background: "#1e2235" }}
          >
            <span style={{ fontSize: 20 }}>{stat.icon}</span>
            <p className="text-xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
            <p style={{ fontSize: 9, color: "#6b7280", textAlign: "center", lineHeight: 1.3 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Personalizzazione obiettivi ─────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target size={14} style={{ color: "#818cf8" }} />
            <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>I tuoi obiettivi</p>
          </div>
          <p style={{ fontSize: 10, color: "#818cf8" }}>Tocca per modificare</p>
        </div>

        <div className="flex flex-col rounded-2xl overflow-hidden" style={{ background: "#1e2235" }}>
          {obiettivi.map((ob, i) => (
            <div key={ob.id}>
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                style={{ borderBottom: i < obiettivi.length - 1 ? "1px solid #2d3347" : "none" }}
                onClick={() => setExpanded(expanded === ob.id ? null : ob.id)}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: 36, height: 36, background: ob.color + "18", flexShrink: 0 }}
                >
                  <span style={{ fontSize: 16 }}>{ob.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#e2e8f0" }}>{ob.label}</p>
                  <p style={{ fontSize: 10, color: "#6b7280" }}>{ob.sub}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p style={{ fontSize: 14, fontWeight: 700, color: ob.color }}>{ob.value}</p>
                  <Edit3 size={12} style={{ color: "#4b5563" }} />
                </div>
              </button>

              {/* Expanded edit mock */}
              {expanded === ob.id && (
                <div className="px-4 pb-4" style={{ background: "#141824" }}>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>
                    Modifica obiettivo
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold"
                      style={{ background: "#1e2235", color: ob.color, border: `1px solid ${ob.color}44` }}
                    >
                      {ob.value}
                    </div>
                    <button
                      className="rounded-xl px-4 py-2.5 text-xs font-bold"
                      style={{ background: ob.color, color: "#0a0b14" }}
                      onClick={() => setExpanded(null)}
                    >
                      Salva
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Pattern da risolvere ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <XCircle size={14} style={{ color: "#f87171" }} />
          <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Pattern da risolvere</p>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(248,113,113,0.15)", color: "#f87171" }}
          >
            {behaviorPatterns.negative.length}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {behaviorPatterns.negative.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl p-4 flex items-start gap-3"
              style={{ background: "#1e2235", borderLeft: `3px solid ${p.color}` }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{p.text}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "#2d3347", color: "#9ca3af" }}
                  >
                    {p.frequency}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#f87171" }}>{p.impact}</span>
                </div>
              </div>
              <ChevronRight size={14} style={{ color: "#4b5563", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Pattern risolti ──────────────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={14} style={{ color: "#34d399" }} />
          <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>Pattern risolti</p>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(52,211,153,0.15)", color: "#34d399" }}
          >
            {behaviorPatterns.resolved.length}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {behaviorPatterns.resolved.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: "#0f2318", border: "1px solid rgba(52,211,153,0.15)" }}
            >
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <p style={{ flex: 1, fontSize: 12, color: "#d1fae5" }}>{p.text}</p>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399", flexShrink: 0 }}>
                {p.improvement}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
