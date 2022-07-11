<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-11 15:30:05
 * @LastEditTime: 2022-07-11 17:38:02
 * @LastEditors: wsy
-->
<template>
  <div class="w-full h-full">
    这是测试页面
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button icon="list">中文</el-button>
    <i-ep-list></i-ep-list>
    <!-- <el-icon><IEpChatDotRound /></el-icon> -->
  </div>
</template>

<script setup>
  const { API_DEMO_POST } = useRequest()
  API_DEMO_POST().then((res) => {
    console.info(res)
  })
</script>

<style lang="scss" scoped></style>
