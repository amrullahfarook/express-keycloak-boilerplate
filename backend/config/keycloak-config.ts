

import session from 'express-session';
import Keycloak from 'keycloak-connect';
import config from './index';

let KeycloakInstance :any;

const kcConfig :any = {
  realm: config.realm,
  serverUrl: config.authServerUrl,
  bearerOnly: true,
  clientId: config.clientId,
  realmPublicKey: config.realmPublicKey,  
};

export function initKeycloak() {
  const memoryStore = new session.MemoryStore();
  KeycloakInstance = new Keycloak({ store: memoryStore }, kcConfig);
  return KeycloakInstance;
}

export function getKeycloak() {
  return KeycloakInstance;
}