const user = [
  {
    title: '用户登录验证',
    url: 'user/auth',
    name: 'auth',
    method: 'post'
  },
  {
    title: '获取用户地址列表',
    url: 'user/address',
    name: 'address',
    method: 'get'
  },
  {
    title: '新增或编辑收获地址',
    url: 'user/address',
    name: 'newAddress',
    method: 'post'
  },
  {
    title: '设置默认地址 ｜ 删除地址',
    url: 'user/operaAddress',
    name: 'operaAddress',
    method: 'post'
  }
]

export default user