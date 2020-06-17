
import api from "../../api/index"
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    id: 1,
    navBarHeight: '',
    inputHeight: '',
    showView: []
  },

  // 点击跳转到商品列表页面并根据商品类别id查询商品
  goShopSearchList(event) {
    console.log(event)
    let {catearr_id} = event.currentTarget.dataset
    wx.navigateTo({
      url: '../shopSearchList/shopSearchList?catearr_id=' + catearr_id,
    })
  },

  // 点击文本框跳转到search页面
  goSearch(){
    wx.navigateTo({
      url: '../search/search'
    })
  },

  // 查询类别列表
  findCateList(){
    wx.showLoading({
      title: '正在加载中...',
      icon: 'loading',
      mask: true
    })
    api.goods.findCateList().then(res => {
      console.log(res)
      this.setData({
        showView: res
      })
      wx.hideLoading()
    })
  },

  // 点击分类名根据分类id切换 商品类别
  typeNavClick(event) {
    // console.log(event)
    let {
      id,
      index
    } = event.currentTarget.dataset
    console.log(id)
    // let showView = this.showView[id]
    this.setData({
      id,
      index
    })
  },
  // 获取导航栏高度和input文本框高度
  getNavBarHeight() {
    // 获得导航栏dom
    let query = wx.createSelectorQuery();
    let inputQuery = this.createSelectorQuery()

    query.select('#navBar').boundingClientRect(dom => {
      // 获取导航栏高度
      let navBarHeight = dom.height;
      // console.log(navBarHeight)
      this.setData({
        navBarHeight
      })
    }).exec();
    inputQuery.select('#inputId').boundingClientRect(dom => {
      // 获取导航栏高度
      let inputHeight = dom.height;
      // console.log(inputHeight)
      this.setData({
        inputHeight
      })
    }).exec();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavBarHeight();

    // 查询类别列表
    this.findCateList();
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