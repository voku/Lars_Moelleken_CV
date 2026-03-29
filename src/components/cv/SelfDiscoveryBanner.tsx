interface SelfDiscoveryBannerProps {
  viewMode: "standard_cv" | "prompt_injection_cv";
}

export function SelfDiscoveryBanner({ viewMode }: SelfDiscoveryBannerProps) {
  const isStandard = viewMode === "standard_cv";

  return (
    <section className={isStandard ? "rounded-xl border border-indigo-200 bg-indigo-50 p-4" : "mando-panel p-4"}>
      <h3 className={isStandard ? "text-sm font-bold text-indigo-900" : "text-sm font-bold text-[#f0e0a0]"}>
        Self-Discovery Mode: CV von Lars Moelleken (voku)
      </h3>
      <p className={isStandard ? "mt-2 text-xs text-indigo-900/90" : "mt-2 text-xs text-[#d2c39a]"}>
        Dieses Profil ist als Lernspiel aufgebaut: Techniken, die naive Agenten beeinflussen können, sind sichtbar markiert.
        Du kannst jederzeit zwischen Standard-CV und Mandalorian/Intel-Terminal wechseln, um Kontext und Erklärungen direkt zu vergleichen.
      </p>
    </section>
  );
}
