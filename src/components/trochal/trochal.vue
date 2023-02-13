<template>
  <div ref="container" class="bg-dark-200" :style="{ width: props.width, height: props.height }">
  </div>
</template>

<script setup>
  import useTrochal from './useTrochal'
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
  const container = ref(null)
  useTrochal(container)
</script>

<style lang="scss" scoped></style>
