export const user = {
  name: "Sim",
  weekNumber: 20,
  profilingDone: true,
  totalSaved: 284.6,
  balance: 1247.5,
  monthlySaved: 142.8,
};

export const bnplInstallments = [
  {
    id: 1,
    provider: "Klarna",
    item: "Nike Air Max",
    totalAmount: 179.9,
    monthlyRate: 59.97,
    remaining: 2,
    nextDue: "23 mag",
    daysLeft: 8,
    color: "#f97316",
  },
  {
    id: 2,
    provider: "Scalapay",
    item: "Xiaomi Earbuds",
    totalAmount: 89.9,
    monthlyRate: 29.97,
    remaining: 1,
    nextDue: "1 giu",
    daysLeft: 17,
    color: "#818cf8",
  },
  {
    id: 3,
    provider: "Klarna",
    item: "ASOS Order",
    totalAmount: 124.5,
    monthlyRate: 41.5,
    remaining: 3,
    nextDue: "5 giu",
    daysLeft: 21,
    color: "#f97316",
  },
];

export const accounts = [
  {
    id: 1,
    name: "N26",
    iban: "IT60 X054 2811 1010 0000 0123 456",
    balance: 847.5,
    type: "Conto corrente",
    color: "#1a1a2e",
    accent: "#818cf8",
  },
  {
    id: 2,
    name: "PayPal",
    iban: "",
    balance: 234.0,
    type: "Wallet digitale",
    color: "#0f2027",
    accent: "#34d399",
  },
  {
    id: 3,
    name: "Postepay",
    iban: "IT55 Y076 0103 2000 0100 7836 23",
    balance: 166.0,
    type: "Carta prepagata",
    color: "#1a0533",
    accent: "#c084fc",
  },
];

export const budgetCategories = [
  { id: 1, label: "Affitto", budget: 600, spent: 600, icon: "🏠", color: "#818cf8" },
  { id: 2, label: "Cibo & Spesa", budget: 250, spent: 187, icon: "🛒", color: "#34d399" },
  { id: 3, label: "Trasporti", budget: 80, spent: 63, icon: "🚇", color: "#60a5fa" },
  { id: 4, label: "Svago", budget: 100, spent: 134, icon: "🎮", color: "#f87171" },
  { id: 5, label: "Abbonamenti", budget: 60, spent: 54, icon: "📱", color: "#c084fc" },
  { id: 6, label: "Food Delivery", budget: 40, spent: 73, icon: "🛵", color: "#fb923c" },
];

export const fridgeItems = [
  { id: 1, name: "Pasta", qty: "500g", daysLeft: 90, status: "ok" },
  { id: 2, name: "Mozzarella", qty: "125g", daysLeft: 2, status: "warning" },
  { id: 3, name: "Pomodori", qty: "4 pz", daysLeft: 3, status: "warning" },
  { id: 4, name: "Uova", qty: "6 pz", daysLeft: 12, status: "ok" },
  { id: 5, name: "Yogurt greco", qty: "2 pz", daysLeft: 1, status: "critical" },
  { id: 6, name: "Petto di pollo", qty: "300g", daysLeft: 1, status: "critical" },
  { id: 7, name: "Spinaci", qty: "200g", daysLeft: 4, status: "ok" },
  { id: 8, name: "Parmigiano", qty: "100g", daysLeft: 30, status: "ok" },
];

export const recipesSuggestions = [
  {
    id: 1,
    name: "Pasta Caprese",
    time: "15 min",
    uses: ["Pasta", "Mozzarella", "Pomodori"],
    saves: 12.5,
    emoji: "🍝",
  },
  {
    id: 2,
    name: "Pollo agli spinaci",
    time: "25 min",
    uses: ["Petto di pollo", "Spinaci"],
    saves: 8.9,
    emoji: "🍗",
  },
];

export const deliveryOrders = [
  { id: 1, date: "13 mag", platform: "Deliveroo", total: 18.5, avoided: false },
  { id: 2, date: "11 mag", platform: "Glovo", total: 22.0, avoided: true },
  { id: 3, date: "9 mag", platform: "JustEat", total: 15.9, avoided: false },
  { id: 4, date: "7 mag", platform: "Deliveroo", total: 19.4, avoided: true },
  { id: 5, date: "5 mag", platform: "Glovo", total: 24.0, avoided: true },
];

export const deliveryVsPhysicalData = [
  { week: "Sett 17", delivery: 66, spesa: 42 },
  { week: "Sett 18", delivery: 54, spesa: 55 },
  { week: "Sett 19", delivery: 72, spesa: 38 },
  { week: "Sett 20", delivery: 34, spesa: 61 },
];

export const socialUsage = [
  { app: "TikTok", daily: 127, color: "#f87171" },
  { app: "Instagram", daily: 84, color: "#c084fc" },
  { app: "YouTube", daily: 61, color: "#fb923c" },
  { app: "Twitter/X", daily: 38, color: "#60a5fa" },
  { app: "Reddit", daily: 22, color: "#34d399" },
];

export const riskHours = [
  { area: "Finanza", label: "💳", hours: "22:00–00:00", riskLevel: 0.82, color: "#818cf8" },
  { area: "Food Delivery", label: "🛵", hours: "20:00–23:00", riskLevel: 0.71, color: "#34d399" },
  { area: "Social", label: "📱", hours: "18:00–22:00", riskLevel: 0.65, color: "#fb923c" },
];

export const activeAlerts = [
  {
    id: 1,
    type: "finance",
    icon: "💳",
    color: "#818cf8",
    title: "BNPL in scadenza",
    body: "Klarna €59.97 tra 8 giorni",
    urgent: true,
  },
  {
    id: 2,
    type: "food",
    icon: "🥛",
    color: "#fbbf24",
    title: "Scadenze nel frigo",
    body: "Yogurt e pollo scadono domani",
    urgent: true,
  },
  {
    id: 3,
    type: "social",
    icon: "📱",
    color: "#fb923c",
    title: "Pattern rilevato",
    body: "Dopo 60min di TikTok ordini delivery +40%",
    urgent: false,
  },
];

export const behaviorPatterns = {
  negative: [
    {
      id: 1,
      area: "food",
      icon: "🛵",
      color: "#34d399",
      text: "Ordini delivery 4 volte a settimana dopo le 22:00",
      frequency: "4×/sett",
      impact: "−€72/mese",
    },
    {
      id: 2,
      area: "finance",
      icon: "💳",
      color: "#818cf8",
      text: "Acquisti BNPL dopo sessioni TikTok >60 min",
      frequency: "6 episodi",
      impact: "−€394 totale",
    },
    {
      id: 3,
      area: "social",
      icon: "📱",
      color: "#fb923c",
      text: "Picco di ansia dopo contenuti climatici tra 20–22",
      frequency: "5×/sett",
      impact: "correlato acquisti",
    },
  ],
  resolved: [
    {
      id: 1,
      area: "finance",
      icon: "✅",
      color: "#34d399",
      text: "Acquisti impulsivi post-TikTok ridotti del 60%",
      improvement: "−60%",
    },
    {
      id: 2,
      area: "food",
      icon: "✅",
      color: "#34d399",
      text: "Abbonamento Deliveroo+ cancellato (−€5.99/mese)",
      improvement: "−€72/anno",
    },
    {
      id: 3,
      area: "social",
      icon: "✅",
      color: "#34d399",
      text: "Limite screen time TikTok impostato a 45 min/giorno",
      improvement: "attivo 12 giorni",
    },
  ],
};

export const profileStats = [
  { label: "Totale risparmiato", value: "€284", icon: "💰", color: "#34d399" },
  { label: "Abbonamenti cancellati", value: "3", icon: "✂️", color: "#818cf8" },
  { label: "Ordini evitati", value: "11", icon: "🛵", color: "#fb923c" },
  { label: "Pattern risolti", value: "3", icon: "🎯", color: "#60a5fa" },
];

export const weeklyTrend = [
  { week: "S16", finance: 62, food: 48, social: 55 },
  { week: "S17", finance: 70, food: 52, social: 61 },
  { week: "S18", finance: 58, food: 44, social: 58 },
  { week: "S19", finance: 50, food: 38, social: 52 },
  { week: "S20", finance: 42, food: 31, social: 45 },
];

export const weeklyReport = {
  week: 20,
  finance: {
    bnplTotal: 131.44,
    bnplIncome: 22,
    impulsivePurchases: 1,
    saved: 89.0,
    trend: -18,
  },
  food: {
    deliveryOrders: 2,
    avgCostDelivery: 17.2,
    physicallyShopped: 1,
    avoided: 3,
    saved: 53.6,
    trend: -45,
  },
  social: {
    tiktokDaily: 127,
    instagramDaily: 84,
    impulsiveCorrelation: 40,
    anxietyAlerts: 2,
    trend: -12,
  },
};

export const achievements = [
  { id: 1, icon: "🥇", title: "Prima settimana zero BNPL", unlocked: true, date: "Sett 19" },
  { id: 2, icon: "🧊", title: "Frigo svuotato — zero sprechi", unlocked: true, date: "Sett 20" },
  { id: 3, icon: "📵", title: "TikTok sotto 45 min per 7 giorni", unlocked: false, progress: 5 },
  { id: 4, icon: "💸", title: "€300 risparmiati in totale", unlocked: false, progress: 95 },
];

export const subscriptions = [
  { id: 1, name: "Netflix", monthly: 13.99, status: "active", icon: "🎬" },
  { id: 2, name: "Spotify", monthly: 10.99, status: "active", icon: "🎵" },
  { id: 3, name: "Deliveroo+", monthly: 5.99, status: "cancelled", icon: "🛵" },
  { id: 4, name: "Amazon Prime", monthly: 4.99, status: "active", icon: "📦" },
  { id: 5, name: "Adobe CC", monthly: 29.99, status: "cancelled", icon: "🎨" },
  { id: 6, name: "iCloud 50GB", monthly: 0.99, status: "active", icon: "☁️" },
];
