import { developmentConfig } from "./config.development"
import { productionConfig } from "./config.production"

// Export individual configs for testing purposes
export { developmentConfig, productionConfig }

// Helper function to check environment
export const isDevelopment = () => developmentConfig.environment === "development"
export const isProduction = () => process.env.PRODUCTIVE_SCOPE !== undefined

// Load the appropriate configuration
export const config = process.env.PRODUCTIVE_SCOPE !== undefined ? productionConfig : developmentConfig
