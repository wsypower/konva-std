/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 15:21:59
 * @LastEditTime: 2022-07-11 14:15:27
 * @LastEditors: wsy
 */
import { createApp } from 'vue';
import App from './App.vue';
// import { setupRouter } from './router';
import { setupStore } from '@/store';
import { setupCore } from '@/core';
// import { urlParamsLogin } from '@/router/helper';
import '@/style/tailwind.css';

async function bootstrap() {
  const app = createApp(App);
  setupCore(app);
  setupStore(app);
  //   await urlParamsLogin();
  //   await setupRouter(app);
  app.mount('#app');
}
bootstrap();
