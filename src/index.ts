/**
 * Required External Modules
 */
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import apiRouter from '@/router.api';
import { logger } from "./helpers/logger";
import { v4 as uuid } from 'uuid';
import { responseError } from "@/helpers/response";
import { HttpCode } from "@/helpers/constants"
import morgan from 'morgan';

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
/**
 * App Routers
 */
app.use('/api', apiRouter);
app.get('/', (_req, res) => {
	res.send('Server is running...');
})

/**
 * App handle errors
 */
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
	const errorId = `${Date.now()}-${uuid()}`
	logger.error(`Error in ${req.method}:${req.originalUrl} | ${errorId} | ${error.stack}`)
	responseError(res, HttpCode.InternalServerError, `SYSTEM ERROR: ${errorId}`);
});

/**
 * Server Activation
 */
app.listen(PORT, () => {
	console.log(`Listening on port http://localhost:${PORT}`);
});