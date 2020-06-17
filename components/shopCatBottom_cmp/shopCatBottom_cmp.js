// components/shopCatBottom_cmp/shopCatBottom_cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopCat: {
      type: Array,
      observer: function(val) {
        // console.log(111)
        this.computed()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalPrice: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听购物车数组的改变 改变则对购物车的合计重新计算
    computed(){
      let numberPrice = 0
      this.data.shopCat.forEach(item => {
        numberPrice = parseFloat(item.goods_price) * parseInt(item.count) + numberPrice
      })
      // console.log(numberPrice)

      this.setData({
        totalPrice: numberPrice
      })
    },

    // 点击由购物车页面跳转到订单确认页面
    goOrderConfirm() {
      this.triggerEvent('goOrderConfirmEvent', {totalPrice: this.data.totalPrice} )
    }
  },
  // observers: {
  //   'shopCat': function(Item) {
  //     // 在 Item 被设置时，执行这个函数
  //     console.log(Item)
  //   }
  // }
})
