<template>
  <div class="grid w-full h-full grid-cols-4 grid-rows-3 gap-4">
    <div
      class="flex items-center justify-center text-lg font-bold text-white bg-slate-700"
      :class="[index === 1 && 'col-span-2 row-span-2 bg-yellow-800']"
      v-for="(item, index) in layout"
      :key="index"
      >{{ item }}</div
    >
  </div>
</template>

<script setup>
  const layout = [
    '展示一',
    '地图组件',
    '展示二',
    '展示三',
    '展示四',
    '展示五',
    '展示六',
    '展示七',
    '展示八'
  ]
</script>

<style lang="scss" scoped></style>
