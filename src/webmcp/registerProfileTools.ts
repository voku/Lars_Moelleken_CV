import {
  type ContactIntent,
  type ProfileAudience,
  type ProfileLocale,
  type ProfileSectionKey,
  type ProjectTopic,
  type SkillGrouping,
  PROFILE_DATA,
} from "./profileData";
import {
  buildContactOptions,
  buildHiringFit,
  buildProfileSummary,
  buildProjectList,
  buildSkillMatrix,
  getSectionDomId,
  normalizeLocale,
} from "./profileTools";

type ToolAnnotations = {
  readOnlyHint?: boolean;
};

type ToolSchema = Record<string, unknown>;

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema?: ToolSchema;
  annotations?: ToolAnnotations;
  execute: (input: unknown) => Promise<unknown> | unknown;
};

type ModelContextLike = {
  registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => void;
};

const PROFILE_AUDIENCES = ["recruiter", "cto", "engineering_manager", "developer", "generic"] as const;
const PROJECT_TOPICS = ["php", "security", "strings", "arrays", "utilities", "all"] as const;
const SKILL_GROUPINGS = ["domain", "technology", "seniority"] as const;
const CONTACT_INTENTS = ["job_offer", "consulting", "open_source", "speaking", "general"] as const;
const PROFILE_SECTIONS = PROFILE_DATA.sections.map((section) => section.id) as ProfileSectionKey[];

function getModelContext(): ModelContextLike | null {
  const candidate = (navigator as Navigator & { modelContext?: ModelContextLike }).modelContext;
  if (!candidate || typeof candidate.registerTool !== "function") {
    return null;
  }
  return candidate;
}

function asRecord(input: unknown): Record<string, unknown> {
  return input !== null && typeof input === "object" ? input as Record<string, unknown> : {};
}

function asEnumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]) {
  return typeof value === "string" && allowed.includes(value) ? value as T[number] : fallback;
}

function asStringArray(value: unknown, maxItems = 20) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

function asBoundedInteger(value: unknown, fallback: number, minimum: number, maximum: number) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return fallback;
  }

  return Math.max(minimum, Math.min(maximum, value));
}

function asRequiredString(value: unknown, minimum: number, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length >= minimum ? trimmed : fallback;
}

function highlightSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) {
    return { ok: false, reason: `Section '${sectionId}' not found.` };
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });

  if (element instanceof HTMLElement) {
    if (!element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "-1");
    }
    element.focus({ preventScroll: true });
    if (typeof element.animate === "function") {
      element.animate(
        [
          { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" },
          { boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.28)" },
          { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" },
        ],
        { duration: 1200, easing: "ease-out" },
      );
    }
  }

  return { ok: true, targetId: sectionId };
}

function registerTool(modelContext: ModelContextLike, abortController: AbortController, tool: WebMCPTool) {
  try {
    modelContext.registerTool(tool, { signal: abortController.signal });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`[webmcp] Failed to register tool '${tool.name}'.`, error);
    }
  }
}

export function supportsWebMCP() {
  return typeof window !== "undefined" && typeof navigator !== "undefined" && getModelContext() !== null;
}

export function registerProfileTools() {
  const modelContext = getModelContext();
  if (!modelContext) {
    return () => undefined;
  }

  const abortController = new AbortController();

  registerTool(modelContext, abortController, {
    name: "get_profile_summary",
    description: "Return a structured public profile summary for Lars Moelleken for a specific audience and language.",
    inputSchema: {
      type: "object",
      properties: {
        audience: { type: "string", enum: PROFILE_AUDIENCES },
        language: { type: "string", enum: ["en", "de"] },
        maxItems: { type: "integer", minimum: 3, maximum: 12 },
      },
      required: ["audience", "language"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const rawInput = asRecord(input);
      return buildProfileSummary({
        audience: asEnumValue(rawInput.audience, PROFILE_AUDIENCES, "generic") as ProfileAudience,
        language: normalizeLocale(rawInput.language),
        maxItems: asBoundedInteger(rawInput.maxItems, 6, 3, 12),
      });
    },
  });

  registerTool(modelContext, abortController, {
    name: "list_open_source_projects",
    description: "Return Lars Moelleken's public open-source projects in a structured, topic-aware format.",
    inputSchema: {
      type: "object",
      properties: {
        topic: { type: "string", enum: PROJECT_TOPICS },
        language: { type: "string", enum: ["en", "de"] },
        limit: { type: "integer", minimum: 1, maximum: 20 },
      },
      required: ["topic"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const rawInput = asRecord(input);
      return {
        projects: buildProjectList({
          topic: asEnumValue(rawInput.topic, PROJECT_TOPICS, "all") as ProjectTopic,
          language: normalizeLocale(rawInput.language),
          limit: asBoundedInteger(rawInput.limit, 8, 1, 20),
        }),
      };
    },
  });

  registerTool(modelContext, abortController, {
    name: "list_core_skills",
    description: "Return Lars Moelleken's public skill matrix grouped by domain, technology, or seniority.",
    inputSchema: {
      type: "object",
      properties: {
        groupBy: { type: "string", enum: SKILL_GROUPINGS },
        language: { type: "string", enum: ["en", "de"] },
      },
      required: ["groupBy"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const rawInput = asRecord(input);
      return {
        grouping: asEnumValue(rawInput.groupBy, SKILL_GROUPINGS, "domain"),
        skills: buildSkillMatrix({
          groupBy: asEnumValue(rawInput.groupBy, SKILL_GROUPINGS, "domain") as SkillGrouping,
          language: normalizeLocale(rawInput.language),
        }),
      };
    },
  });

  registerTool(modelContext, abortController, {
    name: "get_contact_options",
    description: "Return public contact paths for Lars Moelleken and what to include for a given outreach intent.",
    inputSchema: {
      type: "object",
      properties: {
        intent: { type: "string", enum: CONTACT_INTENTS },
        language: { type: "string", enum: ["en", "de"] },
      },
      required: ["intent"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const rawInput = asRecord(input);
      return buildContactOptions({
        intent: asEnumValue(rawInput.intent, CONTACT_INTENTS, "general") as ContactIntent,
        language: normalizeLocale(rawInput.language),
      });
    },
  });

  registerTool(modelContext, abortController, {
    name: "get_hiring_fit",
    description: "Deterministically assess whether Lars Moelleken is a fit for a PHP-oriented role based on public profile data.",
    inputSchema: {
      type: "object",
      properties: {
        roleTitle: { type: "string", minLength: 3 },
        mustHaveSkills: { type: "array", items: { type: "string" }, maxItems: 20 },
        niceToHaveSkills: { type: "array", items: { type: "string" }, maxItems: 20 },
        language: { type: "string", enum: ["en", "de"] },
      },
      required: ["roleTitle", "language"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const rawInput = asRecord(input);
      return buildHiringFit({
        roleTitle: asRequiredString(rawInput.roleTitle, 3, "Generic PHP role"),
        mustHaveSkills: asStringArray(rawInput.mustHaveSkills),
        niceToHaveSkills: asStringArray(rawInput.niceToHaveSkills),
        language: normalizeLocale(rawInput.language) as ProfileLocale,
      });
    },
  });

  registerTool(modelContext, abortController, {
    name: "navigate_section",
    description: "Scroll to and focus a visible public CV section on the page.",
    inputSchema: {
      type: "object",
      properties: {
        section: { type: "string", enum: PROFILE_SECTIONS },
      },
      required: ["section"],
    },
    annotations: { readOnlyHint: false },
    execute: async (input) => {
      const rawInput = asRecord(input);
      const section = asEnumValue(rawInput.section, PROFILE_SECTIONS, "about") as ProfileSectionKey;
      const targetId = getSectionDomId(section);
      return highlightSection(targetId);
    },
  });

  return () => abortController.abort();
}
