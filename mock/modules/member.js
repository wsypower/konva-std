/*
 * @Description:
 * @Author: wsy
 * @Date: 2022-02-08 17:24:53
 * @LastEditTime: 2022-07-14 16:46:09
 * @LastEditors: wsy
 */
export default [
  {
    url: '/mock/member/login',
    method: 'post',
    response: (option) => {
      return {
        code: 200,
        mgs: 'success',
        data: {
          account: option.body.account || 'admin',
          token: '@string',
          failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60
        }
      }
    }
  },
  {
    url: '/mock/member/permission',
    method: 'get',
    response: () => {
      let permissions = ['home']
      return {
        code: 200,
        msg: 'success',
        data: {
          permissions
        }
      }
    }
  },
  {
    url: '/mock/member/edit/password',
    method: 'post',
    response: {
      msg: 'success',
      code: 200,
      data: {
        isSuccess: true
      }
    }
  },
  {
    url: '/mock/api/mock',
    method: 'post',
    response: {
      msg: 'success',
      code: 200,
      data: {
        msg: '这是mock'
      }
    }
  }
]
