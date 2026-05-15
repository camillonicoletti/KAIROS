import { Home, Utensils, CreditCard, User, BarChart3 } from "lucide-react";

type Tab = "home" | "food" | "banking" | "profile" | "report";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "food", label: "Food", Icon: Utensils },
  { id: "banking", label: "Banking", Icon: CreditCard },
  { id: "profile", label: "Profilo", Icon: User },
  { id: "report", label: "Report", Icon: BarChart3 },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="flex justify-center pb-6 pt-2 flex-shrink-0 relative z-10">
      <nav
        className="flex items-center justify-around gap-1 px-2 py-2 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow:
            "0 14px 40px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.2)",
          width: "min(92%, 360px)",
        }}
      >
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-full transition-all"
              style={{
                background: isActive
                  ? "linear-gradient(180deg, rgba(129,140,248,0.32) 0%, rgba(129,140,248,0.12) 100%)"
                  : "transparent",
                boxShadow: isActive
                  ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(129,140,248,0.2)"
                  : "none",
              }}
            >
              <Icon
                size={19}
                style={{ color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.55)" }}
              />
              <span
                className="text-[10px] font-medium transition-colors leading-none"
                style={{ color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.55)" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
