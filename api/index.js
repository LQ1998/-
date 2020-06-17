// 导入所以的models文件
import goods from "./models/goods"
import user from "./models/user"
import order from "./models/order"
import CreateApi from "./createApi"

// 定义model
let Modules = {
  goods,
  user,
  order
}

let api = new CreateApi({
  Modules
}).create()

export default api