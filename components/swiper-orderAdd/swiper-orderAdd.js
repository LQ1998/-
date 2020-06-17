import api from '../../api/index'

// components/swiper-orderAdd/swiper-orderAdd.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 订单列表的全部item对象
    order_item: {
      type: Object,
      value: {}
    },
    // 用于margin-top的样式
    extClass: Boolean,
    // 控制swiper的index
    index : Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderState: ['待付款', '待发货', '待收获', '已完成', '已取消']
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
              this.triggerEvent
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
              
              let {index} =this.data
              console.log(index)
              this.triggerEvent('refreshOrder',{'index':index})
            })
          }else if(res.cancel) {    
            console.log('用户点击了取消')
            return
          }
        }
      })
    },

    // 点击前往订单详情页面
    goOrderInfo() {
      let {order_id} = this.data.order_item
      wx.navigateTo({
        url: '../../pages/orderInfo/orderinfo?order_id=' + order_id,
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // console.log(this.data.order_item)
    },
  },
})