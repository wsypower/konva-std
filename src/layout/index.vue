<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2023-02-18 18:01:38
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full" bg="#03162D" class="relative">
    <video :src="video" autoplay muted loop class="absolute"></video>
    <trochal class="absolute"></trochal>
  </div>
</template>

<script setup>
  import video from './AI-60fps.mp4'
  import trochal from '@/components/trochal'
</script>
