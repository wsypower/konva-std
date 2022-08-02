<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-15 17:50:51
 * @LastEditTime: 2022-08-02 17:15:57
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full" grid="~ cols-4 row-3 gap-4">
    <div
      flex
      items-center
      justify-center
      text="lg white"
      font="bold"
      bg="slate-700"
      :class="[index === 1 && 'col-span-2 row-span-2 bg-yellow-800']"
      v-for="(item, index) in layout"
      :key="index"
      @click="clickHandler"
      >{{ item }}</div
    >
  </div>
</template>

<script setup>
  const router = useRouter()
  const layout = [
    '展示一',
    '地图组件',
    '展示二',
    '展示三',
    '展示四',
    '展示五',
    '展示六',
    '展示七',
    '展示八'
  ]

  function clickHandler() {
    console.info('clickHandler')
    router.push('/test/test1')
  }
</script>
