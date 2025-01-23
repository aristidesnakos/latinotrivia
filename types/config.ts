import { z } from "zod";

export type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "lemonade"
  | "cmyk"
  | "";

export const FeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.enum(["video", "image"]),
  path: z.string(),
  format: z.string().optional(),
  alt: z.string().optional(),
  iconName: z.string()
});

export type Feature = z.infer<typeof FeatureSchema>;

export const FeaturesConfigSchema = z.record(z.array(FeatureSchema));
export type FeaturesConfig = z.infer<typeof FeaturesConfigSchema>;

export const BillingIntervalSchema = z.enum(["month", "year"]);
export type BillingInterval = z.infer<typeof BillingIntervalSchema>;

const StripePlanSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  featured: z.boolean().nullable(),
  features: z.array(z.string()),
  credits: z.number().int(),
  creditCost: z.number().int(),
  stripeProductId: z.string(),
  limits: z.object({
    maxVideoQuality: z.enum(["720p", "1080p"])
  })
});

export type StripePlan = z.infer<typeof StripePlanSchema>;

export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  keywords: string[];
  crisp: {
    id?: string;
    onlyShowOnRoutes?: string[];
  };
  stripe: {
    plans: StripePlan[];
  };
  aws?: {
    bucket?: string;
    bucketUrl?: string;
    cdn?: string;
  };
  resend: {
    subdomain: string;
    fromNoReply: string;
    fromAdmin: string;
    supportEmail?: string;
    forwardRepliesTo?: string;
  };
  colors: {
    theme: Theme;
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
}