import { config } from 'dotenv';
import { bool, cleanEnv, port, str } from 'envalid';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const envVars = cleanEnv(process.env, {
  //DEFAULT
  NODE_ENV: str(),
  PORT: port(),

  //CORE
  CORE_PORT: port(),
  CORE_HOST: str(),
  CORE_END_POINT: str(),

  //LOG
  LOG_FORMAT: str(),
  LOG_DIR: str(),

  //CORS
  ORIGIN: str(),
  CREDENTIALS: bool({ default: true }),
});

export const { NODE_ENV, PORT } = envVars;
export const { CORE_PORT, CORE_HOST, CORE_END_POINT } = envVars;
export const { LOG_DIR, LOG_FORMAT } = envVars;
export const { CREDENTIALS, ORIGIN } = envVars;
