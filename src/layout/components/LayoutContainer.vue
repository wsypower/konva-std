<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:39:15
 * @LastEditTime: 2022-08-02 17:37:27
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full">
    <router-view v-slot="{ Component, route }">
      <transition name="main" mode="out-in" appear>
        <keep-alive :include="[...keepAliveStore.list]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import { useKeepAliveStore } from '@/store/modules/keepAlive'
  const keepAliveStore = useKeepAliveStore()
</script>

<style lang="scss" scoped></style>
