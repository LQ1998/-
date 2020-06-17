import api from '../api/index'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const auth = (info) => {
  let app = getApp()
  return api.user.auth({
    code: app.globalData.wxCode,
    encryptedData: info.encryptedData,
    iv: info.iv
  }).then(info => { // 后台返回的数据
    // console.log(info)
    // 保存用户信息到全局中
    app.globalData.userInfo = info
    app.globalData.userToken = info.usertoken
    // 由于网络原因 需要手动配置一个获取用户信息成功的回调函数
    if (app.getUserInfoCallback) {
      console.log(145645)
      app.getUserInfoCallback(info)
    }
    return info
  })
}

const add0 = (m) => {
  return m < 10 ? '0' + m : m
}

const formatDate = (needTime) => {
  var time = new Date(parseInt(needTime));
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return [y, m, d].map(add0).join('-') + " " + [h, mm, s].map(add0).join(':')
}

const isLoding = () => {
  // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
  if (!getApp().globalData.userInfo) {
    wx.showToast({
      title: '请先授权登录',
      icon: 'none',
      success: res => {
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
    return false
  }
  return true
}

module.exports = {
  formatTime: formatTime,
  auth,
  formatDate,
  isLoding
}