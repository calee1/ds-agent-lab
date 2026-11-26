import { z } from "zod"

export const PropSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  description: z.string().optional(),
})

export const ComponentSchema = z.object({
  name: z.string(),
  slug: z.string(),
  file: z.string(),
  install: z.string(),
  import: z.string(),
  exports: z.array(z.string()),
  slots: z.array(z.string()),
  variants: z.record(z.string(), z.array(z.string())),
  defaultVariants: z.record(z.string(), z.string()),
  props: z.record(z.string(), z.array(PropSchema)),
  description: z.string().optional(),
  composition: z.string().optional(),
  whenToUse: z.array(z.string()).default([]),
  whenNotToUse: z.array(z.string()).default([]),
  a11y: z.array(z.string()).default([]),
  relatedDecisions: z.array(z.string()).default([]),
  example: z.string().optional(),
})

export const TokensSchema = z.object({
  colors: z.record(z.string(), z.object({ light: z.string(), dark: z.string().optional() })),
  semanticColorClasses: z.array(z.string()),
  radius: z.record(z.string(), z.string()),
  fonts: z.record(z.string(), z.string()),
  spacingScale: z.array(z.string()),
  fontSizeScale: z.array(z.string()),
  fontWeights: z.array(z.string()),
})

export const DecisionSchema = z.object({
  id: z.string().regex(/^DR-\d{4}$/),
  title: z.string(),
  status: z.enum(["accepted", "proposed", "superseded"]),
  severity: z.enum(["error", "warn"]),
  scope: z.array(z.string()),
  /** Present only for skin-specific rules; absent means the rule applies to all skins. */
  skin: z.string().optional(),
  enforcement: z.object({
    type: z.enum(["eslint", "playwright", "visual", "reviewer"]),
    ref: z.string(),
  }),
  rationale: z.string(),
  do: z.array(z.string()).default([]),
  dont: z.array(z.string()).default([]),
  body: z.string(),
})

export const SkinSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  modes: z.array(z.enum(["light", "dark"])),
  cssFile: z.string(),
  radius: z.string().optional(),
  font: z.string().optional(),
  /** Decision record IDs scoped to this skin — injected by build.ts from decisions.json */
  decisions: z.array(z.string()).default([]),
})

export type Component = z.infer<typeof ComponentSchema>
export type Tokens = z.infer<typeof TokensSchema>
export type Decision = z.infer<typeof DecisionSchema>
export type Skin = z.infer<typeof SkinSchema>
