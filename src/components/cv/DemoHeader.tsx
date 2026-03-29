import type { CSSProperties, ReactNode } from "react";

interface DemoHeaderProps {
  mobileSrc: string;
  desktopSrc: string;
  subtitle: string;
  navigation: ReactNode;
}

const COUNTERMEASURE_BADGE_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "monospace",
  fontSize: "0.58rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
  padding: "2px 7px",
  borderRadius: "3px",
  background: "rgba(64,168,112,0.18)",
  border: "1px solid rgba(64,168,112,0.45)",
  color: "var(--mando-verified)",
  whiteSpace: "nowrap",
};

export function DemoHeader({ mobileSrc, desktopSrc, subtitle, navigation }: DemoHeaderProps) {
  return (
    <header
      className="page-header border-b pt-20 pb-12 sm:py-20 lg:py-24 page-header-demo"
      style={{
        "--mobile-bg": `url(${encodeURI(mobileSrc)})`,
        "--desktop-bg": `url(${encodeURI(desktopSrc)})`,
      } as CSSProperties}
    >
      <div className="page-header-backdrop" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="mando-section-label" style={{ color: "rgba(200,168,80,0.75)" }}>DATAPAD v7 // ACTIVE</span>
          <span className="mando-section-label" style={{ color: "rgba(200,64,64,0.75)" }}>◈ EDUCATIONAL DEMO</span>
          <span className="mando-section-label" style={{ color: "rgba(64,168,112,0.75)" }}>✓ DEFENSE LOADED</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight" style={{ color: "#f0e0a0", textShadow: "0 0 30px rgba(200,168,80,0.35)" }}>
          Prompt Injection<br />
          <span style={{ color: "var(--demo-glow)" }}>Intel Terminal</span>
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl" style={{ color: "rgba(224,208,164,0.82)" }}>
          {subtitle}
        </p>
        {navigation}
        <div className="flex flex-wrap gap-2">
          <span className="mando-threat mando-threat-critical">◈ THREAT ACTIVE</span>
          <span className="mando-threat mando-threat-high">⚡ 6 VECTORS</span>
          <span className="mando-threat mando-threat-medium">◆ 7 GEO RISKS</span>
          <span style={COUNTERMEASURE_BADGE_STYLE}>
            ✓ COUNTERMEASURES READY
          </span>
        </div>
      </div>
    </header>
  );
}
