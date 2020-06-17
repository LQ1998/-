import {auth} from './utils/util'

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 微信小程序 建议在小程序启动时 去调用wx.login方法去获取 登录凭证
    // 登录
    wx.login({
      
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 获取 微信凭证 并保存为全局变量
        // console.log(res)
        this.globalData.wxCode = res.code
        // 获取用户信息
        // 判断用户是否授权用户信息
        wx.getSetting({
          success: (res) => { // res就是授权信息列表
            // console.log(res)
            // 检查授权信息列表中 是否有用户信息授权 
            if(res.authSetting['scope.userInfo']) {
              // 用户授权 直接获取用户信息
              wx.getUserInfo({
                success: (info) => {
                  // 与后台换取用户凭证
                  auth(info)
                },
              })
            } else {

            }
          },
        })
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    // 用于保存用户信息
    userInfo: null,
    wxCode: '', // 微信凭证
    // 后台返回的token值 用于请求头验证
    userToken: '',
    // 用于收货地址的判断
    address_item: ''

  }
})