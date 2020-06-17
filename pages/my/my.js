import {
  isLoding
} from "../../utils/util"

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  // 点击前往我的订单页面
  gomyOrder() {
    // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
    if (!isLoding()) return
    
    wx.navigateTo({
      url: '../myOrder/myOrder?index=0',
    })
  },
  // 点击前往登录页面
  goLogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 设置用户信息 保存
  setUserInfo(info) {
    this.setData({
      userInfo: info
    })
  },

  // 获取用户信息
  getUserInfo() {
    // console.log(getApp().globalData.userInfo)
    // 获取用户信息
    if (getApp().globalData.userInfo) { // 有用户信息
      this.setUserInfo(getApp().globalData.userInfo)
    } else {
      // console.log(111)
      // 使用用户信息的回调函数
      getApp().getUserInfoCallback = info => {
        console.log("用户信息", info)
        this.setUserInfo(info)
      }
    }
  },
  // 点击跳转到收货地址页面
  goAddress() {
    // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
    if (!isLoding()) return
    wx.navigateTo({
      url: '../receiving_address/receiving_address',
    })
  },
  // 点击跳转到帮助页面
  goHelp() {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    this.getUserInfo()
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