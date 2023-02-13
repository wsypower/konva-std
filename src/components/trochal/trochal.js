import useTrochal from './useTrochal'
export default {
  name: 'Trochal',
  props: {
    width: {
      type: Number,
      default() {
        return 1920
      }
    },
    height: {
      type: Number,
      default() {
        return 1080
      }
    },
    data: {
      type: Array,
      default() {
        return [
          { name: '运往能力', value: 10 },
          { name: '云服务', value: 10 },
          { name: '大数据', value: 10 },
          { name: '人工智能', value: 10 },
          { name: '物联网', value: 10 },
          { name: '视联网', value: 10 },
          { name: '网络信息安全', value: 10 },
          { name: '企业应用与服务', value: 10 },
          { name: '行业', value: 10 },
          { name: '其他', value: 10 }
        ]
      }
    }
  },
  setup(props) {
    const container = ref(null)
    useTrochal(container, props)
    return () =>
      h('div', {
        style: { width: `${props.width}px`, height: `${props.height}px` },
        ref: container
      })
  }
}
