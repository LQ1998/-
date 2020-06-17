// components/swiper-toBeBelivered/swiper-toBeBelivered.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 订单列表的待发货item对象
    order_item: {
      type: Object,
      value: {}
    },
    // 用于margin-top的样式
    extClass: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      console.log(this.data.order_item)
    }
  }
})