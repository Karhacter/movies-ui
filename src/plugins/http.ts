import type { App } from 'vue'
import { $http } from '@/utils/http-wrapper'

export default {
  install: (app: App) => {
    app.config.globalProperties.$http = $http
  },
}

// Type declaration for TypeScript support
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: typeof $http
  }
}
