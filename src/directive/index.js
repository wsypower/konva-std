/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-03-28 16:50:42
 * @LastEditTime: 2022-07-11 14:18:17
 * @LastEditors: wsy
 */
import console from 'consola';
import { kebabCase } from 'lodash-es';

function validatorModules(obj) {
  const vueDirectiveKeys = [
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeUnmount',
    'unmounted',
  ];
  return vueDirectiveKeys.some((key) => Reflect.has(obj, key));
}

export default {
  install: (app) => {
    const directiveModules = import.meta.globEager('./modules/*.js');
    Object.keys(directiveModules).forEach((key) => {
      const directiveName = key.replace(/^\.\/modules\/(.*)\.js$/, '$1');
      const modules = directiveModules[key].default;
      if (typeof modules === 'function' || typeof modules === 'object') {
        if (typeof modules === 'object' && !validatorModules(modules)) {
          console.error(
            `${directiveName} 应该包含 created | beforeMount | mounted | beforeUpdate | updated | beforeUnmount | unmounted 等接口`
          );
        }
        app.directive(kebabCase(directiveName), modules);
      } else {
        console.error(
          `directive 模块的 ${directiveName}.js 导出的不是一个对象或者函数`
        );
      }
    });
  },
};
