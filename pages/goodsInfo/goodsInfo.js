import api from '../../api/index'
import {
  isLoding
} from "../../utils/util"

// pages/goodsInfo/goodsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图初始值
    current: 1,
    // 导航栏高度
    navBarHeight: '',
    // 购买数量
    selected: 1,
    // 用于控制已选处的icon
    upOrDown: true,
    // 商品详情对象
    goodsInfoArr: {},

    // 商品描述的图片 由于返回的是一个ima标签 所以需要进行拼接写样式
    content: '',

    // goodsId
    goodsId: 0,

    // 保存购物车数组列表的长度
    goodsList_length: 0,

    // 用于判断是否是转发进来的页面
    pageId: false
  },
  // 前往订单确认页面 将商品详情数组 和 购买数量传递过去
  goOrderConfirm() {
    console.log(this.data.goodsInfoArr)
    // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
    if (!isLoding()) return

    console.log(this.data.goodsInfoArr)

    let {
      goodsInfoArr: {
        goods_id,
        goods_image,
        goods_name,
        goods_price,
        goods_no
      },
      selected
    } = this.data
    let orderList = {
      goods_id,
      goods_image,
      goods_name,
      goods_price,
      goods_no,
      "count": selected,
      "info": "商品详情"
    }
    console.log(orderList)
    wx.navigateTo({
      url: '../orderConfirm/orderConfirm',
      success: res => {
        res.eventChannel.emit('orderListPage', {
          data: {
            orderList,
            "totalPrice": 0
          }
        })
      }
    })
  },

  // 根据商品id查询商品详情
  goodsInfo() {
    // console.log(event)
    wx.showLoading({
      title: '正在加载中...',
      icon: 'loading',
      mask: true
    })
    let {
      goodsId
    } = this.data
    api.goods.findGoodsInfo({
      gid: goodsId
    }).then(res => {
      console.log(res)
      let content = res.content
      // console.log(content)
      let gIndex = content.indexOf("g")
      let sIndex = content.indexOf("s")

      let img = content.slice(0, gIndex + 1)
      let src = content.slice(sIndex)

      content = img + " style='width:100%' " + src
      // console.log(img)
      // console.log(src)
      this.setData({
        goodsInfoArr: res,
        content
      })
      // 隐藏加载中状态
      wx.hideLoading()
    })
  },

  // 点击跳转到购物车页面
  goShopCat() {
    wx.switchTab({
      url: '../shopCat/shopCat',
    })
  },

  // 点击加入购物车
  addPocket(event) {
    // 如果用户没有授权登录 app.js globalData里userinfo没有值 则跳转到登录页面
    if (!isLoding()) return


    console.log(event)
    let {
      goods_id
    } = event.currentTarget.dataset
    let selected = this.data.selected
    api.order.pocketPost({
      opera: 'add',
      gid: goods_id,
      count: selected
    }).then(res => {
      this.getPocket()
    })
  },

  // 轮播图动一下胶囊的数值就根据他的current改变
  currentChange(event) {
    let {
      detail
    } = event
    let current = detail.current + 1;
    if (detail.source == "touch") {
      this.setData({
        current
      })
    }
    // console.log(event)
  },
  // 判断icon是上还是下 如果是上则收起 如果是下则展开
  changeIcon() {
    let icon = this.data.upOrDown
    icon = !icon
    this.setData({
      upOrDown: icon
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
  // 点击购买数量加一
  jiaBtn() {
    let selected = this.data.selected
    if (selected < 99) {
      selected++
      this.setData({
        selected
      })
    }
  },
  // 点击购买数量减一
  jianBtn() {
    let selected = this.data.selected
    if (selected > 1) {
      selected--
      this.setData({
        selected
      })
    }
  },
  // 点击房子icon进入首页
  goHome() {
    wx.switchTab({
      url: '../home/home',
    })
  },

  // 获取购物车列表
  getPocket() {
    api.order.pocket().then(res => {
      this.setData({
        goodsList_length: res.length
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pageId) {
      this.setData({
        pageId: true
      })
    }
    // 保存传递过来的商品id
    this.setData({
      goodsId: options.goodsId
    })

    // 获取导航栏高度
    this.getNavBarHeight()

    // 根据商品id查询商品详情
    this.goodsInfo()

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
    // this.getPocket()
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
  onShareAppMessage: function (res) {
    let {
      goodsId,
      goodsInfoArr
    } = this.data
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: goodsInfoArr.goods_name,
      path: '/pages/goodsInfo/goodsInfo?pageId=商品详情&goodsId=' + goodsId, //这里在首页的地址后面添加我们需要传值的标识位pageId以及值123(pageId 这个名字你们可以自己随便乱取 如同一个变量名)
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})