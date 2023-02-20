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
              { name: '增值业务', value: 10 },
              { name: '宽带', value: 10 },
              { name: '渠道运营服务', value: 10 },
              { name: '移动通信业务', value: 10 },
              { name: '无线和接入网', value: 10 },
              { name: '手机上网', value: 10 },
              { name: '通信网络资源服务', value: 10 },
              { name: '通信服务', value: 10 },
              { name: '固网', value: 10 },
              { name: '云网运营', value: 10 },
              { name: '互联应用', value: 10 },
              { name: 'IDC', value: 10 },
              { name: '云网应用运行', value: 10 },
              { name: '号百应用', value: 10 }
            ]
          },
          {
            name: '云服务',
            value: [
              { name: '容器与中间件', value: 10 },
              { name: '存储', value: 10 },
              { name: '数据库', value: 10 },
              { name: '网络与CDN', value: 10 },
              { name: '管理服务', value: 10 },
              { name: '专属云', value: 10 },
              { name: '计算', value: 10 }
            ]
          },
          {
            name: '大数据',
            value: [
              { name: '大数据智能信息', value: 10 },
              { name: '隐私计算', value: 10 },
              { name: '大数据开发与治理', value: 10 },
              { name: '大数据营销', value: 10 },
              { name: '大数据基础分析管理', value: 10 },
              { name: '大数据区域风控', value: 10 }
            ]
          },
          {
            name: '人工智能',
            value: [
              { name: '数字人', value: 10 },
              { name: '人体与人脸', value: 10 },
              { name: '文字识别', value: 10 },
              { name: '语音技术', value: 10 },
              { name: '智慧应用', value: 10 },
              { name: 'AR与VR', value: 10 },
              { name: '视频技术', value: 10 },
              { name: '图像技术', value: 10 },
              { name: '自然语言处理', value: 10 }
            ]
          },
          {
            name: '物联网',
            value: [
              { name: '场景化应用', value: 10 },
              { name: '5G应用', value: 10 },
              { name: '运营管理', value: 10 },
              { name: '连接管理', value: 10 },
              { name: '终端管理', value: 10 }
            ]
          },
          {
            name: '视联网',
            value: [
              { name: '云直播与点播', value: 10 },
              { name: '视屏监控(标准化)', value: 10 },
              { name: '视屏监控(定制化)', value: 10 },
              { name: '音视频应用', value: 10 }
            ]
          },
          {
            name: '网络信息安全',
            value: [
              { name: '安全响应', value: 10 },
              { name: '安全防护', value: 10 },
              { name: '通用型', value: 10 },
              { name: '安全服务', value: 10 },
              { name: '网络基础安全', value: 10 },
              { name: '安全检测', value: 10 }
            ]
          },
          {
            name: '企业应用与服务',
            value: [
              { name: '行业应用集成服务', value: 10 },
              { name: '系统建设服务', value: 10 },
              { name: '网络通信集成服务', value: 10 },
              { name: '区块链服务', value: 10 },
              { name: '网络应用集成服务', value: 10 },
              { name: '数字孪生', value: 10 },
              { name: '互联应用', value: 10 },
              { name: '通用型', value: 10 },
              { name: '场景化应用', value: 10 }
            ]
          },
          {
            name: '视频服务',
            value: [
              { name: '媒体处理', value: 10 },
              { name: '极速高清', value: 10 },
              { name: '智能识别', value: 10 },
              { name: '智能审核', value: 10 },
              { name: '智能编辑', value: 10 }
            ]
          }
        ]
      }
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const container = ref(null)
    function trochalClickCallback(value) {
      emit('click', value)
    }
    useTrochal(container, props, trochalClickCallback)

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
