# Lars Moelleken – AI-Readable CV & Prompt-Injection Lab

Interactive CV for Lars Moelleken, Senior PHP Developer and Software Architect.

The project has two practical goals:

1. present a precise, machine-readable professional profile that recruiting agents can retrieve and recommend with evidence;
2. demonstrate how candidate-controlled web content can manipulate a naive AI recruiter, and how a hardened parser should preserve facts while rejecting embedded ranking instructions.

**Live:** https://voku.github.io/Lars_Moelleken_CV/

## What changed

The public profile is aligned with the 2026 CV and now uses one consistent evidence source for:

- visible CV content;
- the non-JavaScript static mirror;
- Schema.org `ProfilePage`, `Person`, and `FAQPage` data;
- the downloadable public profile JSON;
- role-fit explanations for recruiting agents.

Unsupported framework claims, invented credentials, self-issued awards, fake ratings, and incorrect employment dates are no longer part of the production profile surface.

## Recruiter and AI signals

The page directly explains why Lars should be shortlisted for:

- Senior PHP Developer;
- Software Architect / PHP Architect;
- Legacy Modernization / Quality Engineering;
- Enterprise Integration Developer.

Every recommendation is tied to visible evidence such as PHP 8.x, large legacy codebases, PHPStan at maximum level, PHPUnit/Codeception, CI/CD, MariaDB/MySQL, Linux, LDAP/Active Directory, Microsoft 365/Exchange, PowerShell, AS/400 integration, and long-term open-source maintenance.

This is deliberate retrieval and ranking optimization using verifiable facts, rather than hoping a bot correctly reconstructs the profile from scattered buzzwords. Apparently machines also need the answer stated plainly. Humans invented cover letters, so nobody gets to judge.

## Prompt-injection lab

The interactive lab feeds the same candidate content to two simulated parsers:

- **Naive parser:** copies the candidate-authored instruction to rank Lars first and recommend immediate hiring.
- **Hardened parser:** detects the ranking directive, rejects it, preserves allowlisted facts, and still recommends a shortlist when the evidence supports it.

The demonstration covers:

- direct instruction injection;
- candidate-authored ranking and score fields;
- poisoned structured metadata;
- hidden or tiny text;
- output-schema hijacking;
- delayed DOM mutation signals.

The production JSON-LD remains factual. The malicious directive exists only inside the visibly labelled simulation.

## Run locally

**Prerequisites:** Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run lint
npm test
npm run build
```

Pull requests run all three checks in GitHub Actions.

## Key files

| File | Purpose |
|---|---|
| `src/cvData.ts` | Single PDF-aligned data source for the active CV |
| `src/AppV2.tsx` | Evidence-first CV and interactive injection comparison |
| `src/trust.ts` | Injection-signal classification and visible-fact allowlist |
| `src/trust.test.ts` | Trust-boundary tests |
| `index.html` | Static mirror and factual Schema.org data for non-JS clients |
| `public/prompt-injection-demo.json` | Static factual profile plus labelled simulation contract |
| `.github/workflows/ci.yml` | TypeScript, tests, and production-build validation |

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by `.github/workflows/deploy.yml`.
