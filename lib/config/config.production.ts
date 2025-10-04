import type { AppConfig } from "./config.development"

export const productionConfig: AppConfig = {
  apiBaseUrl: "https://api.andira.com.ve",
  environment: "production" as const,
  enableDebugLogs: false,
  apiTimeout: 15000, // 15 seconds
}
