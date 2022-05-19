import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.Console({ level: process.env.NODE_ENV === 'production' ? 'error' : 'debug' }),
		new winston.transports.File({ filename: 'debug.log', level: 'error' }),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.info('Init logger instance at debug level')
}

function logError(functionName: string, error: Error | unknown) {
	logger.error(`Error in function: ${functionName} | ${error instanceof Error ? error.stack : error}`);
}

export { logger, logError }