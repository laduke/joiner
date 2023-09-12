import pino from 'pino'

export const logger = pino()

logger.level = process.env.LOG_LEVEL || 'info'
