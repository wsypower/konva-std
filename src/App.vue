<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-08 15:21:59
 * @LastEditTime: 2022-08-02 14:41:09
 * @LastEditors: wsy
-->
<template>
  <el-config-provider v-bind="elementUIProvider">
    <RouterView />
  </el-config-provider>
</template>
<script setup>
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  const elementUIProvider = ref({
    button: {
      autoInsertSpace: true
    },
    locale: zhCn
  })
</script>
