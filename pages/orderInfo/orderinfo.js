import api from '../../api/index'
import {formatDate,isLoding} from '../../utils/util'

// pages/orderInfo/orderinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏高度
    navBarHeight: 0,
    // fixedBottom的高
    fixedHeight: 0,
    // 保存订单详情的数组
    orderInfoList: {},
    orderState: ['待付款', '待发货', '待收获', '已完成', '已取消'],
    // 总共商品数量
    goodsTotalNum: 0,
    // 所有商品总价
    goodsTotalPrice: 0
  },

  // 用户点击付款 order_id 订单id
  confirmPayment(event) {
    wx.showModal({
      title: '提示',
      content: '确定购买该商品吗？',
      success: res => {
        if(res.confirm) {
          let {order_id} = event.currentTarget.dataset
          // 请求接口
          api.order.payOrder({
            order_id
          }).then(res => {
            console.log(res)
            wx.redirectTo({
              url: '../myOrder/myOrder?index=2'
            })
          })
        } else if(res.cancel) {
          console.log('用户点击了取消')
          return
        }
      }
    })
  },
  
  // 用户点击取消付款 order_id 订单id
  cancelPayment(event) {
    wx.showModal({
      title: '提示',
      content: '确定要取消购买该商品吗？',
      success: res => {
        if(res.confirm) {
          let {order_id} = event.currentTarget.dataset
          api.order.cancelOrder({
            oid: order_id
          }).then(res => {
            
            // let {index} =this.data
            // console.log(index)
            wx.navigateTo({
              url: '../myOrder/myOrder?index=0',
            })
            // this.triggerEvent('refreshOrder',{'index':index})
          })
        }else if(res.cancel) {    
          console.log('用户点击了取消')
          return
        }
      }
    })
  },
  
  // 获取订单详情
  getOrderInfo(options) {
    let {
      order_id
    } = options
    api.order.orderInfo({
      oid: order_id
    }).then(res => {
      console.log(res)
      let goodsTotalNum = 0
      let goodsTotalPrice = 0.0
      res.goodsArr.map(item => {
        goodsTotalNum += parseInt(item.total_num)
        goodsTotalPrice = ((item.total_price - 0) * 100 + goodsTotalPrice * 100) / 100
      })
      res.create_time = formatDate(res.create_time)

      this.setData({
        orderInfoList: res,
        goodsTotalNum,
        goodsTotalPrice: goodsTotalPrice.toFixed(2)
      })
    })
  },

  // 获取导航栏高度
  getNavBarHeight() {
    // 获取导航栏的dom
    let query = wx.createSelectorQuery();
    let fixedHeight = this.createSelectorQuery();
    // console.log(query)
    query.select('#navBar').boundingClientRect(dom => {
      // 获取到导航栏的高度
      let navBarHeight = dom.height;
      this.setData({
        navBarHeight
      })
    }).exec()
    fixedHeight.select('#fixed_bottom').boundingClientRect(dom => {
      let fixedHeight = dom.height;
      this.setData({
        fixedHeight
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavBarHeight()

    // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
    if(!isLoding()) return
    // 获取订单详情
    this.getOrderInfo(options)
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