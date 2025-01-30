/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API: string; // Add your environment variables here
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
