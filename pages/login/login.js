import {auth} from '../../utils/util'

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获取用户信息
  getUserInfo(userInfo) {
    
    // userInfo 就是用户的相关信息
    console.log(userInfo)
    let {
      encryptedData,
      iv
    } = userInfo.detail
    // 判断用户是否授权
    if (iv) { // 同意授权
      wx.showLoading({
        title: '正在登录',
        mask: true
      })
      // 将用户信息 发送给后台
      auth(userInfo.detail).then(() => {
        // 登录成功
        wx.hideLoading()
        // 返回上一页
        wx.navigateBack()
      })
    } else { // 拒绝
      wx.showToast({
        title: '请同意授权',
        icon: 'none' // 去除勾勾
      })
    }
  },

  // 点击暂不授权按钮则跳转至首页
  goHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})