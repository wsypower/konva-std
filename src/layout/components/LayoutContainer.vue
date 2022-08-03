<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:39:15
 * @LastEditTime: 2022-08-03 15:15:20
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full" class="page-contents">
    <router-view v-slot="{ Component, route }">
      <transition :name="routeStore.direction" appear>
        <keep-alive :include="[...keepAliveStore.list]">
          <component :is="Component" :key="route.fullPath" class="page" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import '@/style/scss/transition.scss'
  import { useKeepAliveStore } from '@/store/modules/keepAlive'
  import { useRouteStore } from '@/store/modules/router'
  const keepAliveStore = useKeepAliveStore()
  const routeStore = useRouteStore()
</script>

<style lang="scss" scoped>
  .page-contents {
    position: relative;
    overflow: hidden;
    perspective: 1200px;

    .page {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      visibility: visible;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }
  }
</style>
