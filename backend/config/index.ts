import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  dbURL: process.env.DATABASE_URL,
  port: process.env.PORT,
  accessTokenKey : process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshTokenKey : process.env.REFRESH_TOKEN_SECRET_KEY,
  salt: process.env.SALT,

  authServerUrl: process.env.AUTH_SERVER_URL,
  realm: process.env.REALM,
  clientId: process.env.CLIENT_ID,
  secret: process.env.SECRET_ID,
  realmPublicKey: process.env.REALM_PUBLIC_KEY,
  tokenClientId: process.env.TOKEN_CLIENT_ID,
  tokenSecretId: process.env.TOKEN_SECRET_ID,
};