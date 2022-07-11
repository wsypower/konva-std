/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   vite.config.js                                            :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2022/07/08 15:54:38 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2022/07/08 15:54:38 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './build/vite/plugins'
import { wrapperEnv } from './build/vite/utils'
import path from 'path'
export default ({ mode, command }) => {
  const env = wrapperEnv(loadEnv(mode, process.cwd()))
  const PROJECT_NAME = env.VITE_APP_PROJECT
  return defineConfig({
    base: './',
    server: {
      open: true,
      host: true,
      hmr: { overlay: false },
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY,
          rewrite: (path) => path.replace(/\/proxy/, '')
        }
      }
    },
    build: {
      outDir: mode == 'production' ? PROJECT_NAME : `${PROJECT_NAME}-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP,
      minify: true
    },
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets'),
        util: path.resolve(__dirname, 'src/util'),
        views: path.resolve(__dirname, 'src/views'),
        layout: path.resolve(__dirname, 'src/layout')
      }
    },
    define: {
      __DEV__: mode === 'development',
      __TEST__: mode === 'test'
    }
  })
}
