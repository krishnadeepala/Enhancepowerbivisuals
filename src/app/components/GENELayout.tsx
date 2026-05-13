import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard, Users, Zap, Map, RefreshCcw, GitBranch,
  BarChart3, FileText, Settings, Info, ChevronDown,
  Database, CheckCircle2, Filter, RefreshCw, CalendarDays, ExternalLink, ClipboardList,
} from "lucide-react";
import { C } from "../tokens";

const NAV_ITEMS = [
  { to: "/",                  Icon: LayoutDashboard, label: "Overview"        },
  { to: "/user-engagement",   Icon: Users,           label: "User Engagement" },
  { to: "/feature-usage",     Icon: Zap,             label: "Feature Usage"   },
  { to: "/user-journey",      Icon: Map,             label: "User Journey"    },
  { to: "/retention",         Icon: RefreshCcw,      label: "Retention"       },
  { to: "/funnels",           Icon: GitBranch,       label: "Funnels"         },
  { to: "/cohort-analysis",   Icon: BarChart3,       label: "Cohort Analysis" },
  { to: "/reports",           Icon: FileText,        label: "Reports"         },
];

const FILTERS = [
  { label: "Date Range",       value: "Apr 21 – May 19, 2025" },
  { label: "User Segment",     value: "All"                   },
  { label: "Platform",         value: "All"                   },
  { label: "Feature",          value: "All"                   },
  { label: "Country / Region", value: "All"                   },
  { label: "App Version",      value: "All"                   },
  { label: "Channel",          value: "All"                   },
];

function NavItem({
  to, Icon, label, isActive, onNav,
}: {
  to: string; Icon: React.ElementType; label: string;
  isActive: boolean; onNav: (to: string) => void;
}) {
  return (
    <button
      onClick={() => onNav(to)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        paddingTop: 9, paddingBottom: 9, paddingLeft: 17, paddingRight: 0,
        width: "100%",
        background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
        // Use fully individual sub-properties — never mix shorthand + longhand
        borderTopWidth: 0, borderTopStyle: "solid", borderTopColor: "transparent",
        borderRightWidth: 0, borderRightStyle: "solid", borderRightColor: "transparent",
        borderBottomWidth: 0, borderBottomStyle: "solid", borderBottomColor: "transparent",
        borderLeftWidth: 3, borderLeftStyle: "solid",
        borderLeftColor: isActive ? C.cyan : "transparent",
        cursor: "pointer", textAlign: "left",
      }}
    >
      <Icon
        size={15}
        style={{ color: isActive ? C.cyan : "rgba(255,255,255,0.6)", flexShrink: 0 }}
        strokeWidth={isActive ? 2.5 : 1.8}
      />
      <span
        style={{
          fontSize: 11.5, fontFamily: "'Segoe UI', sans-serif",
          color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
          fontWeight: isActive ? 600 : 400,
        }}
      >
        {label}
      </span>
    </button>
  );
}

function FilterDropdown({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 11 }}>
      <div style={{ fontSize: 9.5, fontWeight: 600, color: C.navy, fontFamily: "'Segoe UI', sans-serif", marginBottom: 4 }}>
        {label}
      </div>
      <button
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "5px 7px",
          background: "#fff", border: `1px solid ${C.border}`,
          fontSize: 10.5, color: C.fg, fontFamily: "'Segoe UI', sans-serif", cursor: "pointer",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
          {value}
        </span>
        <ChevronDown size={11} style={{ color: C.muted, flexShrink: 0, marginLeft: 4 }} />
      </button>
    </div>
  );
}

export function GENELayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', Arial, sans-serif", background: C.canvas }}>

      {/* ── Left Navigation Sidebar ── */}
      <aside
        style={{
          width: 148, background: C.navy,
          display: "flex", flexDirection: "column",
          flexShrink: 0, zIndex: 20,
        }}
      >
        {/* GENE Logo */}
        <div
          style={{
            padding: "14px 14px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 30, height: 30, background: C.cyan,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9.5 6.5H14L10.5 9L11.8 13.5L8 11L4.2 13.5L5.5 9L2 6.5H6.5L8 2Z"
                  fill="white" />
              </svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: 0.5 }}>GENE</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, paddingTop: 6, display: "flex", flexDirection: "column" }}>
          {NAV_ITEMS.map(({ to, Icon, label }) => (
            <NavItem
              key={to} to={to} Icon={Icon} label={label}
              isActive={path === to} onNav={navigate}
            />
          ))}

          {/* ── AMSD section ── */}
          <div style={{ margin: "8px 0 4px", padding: "0 10px" }}>
            <div style={{ height: 1, background: "rgba(255,255,255,0.12)" }} />
            <div style={{ fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", marginTop: 8, marginBottom: 2, paddingLeft: 4 }}>
              AMSD
            </div>
          </div>
          <NavItem
            to="/amsd" Icon={ExternalLink} label="Exec Dashboard"
            isActive={path === "/amsd"} onNav={navigate}
          />
          <NavItem
            to="/inventory-completeness" Icon={ClipboardList} label="Inv. Completeness"
            isActive={path === "/inventory-completeness"} onNav={navigate}
          />
        </nav>

        {/* Settings at bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingBottom: 6 }}>
          <NavItem
            to="/settings" Icon={Settings} label="Settings"
            isActive={path === "/settings"} onNav={navigate}
          />
        </div>
      </aside>

      {/* ── Main Column ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top Header Bar */}
        <header
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 14px", background: "#fff",
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0, minHeight: 54,
          }}
        >
          {/* Title */}
          <div>
            <h1 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.fg, lineHeight: 1.2 }}>
              GENE Usage Analytics
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: C.muted }}>
              Track user engagement, feature usage and adoption metrics
            </p>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Date range */}
            <button
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 10px", border: `1px solid ${C.border}`,
                background: "#fff", fontSize: 11, color: C.fg, cursor: "pointer",
              }}
            >
              <CalendarDays size={13} style={{ color: C.navy }} />
              <span>Apr 21 – May 19, 2025</span>
              <ChevronDown size={11} style={{ color: C.muted }} />
            </button>

            {/* Platform */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>Platform</span>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "5px 8px", border: `1px solid ${C.border}`,
                  background: "#fff", fontSize: 11, color: C.fg, cursor: "pointer",
                }}
              >
                All <ChevronDown size={10} style={{ color: C.muted }} />
              </button>
            </div>

            {/* Last refreshed */}
            <div style={{ fontSize: 10, textAlign: "right" }}>
              <div style={{ color: C.muted, fontSize: 9, fontWeight: 600 }}>Last refreshed</div>
              <div style={{ color: C.fg, fontWeight: 500 }}>May 20, 2025 10:30 AM</div>
            </div>

            {/* Icon buttons */}
            {[RefreshCw, Filter, Info].map((Icon, i) => (
              <button
                key={i}
                style={{
                  padding: 6, border: `1px solid ${C.border}`,
                  background: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Icon size={14} style={{ color: C.muted }} />
              </button>
            ))}
          </div>
        </header>

        {/* Content Row: Filter Panel + Page Content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Filter Panel */}
          <aside
            style={{
              width: 180, background: "#fff",
              borderRight: `1px solid ${C.border}`,
              display: "flex", flexDirection: "column",
              flexShrink: 0, overflowY: "auto",
            }}
          >
            <div style={{ padding: "12px 12px 0" }}>
              {/* Data Source */}
              <div
                style={{
                  fontSize: 9, fontWeight: 700, color: C.muted,
                  letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8,
                }}
              >
                Data Source
              </div>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 10px", border: `0.5px solid ${C.border}`,
                  background: C.canvas, marginBottom: 6,
                }}
              >
                <Database size={16} style={{ color: C.navy, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.fg, lineHeight: 1 }}>GENE</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
                    <CheckCircle2 size={9} style={{ color: C.green }} />
                    <span style={{ fontSize: 9.5, color: C.green, fontWeight: 600 }}>Connected</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 9, color: C.muted, marginBottom: 12 }}>Last sync: 10:30 AM</div>

              <div style={{ height: 1, background: C.border, marginBottom: 10 }} />

              {/* Filters Header */}
              <div
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: "uppercase" }}>
                  Filters
                </span>
                <button
                  style={{
                    fontSize: 10, color: C.cyan,
                    background: "none", border: "none",
                    cursor: "pointer", fontWeight: 600, padding: 0,
                  }}
                >
                  Clear all
                </button>
              </div>

              {/* Filter Dropdowns */}
              {FILTERS.map((f) => (
                <FilterDropdown key={f.label} label={f.label} value={f.value} />
              ))}
            </div>

            {/* Reset Filters */}
            <div
              style={{
                marginTop: "auto", padding: "10px 12px 12px",
                borderTop: `1px solid ${C.border}`,
              }}
            >
              <button
                style={{
                  width: "100%", padding: "7px 0",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  border: `1px solid ${C.navy}`, background: "#fff",
                  color: C.navy, fontSize: 11, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Segoe UI', sans-serif",
                }}
              >
                <RefreshCw size={11} />
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Page Content */}
          <div style={{ flex: 1, overflowY: "auto", background: C.canvas, padding: 10 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}