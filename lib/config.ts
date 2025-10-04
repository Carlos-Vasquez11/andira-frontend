export const config = {
  app: {
    name: "Andira",
    description: "Inversiones inteligentes en la Bolsa de Valores de Caracas",
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  },
  bvc: {
    name: "Bolsa de Valores de Caracas",
    abbreviation: "BVC",
    country: "Venezuela",
  },
  features: {
    companies: ["Ron Santa Teresa", "Empresas Polar", "Banesco", "Mercantil", "CANTV"],
  },
} as const
