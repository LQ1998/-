import api from '../../api/index'

// components/shopCat/shopCat.js
Component({
  options: {
    styleIsolation: "shared"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: String,
    shopCatItem: {
      type: Object,
      value: {}
    }
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
    // 购物减一
    jianShop(event) {
      let {
        goods_id
      } = event.currentTarget.dataset;
      let shopCatItem = this.data.shopCatItem;
      if (shopCatItem.goods_id == goods_id) {
        // console.log(goods_id)
        if (shopCatItem.count > 1) {
          // console.log(shopCatItem.count)
          api.order.pocketPost({
            opera: 'reduce',
            gid: goods_id,
            count: 1
          }).then(res => {
            // 子组件向父组件传值   父子组件的通信
            this.triggerEvent('shopCatEvent', this.data.shopCatItem)
          })
        }
      }
    },
    // 购物加一
    jiaShop(event) {
      let {
        goods_id
      } = event.currentTarget.dataset;
      // console.log(goods_id)
      let shopCatItem = this.data.shopCatItem;
      if (shopCatItem.goods_id == goods_id) {
        // console.log(goods_id)
        if (shopCatItem.count < 99) {
          // console.log(shopCatItem.count)
          api.order.pocketPost({
            opera: 'add',
            gid: goods_id,
            count: 1
          }).then(res => {
            // 子组件向父组件传值   父子组件的通信
            this.triggerEvent('shopCatEvent', this.data.shopCatItem)
          })
        }
      }
    },

    // 点击垃圾箱 根据id删除一列物品
    deleteShopCat(event) {
      console.log(event.currentTarget.dataset)
      let {
        goods_id
      } = event.currentTarget.dataset;
      wx.showModal({
        title: '提示',
        content: '确定删除当前商品吗！',
        success: res => {
          if (res.confirm) {
            api.order.pocketPost({
              opera: 'remove',
              gid: goods_id
            }).then(res => {
              this.triggerEvent('deleteShopCatEvent', goods_id)
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    
    // 根据商品id 前往商品详情页面 
    goGoodsInfo(event) {
      let {
        goods_id
      } = event.currentTarget.dataset
      wx.navigateTo({
        url: '../goodsInfo/goodsInfo?goodsId=' + goods_id,
      })
    },
  }
})