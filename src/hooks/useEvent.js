/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-08-15 10:59:02
 * @LastEditTime: 2022-08-15 10:59:21
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
