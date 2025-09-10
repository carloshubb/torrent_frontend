import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "app-layout" | "guest-layout" | "blogs-about"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}