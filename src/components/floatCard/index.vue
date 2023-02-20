<!--
 * @Description:
 * @Author: wsy
 * @Date: 2023-02-20 10:55:39
 * @LastEditTime: 2023-02-20 15:17:58
 * @LastEditors: wsy
-->
<template>
  <div class="card" w="361px" h="141px" relative>
    <div class="card-warp" w="100%" h="129px" absolute left="0" top="0">1</div>
    <div class="content" w="100%" h="141px" absolute flex="~">
      <div class="icon" flex="~ none row-reverse" w="110px" items="center">
        <img :src="icon" alt="" />
      </div>
      <div flex="~ auto col" justify="center" p-l="20px">
        <div
          text="20px transparent"
          bg-gradient="to-b from-#78B6E1 via-#fff to-#fff"
          bg-clip-text
          >{{ props.name }}</div
        >
        <div>
          <span
            bg-gradient="to-b from-#fff via-#fff to-#BBFAF7"
            bg-clip-text
            text="30px transparent"
            font="medium"
            tracking-wide
            >{{ formattedNumber }}</span
          >
          <span text="18px" font="bold" p-l="5px">个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import nl from './images/nl.png'
  import dy from './images/dy.png'
  import fn from './images/fn.png'
  const props = defineProps({
    name: {
      type: String,
      default: '能力总数'
    },
    value: {
      type: Number,
      default: 123
    }
  })
  const formattedNumber = computed(() => Number(props.value).toLocaleString())
  const icon = computed(() => {
    switch (props.name) {
      case '能力总数':
        return nl
      case '调用次数':
        return dy
      case '赋能项目':
        return fn
    }
  })
</script>

<style lang="scss" scoped>
  .card {
    .card-warp {
      backdrop-filter: blur(8px);
      border-radius: 10px;
    }

    .content {
      color: #fff;
      background: url('./images/card.png') no-repeat;
    }
  }
</style>
