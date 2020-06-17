const order = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5']
import api from '../../api/index'

// pages/home/home.js
Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    toView: 'green',
    navBarHeight: 0,
    // 新品推荐
    newList: [
      {
        id: 1,
        imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
        title: '1 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
        price: "3399.00"
      },
      {
        id: 2,
        imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
        title: '2 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
        price: "3399.00"
      },
      {
        id: 3,
        imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
        title: '3 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
        price: "3399.00"
      },
      {
        id: 4,
        imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
        title: '4 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
        price: "3399.00"
      }
    ],
    // 猜你喜欢
    likeList: [],
    // 首页横幅
    bannerList: []
  },

  // 点击跳转到商品详情页面 并传递商品id
  goGoodsInfo(event){
    console.log(event)
    let {goods_id} = event.target.dataset
    console.log(goods_id)
    wx.navigateTo({
      url: '../goodsInfo/goodsInfo?goodsId=' + goods_id
    })
  },

  // 获取导航栏高度
  getNavBarHeight() {
    // 获取导航栏的dom
    let query = wx.createSelectorQuery();
    // console.log(query)
    query.select('#navBar').boundingClientRect(dom => {
      // 获取到导航栏的高度
      let navBarHeight = dom.height;
      this.setData({
        navBarHeight
      })
    }).exec()
  },
  // 点击文本框进入search页面
  goSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 查询新品推荐
  getNewList(){ 
    api.goods.findAllNewList().then( res => {
      this.setData({
        newList: res
      })
    })
  },
  // 查询猜你喜欢
  findAllLikeList(){ 
    api.goods.findAllLikeList().then( res => {
      this.setData({
        likeList: res
      })
    })
  },
  // 查询首页横幅
  getBannerList(){
    api.goods.findBannerList().then( res => {
      this.setData({
        bannerList: res
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中...',
      icon: 'loading',
      mask: true
    })
    // 获取导航栏高度
    this.getNavBarHeight();

    // 查询新品推荐
    this.getNewList()

    // 查询猜你喜欢
    this.findAllLikeList()

    // 查询首页横幅
    this.getBannerList()
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