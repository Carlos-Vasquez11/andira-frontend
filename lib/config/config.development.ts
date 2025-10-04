export const developmentConfig = {
  apiBaseUrl: "http://localhost:8080",
  environment: "development" as const,
  enableDebugLogs: true,
  apiTimeout: 30000, // 30 seconds
}

export type AppConfig = typeof developmentConfig
