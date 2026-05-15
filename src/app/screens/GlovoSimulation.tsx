import { useState, useEffect } from "react";

function FakeMap() {
  return (
    <div style={{ width: "100%", height: 160, background: "#2a2e35", borderRadius: 12, overflow: "hidden", position: "relative", marginBottom: 12 }}>
      {/* Road grid */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Horizontal roads */}
        <div style={{ position: "absolute", top: "38%", left: 0, right: 0, height: 14, background: "#3d4550" }} />
        <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: 8, background: "#363d47" }} />
        <div style={{ position: "absolute", top: "20%", left: 0, right: 0, height: 6, background: "#363d47" }} />
        {/* Vertical roads */}
        <div style={{ position: "absolute", left: "30%", top: 0, bottom: 0, width: 12, background: "#3d4550" }} />
        <div style={{ position: "absolute", left: "60%", top: 0, bottom: 0, width: 8, background: "#363d47" }} />
        <div style={{ position: "absolute", left: "15%", top: 0, bottom: 0, width: 6, background: "#363d47" }} />
        {/* Diagonal road */}
        <div style={{ position: "absolute", top: "10%", left: "55%", width: 8, height: "60%", background: "#3d4550", transform: "rotate(25deg)", transformOrigin: "top" }} />
        {/* Blue highlight roads */}
        <div style={{ position: "absolute", top: "37%", left: 0, right: 0, height: 16, background: "rgba(74,144,226,0.55)" }} />
        <div style={{ position: "absolute", left: "29%", top: 0, bottom: 0, width: 14, background: "rgba(74,144,226,0.4)" }} />
        {/* Blocks/buildings */}
        <div style={{ position: "absolute", top: "42%", left: "32%", width: "26%", height: "22%", background: "#32383f", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: "15%", left: "16%", width: "12%", height: "20%", background: "#32383f", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: "70%", left: "62%", width: "18%", height: "20%", background: "#32383f", borderRadius: 2 }} />
      </div>
      {/* "Ramada by Wyndham Naples" label */}
      <div style={{ position: "absolute", top: "18%", left: "40%", background: "rgba(40,44,52,0.92)", borderRadius: 5, padding: "2px 6px", display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: "#666", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>🏨</div>
        <span style={{ fontSize: 9, color: "#ccc", fontWeight: 500 }}>Ramada by Wyndham Naples</span>
      </div>
      {/* Green pin */}
      <div style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#00d166", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.5)" }} />
        <div style={{ width: 2, height: 10, background: "#00d166", marginTop: -1 }} />
      </div>
      {/* Google watermark */}
      <div style={{ position: "absolute", bottom: 6, left: 8 }}>
        <span style={{ fontSize: 9, color: "#888", fontWeight: 600 }}>Google</span>
      </div>
      {/* Road label */}
      <div style={{ position: "absolute", bottom: 16, right: 20 }}>
        <span style={{ fontSize: 9, color: "#aaa" }}>Strettola S.</span>
      </div>
    </div>
  );
}

function GlovoCheckout({ onClose, onNotificationClick }: { onClose: () => void; onNotificationClick: () => void }) {
  const [showNotif, setShowNotif] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowNotif(true);
      setTimeout(() => setNotifVisible(true), 50);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", zIndex: 100, borderRadius: 46, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Glovo status bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 0", flexShrink: 0 }}>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>03:38</span>
        <div style={{ background: "#1a1a1a", borderRadius: 999, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12 }}>🔦</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="#fff" />
            <rect x="3.5" y="5" width="2.5" height="6" rx="0.5" fill="#fff" />
            <rect x="7" y="3" width="2.5" height="8" rx="0.5" fill="#fff" />
            <rect x="10.5" y="1" width="2.5" height="10" rx="0.5" fill="#fff" opacity="0.4" />
          </svg>
          <div style={{ width: 22, height: 11, border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 3, padding: 1.5, display: "flex", alignItems: "center" }}>
            <div style={{ width: "30%", height: "100%", background: "#f87171", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", position: "relative", flexShrink: 0 }}>
        <button onClick={onClose} style={{ position: "absolute", left: 20, background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0, lineHeight: 1 }}>
          ‹
        </button>
        <span style={{ color: "#fff", fontSize: 17, fontWeight: 600 }}>Checkout</span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 120px" }}>
        {/* Order section */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 3px" }}>Il tuo ordine</h2>
            <p style={{ color: "#fff", fontSize: 14, margin: 0 }}>1 prodotto da <strong>McDonald's</strong></p>
          </div>
          <span style={{ color: "#fff", fontSize: 20 }}>∨</span>
        </div>

        {/* Delivery address */}
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 12px" }}>Indirizzo di consegna</h2>
        <FakeMap />

        {/* Address row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #00d166", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d166" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, margin: "0 0 2px" }}>Corso Arnaldo Lucci, 174</p>
            <p style={{ color: "#f59e0b", fontSize: 13, margin: 0, fontWeight: 600 }}>Nessun indirizzo impostato</p>
          </div>
          <span style={{ color: "#555", fontSize: 18 }}>›</span>
        </div>

        {/* Send to someone else */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🗑️</div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, margin: "0 0 2px" }}>Vuoi inviarlo a qualcun altro?</p>
            <p style={{ color: "#888", fontSize: 12, margin: 0 }}>Aggiungi i loro dettagli per aiutare il corriere</p>
          </div>
          <span style={{ color: "#555", fontSize: 18 }}>›</span>
        </div>

        {/* Delivery options */}
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "20px 0 12px" }}>
          Opzioni di consegna <span style={{ fontSize: 14, fontWeight: 400, color: "#888" }}>ⓘ</span>
        </h2>
        <div style={{ border: "1px solid #333", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #222" }}>
            <div>
              <p style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>Programma</p>
              <p style={{ color: "#888", fontSize: 13, margin: 0 }}>Seleziona ora</p>
            </div>
            <span style={{ color: "#888", fontSize: 18 }}>∧</span>
          </div>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #222", background: "#0d0d0d" }}>
            <div style={{ border: "1px solid #333", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 8 }}>
              <span style={{ color: "#888", fontSize: 14, fontWeight: 600 }}>Standard</span>
              <span style={{ color: "#555", fontSize: 14 }}>Il locale è chiuso</span>
            </div>
          </div>
          <div style={{ padding: "12px 16px", background: "#0d0d0d" }}>
            <div style={{ border: "2px solid #fff", borderRadius: 8, padding: "10px 14px" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Programma </span>
              <span style={{ color: "#888", fontSize: 14 }}>Seleziona ora</span>
            </div>
          </div>
        </div>
      </div>

      {/* Apple Pay button */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px 36px", background: "linear-gradient(to top, #000 80%, transparent)" }}>
        <button style={{ width: "100%", padding: "16px", borderRadius: 999, background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 17, fontWeight: 600, color: "#000" }}>
          Paga con  Pay
        </button>
      </div>

      {/* Kairos notification */}
      {showNotif && (
        <div
          onClick={onNotificationClick}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 110,
            padding: "12px 12px 0",
            transform: notifVisible ? "translateY(0)" : "translateY(-120%)",
            transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div style={{
            background: "rgba(22,24,36,0.97)", backdropFilter: "blur(24px)",
            borderRadius: 18, padding: "12px 14px",
            display: "flex", gap: 12, alignItems: "center",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
            border: "1px solid rgba(129,140,248,0.3)",
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              🌿
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                <span style={{ color: "#a5b4fc", fontSize: 12, fontWeight: 700 }}>Kairos</span>
                <span style={{ color: "#4b5563", fontSize: 10 }}>adesso</span>
              </div>
              <p style={{ color: "#f1f5f9", fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                Aspetta! 🍗 Hai pollo e patate in frigo — risparmia <span style={{ color: "#34d399", fontWeight: 700 }}>€24.90</span> cucinando a casa
              </p>
            </div>
          </div>
          <p style={{ color: "#374151", fontSize: 9, textAlign: "center", margin: "5px 0 0" }}>tocca per vedere l'alternativa</p>
        </div>
      )}
    </div>
  );
}

function KairosIntervention({ onClose, onOrder }: { onClose: () => void; onOrder: () => void }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0b14", zIndex: 110, borderRadius: 46, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
          <div>
            <p style={{ color: "#818cf8", fontSize: 11, margin: 0, fontWeight: 600 }}>KAIROS · INTERVENTO</p>
            <p style={{ color: "#4b5563", fontSize: 10, margin: 0 }}>rilevato checkout Glovo</p>
          </div>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", color: "#4b5563", fontSize: 20, cursor: "pointer", padding: 0 }}>✕</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Warning banner */}
        <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.35)", borderRadius: 20, padding: 18 }}>
          <p style={{ color: "#a5b4fc", fontSize: 12, margin: "0 0 4px", fontWeight: 600 }}>Stai per spendere</p>
          <p style={{ color: "#f1f5f9", fontSize: 30, fontWeight: 900, margin: "0 0 2px" }}>€24.90</p>
          <p style={{ color: "#6b7280", fontSize: 12, margin: 0 }}>su McDonald's via Glovo</p>
        </div>

        {/* Recipe suggestion */}
        <div style={{ background: "linear-gradient(135deg,#0f2318,#0f3f2a)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 20, padding: 16 }}>
          <p style={{ color: "#6b7280", fontSize: 11, margin: "0 0 8px" }}>Lucy suggerisce</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 40 }}>🍗</span>
            <div>
              <p style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 800, margin: "0 0 3px" }}>Pollo con Patate e Verdure</p>
              <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 6px" }}>30 min · usa quello che hai</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ color: "#34d399", fontSize: 22, fontWeight: 900 }}>€0.00</span>
                <span style={{ color: "#4b5563", fontSize: 12, textDecoration: "line-through" }}>€24.90</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "rgba(52,211,153,0.1)", borderRadius: 10, padding: "8px 12px" }}>
            <p style={{ color: "#34d399", fontSize: 12, fontWeight: 700, margin: 0 }}>💰 Risparmio: €24.90 rispetto al delivery</p>
          </div>
        </div>

        {/* What's in fridge */}
        <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)", backdropFilter: "blur(24px) saturate(180%)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.35)", borderRadius: 20, padding: 16 }}>
          <p style={{ color: "#34d399", fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>🧊 Hai già in frigo</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {[["🍗","Petto di pollo","scade domani","critical"],["🥔","Patate","4 giorni","ok"],["🥦","Verdure miste","3 giorni","ok"],["🧅","Cipolla","7 giorni","ok"]].map(([emoji, name, days, status]) => (
              <div key={name} style={{ background: "#141824", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, border: `1px solid ${status === "critical" ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.2)"}` }}>
                <span style={{ fontSize: 20 }}>{emoji}</span>
                <div>
                  <p style={{ color: "#f1f5f9", fontSize: 12, fontWeight: 700, margin: 0 }}>{name}</p>
                  <p style={{ color: status === "critical" ? "#f87171" : "#34d399", fontSize: 9, margin: 0 }}>{days}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calorie banner */}
        <div style={{ background: "linear-gradient(135deg,#431407,#7c2d12)", border: "1px solid rgba(251,146,60,0.35)", borderRadius: 20, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <p style={{ color: "#fb923c", fontSize: 12, fontWeight: 700, margin: 0 }}>Impatto calorico</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {/* McDonald's column */}
            <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: 14, padding: "12px", textAlign: "center" as const }}>
              <span style={{ fontSize: 24 }}>🍔</span>
              <p style={{ color: "#fb923c", fontSize: 20, fontWeight: 900, margin: "6px 0 2px", lineHeight: 1 }}>1 180</p>
              <p style={{ color: "#fdba74", fontSize: 9, fontWeight: 600, margin: 0 }}>kcal</p>
              <p style={{ color: "#6b7280", fontSize: 9, margin: "4px 0 0" }}>McDonald's via Glovo</p>
            </div>
            {/* VS */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <p style={{ color: "#4b5563", fontSize: 11, fontWeight: 700, margin: 0 }}>VS</p>
            </div>
            {/* Home cooking column */}
            <div style={{ flex: 1, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 14, padding: "12px", textAlign: "center" as const }}>
              <span style={{ fontSize: 24 }}>🍗</span>
              <p style={{ color: "#34d399", fontSize: 20, fontWeight: 900, margin: "6px 0 2px", lineHeight: 1 }}>620</p>
              <p style={{ color: "#6ee7b7", fontSize: 9, fontWeight: 600, margin: 0 }}>kcal</p>
              <p style={{ color: "#6b7280", fontSize: 9, margin: "4px 0 0" }}>Pollo con verdure</p>
            </div>
          </div>
          {/* Saved calories row */}
          <div style={{ marginTop: 10, background: "rgba(251,146,60,0.12)", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "#fdba74", fontSize: 11, fontWeight: 600, margin: 0 }}>🏃 Calorie risparmiate</p>
            <p style={{ color: "#fb923c", fontSize: 14, fontWeight: 900, margin: 0 }}>−560 kcal</p>
          </div>
          <p style={{ color: "#78350f", fontSize: 10, margin: "8px 0 0", textAlign: "center" as const }}>
            Equivale a ~50 minuti di corsa
          </p>
        </div>

        {/* Action buttons — inside scroll so bisogna scorrere per vederli */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 8 }}>
          <button style={{ width: "100%", padding: "16px", borderRadius: 16, background: "linear-gradient(135deg,#0f3f2a,#0f2318)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
            🍳 Cucina a casa — risparmia €24.90
          </button>
          <button onClick={onOrder} style={{ width: "100%", padding: "13px", borderRadius: 16, background: "transparent", border: "1px solid #2d3347", color: "#4b5563", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Ordina comunque su Glovo
          </button>
        </div>

      </div>
    </div>
  );
}

export function GlovoSimulation({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"glovo" | "kairos">("glovo");

  return (
    <>
      {phase === "glovo" && (
        <GlovoCheckout
          onClose={onClose}
          onNotificationClick={() => setPhase("kairos")}
        />
      )}
      {phase === "kairos" && (
        <KairosIntervention
          onClose={onClose}
          onOrder={onClose}
        />
      )}
    </>
  );
}
