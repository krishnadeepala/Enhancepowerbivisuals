import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Share2, Download, MoreHorizontal, RefreshCw,
  LayoutDashboard, Database, GitBranch, CheckSquare,
} from "lucide-react";
import { C } from "../tokens";

const navItems = [
  { to: "/",                Icon: LayoutDashboard, label: "Exec Summary"           },
  { to: "/inventory",       Icon: Database,        label: "Inventory Tracking"      },
  { to: "/rationalization", Icon: GitBranch,       label: "Rationalization Tracking" },
  { to: "/completeness",    Icon: CheckSquare,     label: "AMSD Completeness"       },
];

// ── Sidebar icon nav item ────────────────────────────────────────────────────
function SideNavItem({
  to, Icon, label, isActive, onNavigate,
}: { to: string; Icon: React.ElementType; label: string; isActive: boolean; onNavigate: (to: string) => void }) {
  return (
    <div
      onClick={() => onNavigate(to)}
      title={label}
      className="group relative w-full flex flex-col items-center justify-center py-2.5 cursor-pointer transition-colors duration-150"
      style={{
        borderLeft: `3px solid ${isActive ? C.cyan : "transparent"}`,
        background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
      }}
    >
      <Icon
        size={18}
        style={{ color: isActive ? C.cyan : "rgba(255,255,255,0.65)" }}
        strokeWidth={isActive ? 2.5 : 1.8}
      />
      {/* Hover tooltip */}
      <div
        className="pointer-events-none absolute left-14 z-50 whitespace-nowrap px-2 py-1 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ background: C.navy, color: "#fff", border: `1px solid ${C.cyan}` }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Layout ───────────────────────────────────────────────────────────────────
export function Layout() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.canvas, fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Left Sidebar (58 px) */}
      <aside className="flex flex-col items-center z-20 flex-shrink-0" style={{ width: 58, background: C.navy }}>
        <div
          className="flex flex-col items-center pt-3 pb-4 w-full"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
        >
          <span className="text-white font-black leading-none" style={{ fontSize: 11, letterSpacing: 2 }}>
            CHOP
          </span>
        </div>

        <nav className="flex flex-col w-full mt-2 gap-0.5">
          {navItems.map((item) => (
            <SideNavItem
              key={item.to}
              {...item}
              isActive={currentPath === item.to}
              onNavigate={navigate}
            />
          ))}
        </nav>

        <div className="flex-1" />
        <div className="pb-3 text-center" style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: 0.5 }}>
          v2.6
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top header */}
        <header
          className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ background: C.navy, minHeight: 44 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold">
              Analytics Rationalization &amp; Modernization
            </span>
            <span style={{ color: C.cyan, fontSize: 11, opacity: 0.9 }}>
              CHOP 2026 · Gene (Helix) Platform
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[{ Icon: Share2, label: "Share" }, { Icon: Download, label: "Export" }].map(({ Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1 px-2.5 py-1 text-white text-xs"
                style={{ border: "1px solid rgba(255,255,255,0.25)", background: "transparent" }}
              >
                <Icon size={12} /> {label}
              </button>
            ))}
            <button className="p-1.5 text-white" style={{ border: "1px solid rgba(255,255,255,0.25)" }}>
              <MoreHorizontal size={14} />
            </button>
          </div>
        </header>

        {/* Tab strip */}
        <div
          className="flex items-center flex-shrink-0"
          style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}
        >
          {navItems.map((item) => {
            const active = currentPath === item.to;
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                style={{
                  padding: "10px 16px",
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "'Segoe UI', sans-serif",
                  color: active ? C.navy : C.muted,
                  background: active ? `${C.navy}08` : "transparent",
                  border: "none",
                  borderBottom: `2px solid ${active ? C.navy : "transparent"}`,
                  cursor: "pointer",
                  transition: "color 0.1s",
                }}
              >
                {item.label}
              </button>
            );
          })}

          {/* Right toolbar */}
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5">
            <button
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-white"
              style={{ background: C.navy }}
            >
              <RefreshCw size={11} strokeWidth={2} /> Refresh
            </button>
            <span className="text-xs" style={{ color: C.muted }}>
              Data as of: <strong style={{ color: C.fg }}>Apr 28, 2026</strong>
            </span>
          </div>
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-auto" style={{ background: C.canvas }}>
          <div className="p-3">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="flex items-center justify-between px-4 py-1.5 flex-shrink-0 text-xs"
          style={{ background: C.navy, color: C.cyan }}
        >
          <span style={{ opacity: 0.75 }}>
            © 2026 Children's Hospital of Philadelphia · AMSD Data Governance
          </span>
          <span style={{ opacity: 0.75 }}>
            Last refreshed: Apr 28, 2026 · 9:00 AM
          </span>
        </footer>
      </div>
    </div>
  );
}
