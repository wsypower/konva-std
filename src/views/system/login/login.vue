<!--
 * @Description:
 * @Author: wsy
 * @Date: 2022-07-14 14:48:32
 * @LastEditTime: 2022-08-02 16:33:14
 * @LastEditors: wsy
-->
<template>
  <div w-full h-full> login <el-button @click="login">登录按钮</el-button> </div>
</template>

<script setup>
  import { useUserOutsideStore } from '@/store/modules/user'
  const userStore = useUserOutsideStore()
  const router = useRouter()
  function login() {
    userStore.login().then(() => router.push({ name: 'index' }))
  }
</script>

<style lang="scss" scoped></style>
