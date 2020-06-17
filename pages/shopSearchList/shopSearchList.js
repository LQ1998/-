// 导入api
import api from '../../api/index'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: 0,
    headHeight: 0,
    // 控制商品显示 横向或纵向
    column: true,
    // 保存商品列表的数组
    shopList: [
      // {
      //   id: 1,
      //   imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
      //   title: '1 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
      //   price: "3399.00",
      //   discountPrice: '123'
      // },
      // {
      //   id: 2,
      //   imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
      //   title: '2 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
      //   price: "3399.00"
      // },
      // {
      //   id: 3,
      //   imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
      //   title: '3 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
      //   price: "3399.00",
      //   discountPrice: '123'
      // },
      // {
      //   id: 4,
      //   imageUrl: "https://img11.360buyimg.com/n7/jfs/t1/93318/25/3909/241656/5de35d5dEbef4b508/40da154f97570400.png",
      //   title: '4 华为nova6 5G手机（5G/4G可选）12期分期免息 普罗旺斯 8GB+128GB（全网通）',
      //   price: "3399.00"
      // }
    ],
    // 类别id
    catearr_id: '',
    // 文本框的value
    inputVal: '',

    // 用于价格的升序降序 默认降序
    descPrice: '',
    // 用于控制价格icon的改变
    priceIcon: 0,
    // 销量
    descSales: '',
    // 综合
    descKind: '',
  },
  // 用户点击价格 查询 显示
  priceClick() {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    let {catearr_id,inputVal,descPrice} = this.data
    let descTab = {}

    if(!descPrice) {
      this.setData({ // 设置为价格降序
        descPrice: 'down_price',
        priceIcon: 1,
        descSales: '',
        descKind: ''
      })
      let desc = 'down_price'
      descTab = this.isCatearr_idAndInputVal(catearr_id,inputVal,desc)
    }else if(descPrice == 'down_price') {
      this.setData({ // 设置为价格升序
        descPrice: 'up_price',
        priceIcon: 2,
        descSales: '',
        descKind: ''
      })
      let desc = 'up_price'
      descTab = this.isCatearr_idAndInputVal(catearr_id,inputVal,desc)
    }else if(descPrice == 'up_price') {
      this.setData({ // 设置为价格降序
        descPrice: 'down_price',
        priceIcon: 1,
        descSales: '',
        descKind: ''
      })
      let desc = 'down_price'
      descTab = this.isCatearr_idAndInputVal(catearr_id,inputVal,desc)
    }
    // console.log(descTab)
    api.goods.shopListByName(descTab).then(res => {
      this.setData({
        shopList: res,
      })
      wx.hideLoading()
    })
  },

  // 用于判断类别id和文本框是否为空
  isCatearr_idAndInputVal (catearr_id,inputVal,desc) {
    let descTab
    if(catearr_id) {
      descTab = {
        cid: catearr_id,
        desc
      }
    } else if (inputVal) {
      descTab = {
        name: inputVal,
        desc
      }
    } else {
      descTab = {
        desc
      }
    }
    return descTab
  },

  // 根据用户点击的 综合 销量 查询 进行显示
  tabBarClick(event) {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    // console.log(event)
    let {desc} = event.currentTarget.dataset
    let {catearr_id,inputVal,} = this.data
    let descTab = {}
    if(desc == 'sales') {
      this.setData({
        descSales: desc,
        descKind: '',
      })
    } else if(desc == 'kind') {
      this.setData({
        descSales: '',
        descKind: desc,
      })
    }
    descTab = this.isCatearr_idAndInputVal(catearr_id,inputVal,desc)
    api.goods.shopListByName(descTab).then(res => {
      this.setData({
        shopList: res,
        descPrice: '',
        priceIcon: 0
      })
      wx.hideLoading()
    })
  },

  // 点击前往商品详情页面
  goGoodsInfo(event) {
    let {
      goods_id
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: '../goodsInfo/goodsInfo?goodsId=' + goods_id,
    })
  },

  // 改变column true为纵向 false为横向
  changeColumn() {
    let column = this.data.column;
    column = !column
    this.setData({
      column
    })
  },

  // 获取导航栏的高度
  getNavBarHeight() {
    // 获得导航栏的dom
    let query = wx.createSelectorQuery();
    let headHeight = this.createSelectorQuery();
    query.select('#navBar').boundingClientRect(dom => {
      // 获取导航栏高度
      let navBarHeight = dom.height
      // console.log(navBarHeight)
      this.setData({
        navBarHeight
      })
    }).exec()

    headHeight.select('#headHeight').boundingClientRect(dom => {
      console.log(dom)
      let headHeight = dom.height
      this.setData({
        headHeight
      })
    }).exec()
  },

  // 请求获取商品列表
  getShopList(inputVal) {
    console.log(inputVal)
    // 请求之前显示加载
    wx.showLoading({
      title: '正在加载',
    })
    // console.log(api.goods.shopListByName)
    if(inputVal) {
      api.goods.shopListByName({
        name: inputVal
      }).then(res => {
        console.log(res)
        this.setData({
          shopList: res
        })
        wx.hideLoading() // 隐藏数据
      })
    }else {
      api.goods.shopListByName().then(res => {
        console.log(res)
        this.setData({
          shopList: res
        })
        wx.hideLoading() // 隐藏数据
      })
    }
    
  },

  // 根据商品类别id查询商品
  getShopListFindByCatearr_id(catearr_id) {

    // 请求之前显示加载
    wx.showLoading({
      title: '正在加载',
    })
    api.goods.shopListByName({
      cid: catearr_id
    }).then(res => {
      console.log(res)
      this.setData({
        shopList: res
      })
      wx.hideLoading() // 隐藏数据
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 获取导航栏、文本框和标题栏的高
    this.getNavBarHeight()

    let {
      catearr_id,
      inputVal
    } = options
    this.setData({
      catearr_id,
      inputVal
    })

    if (catearr_id) {
      // 根据商品类别id查询商品
      this.getShopListFindByCatearr_id(catearr_id)
    } else {
      // 搜索请求获取商品列表
      this.getShopList(inputVal)
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