import api from '../../api/index'

const globalData = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部高度
    newAddress: 0,
    // 导航栏高度
    navBarHeight: 0,
    // 保存地址的数组对象
    addressList: [],
    // 保存创建订单页面传递过来的值 就是用来是否执行setDefaultAddress方法的
    order: ''
  },

  // 点击根据地址id删除一列收货地址
  delAddress(event) {
    let {
      address_item
    } = event.currentTarget.dataset
    // 判断用户点击的是否是默认地址 如果是则return
    // if(address_item.isDefault) return
    wx.showModal({
      title: '提示',
      content: '你确定要移除当前收货地址吗！',
      cancelColor: 'cancelColor',
      success: res => {
        if (res.confirm) {
          api.user.operaAddress({
            address_id: address_item.address_id,
            opera: 'del'
          }).then(res => {
            // 请求获取收货地址列表
            this.getAddressList()
          })
        }
      }
    })
  },

  // 点击修改默认地址 如果已经是默认地址则return
  chageIconAndText(event) {
    console.log(event)
    let {
      address_id,
    } = event.currentTarget.dataset.address_item
    let {
      order
    } = this.data
    if (order) {
      this.setDefaultAddress(address_id)
    }

    api.user.operaAddress({
      address_id,
      opera: 'set'
    }).then(res => {
      // 请求获取收货地址列表
      this.getAddressList()
    })
  },

  setDefaultAddress(address_id) {
    console.log(address_id)
    api.user.operaAddress({
      address_id,
      opera: 'set'
    }).then(res => {
      wx.navigateBack()
    })
  },

  // 点击前往newAddress
  gonewAddress(event) {
    // console.log(event)
    let {
      address_item
    } = event.currentTarget.dataset
    console.log(address_item)
    globalData.address_item = address_item

    wx.navigateTo({
      url: '../newAddress/newAddress?text=编辑地址',
    })
  },

  // 请求获取收货地址列表
  getAddressList() {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    api.user.address().then(res => {
      this.setData({
        addressList: res
      })
      wx.hideLoading()
    })
  },

  // 点击前往新增收货地址页面 newAddress
  goNewAddress() {
    wx.navigateTo({
      url: '../newAddress/newAddress',
    })
  },
  // 获取导航栏的高度
  getNavBarHeight() {
    // 获得导航栏的dom
    let query = wx.createSelectorQuery();
    let newAddressHeight = this.createSelectorQuery();
    query.select('#navBar').boundingClientRect(dom => {
      // 获取导航栏高度
      let navBarHeight = dom.height
      // console.log(navBarHeight)
      this.setData({
        navBarHeight
      })
    }).exec()

    newAddressHeight.select('#newAddress').boundingClientRect(dom => {
      console.log(dom)
      let newAddress = dom.height
      this.setData({
        newAddress
      })
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航栏的高度
    this.getNavBarHeight()



    // 创建订单页面传递过来的值 就是用来判断是否进入页面就执行该方法
    if (options.order) {
      this.setData({
        order: options.order
      })
    }
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

    // 请求获取收货地址列表
    this.getAddressList()
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