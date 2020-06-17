// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    // 最近搜索
    // recentSearch_mian: [
    //   {
    //     id: 1,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 2,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 3,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 4,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 5,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 6,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 7,
    //     text: "阿坤恰粑粑"
    //   },
    //   {
    //     id: 8,
    //     text: "阿坤恰粑粑"
    //   }
    // ]
    recentSearch_mian: []
  },
  // 点击搜索将搜索的内容保存到数组对象中
  addRecentSearch() {
    let newRecentSearch_mian = this.data.recentSearch_mian;
    // console.log(newRecentSearch_mian)
    let inputVal = this.data.inputVal
    if (inputVal) {
      // console.log(inputVal)
      newRecentSearch_mian.push({
        id: this.getId(),
        text: inputVal
      })

      wx.navigateTo({
        url: "../shopSearchList/shopSearchList?inputVal=" + inputVal,
        success: res => {
          wx.setStorage({
            key: 'token_recentSearch_mian',
            data: newRecentSearch_mian,
          })

          this.setData({
            recentSearch_mian: newRecentSearch_mian,
            inputVal: '',
          })
        }
      })
    }else {
      wx.navigateTo({
        url: "../shopSearchList/shopSearchList?inputVal=" + inputVal,
      })
    }
  },
  // 点击最近搜索 直接搜索商品
  searchGoods(event) {
    let {
      id
    } = event.currentTarget.dataset
    // 循环最近搜索的recentSearch_mian数组对象 根据id进行判断拿到内容
    let searchInputVal = this.data.recentSearch_mian.filter(item => {
      if (item.id === id) {
        return item
      }
    })
    console.log(searchInputVal)
    wx.navigateTo({
      url: '../shopSearchList/shopSearchList?inputVal=' + searchInputVal[0].text,
    })

  },

  // 获取最近搜索数组的最后一个index的id+1
  getId() {
    if (!this.data.recentSearch_mian.length) return 1
    return this.data.recentSearch_mian.slice(-1)[0].id + 1;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token_recentSearch_mian',
      success: res => {
        this.setData({
          recentSearch_mian: res.data
        })
      }
    })
  },
  // 删除搜索列表
  deleteRecentSearch() {
    wx.showModal({
      title: '提示',
      content: "确定删除吗？",
      success: res => {
        if (res.confirm) { // 用户点击确定
          this.setData({
            recentSearch_mian: [],
          })
          wx.setStorage({
            key: 'token_recentSearch_mian',
            data: [],
          })
        } else if (res.cancel) { // 用户点击取消
          console.log('用户点击取消')
        }
      }
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