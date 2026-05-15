import { useState } from "react";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./screens/HomeScreen";
import FoodScreen, { RecipeExplorer, ReceiptsScreen } from "./screens/FoodScreen";
import { GlovoSimulation } from "./screens/GlovoSimulation";
import { AmazonSimulation } from "./screens/AmazonSimulation";
import BankingScreen from "./screens/BankingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReportScreen from "./screens/ReportScreen";

type Tab = "home" | "food" | "banking" | "profile" | "report";
type FoodOverlay = "none" | "explorer" | "lucy" | "receipts" | "glovo";
type BankingOverlay = "none" | "amazon";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [foodOverlay, setFoodOverlay] = useState<FoodOverlay>("none");
  const [bankingOverlay, setBankingOverlay] = useState<BankingOverlay>("none");

  const screens: Record<Tab, React.ReactNode> = {
    home: <HomeScreen />,
    food: (
      <FoodScreen
        onOpenExplorer={() => setFoodOverlay("explorer")}
        onOpenReceipts={() => setFoodOverlay("receipts")}
        onOpenLucy={() => setFoodOverlay("lucy")}
        onOpenGlovo={() => setFoodOverlay("glovo")}
      />
    ),
    banking: <BankingScreen onOpenAmazon={() => setBankingOverlay("amazon")} />,
    profile: <ProfileScreen />,
    report: <ReportScreen />,
  };

  return (
    <div
      className="size-full flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at 50% 30%, #1a1d3a 0%, #060810 70%)",
      }}
    >
      {/* Phone frame */}
      <div
        className="relative"
        style={{
          width: 360,
          height: 760,
          maxHeight: "100%",
          background: "linear-gradient(160deg, #1f1f2a 0%, #0a0a14 100%)",
          borderRadius: 56,
          padding: 10,
          boxShadow:
            "0 0 0 2px #2a2a3a, 0 50px 100px -20px rgba(0,0,0,0.6), 0 30px 60px -30px rgba(129,140,248,0.25), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Side buttons */}
        <div className="absolute" style={{ left: -2, top: 130, width: 3, height: 32, background: "#2a2a3a", borderRadius: "2px 0 0 2px" }} />
        <div className="absolute" style={{ left: -2, top: 180, width: 3, height: 56, background: "#2a2a3a", borderRadius: "2px 0 0 2px" }} />
        <div className="absolute" style={{ left: -2, top: 250, width: 3, height: 56, background: "#2a2a3a", borderRadius: "2px 0 0 2px" }} />
        <div className="absolute" style={{ right: -2, top: 200, width: 3, height: 80, background: "#2a2a3a", borderRadius: "0 2px 2px 0" }} />

        {/* Screen */}
        <div
          className="flex flex-col overflow-hidden relative size-full"
          style={{
            background: "#0a0b14",
            borderRadius: 46,
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute z-20"
            style={{
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 110,
              height: 32,
              background: "#000",
              borderRadius: 999,
            }}
          />

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-7 pt-3.5 pb-1 flex-shrink-0 relative z-10"
          >
            <span className="text-[12px] font-semibold" style={{ color: "#f1f5f9", paddingLeft: 4 }}>9:41</span>
            <div className="flex items-center gap-1.5" style={{ paddingRight: 4 }}>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="#f1f5f9" />
                <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" fill="#f1f5f9" />
                <rect x="7" y="2" width="2.5" height="8" rx="0.5" fill="#f1f5f9" />
                <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" fill="#f1f5f9" />
              </svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M7 2.5C8.7 2.5 10.2 3.2 11.3 4.3L12.7 2.9C11.2 1.4 9.2 0.5 7 0.5C4.8 0.5 2.8 1.4 1.3 2.9L2.7 4.3C3.8 3.2 5.3 2.5 7 2.5Z" fill="#f1f5f9" />
                <path d="M7 5.5C8 5.5 8.9 5.9 9.6 6.6L11 5.2C9.9 4.1 8.5 3.5 7 3.5C5.5 3.5 4.1 4.1 3 5.2L4.4 6.6C5.1 5.9 6 5.5 7 5.5Z" fill="#f1f5f9" />
                <circle cx="7" cy="8.5" r="1.5" fill="#f1f5f9" />
              </svg>
              <div className="rounded-sm" style={{ width: 24, height: 11, border: "1px solid #f1f5f9", padding: 1.5, display: "flex", alignItems: "center" }}>
                <div className="rounded-[1px] h-full" style={{ width: "75%", background: "#f1f5f9" }} />
              </div>
            </div>
          </div>

          {/* Screen content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {screens[tab]}
          </div>

          {/* Bottom nav */}
          <BottomNav active={tab} onChange={setTab} />

          {/* Home indicator */}
          <div
            className="absolute"
            style={{
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 130,
              height: 4,
              background: "#f1f5f9",
              borderRadius: 999,
              opacity: 0.4,
            }}
          />

          {/* Full-screen overlays — rendered here to cover status bar + nav */}
          {foodOverlay === "explorer" && (
            <RecipeExplorer onClose={() => setFoodOverlay("none")} />
          )}
          {foodOverlay === "lucy" && (
            <RecipeExplorer onClose={() => setFoodOverlay("none")} chatOnly />
          )}
          {foodOverlay === "receipts" && (
            <ReceiptsScreen onClose={() => setFoodOverlay("none")} />
          )}
          {foodOverlay === "glovo" && (
            <GlovoSimulation onClose={() => setFoodOverlay("none")} />
          )}
          {bankingOverlay === "amazon" && (
            <AmazonSimulation onClose={() => setBankingOverlay("none")} />
          )}
        </div>
      </div>
    </div>
  );
}
