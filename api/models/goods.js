const goods = [
  {
    name: "shopListByName",
    url: 'goods/searchGoods',
    method: 'get',
    title: '查询商品列表(可根据商品名字，列表id、价格降序、升序、销量排序、综合排序)'
  },
  {
    name: 'findAllNewList',
    url: 'goods/newList',
    method: 'get',
    title: '查询新品推荐'
  },
  {
    name: 'findAllLikeList',
    url: 'goods/likeList',
    method: 'get',
    title: '查询猜你喜欢'
  },
  {
    name: 'findBannerList',
    url: 'goods/bannerList',
    method: 'get',
    title: '查询首页横幅'
  },
  {
    name: 'findCateList',
    url: 'goods/cateList',
    method: 'get',
    title: '查询类别列表'
  },
  {
    name: 'findGoodsInfo',
    url: 'goods/goodsInfo',
    method: 'get',
    title: '查询商品详情'
  }
]

export default goods