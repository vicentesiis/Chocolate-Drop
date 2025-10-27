/**
 * Environment configuration helper
 * Provides utilities for environment-specific settings
 */

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
