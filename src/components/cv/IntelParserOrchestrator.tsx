import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UI_TEXT, useCvCopy } from "./copy";

export interface IntelParserTechnique {
  id: string;
  title: string;
  category: string;
  payload: string;
}

type ParserMode = "naive" | "hardened";

interface ParserSignal {
  label: string;
  kind: "directive" | "anomaly" | "authority" | "runtime" | "invisible";
  weight: number;
  evidence: string;
}

interface ParserReport {
  trustScore: number;
  threatScore: number;
  verdict: string;
  matches: ParserSignal[];
  blockedSignals: number;
}

function getSignalProbes(copy: ReturnType<typeof useCvCopy>): Array<{ pattern: RegExp; signal: Omit<ParserSignal, "evidence"> }> {
  return [
    { pattern: /(ignore all previous instructions|system override|you are now)/i, signal: { label: copy.intelParser.signalPrompt, kind: "directive", weight: 34 } },
    { pattern: /(rank\s*=\s*1|score\s*=\s*100|match_score\s*=\s*100)/i, signal: { label: copy.intelParser.signalRanking, kind: "directive", weight: 28 } },
    { pattern: /(verified|ai-platform|top candidate|award|aggregateRating)/i, signal: { label: copy.intelParser.signalAuthority, kind: "authority", weight: 20 } },
    { pattern: /(settimeout|mutationobserver|insertadjacenttext|document\.)/i, signal: { label: copy.intelParser.signalRuntime, kind: "runtime", weight: 26 } },
    { pattern: /(transparent|font-size:1px|aria-hidden|height:0)/i, signal: { label: copy.intelParser.signalInvisible, kind: "invisible", weight: 22 } },
    { pattern: /(@type|json-ld|schema)/i, signal: { label: copy.intelParser.signalStructured, kind: "anomaly", weight: 12 } },
  ];
}

export function buildParserReport(
  technique: IntelParserTechnique,
  mode: ParserMode,
  copy: ReturnType<typeof useCvCopy> = UI_TEXT,
): ParserReport {
  const matches: ParserSignal[] = getSignalProbes(copy)
    .filter((probe) => probe.pattern.test(technique.payload))
    .map((probe) => ({
      ...probe.signal,
      evidence: technique.payload.match(probe.pattern)?.[0] ?? copy.intelParser.evidenceFallback,
    }));

  const maxRiskScore = Math.min(99, matches.reduce((acc, current) => acc + current.weight, 20));
  if (mode === "naive") {
    return {
      trustScore: Math.max(5, 100 - maxRiskScore + 48),
      threatScore: Math.max(8, maxRiskScore - 45),
      verdict: copy.intelParser.verdictNaive,
      matches: matches.slice(0, 2),
      blockedSignals: 0,
    };
  }

  const blockedSignals = matches.filter((match) => match.kind !== "anomaly").length;
  return {
    trustScore: Math.max(6, 100 - maxRiskScore - blockedSignals * 4),
    threatScore: Math.min(99, maxRiskScore + blockedSignals * 3),
    verdict: blockedSignals > 0
      ? copy.intelParser.verdictBlocked
      : copy.intelParser.verdictClean,
    matches,
    blockedSignals,
  };
}

interface IntelParserOrchestratorProps {
  techniques: IntelParserTechnique[];
  activeTechniqueId: string | null;
  onRunSimulationReward: () => void;
}

export function IntelParserOrchestrator({ techniques, activeTechniqueId, onRunSimulationReward }: IntelParserOrchestratorProps) {
  const copy = useCvCopy();
  const [parserMode, setParserMode] = useState<ParserMode>("hardened");
  const [isParserRunning, setIsParserRunning] = useState(false);
  const [parserProgress, setParserProgress] = useState(0);
  const [parserLogs, setParserLogs] = useState<string[]>([]);
  const [lastParsedTechId, setLastParsedTechId] = useState<string | null>(null);
  const [parserRunId, setParserRunId] = useState(0);
  const parserIntervalRef = useRef<number | null>(null);
  const parserTimeoutRef = useRef<number | null>(null);

  const parserTargetTechnique = useMemo(
    () => techniques.find((tech) => tech.id === activeTechniqueId) ?? techniques[0],
    [activeTechniqueId, techniques],
  );
  const parserReport = useMemo(
    () => buildParserReport(parserTargetTechnique, parserMode, copy),
    [copy, parserMode, parserTargetTechnique],
  );

  const runIntelParser = useCallback(() => {
    if (!parserTargetTechnique || isParserRunning) return;
    if (parserIntervalRef.current) window.clearInterval(parserIntervalRef.current);
    if (parserTimeoutRef.current) window.clearTimeout(parserTimeoutRef.current);

    setIsParserRunning(true);
    setParserProgress(0);
    setParserLogs([
      `${copy.intelParser.bootTag} ${parserMode === "naive" ? copy.intelParser.parserNaiveBoot : copy.intelParser.parserHardenedBoot} ${copy.intelParser.initializedSuffix}`,
      `${copy.intelParser.loadTag} ${copy.intelParser.targetLabel}=${parserTargetTechnique.id} ${copy.intelParser.categoryLabel}=${parserTargetTechnique.category}`,
    ]);
    setLastParsedTechId(parserTargetTechnique.id);
    setParserRunId((prev) => prev + 1);

    const phases = [
      `${copy.intelParser.scanTag} ${copy.intelParser.tokenizingPrefix} (${parserTargetTechnique.payload.length} chars)`,
      copy.intelParser.phaseExtract,
      parserMode === "naive"
        ? copy.intelParser.phaseNaiveDecision
        : copy.intelParser.phaseHardenedDefense,
    ];
    let phaseIndex = 0;

    parserIntervalRef.current = window.setInterval(() => {
      setParserProgress((prev) => {
        const next = Math.min(100, prev + 4);
        if (next >= (phaseIndex + 1) * 28 && phaseIndex < phases.length) {
          setParserLogs((logs) => [...logs, phases[phaseIndex]]);
          phaseIndex += 1;
        }
        return next;
      });
    }, 75);

    parserTimeoutRef.current = window.setTimeout(() => {
      if (parserIntervalRef.current) {
        window.clearInterval(parserIntervalRef.current);
        parserIntervalRef.current = null;
      }
      setParserProgress(100);
      setParserLogs((logs) => [
        ...logs,
        `${copy.intelParser.resultTag} ${copy.intelParser.threat}=${parserReport.threatScore}% ${copy.intelParser.trust}=${parserReport.trustScore}%`,
        `${copy.intelParser.verdictTag} ${parserReport.verdict}`,
      ]);
      setIsParserRunning(false);
      onRunSimulationReward();
      parserTimeoutRef.current = null;
    }, 2200);
  }, [copy, isParserRunning, onRunSimulationReward, parserMode, parserReport.threatScore, parserReport.trustScore, parserReport.verdict, parserTargetTechnique]);

  useEffect(() => {
    return () => {
      if (parserIntervalRef.current) window.clearInterval(parserIntervalRef.current);
      if (parserTimeoutRef.current) window.clearTimeout(parserTimeoutRef.current);
    };
  }, []);

  if (!parserTargetTechnique) return null;

  return (
    <div className="mt-5 pt-4 space-y-3" style={{ borderTop: "1px solid var(--demo-border)" }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-mono" style={{ color: "var(--demo-glow)" }}>
          {copy.intelParser.title}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setParserMode("naive")}
            className="text-[0.65rem] font-mono px-2.5 py-1 rounded border transition-all hover:opacity-80"
            style={{
              borderColor: parserMode === "naive" ? "rgba(220,100,100,0.7)" : "rgba(200,168,80,0.25)",
              background: parserMode === "naive" ? "rgba(220,80,80,0.2)" : "transparent",
              color: parserMode === "naive" ? "var(--mando-alert)" : "var(--demo-glow)",
            }}
          >
            {copy.intelParser.naiveCore}
          </button>
          <button
            type="button"
            onClick={() => setParserMode("hardened")}
            className="text-[0.65rem] font-mono px-2.5 py-1 rounded border transition-all hover:opacity-80"
            style={{
              borderColor: parserMode === "hardened" ? "rgba(100,210,140,0.7)" : "rgba(200,168,80,0.25)",
              background: parserMode === "hardened" ? "rgba(70,180,110,0.2)" : "transparent",
              color: parserMode === "hardened" ? "var(--mando-verified)" : "var(--demo-glow)",
            }}
          >
            {copy.intelParser.hardenedCore}
          </button>
          <button
            type="button"
            onClick={runIntelParser}
            disabled={isParserRunning}
            className="text-[0.65rem] font-mono font-bold px-3 py-1.5 rounded border transition-all disabled:cursor-not-allowed"
            style={{
              borderColor: "var(--demo-glow)",
              background: isParserRunning ? "rgba(200,168,80,0.08)" : "rgba(200,168,80,0.18)",
              color: isParserRunning ? "var(--demo-glow)" : "var(--mando-heading)",
            }}
          >
            {isParserRunning ? copy.intelParser.scanning : copy.intelParser.run}
          </button>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(200,168,80,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${parserProgress}%`,
            background: parserMode === "naive"
              ? "linear-gradient(90deg, rgba(220,80,80,0.4), rgba(220,80,80,0.8))"
              : "linear-gradient(90deg, rgba(80,180,120,0.45), rgba(90,210,140,0.9))",
          }}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="mando-terminal text-xs" style={{ minHeight: "8.5rem" }}>
          {parserLogs.length === 0
            ? <span style={{ color: "var(--demo-glow)" }}>{copy.intelParser.idle}</span>
            : parserLogs.slice(-6).map((log, index) => (
              <div key={`${parserRunId}-${index}-${log}`} style={{ color: "var(--mando-body)" }}>
                {`> ${log}`}
              </div>
            ))
          }
        </div>
        <div className="mando-terminal text-xs space-y-2" style={{ minHeight: "8.5rem" }}>
          <div style={{ color: "var(--mando-heading)" }}>
            {copy.intelParser.target} <span style={{ color: "var(--demo-glow)" }}>{parserTargetTechnique.title}</span>
          </div>
          <div style={{ color: "var(--mando-subtitle)" }}>
            {copy.intelParser.mode}={parserMode} · {copy.intelParser.blockedSignals}={parserMode === "hardened" ? parserReport.blockedSignals : 0}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded border p-2" style={{ borderColor: "rgba(220,90,90,0.4)", color: "#ef9a9a" }}>
              {copy.intelParser.threat} {parserReport.threatScore}%
            </div>
            <div className="rounded border p-2" style={{ borderColor: "rgba(90,200,130,0.45)", color: "#8ee3a9" }}>
              {copy.intelParser.trust} {parserReport.trustScore}%
            </div>
          </div>
          <div style={{ color: "var(--mando-label)" }}>
            {parserReport.verdict}
          </div>
          {lastParsedTechId === parserTargetTechnique.id && parserProgress === 100 ? (
            <div className="space-y-1">
              {parserReport.matches.slice(0, 4).map((match) => (
                <div key={`${match.label}-${match.evidence}`} style={{ color: "var(--mando-label)" }}>
                  • {match.label}: <span style={{ color: "var(--mando-body)" }}>{match.evidence}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
