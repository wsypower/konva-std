/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 17:09:39
 * @LastEditTime: 2022-07-14 14:26:05
 * @LastEditors: wsy
 */
import directive from '@/directive'
import ElementPlus from 'element-plus'
import * as ElementIcons from '@element-plus/icons-vue'
const core = {
  install: (app) => {
    app.use(directive)
    // 将 element-plus 的图标库注册到全局
    for (let key in ElementIcons) {
      app.component(`${ElementIcons[key].name}`, ElementIcons[key])
    }
    app.use(ElementPlus)
  }
}
export function setupCore(app) {
  app.use(core)
}
