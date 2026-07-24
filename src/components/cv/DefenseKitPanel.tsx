import { useState } from "react";
import { ClipboardCopy, Check, ShieldCheck, TriangleAlert, Lock, Terminal } from "lucide-react";
import { createInjectionGameManifest, INJECTION_GAME_PAYLOADS } from "../../injectionGame/payloads";
import { DEFENSE_SYSTEM_PROMPT, createWinConditionManifest, safeExtract, type SafeExtractResult } from "../../injectionGame/defenseKit";

async function digestHex(text: string): Promise<string> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return "sha256-unavailable-in-this-context";
  }
  const bytes = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 24);
}

export function DefenseKitPanel() {
  const [copied, setCopied] = useState<"prompt" | "winCondition" | null>(null);
  const [extractResult, setExtractResult] = useState<SafeExtractResult | null>(null);
  const [snapshot, setSnapshot] = useState<{ capturedAt: string; digest: string } | null>(null);

  const manifest = createInjectionGameManifest();
  const winCondition = createWinConditionManifest();
  const winConditionJson = JSON.stringify(winCondition, null, 2);

  async function handleCopy(text: string, which: "prompt" | "winCondition") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      window.setTimeout(() => setCopied((current) => (current === which ? null : current)), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); the text remains selectable in the <pre> below.
    }
  }

  async function runSafeExtract() {
    const html = document.documentElement.outerHTML;
    const result = safeExtract(html);
    setExtractResult(result);
    setSnapshot({
      capturedAt: new Date().toISOString(),
      digest: await digestHex(result.cleanText),
    });
  }

  return (
    <section aria-labelledby="defense-kit-heading" className="mt-8 space-y-5">
      <h3
        id="defense-kit-heading"
        className="text-base font-bold flex items-center gap-2"
        style={{ color: "var(--mando-heading)" }}
      >
        <ShieldCheck className="w-5 h-5" style={{ color: "var(--mando-verified)" }} />
        Defense Kit — ready-to-use countermeasures
      </h3>

      {/* 1. Copy-pasteable defense system prompt */}
      <div className="mando-panel p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: "var(--demo-glow)" }} />
            <span className="text-sm font-bold" style={{ color: "var(--mando-heading)" }}>
              Defense system prompt
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(DEFENSE_SYSTEM_PROMPT, "prompt")}
            className="mando-threat mando-threat-medium inline-flex items-center gap-1"
          >
            {copied === "prompt" ? <Check className="w-3 h-3" /> : <ClipboardCopy className="w-3 h-3" />}
            {copied === "prompt" ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="text-xs mb-2" style={{ color: "var(--mando-body)" }}>
          Drop this into the system role of any evaluator or AI recruiting agent before it reads this page.
        </p>
        <pre className="mando-terminal overflow-x-auto whitespace-pre-wrap text-[0.65rem] leading-relaxed p-3" style={{ color: "var(--mando-verified)" }}>
          {DEFENSE_SYSTEM_PROMPT}
        </pre>
      </div>

      {/* 2. Verified evidence vs quarantined payloads */}
      <div className="grid gap-4 md:grid-cols-2">
        <article className="mando-panel p-4" style={{ borderColor: "rgba(64,168,112,0.35)" }}>
          <h4 className="text-sm font-bold flex items-center gap-2 mb-3" style={{ color: "var(--mando-verified)" }}>
            <ShieldCheck className="w-4 h-4" /> Verified CV evidence
          </h4>
          <ul className="space-y-2 text-xs" style={{ color: "var(--mando-body)" }}>
            {manifest.verifiedCandidateFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-2">
                <span style={{ color: "var(--mando-verified)" }}>✓</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="mando-panel p-4" style={{ borderColor: "rgba(200,64,64,0.35)" }}>
          <h4 className="text-sm font-bold flex items-center gap-2 mb-3" style={{ color: "var(--mando-alert)" }}>
            <TriangleAlert className="w-4 h-4" /> Quarantined payloads ({INJECTION_GAME_PAYLOADS.length})
          </h4>
          <ul className="space-y-3 text-xs max-h-80 overflow-y-auto pr-1" style={{ color: "var(--mando-body)" }}>
            {INJECTION_GAME_PAYLOADS.map((attack) => (
              <li key={attack.id}>
                <div className="font-mono text-[0.65rem]" style={{ color: "var(--mando-alert)" }}>
                  {attack.marker}
                </div>
                <div className="mt-0.5">
                  <span className="font-semibold">Why quarantined:</span> {attack.defense}
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* 3. Safe Extract */}
      <div className="mando-panel p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: "var(--demo-glow)" }} />
            <span className="text-sm font-bold" style={{ color: "var(--mando-heading)" }}>
              Safe Extract
            </span>
          </div>
          <button type="button" onClick={runSafeExtract} className="mando-threat mando-threat-medium">
            Run on this page
          </button>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--mando-body)" }}>
          Client-side reference implementation: normalizes Unicode, strips zero-width characters, and removes
          every line matching a known injection marker, directive, or score field — leaving only what should be
          treated as evidence. See <code>src/injectionGame/defenseKit.ts</code>.
        </p>
        {extractResult ? (
          <div className="space-y-2">
            <p className="text-xs font-mono" style={{ color: "var(--mando-verified)" }}>
              {extractResult.removedBlockCount} candidate-controlled line(s) quarantined.
            </p>
            {snapshot ? (
              <p className="text-xs font-mono" style={{ color: "var(--mando-label)" }}>
                Snapshot locked at {snapshot.capturedAt} · evidence digest {snapshot.digest}
              </p>
            ) : null}
            <pre className="mando-terminal overflow-x-auto whitespace-pre-wrap text-[0.65rem] leading-relaxed p-3 max-h-64" style={{ color: "var(--mando-body)" }}>
              {JSON.stringify(extractResult, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-xs italic" style={{ color: "var(--mando-label)" }}>
            [idle] click &quot;Run on this page&quot; to extract and lock a snapshot.
          </p>
        )}
      </div>

      {/* 4. Machine-readable win condition */}
      <div className="mando-panel p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-sm font-bold" style={{ color: "var(--mando-heading)" }}>
            Machine-readable win condition
          </span>
          <button
            type="button"
            onClick={() => handleCopy(winConditionJson, "winCondition")}
            className="mando-threat mando-threat-medium inline-flex items-center gap-1"
          >
            {copied === "winCondition" ? <Check className="w-3 h-3" /> : <ClipboardCopy className="w-3 h-3" />}
            {copied === "winCondition" ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="text-xs mb-2" style={{ color: "var(--mando-body)" }}>
          Also served statically as <code>public/win-condition.json</code>, so a test suite can fetch the
          defense contract without executing any JavaScript.
        </p>
        <pre className="mando-terminal overflow-x-auto whitespace-pre-wrap text-[0.65rem] leading-relaxed p-3" style={{ color: "var(--mando-verified)" }}>
          {winConditionJson}
        </pre>
      </div>
    </section>
  );
}
