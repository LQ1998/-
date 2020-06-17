// 导入跟地址
import {BASE_URL} from "../utils/gateway"

// 定义接口类
class CreateApi {
  constructor(config){
    // 保存好初始参数
    this.options = config
  }

  execute(item){
    // 定义请求头
    let header = {}
    // 检查是否有用户凭证
    if(getApp().globalData.userToken) {
      header.token = getApp().globalData.userToken
    }

    // 发送请求
    return new Promise((resolve,reject) => {
      wx.request({
        url: BASE_URL + item.url, // 定义请求地址
        method: item.method, // 定义请求方法
        data: item.params, // 定义请求参数
        header, // 定义请求头
        success: res => { // 请求成功
          // 取出真正的数据
          let data = res.data
          // 判断服务器返回的状态码
          if(data.code === 0){
            resolve(data.data)
          }else if(data.code === 2){ // 用户验证失败
            wx.showToast({ // 提示信息
              title: data.msg,
            })
            reject(data)
          }else if(data.code === 1) {
            wx.showToast({ // 提示信息
              title: data.msg,
            })
            reject(data)
          } else{ // 请求失败
            wx.showToast({ // 提示信息
              title: '网络开小差了...'
            })
            reject(data)
          }
        },
        fail: err => { // 请求失败
          
        }
      })
    })
  }
  create() {
    let modules = {}
    for (let module in this.options.Modules) {
      console.log(this.options.Modules)
      console.log(module)
      let modulesApi = {}
      console.log(this.options.Modules[module])
      this.options.Modules[module].forEach(item => {
        modulesApi[item.name] = (params) => {
          item.params = params;
          return this.execute(item)
        }
      })
      modules[module] = modulesApi
    }
    return modules;
  }
}

export default CreateApi