<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2023-02-20 15:14:15
 * @LastEditors: wsy
-->
<template>
  <div w="full" h="full" bg="#011632" relative>
    <video h="1080px" :src="video" autoplay muted loop absolute left="40px" top="40px"></video>
    <trochal absolute @click="callback"></trochal>
    <div class="box" absolute left="100px" top="240px">
      <floatCard absolute top="" name="能力总数" :value="1268"></floatCard>
      <floatCard absolute top="95px" left="-50px" name="调用次数" :value="9823468"></floatCard>
      <floatCard absolute top="190px" name="赋能项目" :value="68"></floatCard>
    </div>
  </div>
</template>

<script setup>
  import video from './AI-60fps.mp4'
  import trochal from '@/components/trochal'
  // 事件监听
  function callback() {}
</script>
