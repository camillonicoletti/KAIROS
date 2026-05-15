import { useState } from "react";
import { ChevronRight, ChefHat, Camera, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  fridgeItems,
  recipesSuggestions,
  deliveryOrders,
  deliveryVsPhysicalData,
} from "../data/mockData";

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>{title}</h3>
      {action && (
        <button className="flex items-center gap-0.5 text-xs" style={{ color: "#34d399" }}>
          {action} <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl p-2 text-xs" style={{ background: "#1e2235", border: "1px solid #2d3347" }}>
        <p className="font-semibold mb-1" style={{ color: "#e2e8f0" }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: €{p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const itemEmoji: Record<string, string> = {
  "Pasta": "🫙",
  "Mozzarella": "🧀",
  "Pomodori": "🍅",
  "Uova": "🥚",
  "Yogurt greco": "🥛",
  "Petto di pollo": "🍗",
  "Spinaci": "🥬",
  "Parmigiano": "🧀",
};

const fridgeShelves = [
  { id: "latticini", label: "Latticini",  icon: "🥛", items: ["Yogurt greco", "Mozzarella", "Parmigiano"] },
  { id: "proteine",  label: "Proteine",   icon: "🍗", items: ["Petto di pollo"] },
  { id: "verdure",   label: "Verdure",    icon: "🥬", items: ["Spinaci", "Pomodori"] },
  { id: "uova",      label: "Uova",       icon: "🥚", items: ["Uova"] },
  { id: "dispensa",  label: "Dispensa",   icon: "🫙", items: ["Pasta"] },
];

const statusColor: Record<string, string> = {
  ok: "#34d399", warning: "#fbbf24", critical: "#f87171",
};
const statusBg: Record<string, string> = {
  ok: "rgba(52,211,153,0.14)", warning: "rgba(251,191,36,0.14)", critical: "rgba(248,113,113,0.17)",
};
const statusBorder: Record<string, string> = {
  ok: "rgba(52,211,153,0.38)", warning: "rgba(251,191,36,0.38)", critical: "rgba(248,113,113,0.55)",
};


const recipeCatalog = [
  { id: 1, name: "Pasta al Pomodoro",   emoji: "🍝", time: "15 min", category: "pasta",   difficulty: "facile", ingredients: ["Pasta", "Pomodori", "Basilico"] },
  { id: 2, name: "Carbonara",           emoji: "🍝", time: "20 min", category: "pasta",   difficulty: "media",  ingredients: ["Pasta", "Uova", "Parmigiano"] },
  { id: 3, name: "Pasta Caprese",       emoji: "🍝", time: "15 min", category: "pasta",   difficulty: "facile", ingredients: ["Pasta", "Mozzarella", "Pomodori"] },
  { id: 4, name: "Pollo al Limone",     emoji: "🍋", time: "30 min", category: "carne",   difficulty: "facile", ingredients: ["Petto di pollo", "Limone", "Aglio"] },
  { id: 5, name: "Pollo agli Spinaci",  emoji: "🍗", time: "25 min", category: "carne",   difficulty: "facile", ingredients: ["Petto di pollo", "Spinaci"] },
  { id: 6, name: "Frittata Spinaci",    emoji: "🥚", time: "15 min", category: "uova",    difficulty: "facile", ingredients: ["Uova", "Spinaci", "Parmigiano"] },
  { id: 7, name: "Frittata Pomodoro",   emoji: "🍳", time: "12 min", category: "uova",    difficulty: "facile", ingredients: ["Uova", "Pomodori"] },
  { id: 8, name: "Insalata Caprese",    emoji: "🥗", time: "5 min",  category: "verdure", difficulty: "facile", ingredients: ["Mozzarella", "Pomodori"] },
  { id: 9, name: "Spinaci Saltati",     emoji: "🥬", time: "10 min", category: "verdure", difficulty: "facile", ingredients: ["Spinaci", "Aglio"] },
  { id: 10, name: "Risotto Parmigiano", emoji: "🍚", time: "35 min", category: "riso",    difficulty: "media",  ingredients: ["Parmigiano", "Burro", "Brodo"] },
];

const recipeCategories = [
  { id: "tutti",   label: "Tutti",   icon: "🍽️" },
  { id: "pasta",   label: "Pasta",   icon: "🍝" },
  { id: "carne",   label: "Carne",   icon: "🍗" },
  { id: "verdure", label: "Verdure", icon: "🥬" },
  { id: "uova",    label: "Uova",    icon: "🥚" },
  { id: "riso",    label: "Riso",    icon: "🍚" },
];

type ChatMsg = { role: "user" | "ai"; text: string; recipe?: typeof recipeCatalog[0] };

const mockReceipts = [
  { id: 1, store: "LIDL",      icon: "🛒", date: "14 mag 2026", items: 11, total: 28.45, color: "#f59e0b" },
  { id: 2, store: "Esselunga", icon: "🛍️", date: "11 mag 2026", items: 18, total: 67.20, color: "#818cf8" },
  { id: 3, store: "Coop",      icon: "🏪", date: "8 mag 2026",  items: 9,  total: 31.10, color: "#34d399" },
  { id: 4, store: "LIDL",      icon: "🛒", date: "5 mag 2026",  items: 6,  total: 19.80, color: "#f59e0b" },
  { id: 5, store: "Esselunga", icon: "🛍️", date: "2 mag 2026",  items: 22, total: 89.55, color: "#818cf8" },
  { id: 6, store: "Pam",       icon: "🧺", date: "29 apr 2026", items: 5,  total: 14.30, color: "#f87171" },
];

const calendarDays = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null],
];
const receiptDays = new Set([2, 5, 8, 11, 14]);

const receiptLines: Record<number, { name: string; price: string }[]> = {
  2: [
    { name: "POMODORINO",            price: "2,38" },
    { name: "C.COLA ZERO 33X8",      price: "7,27" },
    { name: "  SCONTO 45%",          price: "3,28-S" },
    { name: "CUORI DI ICEBERG",      price: "0,98" },
    { name: "SUNSILK BLS RICCI",     price: "4,70" },
    { name: "  SCONTO 49%",          price: "2,31-S" },
    { name: "COCCODI'10&LODE L X10", price: "3,29" },
    { name: "SCOTT.NAT/FETTA TAGL.", price: "5,47" },
    { name: "SMASH BURGER SCOTTONA", price: "2,79" },
    { name: "MILK PRO DESSER.CARAM", price: "1,69" },
    { name: "MILK PRO CREME CARAM.", price: "1,85" },
    { name: "DANONE HIPRO COCCO",    price: "1,34" },
    { name: "KOUKAKIS VASO 10",      price: "3,69" },
    { name: "DANONE HIPRO STRACCIA", price: "1,34" },
    { name: "KOUKAKIS GRECO BIA 0",  price: "1,29" },
    { name: "FAGE TOTAL 0 150G",     price: "1,55" },
    { name: "JOCCA 2X175",           price: "3,19" },
    { name: "BAGNO NR SENS.AV&COC",  price: "3,99" },
    { name: "  SCONTO FIDATY 50%",   price: "2,00-S" },
    { name: "SPECIAL K BRT CIOCCO",  price: "2,62" },
  ],
  5: [
    { name: "PANE CASERECCIO 500G",  price: "1,89" },
    { name: "LATTE INTERO 1L",       price: "1,35" },
    { name: "YOGURT GRECO 0%",       price: "1,29" },
    { name: "PASTA BARILLA 500G",    price: "1,19" },
    { name: "OLIO EVO 750ML",        price: "6,90" },
  ],
  8: [
    { name: "MOZZARELLA BUFALA",     price: "2,49" },
    { name: "POMODORI PACHINO",      price: "1,99" },
    { name: "PETTO DI POLLO 600G",   price: "5,90" },
    { name: "SPINACI FRESCHI 300G",  price: "1,79" },
    { name: "PARMIGIANO REG. 200G",  price: "4,99" },
    { name: "UOVA FREE RANGE X6",    price: "2,49" },
    { name: "PASTA INTEGRALE 500G",  price: "1,29" },
    { name: "BASILICO FRESCO",       price: "0,99" },
    { name: "ACQUA NATURALE 6X1.5",  price: "3,29" },
  ],
  11: [
    { name: "FARINA 00 1KG",         price: "0,89" },
    { name: "BURRO 250G",            price: "1,79" },
    { name: "ZUCCHERO 1KG",          price: "1,49" },
  ],
  14: [
    { name: "DETERSIVO LAVATRICE",   price: "5,99" },
    { name: "SPUGNE X3",             price: "1,49" },
    { name: "CARTA IGIENICA X8",     price: "3,99" },
    { name: "SHAMPOO 250ML",         price: "2,99" },
    { name: "DENTIFRICIO",           price: "2,29" },
    { name: "LATTE PARZIALE 1L",     price: "1,25" },
    { name: "CRACKERS INTEGRALI",    price: "1,49" },
    { name: "PROSCIUTTO COTTO",      price: "2,99" },
    { name: "FORMAGGIO FETTE",       price: "2,49" },
    { name: "SUCCO ARANCIA 1L",      price: "1,89" },
    { name: "BISCOTTI FROLLINI",     price: "1,39" },
  ],
};

function ReceiptDetail({ receipt, onClose }: { receipt: typeof mockReceipts[0]; onClose: () => void }) {
  const lines = receiptLines[receipt.id] ?? [];
  const storeInfo: Record<string, { name: string; address: string; piva: string }> = {
    "Esselunga": { name: "ESSELUNGA S.p.A.", address: "Viale Suzzani 221 - MILANO", piva: "P.I: 04916380159" },
    "LIDL":      { name: "LIDL ITALIA S.r.l.", address: "Via Brenta 22 - SESTO S.G.", piva: "P.I: 01998010967" },
    "Coop":      { name: "COOP LOMBARDIA", address: "Via Farini 10 - MILANO", piva: "P.I: 00729610965" },
    "Pam":       { name: "PAM PANORAMA S.p.A.", address: "Corso Buenos Aires 12", piva: "P.I: 00062360282" },
  };
  const info = storeInfo[receipt.store] ?? { name: receipt.store.toUpperCase(), address: "", piva: "" };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0b14", zIndex: 60, display: "flex", flexDirection: "column", borderRadius: 46, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 16px 14px", background: "#0a0b14", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#f1f5f9", fontSize: 16, flexShrink: 0 }}>
            ←
          </button>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#6b7280", fontSize: 11, margin: "0 0 1px" }}>{receipt.date} · {receipt.items} articoli</p>
            <h2 style={{ color: "#f1f5f9", fontSize: 20, fontWeight: 800, margin: 0 }}>{receipt.store}</h2>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ color: receipt.color, fontSize: 22, fontWeight: 800, margin: 0 }}>€{receipt.total.toFixed(2)}</p>
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
            ↑
          </button>
        </div>
      </div>

      {/* Receipt paper */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 24px" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", fontFamily: "'Courier New', Courier, monospace" }}>
          {/* Barcode */}
          <div style={{ textAlign: "center", marginBottom: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 1, justifyContent: "center", height: 36 }}>
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} style={{ width: i % 3 === 0 ? 2 : 1, background: "#000", height: "100%", opacity: i % 5 === 0 ? 0.4 : 1 }} />
              ))}
            </div>
            <p style={{ fontSize: 7, color: "#333", margin: "4px 0 0", letterSpacing: 1 }}>109008052614420270960800</p>
          </div>

          {/* Store info */}
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 900, margin: "0 0 2px", color: "#000" }}>* {info.name} *</p>
            {info.address && <p style={{ fontSize: 9, color: "#333", margin: "0 0 1px" }}>{info.address}</p>}
            {info.piva && <p style={{ fontSize: 9, color: "#333", margin: 0 }}>{info.piva}</p>}
            <p style={{ fontSize: 9, color: "#555", margin: "8px 0 0", lineHeight: 1.5 }}>DOCUMENTO COMMERCIALE{"\n"}DI VENDITA O PRESTAZIONE</p>
          </div>

          <div style={{ borderTop: "1px dashed #999", margin: "10px 0" }} />

          {/* Column headers */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 8, color: "#777", fontWeight: 700 }}></span>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 8, color: "#777", fontWeight: 700 }}>IVA</span>
              <span style={{ fontSize: 8, color: "#777", fontWeight: 700 }}>EURO</span>
            </div>
          </div>

          {/* Line items */}
          {lines.map((line, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 9, color: line.name.startsWith("  ") ? "#888" : "#111" }}>{line.name}</span>
              <span style={{ fontSize: 9, color: line.price.includes("-S") ? "#c00" : "#111", fontWeight: line.price.includes("-S") ? 700 : 400 }}>{line.price}</span>
            </div>
          ))}

          <div style={{ borderTop: "1px dashed #999", margin: "10px 0" }} />

          {/* Total */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#000" }}>TOTALE EURO</span>
            <span style={{ fontSize: 11, fontWeight: 900, color: "#000" }}>{receipt.total.toFixed(2).replace(".", ",")}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 9, color: "#555" }}>CARTA DI CREDITO</span>
            <span style={{ fontSize: 9, color: "#555" }}>{receipt.total.toFixed(2).replace(".", ",")}</span>
          </div>

          <div style={{ borderTop: "1px dashed #999", margin: "8px 0 12px" }} />
          <p style={{ fontSize: 8, color: "#777", textAlign: "center", margin: 0 }}>GRAZIE PER LA VISITA · {receipt.date.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export function ReceiptsScreen({ onClose }: { onClose: () => void }) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [openReceipt, setOpenReceipt] = useState<typeof mockReceipts[0] | null>(null);

  const monthTotal = mockReceipts.reduce((s, r) => s + r.total, 0);

  const calendarReceipts = selectedDay
    ? mockReceipts.filter((r) => r.date.startsWith(`${selectedDay} `))
    : [];

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0b14", zIndex: 50, display: "flex", flexDirection: "column", borderRadius: 46, overflow: "hidden" }}>
      {/* Receipt detail overlay */}
      {openReceipt && <ReceiptDetail receipt={openReceipt} onClose={() => setOpenReceipt(null)} />}

      {/* Header */}
      <div style={{ padding: "52px 16px 10px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#f1f5f9", fontSize: 16 }}>
          ←
        </button>
        <div>
          <p style={{ color: "#6b7280", fontSize: 11, margin: 0 }}>Modulo Food</p>
          <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, margin: 0 }}>🧾 Scontrini Digitali</h2>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>

        {/* Big summary banner */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", border: "1px solid #2d3347", borderRadius: 20, padding: 16, marginBottom: 14 }}>
          {/* Month total header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ color: "#6b7280", fontSize: 11, margin: "0 0 3px" }}>Maggio 2026</p>
              <p style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 800, margin: 0 }}>€{monthTotal.toFixed(2)}</p>
              <p style={{ color: "#6b7280", fontSize: 11, margin: "3px 0 0" }}>{mockReceipts.length} scontrini questo mese</p>
            </div>
            <div style={{ background: "#252d40", borderRadius: 12, padding: "8px 12px", textAlign: "right" as const }}>
              <p style={{ color: "#818cf8", fontSize: 11, margin: "0 0 2px", fontWeight: 600 }}>vs aprile</p>
              <p style={{ color: "#f87171", fontSize: 13, fontWeight: 700, margin: 0 }}>+€24.10</p>
            </div>
          </div>

          {/* 3 receipt sub-banners — clickable */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mockReceipts.slice(0, 3).map((r) => (
              <button key={r.id} onClick={() => setOpenReceipt(r)} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "11px 13px", display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", textAlign: "left" as const, width: "100%" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {r.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 700, margin: 0 }}>{r.store}</p>
                  <p style={{ color: "#6b7280", fontSize: 10, margin: "2px 0 0" }}>{r.date} · {r.items} articoli</p>
                </div>
                <p style={{ color: r.color, fontSize: 14, fontWeight: 800, margin: 0, flexShrink: 0 }}>€{r.total.toFixed(2)}</p>
              </button>
            ))}
          </div>

          {/* Vedi tutti button */}
          <button style={{ marginTop: 10, width: "100%", padding: "9px 0", borderRadius: 12, background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)", color: "#818cf8", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Vedi tutti gli scontrini →
          </button>
        </div>

        {/* Calendar */}
        <div style={{ background: "#1e2235", borderRadius: 20, padding: 16, marginBottom: selectedDay && calendarReceipts.length > 0 ? 14 : 0 }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>📅 Cerca per data</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
            {["L","M","M","G","V","S","D"].map((d, i) => (
              <p key={i} style={{ color: "#4b5563", fontSize: 9, fontWeight: 700, textAlign: "center", margin: 0 }}>{d}</p>
            ))}
          </div>
          {calendarDays.map((week, wi) => (
            <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 }}>
              {week.map((day, di) => {
                const hasReceipt = day !== null && receiptDays.has(day);
                const isSelected = day !== null && day === selectedDay;
                if (day === null) return <div key={di} style={{ height: 32 }} />;
                return (
                  <button key={di} onClick={() => setSelectedDay(isSelected ? null : day)} style={{
                    height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                    background: isSelected ? "#818cf8" : hasReceipt ? "rgba(129,140,248,0.12)" : "transparent",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                    position: "relative",
                  }}>
                    <p style={{ color: isSelected ? "#fff" : hasReceipt ? "#a5b4fc" : "#94a3b8", fontSize: 12, fontWeight: isSelected || hasReceipt ? 700 : 400, margin: 0 }}>{day}</p>
                    {hasReceipt && !isSelected && <div style={{ width: 4, height: 4, borderRadius: 2, background: "#818cf8", position: "absolute", bottom: 3 }} />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Calendar result */}
        {selectedDay && calendarReceipts.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 0 }}>
            <p style={{ color: "#6b7280", fontSize: 11, fontWeight: 600, margin: "0 0 6px" }}>Scontrini del {selectedDay} maggio</p>
            {calendarReceipts.map((r) => (
              <button key={r.id} onClick={() => setOpenReceipt(r)} style={{ background: "#1e2235", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", textAlign: "left" as const, width: "100%" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 700, margin: 0 }}>{r.store}</p>
                  <p style={{ color: "#6b7280", fontSize: 10, margin: "3px 0 0" }}>{r.date} · {r.items} articoli</p>
                </div>
                <p style={{ color: r.color, fontSize: 15, fontWeight: 800, margin: 0 }}>€{r.total.toFixed(2)}</p>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export function RecipeExplorer({ onClose, chatOnly = false }: { onClose: () => void; chatOnly?: boolean }) {
  const [category, setCategory] = useState("tutti");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [thinking, setThinking] = useState(false);
  const [chatMode, setChatMode] = useState(chatOnly);

  const filtered = category === "tutti"
    ? recipeCatalog
    : recipeCatalog.filter((r) => r.category === category);

  const fridgeNames = fridgeItems.map((i) => i.name);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    if (!chatMode) setChatMode(true);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setThinking(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      const match =
        recipeCatalog.find((r) =>
          r.name.toLowerCase().includes(lower) ||
          r.ingredients.some((ing) => lower.includes(ing.toLowerCase()))
        ) ??
        recipeCatalog
          .filter((r) => r.ingredients.some((ing) => fridgeNames.includes(ing)))
          [Math.floor(Math.random() * 3)];

      const aiText = match
        ? "Ho trovato la ricetta perfetta per te! 🎉"
        : "Dimmi cosa hai in frigo o il piatto che sogni e trovo la ricetta! 🍳";

      setMessages((prev) => [...prev, { role: "ai", text: aiText, recipe: match }]);
      setThinking(false);
    }, 1100);
  };

  return (
    <div style={{ position: "absolute", inset: 0, background: "#0a0b14", zIndex: 50, display: "flex", flexDirection: "column", borderRadius: 46, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button
          onClick={chatMode ? (chatOnly ? onClose : () => { setChatMode(false); setMessages([]); }) : onClose}
          style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#f1f5f9", fontSize: 16 }}
        >
          ←
        </button>
        <div>
          <p style={{ color: "#6b7280", fontSize: 11, margin: 0 }}>Modulo Food</p>
          <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700, margin: 0 }}>
            {chatMode ? "🧑‍🍳 Lucy" : "Esplora Ricette 🍽️"}
          </h2>
        </div>
      </div>

      {/* Category chips — hidden in chat mode */}
      {!chatMode && (
        <div style={{ display: "flex", gap: 6, padding: "0 16px 12px", overflowX: "auto", flexShrink: 0 }}>
          {recipeCategories.map((cat) => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              background: category === cat.id ? "#818cf8" : "rgba(255,255,255,0.07)",
              border: "none", borderRadius: 20, padding: "5px 12px",
              color: category === cat.id ? "#fff" : "#94a3b8",
              fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Scrollable area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {/* Chat mode: only messages */}
        {chatMode ? (
          <div style={{ paddingTop: 8, paddingBottom: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: 10, display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                {msg.role === "ai" && <span style={{ fontSize: 20, flexShrink: 0, marginBottom: 2 }}>🧑‍🍳</span>}
                <div style={{ maxWidth: "80%" }}>
                  <div style={{
                    background: msg.role === "user" ? "#818cf8" : "#1e2235",
                    borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    padding: "9px 13px",
                  }}>
                    <p style={{ color: "#f1f5f9", fontSize: 13, margin: 0, lineHeight: 1.4 }}>{msg.text}</p>
                  </div>
                  {msg.recipe && (
                    <div style={{ marginTop: 8, background: "#1e2235", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(129,140,248,0.25)" }}>
                      <span style={{ fontSize: 34, flexShrink: 0 }}>{msg.recipe.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 700, margin: 0 }}>{msg.recipe.name}</p>
                        <p style={{ color: "#6b7280", fontSize: 11, margin: "3px 0 6px" }}>{msg.recipe.time} · {msg.recipe.difficulty}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {msg.recipe.ingredients.map((ing) => (
                            <span key={ing} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: fridgeNames.includes(ing) ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)", color: fridgeNames.includes(ing) ? "#34d399" : "#6b7280" }}>
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🧑‍🍳</span>
                <div style={{ background: "#1e2235", borderRadius: "14px 14px 14px 4px", padding: "9px 14px" }}>
                  <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>Sto pensando… ✨</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Catalog mode: recipe grid */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingBottom: 16 }}>
            {filtered.slice(0, 6).map((recipe) => {
              const hasIngredients = recipe.ingredients.some((ing) => fridgeNames.includes(ing));
              return (
                <div key={recipe.id} style={{ background: "#1e2235", borderRadius: 16, padding: 12, cursor: "pointer", border: hasIngredients ? "1px solid rgba(52,211,153,0.2)" : "1px solid transparent" }}>
                  <span style={{ fontSize: 30 }}>{recipe.emoji}</span>
                  <p style={{ color: "#f1f5f9", fontSize: 12, fontWeight: 700, margin: "6px 0 2px", lineHeight: 1.2 }}>{recipe.name}</p>
                  <p style={{ color: "#6b7280", fontSize: 10, margin: "0 0 6px" }}>{recipe.time} · {recipe.difficulty}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    {recipe.ingredients.slice(0, 2).map((ing) => (
                      <span key={ing} style={{ fontSize: 8.5, padding: "2px 5px", borderRadius: 4, background: fridgeNames.includes(ing) ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)", color: fridgeNames.includes(ing) ? "#34d399" : "#6b7280" }}>
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI input */}
      <div style={{ padding: "8px 16px 20px", background: "#0a0b14", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ background: "#1e2235", borderRadius: 16, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(129,140,248,0.25)" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>🧑‍🍳</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Chiedi a Lucy… scrivi un piatto o ingrediente"
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#f1f5f9", fontSize: 12, fontFamily: "system-ui" }}
          />
          <button onClick={handleSend} disabled={!input.trim()} style={{ width: 30, height: 30, borderRadius: 8, background: input.trim() ? "#818cf8" : "rgba(255,255,255,0.07)", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, flexShrink: 0 }}>
            →
          </button>
        </div>
        <p style={{ color: "#374151", fontSize: 9, textAlign: "center", margin: "5px 0 0" }}>
          Lucy · usa gli ingredienti del tuo frigo
        </p>
      </div>
    </div>
  );
}

function FridgeIllustration({ items }: { items: typeof fridgeItems }) {
  const [selected, setSelected] = useState<string | null>(null);

  const byName = Object.fromEntries(items.map((i) => [i.name, i]));
  const sel = selected ? byName[selected] : null;

  return (
    <div style={{ borderRadius: 14, overflow: "hidden" }}>
      <div>

        {/* ❄️ Freezer */}
        <div style={{
          background: "linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%)",
          borderRadius: "10px 10px 0 0",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 3,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 16 }}>❄️</span>
            <div>
              <p style={{ color: "#93c5fd", fontSize: 11, fontWeight: 700, margin: 0, lineHeight: 1.1 }}>Congelatore</p>
              <p style={{ color: "#334155", fontSize: 8.5, margin: "2px 0 0", lineHeight: 1 }}>nessun alimento</p>
            </div>
          </div>
          <div style={{ width: 26, height: 6, background: "#1e293b", borderRadius: 3, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)" }} />
        </div>

        {/* Main fridge interior */}
        <div style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e8f4fd 100%)", borderRadius: "0 0 10px 10px", padding: "4px 4px 5px" }}>
          {/* Ceiling light */}
          <div style={{ margin: "0 auto 3px", width: "60%", height: 2, background: "rgba(255,255,255,0.95)", borderRadius: 1, boxShadow: "0 0 18px rgba(255,255,255,0.9)" }} />

          {fridgeShelves.map((shelf, idx) => {
            const shelfItems = shelf.items.map((n) => byName[n]).filter(Boolean);
            return (
              <div key={shelf.id}>
                {/* Category label */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 4px 2px" }}>
                  <span style={{ fontSize: 9 }}>{shelf.icon}</span>
                  <span style={{ fontSize: 7.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: 0.7 }}>
                    {shelf.label}
                  </span>
                </div>

                {/* Item chips */}
                <div style={{ display: "flex", gap: 0, padding: "0 2px 0", flexWrap: "wrap" as const }}>
                  {shelfItems.map((item) => {
                    const color = statusColor[item.status] ?? "#6b7280";
                    const isSel = selected === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelected(isSel ? null : item.name)}
                        style={{
                          width: 58,
                          background: "none",
                          border: "none",
                          outline: "none",
                          padding: "4px 2px 0",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column" as const,
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        {/* Name above */}
                        <p style={{
                          fontSize: 7.5,
                          fontWeight: 700,
                          color: isSel ? color : "#475569",
                          margin: 0,
                          lineHeight: 1.1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap" as const,
                          width: "100%",
                          textAlign: "center" as const,
                        }}>
                          {item.name.split(" ")[0]}
                        </p>
                        {/* Emoji sitting on shelf */}
                        <div style={{
                          fontSize: 28,
                          lineHeight: 1,
                          filter: isSel ? `drop-shadow(0 0 6px ${color})` : "drop-shadow(0 2px 3px rgba(0,0,0,0.15))",
                          transform: isSel ? "scale(1.12)" : "scale(1)",
                          transition: "all 0.15s ease",
                        }}>
                          {itemEmoji[item.name] ?? "🥘"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Glass shelf divider */}
                {idx < fridgeShelves.length - 1 && (
                  <div style={{
                    height: 5, margin: "2px 0",
                    background: "linear-gradient(90deg, rgba(148,163,184,0.12) 0%, rgba(203,213,225,0.82) 18%, rgba(226,232,240,0.96) 50%, rgba(203,213,225,0.82) 82%, rgba(148,163,184,0.12) 100%)",
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.11), inset 0 1px 0 rgba(255,255,255,0.78)",
                  }} />
                )}
              </div>
            );
          })}

          {/* Selected item detail card */}
          {sel && (
            <div style={{
              marginTop: 7,
              background: "rgba(10,11,20,0.93)",
              border: `1px solid ${statusBorder[sel.status]}`,
              borderRadius: 10,
              padding: "9px 11px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: `0 0 20px ${statusBg[sel.status]}`,
            }}>
              <span style={{ fontSize: 30, flexShrink: 0 }}>{itemEmoji[sel.name]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#f1f5f9", margin: 0, lineHeight: 1.2 }}>{sel.name}</p>
                <p style={{ fontSize: 9.5, color: "#94a3b8", margin: "3px 0 0" }}>
                  Quantità: <span style={{ color: "#e2e8f0" }}>{sel.qty}</span>
                </p>
              </div>
              <div style={{ textAlign: "right" as const, flexShrink: 0 }}>
                <p style={{ fontSize: 10.5, fontWeight: 700, color: statusColor[sel.status], margin: 0, lineHeight: 1.2 }}>
                  {sel.daysLeft === 1 ? "Scade domani!" : `${sel.daysLeft} giorni`}
                </p>
                <p style={{ fontSize: 8.5, color: "#64748b", margin: "3px 0 0" }}>
                  {sel.status === "critical" ? "⚠️ usa prima possibile" : sel.status === "warning" ? "⏰ consuma presto" : "✓ in buono stato"}
                </p>
              </div>
            </div>
          )}

          {/* Crisper drawer */}
          <div style={{ marginTop: 6, background: "rgba(219,234,254,0.72)", border: "1px solid rgba(148,163,184,0.3)", borderRadius: 6, padding: "3px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 9 }}>🥦</span>
            <span style={{ fontSize: 8.5, color: "#64748b", fontWeight: 600 }}>cassetto verdure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FoodScreen({ onOpenExplorer, onOpenReceipts, onOpenLucy, onOpenGlovo }: { onOpenExplorer: () => void; onOpenReceipts: () => void; onOpenLucy: () => void; onOpenGlovo: () => void }) {
  const avoided = deliveryOrders.filter((o) => o.avoided).length;
  const savedAmount = deliveryOrders
    .filter((o) => o.avoided)
    .reduce((s, o) => s + o.total, 0);

  const critical = fridgeItems.filter((i) => i.status === "critical");
  const warning  = fridgeItems.filter((i) => i.status === "warning");

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
    <div className="flex flex-col gap-4 px-4 py-4 overflow-y-auto flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: "#6b7280" }}>Modulo Food</p>
          <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>Frigo & Delivery 🛵</h1>
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#0f2318" }}
        >
          <Camera size={18} style={{ color: "#34d399" }} />
        </button>
      </div>

      {/* Savings Banner */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "linear-gradient(135deg, #0f2318 0%, #0d1f14 100%)" }}
      >
        <p className="text-xs mb-1" style={{ color: "#6b7280" }}>Questa settimana hai evitato</p>
        <div className="flex items-end gap-3">
          <div>
            <p className="text-3xl font-bold" style={{ color: "#34d399" }}>
              {avoided} ordini
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
              = <span style={{ color: "#34d399" }}>€{savedAmount.toFixed(2)}</span> risparmiati
            </p>
          </div>
          <TrendingDown size={32} style={{ color: "#34d399", marginBottom: 4 }} />
        </div>
      </div>

      {/* Digital Receipts Banner */}
      <div
        onClick={onOpenReceipts}
        className="rounded-2xl p-4"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid #2d3347",
          cursor: "pointer",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#252d40" }}
          >
            <span className="text-xl">🧾</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              I Miei Scontrini Digitali
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
              12 scontrini · Totale €342.80
            </p>
          </div>
          <button className="flex items-center gap-0.5 text-xs flex-shrink-0" style={{ color: "#818cf8" }}>
            Vedi <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {["LIDL", "Esselunga", "Coop"].map((store) => (
            <span
              key={store}
              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold"
              style={{ background: "#252d40", color: "#94a3b8" }}
            >
              {store}
            </span>
          ))}
          <span
            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold"
            style={{ background: "#252d40", color: "#6b7280" }}
          >
            +9 altro
          </span>
        </div>
      </div>

      {/* Fridge */}
      <div className="rounded-2xl p-4" style={{ background: "#1e2235" }}>
        <SectionHeader title="📦 Contenuto frigo" action="Modifica" />
        {(critical.length > 0 || warning.length > 0) && (
          <div
            className="rounded-xl p-3 mb-3 flex items-start gap-2"
            style={{ background: "#2a1a1a" }}
          >
            <span className="text-sm">⚠️</span>
            <p className="text-xs" style={{ color: "#fbbf24" }}>
              {critical.length} articol{critical.length === 1 ? "o scade" : "i scadono"} domani
              {warning.length > 0 && ` · ${warning.length} in scadenza a breve`}
            </p>
          </div>
        )}

        <FridgeIllustration items={fridgeItems} />

        <button
          onClick={onOpenLucy}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm"
          style={{
            background: "linear-gradient(135deg, #0f3f2a 0%, #0f2318 100%)",
            color: "#86efac",
            border: "1px solid rgba(52,211,153,0.24)",
          }}
        >
          <ChefHat size={14} /> Crea ricetta salva-spesa
        </button>
      </div>

      {/* Recipe Suggestions */}
      <div className="rounded-2xl p-4" style={{ background: "#1e2235" }}>
        <SectionHeader title="💡 Ricette dal frigo" />
        <div className="flex flex-col gap-2">
          {recipesSuggestions.map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-xl p-3 flex items-center gap-3"
              style={{ background: "#141824" }}
            >
              <span className="text-3xl">{recipe.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "#e2e8f0" }}>
                  {recipe.name}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                  {recipe.uses.join(", ")} · {recipe.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: "#34d399" }}>
                  −€{recipe.saves.toFixed(2)}
                </p>
                <p className="text-[10px]" style={{ color: "#6b7280" }}>vs delivery</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onOpenExplorer}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            color: "#a5b4fc",
            border: "1px solid rgba(165,180,252,0.2)",
          }}
        >
          <span>🍽️</span> Esplora ricette
          <ChevronRight size={14} />
        </button>
      </div>


      {/* Recent Orders */}
      <div className="mb-2">
        <SectionHeader title="🧾 Ordini recenti" action="Tutti" />
        <div className="flex flex-col gap-2">
          {deliveryOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="rounded-xl px-3 py-2.5 flex items-center justify-between"
              style={{ background: "#1e2235" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: order.avoided ? "#0f2318" : "#1a1010" }}
                >
                  {order.platform === "Deliveroo" ? "🦘" : order.platform === "Glovo" ? "🟡" : "🍕"}
                </span>
                <div>
                  <p className="text-xs font-medium" style={{ color: "#e2e8f0" }}>
                    {order.platform}
                  </p>
                  <p className="text-[10px]" style={{ color: "#6b7280" }}>{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: order.avoided ? "#4b5563" : "#e2e8f0",
                    textDecoration: order.avoided ? "line-through" : "none",
                  }}
                >
                  €{order.total.toFixed(2)}
                </span>
                {order.avoided ? (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "#0f2318", color: "#34d399" }}
                  >
                    evitato
                  </span>
                ) : (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "#1a1010", color: "#f87171" }}
                  >
                    ordinato
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glovo simulation banner */}
      <div
        onClick={onOpenGlovo}
        className="rounded-2xl p-4 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #1a1200 0%, #2a1f00 100%)",
          border: "1px solid rgba(245,158,11,0.3)",
          cursor: "pointer",
        }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)" }}>
          <span className="text-xl">🟡</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold mb-0.5" style={{ color: "#f59e0b" }}>SIMULAZIONE</p>
          <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>Apri checkout Glovo</p>
          <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>Prova la notifica di intervento Kairos</p>
        </div>
        <ChevronRight size={16} style={{ color: "#f59e0b", flexShrink: 0 }} />
      </div>

    </div>
    </div>
  );
}
