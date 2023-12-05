export const GestureState = {
  POSSIBLE: 0,
  BEGIN: 1,
  ACTIVE: 2,
  END: 3,
  CANCELLED: 4
}
// 首页配置
export function getMainmenu() {
  let mainMenu = [
    '分类',
    '定制'
  ]
  mainMenu = mainMenu.map((name, id) => ({
    id,
    name
  }))
  return mainMenu
}
export function getCategory() {
  let categorys = [
    '套装',
    '女士上衣',
    '女士下装',
    '男士上衣',
    '男士下装',
    '女配饰',
    '男配饰',
    '礼品',
  ]
  return categorys
}

export function getProducts() {
  let products = [{
      id: 0,
      list: [{
        name: '连衣裙',
        link: ''
      }, {
        name: '法式西装',
        link: ''
      }, {
        name: '中式正装',
        link: ''
      }]
    },
    {
      id: 1,
      list: [{
        name: 'T恤',
        link: ''
      }, {
        name: '长袖',
        link: ''
      }, {
        name: '卫衣',
        link: ''
      }, {
        name: '毛衫',
        link: ''
      }, {
        name: '夹克',
        link: ''
      }, {
        name: '连衣裙',
        link: ''
      }, {
        name: '冬外套',
        link: ''
      }]
    },
    {
      id: 2,
      list: [{
        name: '裙装',
        link: ''
      }, {
        name: '针织裤',
        link: ''
      }, {
        name: '梭织裤',
        link: ''
      }, {
        name: '运动裤',
        link: ''
      }, {
        name: '短裤',
        link: ''
      }]
    }
  ]
  return products
}
// 文档：https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/example.html#%E6%AD%A5%E9%AA%A4%E4%B8%89%EF%BC%9A%E7%BB%91%E5%AE%9A%E9%A1%B5%E9%9D%A2%E6%89%8B%E5%8A%BF