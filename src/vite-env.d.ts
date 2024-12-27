/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CONVEX_DEPLOYMENT: string;
  readonly MLD_CONVEX_URL: string;
  readonly MLD_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
