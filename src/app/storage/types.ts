export interface CookieGuardConfig {
  whitelist: string[];
  optional: string[];
}

export interface StorageConfig {
  cookies: CookieGuardConfig;
}
