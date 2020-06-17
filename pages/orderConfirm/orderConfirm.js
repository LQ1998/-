import api from '../../api/index'

// pages/orderConfirm/orderConfirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: 0,
    placeOrderHeight: 0,
    // 商品总价 也用于判断是否是商品详情页创建的订单
    totalPrice: 0,
    // 订单列表 当是购物车订单列表是就是个数组对象 当时商品订单时就是个对象
    orderList: [],

    // 用于保存用户的默认收获地址 数组对象
    userAddress: []
  },


  // 购物车订单结算
  shopCatOrderList() {
    if(!this.data.userAddress.length) {
      wx.showToast({
        title: '请选择配送地址',
        icon: 'none',
        mask: true
      })
      return
    }
    let { address_id } = this.data.userAddress[0]
    // console.log(this.data.userAddress)
    api.order.createOrder({
      type: 'pocket',
      aid: address_id
    }).then(data => {
      console.log(data)
      wx.showModal({
        title: '提示',
        content: '确定付款吗?',
        success: res => {
          if(res.confirm) { // 用户点击确定
            this.confirmPayment(data.order_id)
          }else if(res.cancel) { // 用户点击取消
            wx.redirectTo({
              url: '../myOrder/myOrder?index=1'
            })
          }
        }
      })
    })
  },

  // 商品订单结算
  shopInfoOrderList() {
    if(!this.data.userAddress.length) {
      wx.showToast({
        title: '请选择配送地址',
        icon: 'none',
        mask: true
      })
      return
    }
    let { address_id } = this.data.userAddress[0]
    let {goods_id,count} = this.data.orderList
    // console.log(this.data.userAddress)
    api.order.createOrder({
      type: 'now',
      aid: address_id,
      gid: goods_id,
      count
    }).then(data => {
      console.log(data)
      wx.showModal({
        title: '提示',
        content: '确定付款吗?',
        success: res => {
          if(res.confirm) { // 用户点击确定
            this.confirmPayment(data.order_id)
          }else if(res.cancel) { // 用户点击取消
            wx.redirectTo({
              url: '../myOrder/myOrder?index=1'
            })
          }
        }
      })
    })
  },

  // 用户点击确认付款 order_id 订单id
  confirmPayment(order_id) {
    api.order.payOrder({
      order_id
    }).then(res => {
      console.log(res)
      wx.redirectTo({
        url: '../myOrder/myOrder?index=2'
      })
    }).catch( error => {
      wx.redirectTo({
        url: '../myOrder/myOrder?index=1'
      })
      // console.log()
    })
  },

  // 当默认地址为空时 点击跳转到地址选择页面
  goReceiving_address() {
    wx.navigateTo({
      url: '/pages/receiving_address/receiving_address?order=order',
    })
  },

  // 获取导航栏高度
  getNavBarHeight() {
    // 获取导航栏的dom
    let query = wx.createSelectorQuery();
    let placeOrderHeight = this.createSelectorQuery();
    // console.log(query)
    query.select('#navBar').boundingClientRect(dom => {
      // 获取到导航栏的高度
      let navBarHeight = dom.height;
      this.setData({
        navBarHeight
      })
    }).exec()

    // placeOrderHeight.select('#placeOrder').boundingClientRect(dom => {
    //   // 获取到导航栏的高度
    //   let placeOrderHeight = dom.height;
    //   this.setData({
    //     placeOrderHeight
    //   })
    // }).exec()
  },

  // 在onload生命周期函数时执行该方法 获取用户的默认收货地址
  getUserDefaultAddress() {
    api.user.address().then(res => {
      console.log(res)
      let userAddress = res.filter(item => {
        // console.log(item)
        if(item.isDefault) { // 默认地址
          return item
        }
      })
      console.log(userAddress)
      this.setData({
        userAddress
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavBarHeight()
    

    const eventChannel = this.getOpenerEventChannel()
    // 监听orderListPage事件，获取上一页面通过eventChannel传送到当前页面的数据 
    eventChannel.on('orderListPage', data => {
      let {orderList,totalPrice} = data.data
      if(totalPrice) { // 如果是购物车创建的订单则走这个if
        // console.log(data)
        // console.log(orderList,totalPrice)
        this.setData({
          orderList,
          totalPrice
        })
      } else { // 如果是商品详情页创建的订单
        // console.log(111)
        this.setData({
          orderList,
          totalPrice
        })
      }
    })
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
    // 获取用户的默认收货地址
    this.getUserDefaultAddress()
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