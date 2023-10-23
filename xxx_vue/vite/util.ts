import { ImportMetaEnv } from './../types/vite-env.d';
import _ from 'lodash';

export function parseEnv(env: Record<string, any>): ImportMetaEnv {
    const envs: any = _.cloneDeep(env);
    Object.entries(env).forEach(([key, value]) => {
        if (value === 'true' || value === 'false') {
            envs[key] = (value === 'true' ? true : false);
        }
        if (/^\d+$/.test(value)) {
            envs[key] = parseInt(value);
        }
        if (value === null) envs[key] = null
        if (value === undefined) envs[key] = undefined
    })
    return envs;
}

// type RR<T extends keyof any, B> = {
//     [P in T]: B
// }