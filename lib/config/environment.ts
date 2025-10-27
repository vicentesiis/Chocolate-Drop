/**
 * Environment configuration helper
 * Provides utilities for environment-specific settings
 */

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

// Detect deployment platform
export const isVercel = !!process.env.VERCEL;
export const isRender = !!process.env.RENDER;
export const isNetlify = !!process.env.NETLIFY;
export const isLocal = !isVercel && !isRender && !isNetlify;

// Render-specific environment detection
export const isRenderDev =
  isRender && process.env.RENDER_SERVICE_TYPE === "preview";
export const isRenderProd =
  isRender && process.env.RENDER_SERVICE_TYPE === "web";

export const environment = {
  // Basic environment
  current: process.env.NODE_ENV || "development",
  isDev: isDevelopment,
  isProd: isProduction,

  // Platform detection
  platform: isVercel
    ? "vercel"
    : isRender
      ? "render"
      : isNetlify
        ? "netlify"
        : "local",
  isLocal,
  isVercel,
  isRender,
  isNetlify,

  // Render-specific
  isRenderDev,
  isRenderProd,

  // Combined environment detection
  isLocalDev: isLocal && isDevelopment,
  isRenderDevEnv: isRenderDev,
  isRenderProdEnv: isRenderProd,
} as const;

/**
 * Get environment-specific values
 * Now supports local/render dev/render prod distinction
 */
export function getEnvValue<T>(
  localValue: T,
  renderDevValue: T,
  renderProdValue: T,
): T;
export function getEnvValue<T>(devValue: T, prodValue: T): T;
export function getEnvValue<T>(...args: T[]): T {
  if (args.length === 3) {
    const [localValue, renderDevValue, renderProdValue] = args;
    if (environment.isLocal) return localValue;
    if (environment.isRenderDev) return renderDevValue;
    if (environment.isRenderProd) return renderProdValue;
    return localValue; // fallback
  } else {
    const [devValue, prodValue] = args;
    return isProduction ? prodValue : devValue;
  }
}

/**
 * Firebase project info for current environment
 */
export const firebaseProjectInfo = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  environment: environment.current,
  platform: environment.platform,
} as const;

/**
 * Debug info - useful for troubleshooting environment detection
 */
export const debugInfo = {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
  RENDER: process.env.RENDER,
  RENDER_SERVICE_TYPE: process.env.RENDER_SERVICE_TYPE,
  NETLIFY: process.env.NETLIFY,
  detectedEnvironment: environment,
} as const;
