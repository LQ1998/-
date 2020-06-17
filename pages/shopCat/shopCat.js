import api from '../../api/index'
import {
  isLoding
} from "../../utils/util"

// pages/shopCat/shopCat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏高
    navBarHeight: '',
    // 购物车的数组对象
    shopCat: [],
    // 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
    triggered: false
  },
  // 下拉根据index刷新页面
  downRefresh() {
    if (this.freshing) return
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    this.freshing = true
    this.getPocket()
    this.freshing = false
    wx.hideLoading()
  },


  getNavBarHeight() {
    // 获得导航栏的dom
    let query = wx.createSelectorQuery();
    query.select('#navBar').boundingClientRect(dom => {
      // 获取导航栏高度
      let navBarHeight = dom.height
      this.setData({
        navBarHeight
      })
    }).exec()
  },
  // 跳转到首页
  goHome() {
    wx.switchTab({
      url: "/pages/home/home"
    })
  },
  // shopCat子组件传过来的方法 商品数量改变
  shopCatEvent(event) {
    //这里的这个event就是子组件传过来的值
    // console.log(event)
    // let {
    //   detail
    // } = event

    // let newShopCat = this.data.shopCat.map(item => {
    //   if (item.id == detail.id) return detail
    //   return item
    // })
    // this.setData({
    //   shopCat: newShopCat
    // })
    this.getPocket()
  },
  // 获取购物车列表
  getPocket() {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    api.order.pocket().then(res => {
      // console.log(res)
      this.setData({
        shopCat: res,
        triggered: false
      })
      wx.hideLoading()
    })
  },
  // goOrderConfirmEvent子组件传过来的方法 前往订单确认页面 将购物车列表对象和总价传递过去
  goOrderConfirmEvent(event) {
    // console.log(event)
    let {
      totalPrice
    } = event.detail
    let {
      shopCat
    } = this.data
    wx.navigateTo({
      url: '../orderConfirm/orderConfirm',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('orderListPage', {
          data: {
            totalPrice,
            "orderList": shopCat
          }
        })
      }
    })
  },

  // deleteShopCatEvent子组件传过来的方法 根据id删除shiopCat数组对象中的一个对象
  deleteShopCatEvent(event) {
    console.log(event)
    // //这立的这个event就是子组件传过来的值 id
    // let {
    //   detail
    // } = event
    // let shopCatArr = this.data.shopCat
    // wx.showModal({
    //   title: '提示',
    //   content: '确定要删除吗?',
    //   success: res => {
    //     let newShopCat = shopCatArr.filter(item => {
    //       if (res.confirm) { // 用户点击确定
    //         if (item.id == detail.id) {
    //           console.log('用户点击确定')
    //           // shopCatArr.splice(item, 1)
    //           return null
    //         }
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //       return item
    //     })

    //     this.setData({
    //       shopCat: newShopCat
    //     })
    //     console.log(this.data.shopCat)
    //   }
    // })
    this.getPocket()
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // 获取导航栏高
    this.getNavBarHeight();

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
    // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
    // if (!isLoding()) return
    if(!getApp().globalData.userInfo) {
      wx.showToast({
        title: '请先授权登录',
      })
      return
    }
    // 获取购物车列表
    this.getPocket()
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