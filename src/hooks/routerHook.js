/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-08-03 16:01:36
 * @LastEditTime: 2022-08-03 16:08:56
 * @LastEditors: wsy
 */
export function useUpdateTitle() {
  const route = useRoute()
  const title = ref(route.meta.title)
  onBeforeRouteUpdate(changeTitle)
  onBeforeRouteLeave(changeTitle)
  function changeTitle(to) {
    title.value = to.meta.title
  }
  return title
}
