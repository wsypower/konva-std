<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2022-08-02 16:25:52
 * @LastEditors: wsy
-->
<template>
  <div flex="~ col" w="full" h="full" bg="red-500">
    <header w="full" flex="none" h="68px">
      <LayoutHeader />
    </header>
    <main w="full" flex="auto" h="0px">
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
