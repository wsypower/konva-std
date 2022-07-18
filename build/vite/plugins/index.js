/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-18 15:55:33
 * @LastEditors: wsy
 */
import vue from '@vitejs/plugin-vue'
import createRestart from './restart'
import createJsx from './jsx'
import createHtml from './html'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSetupExtend from './setup-extend'
import createSvgIcon from './svg-icon'
import createIcons from './icons'
import createMock from './mock'
import createCompression from './compression'
import createBanner from './banner'
import createUnocss from './unocss'
import createLegacy from './legacy'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()]
  !isBuild && vitePlugins.push(createRestart())
  vitePlugins.push(createJsx())
  vitePlugins.push(createHtml(viteEnv, isBuild))
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createIcons())
  vitePlugins.push(createMock())
  vitePlugins.push(createUnocss())
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(createBanner())
  isBuild && vitePlugins.push(createLegacy())
  return vitePlugins
}
