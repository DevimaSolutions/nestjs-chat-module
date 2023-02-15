import { registerAs } from '@nestjs/config';

const mapEnvValues = {
  bool: (envValue: string) => envValue === 'true',
  number: (envValue: string, defaultValue: number) => {
    const value = Number(envValue);

    return !envValue || Number.isNaN(value) ? defaultValue : value;
  },
  array: (envValue: string, delimiter = ',') => {
    const values = envValue.split(delimiter).filter(Boolean);

    return values;
  },
};

const defaultAppPort = 3000;
const defaultRedisPort = 6379;
const defaultDbPort = 5432;

const envConfig = registerAs('env', () => ({
  port: mapEnvValues.number(process.env.PORT || '', defaultAppPort),
  appName: process.env.APP_NAME || '',
  enableSwagger: mapEnvValues.bool(process.env.ENABLE_SWAGGER || ''),
  database: {
    host: process.env.DATABASE_HOST || '',
    port: mapEnvValues.number(process.env.DATABASE_PORT || '', defaultDbPort),
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_DATABASE || '',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: mapEnvValues.number(process.env.REDIS_PORT || '', defaultRedisPort),
  },
}));

export default envConfig;
