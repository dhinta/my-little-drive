/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CONVEX_DEPLOYMENT: string;
  readonly MLD_CONVEX_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
