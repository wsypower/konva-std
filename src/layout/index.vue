<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2022-07-14 14:43:25
 * @LastEditors: wsy
-->
<template>
  <div class="flex flex-col w-full h-full bg-red-500">
    <header class="w-full h-[68px] flex-none">
      <LayoutHeader />
    </header>
    <main class="w-full h-[0px] flex-auto">
      <LayoutContainer />
    </main>
  </div>
</template>

<script setup>
  import LayoutHeader from './components/LayoutHeader.vue'
  import LayoutContainer from './components/LayoutContainer.vue'

  const { API_DEMO_POST } = useRequest()
  API_DEMO_POST().then((res) => {
    console.info(res)
  })
</script>

<style lang="scss" scoped></style>
