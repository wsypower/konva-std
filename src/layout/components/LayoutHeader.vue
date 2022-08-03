<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:38:45
 * @LastEditTime: 2022-08-03 15:24:01
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full">{{ title }} </div>
</template>

<script setup>
  const route = useRoute()
  const title = route.meta.title
  watch(
    () => route,
    () => {
      console.info(123)
    }
  )
</script>

<style lang="scss" scoped></style>
