import api from '../../api/index'
const globalData = getApp().globalData

// pages/newAddress/newAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vantShow: false,
    // 所在地区
    region: [],
    // 收货人
    receivingName: '',
    // 手机号
    phone: '',
    // 详细地址
    addressInfo: '',
    // 收货地址id
    address_id: '',
    // 用于错误提示
    error: '',


    // 用于判断是否是编辑模式
    text: ''
  },
  // 点击保存
  addAddress(event) {
    let {
      address_id
    } = event.currentTarget.dataset
    let {
      receivingName,
      phone,
      region,
      addressInfo
    } = this.data
    // console.log(receivingName, phone, region, addressInfo)
    let reg = /^[0-9]*$/
    if (!receivingName) {
      this.setData({
        error: '收货人不能为空'
      })
      return
    } else if (!phone) {
      this.setData({
        error: '手机号不能为空'
      })
      return
    } else if (!reg.test(phone)) {
      this.setData({
        error: '手机号不规范'
      })
      return
    } else if (phone.length != 11) {
      this.setData({
        error: '手机号不规范'
      })
      return
    } else if (!region) {
      this.setData({
        error: '所在地区不能为空'
      })
      return
    } else if (!addressInfo) {
      this.setData({
        error: '详细地址不能为空'
      })
      return
    }
    let address = {
      opera: 'add',
      name: receivingName,
      phone: phone,
      province: region[0],
      city: region[1],
      region: region[2],
      detail: addressInfo
    }
    address.opera = address_id ? 'edit' : 'add'
    if (address_id) {
      address.address_id = address_id
    }

    api.user.newAddress(address).then(res => {
      wx.showToast({
        title: '新增成功',
        mask: true
      })
      wx.navigateBack()
    })

  },

  // 当所在地区改变时
  bindRegionChange(event) {
    console.log(event)
    let {
      value
    } = event.detail
    this.setData({
      region: value
    })
  },
  // 点击显示省市区选择
  shopVant() {
    this.setData({
      vantShow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.text) {
      let regionArr = this.data.region
      let {
        address_id,
        province,
        city,
        region,
        detail,
        name,
        phone
      } = globalData.address_item
      regionArr.push(province)
      regionArr.push(city)
      regionArr.push(region)
      // console.log(regionArr)

      this.setData({
        text: options.text,
        address_id: address_id,
        receivingName: name,
        phone: phone,
        addressInfo: detail,
        region: regionArr
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