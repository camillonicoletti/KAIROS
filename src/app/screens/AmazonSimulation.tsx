import { useState, useEffect } from "react";
import { ArrowLeft, X, AlertTriangle, ShoppingCart, ChevronRight } from "lucide-react";

interface Props { onClose: () => void }

// The item being purchased on Amazon
const ITEM = {
  name: "Sony WH-1000XM5 Cuffie Wireless",
  price: 279,
  installments: 3,
  monthlyRate: 93,
  provider: "Scalapay",
  img: "🎧",
};

// Budget snapshot (mirrors BankingScreen mock data)
const BUDGET_SPENT   = 1111;
const BUDGET_TOTAL   = 1130;
const BNPL_MONTHLY   = 47;   // existing BNPL
const SUBS_MONTHLY   = 31;   // active subscriptions

type Phase = "checkout" | "notif" | "warning";

// ─── Lucy notification pill ──────────────────────────────────────────────────
function LucyNotifPill({ onTap }: { onTap: () => void }) {
  return (
    <div
      onClick={onTap}
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        cursor: "pointer",
        animation: "slideDown 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
      }}
    >
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)      scale(1);   }
        }
      `}</style>
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #1a1235 0%, #2d1b69 100%)",
          border: "1px solid rgba(167,139,250,0.5)",
          boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
          minWidth: 260,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full text-xs font-extrabold"
          style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", flexShrink: 0 }}
        >
          L
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", margin: 0 }}>Lucy · Avviso budget</p>
          <p style={{ fontSize: 11, color: "#e2e8f0", margin: 0 }}>Attento, rischi di sforare il budget!</p>
        </div>
        <ChevronRight size={14} style={{ color: "#a78bfa", flexShrink: 0 }} />
      </div>
    </div>
  );
}

// ─── Fake Amazon checkout page ───────────────────────────────────────────────
function AmazonCheckout({ onClose, showNotif, onNotifTap }: {
  onClose: () => void;
  showNotif: boolean;
  onNotifTap: () => void;
}) {
  const cards = [
    { logo: "🔵", brand: "Revolut Visa",      sub: "Camillo Nicoletti",  last4: "6775", active: true  },
    { logo: "🟡", brand: "MasterCard",         sub: "Nicoletti Camillo",  last4: "3421", active: false },
    { logo: "🟢", brand: "buddybank debit",    sub: "CAMILLO NICOLETTI",  last4: null,   active: false, muted: true },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#fff", zIndex: 100 }}>
      {/* Amazon header */}
      <div className="flex items-center px-4 pt-14 pb-3" style={{ background: "#131921", gap: 12 }}>
        <button onClick={onClose}>
          <ArrowLeft size={20} style={{ color: "#fff" }} />
        </button>
        <p style={{ color: "#fff", fontSize: 16, fontWeight: 600, flex: 1 }}>Seleziona una Modalità di pagame...</p>
      </div>

      {/* Item summary */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#f0f2f2", borderBottom: "1px solid #ddd" }}>
        <span style={{ fontSize: 32 }}>{ITEM.img}</span>
        <div>
          <p style={{ fontSize: 12, color: "#111", fontWeight: 500 }}>{ITEM.name}</p>
          <p style={{ fontSize: 13, color: "#B12704", fontWeight: 700 }}>€{ITEM.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="flex flex-col" style={{ background: "#fff", flex: 1, overflowY: "auto" }}>
        {cards.map((c, i) => (
          <div
            key={i}
            className="flex items-center px-4 py-4"
            style={{
              borderBottom: "1px solid #e7e7e7",
              opacity: c.muted ? 0.45 : 1,
            }}
          >
            {/* Card thumbnail */}
            <div
              className="rounded-lg flex items-center justify-center mr-4"
              style={{ width: 64, height: 44, background: i === 0 ? "#2d3a8c" : i === 1 ? "#e8c84a" : "#7ec8a0", flexShrink: 0 }}
            >
              <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>
                {i === 0 ? "Revolut" : i === 1 ? "isybank" : "b buddybank"}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, color: c.muted ? "#aaa" : "#111", fontWeight: 500 }}>{c.brand}</p>
              <p style={{ fontSize: 12, color: "#555" }}>{c.sub}{c.last4 ? ` · ${c.last4}` : ""}</p>
            </div>
            <div
              className="rounded-full border-2 flex items-center justify-center"
              style={{
                width: 20, height: 20,
                borderColor: c.active ? "#FF9900" : "#aaa",
                background: c.active ? "#FF9900" : "transparent",
              }}
            >
              {c.active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
            </div>
          </div>
        ))}

        {/* Generic card icon row */}
        <div className="flex items-center px-4 py-4" style={{ borderBottom: "1px solid #e7e7e7" }}>
          <div className="rounded-lg flex items-center justify-center mr-4" style={{ width: 64, height: 44, background: "#f0f2f2", flexShrink: 0 }}>
            <ShoppingCart size={20} style={{ color: "#555" }} />
          </div>
          <p style={{ fontSize: 14, color: "#111" }}>Aggiungi carta di credito</p>
        </div>

        {/* Scalapay / rate */}
        <div className="px-4 py-4" style={{ borderBottom: "1px solid #e7e7e7", background: "#fffbf0" }}>
          <div className="flex items-start gap-3">
            <div className="rounded-lg flex items-center justify-center" style={{ width: 64, height: 44, background: "#ff6900", flexShrink: 0 }}>
              <p style={{ fontSize: 9, color: "#fff", fontWeight: 800, textAlign: "center", lineHeight: 1.2 }}>3x 6x{"\n"}12x 24x</p>
            </div>
            <div>
              <p style={{ fontSize: 14, color: "#111", fontWeight: 600 }}>Paga a rate con {ITEM.provider}</p>
              <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>3 rate da €{ITEM.monthlyRate} senza interessi</p>
              <p style={{ fontSize: 11, color: "#007185", marginTop: 4 }}>Maggiori informazioni</p>
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="flex items-center justify-between px-4 py-4">
          <p style={{ fontSize: 14, color: "#111" }}>Aggiungi un buono regalo, un codice promozionale o un coupon</p>
          <div
            className="rounded-full"
            style={{ width: 44, height: 26, background: "#ccc", padding: 2, display: "flex", alignItems: "center" }}
          >
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff" }} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-6 pt-3" style={{ borderTop: "1px solid #ddd", background: "#fff" }}>
        <button
          className="w-full rounded-full py-3 font-semibold text-sm"
          style={{ background: "#FF9900", color: "#111" }}
        >
          Usa questa modalità di pagamento
        </button>
      </div>

      {/* Lucy notification overlay */}
      {showNotif && <LucyNotifPill onTap={onNotifTap} />}
    </div>
  );
}

// ─── Lucy budget warning screen ───────────────────────────────────────────────
function LucyWarning({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  const newMonthlyImpact = ITEM.monthlyRate;
  const totalAfter = BUDGET_SPENT + newMonthlyImpact;
  const overshoot = totalAfter - BUDGET_TOTAL;
  const isOver = overshoot > 0;

  const rows = [
    { label: "Hai già speso",          value: BUDGET_SPENT,       color: "#e2e8f0" },
    { label: "Abbonamenti questo mese",value: SUBS_MONTHLY,        color: "#818cf8" },
    { label: "Rate BNPL attive",        value: BNPL_MONTHLY,        color: "#f97316" },
    { label: `1ª rata ${ITEM.provider}`,value: newMonthlyImpact,   color: "#f87171" },
  ];
  const grandTotal = BUDGET_SPENT + SUBS_MONTHLY + BNPL_MONTHLY + newMonthlyImpact;

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#0a0b14", zIndex: 150, overflowY: "auto" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full font-extrabold"
            style={{ width: 36, height: 36, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontSize: 16 }}
          >
            L
          </div>
          <div>
            <p style={{ fontSize: 11, color: "#a78bfa" }}>Lucy · Analisi acquisto</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>Sto guardando il tuo budget</p>
          </div>
        </div>
        <button onClick={onClose}>
          <X size={20} style={{ color: "#6b7280" }} />
        </button>
      </div>

      {/* Item card */}
      <div className="mx-4 mb-4 rounded-2xl p-4 flex items-center gap-3" style={{ background: "#1e2235" }}>
        <span style={{ fontSize: 36 }}>{ITEM.img}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, color: "#9ca3af" }}>Stai acquistando</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{ITEM.name}</p>
          <p style={{ fontSize: 12, color: "#a78bfa", marginTop: 2 }}>
            {ITEM.installments}x €{ITEM.monthlyRate}/mese · {ITEM.provider}
          </p>
        </div>
        <p style={{ fontSize: 18, fontWeight: 800, color: "#f1f5f9" }}>€{ITEM.price}</p>
      </div>

      {/* Verdict badge */}
      <div
        className="mx-4 mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{
          background: isOver ? "rgba(239,68,68,0.1)" : "rgba(52,211,153,0.1)",
          border: `1px solid ${isOver ? "rgba(239,68,68,0.35)" : "rgba(52,211,153,0.35)"}`,
        }}
      >
        <AlertTriangle size={20} style={{ color: isOver ? "#f87171" : "#34d399", flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: isOver ? "#f87171" : "#34d399" }}>
            {isOver ? "Acquisto sconsigliato" : "Acquisto fattibile"}
          </p>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
            {isOver
              ? `Sfori il budget di €${overshoot} questo mese`
              : `Ti rimangono €${BUDGET_TOTAL - totalAfter} dopo questo acquisto`}
          </p>
        </div>
      </div>

      {/* Budget breakdown */}
      <p className="px-5 mb-2 text-xs font-semibold" style={{ color: "#6b7280", letterSpacing: "0.08em" }}>ANALISI DEL MESE</p>
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: "#1e2235" }}>
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: i < rows.length - 1 ? "1px solid #2d3347" : "none" }}
          >
            <div className="flex items-center gap-2">
              <div style={{ width: 3, height: 28, borderRadius: 2, background: r.color, flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: "#d1d5db" }}>{r.label}</p>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: r.color }}>€{r.value}</p>
          </div>
        ))}
        {/* Total row */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#161929", borderTop: "1px solid #2d3347" }}
        >
          <p style={{ fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>Totale stimato</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: isOver ? "#f87171" : "#34d399" }}>
            €{grandTotal}
          </p>
        </div>
        {/* Budget line */}
        <div className="flex items-center justify-between px-4 pb-3" style={{ background: "#161929" }}>
          <p style={{ fontSize: 11, color: "#6b7280" }}>Budget mensile</p>
          <p style={{ fontSize: 11, color: "#6b7280" }}>€{BUDGET_TOTAL}</p>
        </div>
      </div>

      {/* Lucy message */}
      <div className="mx-4 mb-6 rounded-2xl px-4 py-3" style={{ background: "#161929", border: "1px solid #2d3347" }}>
        <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>
          💬 <span style={{ color: "#a78bfa", fontWeight: 600 }}>Lucy dice:</span>{" "}
          {isOver
            ? `Ho analizzato le tue spese di maggio: hai già usato €${BUDGET_SPENT} su €${BUDGET_TOTAL} di budget. Con questa rata e i tuoi impegni fissi prevedi di sforare di €${overshoot}. Ti consiglio di aspettare giugno o di valutare un acquisto diretto senza rate.`
            : `Questo acquisto è fattibile! Resterai comunque dentro al budget mensile. Tieni d'occhio le spese nei prossimi giorni.`}
        </p>
      </div>

      {/* CTAs */}
      <div className="px-4 pb-8 flex flex-col gap-3 mt-auto">
        <button
          onClick={onClose}
          className="w-full rounded-2xl py-3.5 font-bold text-sm"
          style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff" }}
        >
          Annulla acquisto
        </button>
        <button
          onClick={onContinue}
          className="w-full rounded-2xl py-3.5 font-semibold text-sm"
          style={{ background: "#1e2235", color: "#6b7280" }}
        >
          Continua comunque
        </button>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function AmazonSimulation({ onClose }: Props) {
  const [phase, setPhase] = useState<Phase>("checkout");

  // Auto-show Lucy notification after 2s
  useEffect(() => {
    if (phase !== "checkout") return;
    const t = setTimeout(() => setPhase("notif"), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <>
      {(phase === "checkout" || phase === "notif") && (
        <AmazonCheckout
          onClose={onClose}
          showNotif={phase === "notif"}
          onNotifTap={() => setPhase("warning")}
        />
      )}
      {phase === "warning" && (
        <LucyWarning
          onClose={onClose}
          onContinue={onClose}
        />
      )}
    </>
  );
}
