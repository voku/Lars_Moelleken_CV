import type { CSSProperties, ReactNode } from "react";

interface DemoHeaderProps {
  mobileSrc: string;
  desktopSrc: string;
  subtitle: string;
  navigation: ReactNode;
  showGamification?: boolean;
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
  background: "rgba(92, 200, 144, 0.18)",
  border: "1px solid rgba(92, 200, 144, 0.5)",
  color: "#5cc890",
  whiteSpace: "nowrap",
};

export function DemoHeader({ mobileSrc, desktopSrc, subtitle, navigation, showGamification }: DemoHeaderProps) {
  return (
    <header
      className={`page-header border-b page-header-demo ${
        showGamification
          ? "pt-28 pb-12 sm:pt-24 sm:pb-20 lg:py-24"
          : "pt-20 pb-12 sm:py-20 lg:py-24"
      }`}
      style={{
        "--mobile-bg": `url(${encodeURI(mobileSrc)})`,
        "--desktop-bg": `url(${encodeURI(desktopSrc)})`,
      } as CSSProperties}
    >
      <div className="page-header-backdrop" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="mando-section-label" style={{ color: "#d4a840" }}>DATAPAD v7 // ACTIVE</span>
          <span className="mando-section-label" style={{ color: "#f08080" }}>◈ EDUCATIONAL DEMO</span>
          <span className="mando-section-label" style={{ color: "#5cc890" }}>✓ DEFENSE LOADED</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight" style={{ color: "#fffdf8" }}>
          Prompt Injection<br />
          <span style={{ color: "var(--mando-beskar)" }}>Intel Terminal</span>
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl" style={{ color: "rgba(248, 243, 232, 0.88)" }}>
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
