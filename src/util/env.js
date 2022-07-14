/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 15:44:01
 * @LastEditTime: 2022-07-14 15:46:54
 * @LastEditors: wsy
 */
export function wrapperEnv(envConf) {
  if (typeof envConf === 'string') {
    let val = envConf.replace(/\\n/g, '\n')
    val = val === 'true' ? true : val === 'false' ? false : val
    return val
  }
  const ret = {}
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}
