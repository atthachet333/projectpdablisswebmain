/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_GOOGLE_MAPS_URL: string;
  readonly VITE_LINE_URL: string;
  readonly VITE_PHONE_NUMBER: string;
  readonly VITE_CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
