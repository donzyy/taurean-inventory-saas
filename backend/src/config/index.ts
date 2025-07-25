import { config } from "dotenv";
config();
const CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  CONFIG_LEVEL: process.env.CONFIG_LEVEL,
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || "development",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "7d",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PASSWORD_TOKEN_SECRET: process.env.PASSWORD_TOKEN_SECRET,
  PASSWORD_TOKEN_EXPIRATION: process.env.PASSWORD_TOKEN_EXPIRATION,
  EMAIL_TOKEN_SECRET: process.env.EMAIL_TOKEN_SECRET,
  EMAIL_TOKEN_EXPIRATION: process.env.EMAIL_TOKEN_EXPIRATION,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
};

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export { CONFIG, STATUS_CODES };
