/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string
  readonly VITE_GCAL_API_KEY?: string
  readonly VITE_GCAL_ID_STANDARD_1?: string
  readonly VITE_GCAL_ID_STANDARD_2?: string
  readonly VITE_GCAL_ID_STANDARD_3?: string
  readonly VITE_GCAL_ID_SUPERIOR_1?: string
  readonly VITE_GCAL_ID_SUPERIOR_2?: string
  readonly VITE_GCAL_ID_JUNIOR_1?: string
  readonly VITE_GCAL_ID_JUNIOR_2?: string
  readonly VITE_GCAL_ID_JUNIOR_3?: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
