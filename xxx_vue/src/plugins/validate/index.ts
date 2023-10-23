// 未封装
// import { defineRule, useField, useForm,configure } from 'vee-validate'
// import { required, email, min, max } from '@vee-validate/rules'
// import * as yup from 'yup' //可以使用yup的规则



/**
 * 使用@vee-validate/rules vee-Validate是集中注册rules等
 */
import * as veeValidates from 'vee-validate'
// import rules from '@vee-validate/rules'
import yup from './yup'
//注册所有规则rule(不使用yup)
// Object.keys(rules).forEach(key => {
//     veeValidates.defineRule(key, rules[key] as any)
// })
const modules = { yup, ...veeValidates }
// 将所有的打包导出
export default modules