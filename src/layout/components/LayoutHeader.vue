<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:38:45
 * @LastEditTime: 2022-08-03 16:11:03
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full">{{ title }} </div>
</template>

<script setup>
  import { useUpdateTitle } from '@/hooks/routerHook'
  const title = useUpdateTitle()
</script>

<style lang="scss" scoped></style>
