import { ref, h, defineComponent } from 'vue'
import useTrochal from './useTrochal'

export default defineComponent({
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
          {
            name: '云网能力',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '云服务',
            value: [
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '大数据',
            value: [
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '人工智能-1', value: 10 },
              { name: '物联网-1', value: 10 },
              { name: '视联网-1', value: 10 },
              { name: '网络信息安全-1', value: 10 },
              { name: '企业应用与服务-1', value: 10 },
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 }
            ]
          },
          {
            name: '人工智能',
            value: [
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '人工智能-1', value: 10 },
              { name: '物联网-1', value: 10 },
              { name: '视联网-1', value: 10 },
              { name: '网络信息安全-1', value: 10 },
              { name: '企业应用与服务-1', value: 10 },
              { name: '云计算-1', value: 10 },
              { name: '云存储-1', value: 10 },
              { name: '云安全-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 },
              { name: '云服务-1', value: 10 },
              { name: '大数据-1', value: 10 }
            ]
          },
          {
            name: '物联网',
            value: [
              { name: '云存储', value: 10 },
              { name: '大数据', value: 10 }
            ]
          },
          {
            name: '视联网',
            value: [
              { name: '云存储', value: 10 },
              { name: '大数据', value: 10 }
            ]
          },
          {
            name: '网络信息安全',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '云安全', value: 10 },
              { name: '云服务', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '企业应用与服务',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '云服务', value: 10 },
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          },
          {
            name: '视频服务',
            value: [
              { name: '云计算', value: 10 },
              { name: '云存储', value: 10 },
              { name: '云安全', value: 10 },
              { name: '云服务', value: 10 },
              { name: '大数据', value: 10 },
              { name: '人工智能', value: 10 },
              { name: '物联网', value: 10 },
              { name: '视联网', value: 10 },
              { name: '网络信息安全', value: 10 },
              { name: '企业应用与服务', value: 10 }
            ]
          }
        ]
      }
    }
  },
  setup(props) {
    const container = ref(null)
    useTrochal(container, props)
    return () =>
      h('div', {
        style: {
          width: `${props.width}px`,
          height: `${props.height}px`
        },
        ref: container
      })
  }
})
