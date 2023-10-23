/// <reference types="vite/client" />

// export interface ViteEnv {
//     VITE_APP_URL: string
//     VITE_AUTOLOAD: bolean
//     VITE_MOCK_ENABLE: boolean
//     // 更多环境变量...
// }
export interface ImportMetaEnv  {
    VITE_APP_URL: string
    VITE_AUTOLOAD: bolean
    VITE_MOCK_ENABLE: boolean
    //更多环境变量
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}