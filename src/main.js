/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 15:21:59
 * @LastEditTime: 2022-07-11 16:25:21
 * @LastEditors: wsy
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupCore } from '@/core'
// import { urlParamsLogin } from '@/router/helper';
import '@/style/css/tailwind.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import '@/style/scss/globals.scss'

async function bootstrap() {
  const app = createApp(App)
  setupCore(app)
  setupStore(app)
  //   await urlParamsLogin();
  await setupRouter(app)
  app.mount('#app')
}
bootstrap()
