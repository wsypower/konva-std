<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2023-02-20 10:49:03
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full" bg="#011632" class="relative">
    <video
      h="1200px"
      :src="video"
      autoplay
      muted
      loop
      class="absolute"
      left="40px"
      top="-60px"
    ></video>
    <trochal class="absolute" @click="callback"></trochal>
  </div>
</template>

<script setup>
  import video from './AI-60fps.mp4'
  import trochal from '@/components/trochal'
  // 事件监听
  // function callback(url) {
  //   console.log('url', url)
  // }
</script>
