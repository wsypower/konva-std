<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2023-02-20 09:25:11
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
    <trochal class="absolute"></trochal>
  </div>
</template>

<script setup>
  import video from './AI-60fps.mp4'
  import trochal from '@/components/trochal'
</script>
