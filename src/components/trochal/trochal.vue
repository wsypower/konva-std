<template>
  <div class="bg-dark-200" :style="{ width: props.width, height: props.height }">
    <canvas></canvas>
  </div>
</template>

<script setup>
  const props = defineProps({
    width: {
      type: String,
      default() {
        return '100%'
      }
    },
    height: {
      type: String,
      default() {
        return '100%'
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  })
</script>

<style lang="scss" scoped></style>
