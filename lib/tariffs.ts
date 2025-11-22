export const TARIFFS = {
  personaNatural: {
    commission: 0.005, // 0.5%
    custody: 5, // $5 USD monthly
    accountOpening: 0, // Free
  },
  personaJuridica: {
    commission: 0.003, // 0.3%
    custody: 25, // $25 USD monthly
    accountOpening: 50, // $50 USD
  },
} as const

export type UserType = "personaNatural" | "personaJuridica"

export function getCommission(userType: UserType = "personaNatural"): number {
  return TARIFFS[userType].commission
}

export function calculateCommissionAmount(baseAmount: number, userType: UserType = "personaNatural"): number {
  return baseAmount * getCommission(userType)
}

export function calculateTotalWithCommission(baseAmount: number, userType: UserType = "personaNatural"): number {
  return baseAmount + calculateCommissionAmount(baseAmount, userType)
}
