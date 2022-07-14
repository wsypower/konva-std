/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 15:06:59
 * @LastEditTime: 2022-07-14 15:08:15
 * @LastEditors: wsy
 */
import { useNProgress } from '@vueuse/integrations/useNProgress'

export function useProgress() {
  const { isLoading } = useNProgress()
  function openNProgress() {
    isLoading.value = true
  }
  function closeNProgress() {
    isLoading.value = false
  }
  return {
    openNProgress,
    closeNProgress
  }
}
