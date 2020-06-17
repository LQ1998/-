const order = [
  {
    url: 'order/pocket',
    name: 'pocket',
    method: 'get',
    title: '获取购物车列表'
  },
  {
    url: 'order/pocket',
    name: 'pocketPost',
    method: 'post',
    title: '购物车列表操作 （添加 减少 删除）'
  },
  {
    url: 'order/createOrder',
    name: 'createOrder',
    method: 'Post',
    title: '创建订单'
  },
  {
    url: 'order/payOrder',
    name: 'payOrder',
    method: 'POST',
    title: '订单付款'
  },
  {
    url: 'order/orderList',
    name: 'getOrderList',
    method: 'get',
    title: '获取订单列表'
  },
  {
    url: 'order/cancelOrder',
    name: 'cancelOrder',
    method: 'POST',
    title: '取消订单'
  },
  {
    url: 'order/orderInfo',
    name: 'orderInfo',
    method: 'GET',
    title: '获取订单详情'
  }
]

export default order