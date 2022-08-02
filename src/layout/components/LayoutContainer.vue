<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:39:15
 * @LastEditTime: 2022-08-02 16:23:10
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full">
    <router-view v-slot="{ Component, route }">
      <transition name="main" mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
