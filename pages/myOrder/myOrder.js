import api from '../../api/index'
import {
  formatDate,
} from '../../utils/util.js'

// pages/myOrder/myOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabBar的index
    index: 0,
    // tabBar被激活的颜色
    activeColor: '#FF495E',
    // tab的文字
    tab: ["全部订单", "待付款", "待发货", "待收货"],
    // tab的高
    tabBarHeight: 0,
    // 导航栏的高
    navBarHeight: 0,

    // 存储全部订单的二维数组
    orderListAll: [
      [],
      [],
      [],
      []
    ],
    // 用于滚动到底部分页查询的数组为0时 设置为false
    orderListPage: true,

    // 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
    triggered: false
  },
  // 子组件传递过来的方法 用于根据index刷新 
  refreshOrder(event) {
    // console.log(event.detail)
    let {
      index
    } = event.detail
    this.setData({
      index
    })
    this.getOrderList()
  },

  // 下拉根据index刷新页面
  downRefresh(event) {
    let {
      index
    } = event.currentTarget.dataset

    if (this.freshing) return
    // wx.showLoading({
    //   title: '正在加载中...',
    //   mask: true
    // })
    this.freshing = true
    this.setData({
      index
    })
    this.getOrderList()
    // this.setData({
    //   triggered: false
    // })
    this.freshing = false
    // wx.hideLoading()

  },
  // 页面加载 执行 获取订单列表 onShow
  getOrderList() {
    wx.showLoading({
      title: '正在加载中...',
      mask: true
    })
    // 对参数进行解构
    let {
      index
    } = this.data
    let i = index
    index -= 1
    // console.log(index)
    api.order.getOrderList({
      kind: index,
    }).then(res => {
      let newOrderListAll = res.filter(item => {
        item.create_time = formatDate(item.create_time)
        return item
      })
      let params = {
        orderListPage: true,
        triggered: false
      }
      params["orderListAll[" + i + "]"] = newOrderListAll
      // console.log(params)
      this.setData(params)
      wx.hideLoading()
    })
  },

  // 滚动到底部分页查询订单列表
  lower() {
    // 保存this指针
    var that = this;

    // 对参数进行解构
    let {
      index
    } = this.data
    let i = index
    index -= 1
    // 将订单列表赋值给result
    var result = that.data.orderListAll[i];
    var pagenumber = result.length;
    // 加载订单列表 如果小于5 则代表是第一页 
    if (pagenumber < 5) {
      return false;
    } else {
      if (this.data.orderListPage) {
        api.order.getOrderList({
          kind: index,
          offset: pagenumber
        }).then(res => {
          // var myOldData=that.data.imageList;
          var mydata = res
          // var cont = result.concat(mydata);
          if (mydata.length == 0) {
            wx.showToast({ //如果全部加载完成了也弹一个框
              title: '没有数据了',

              image: "/images/warn.png",
              duration: 300,
              mask: true
            });
            that.setData({
              orderListPage: false
            })
            return false;
          }
          if (mydata.length >= 100) {
            wx.showToast({ //如果全部加载完成了也弹一个框
              title: '加载的太多了',
              icon: 'success',
              duration: 300,
              mask: true
            });
            return false;
          } else {
            wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中” 
              title: '加载中',
              icon: 'loading',
              mask: true
            });
            let newOrderListAll = mydata.filter(item => {
              item.create_time = formatDate(item.create_time)
              return item
            })
            let params = {}

            params["orderListAll[" + i + "]"] = [...that.data.orderListAll[i], ...newOrderListAll]
            that.setData(params)
            wx.hideLoading();
          }
        })
      }
    }
  },

  // 滑动动画开始改变index切换
  swiperChangeStart(event) {
    // 获取当前所在的索引值 
    let {
      current,
      source
    } = event.detail;
    // console.log(1)
    // 我们只需要判断 如果是用户点击的 才重新设置index值
    if (source == 'touch') {
      // console.log(event)
      this.setData({
        index: current,
        orderListPage: true
      })
      // this.getOrderList()
    }
  },

  // 滑动动画结束查询对应数据切换
  swiperChangeEnd(event) {
    // console.log(2)

    this.getOrderList()
  },
  // tab的index改变时 修改index值
  tabChange(event) {
    // console.log(event)
    let {
      index
    } = event.currentTarget.dataset
    this.setData({
      index,
      orderListPage: true
    })
    this.getOrderList()
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

    newAddressHeight.select('#tabBar').boundingClientRect(dom => {
      // console.log(dom)
      let tabBarHeight = dom.height
      this.setData({
        tabBarHeight
      })
    }).exec()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取导航栏的高度
    this.getNavBarHeight()

    let {
      index
    } = options
    // console.log(index)
    // 将index值存入data属性里 进行判断渲染页面（组件）
    this.setData({
      index
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

    // 页面加载 执行 获取订单列表
    this.getOrderList()
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