Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/a/index",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "首页"
    }, {
      pagePath: "/pages/b/index2",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "管理"
    }, {
      pagePath: "/pages/c/c",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "功能测试展示"
    },
    {
      pagePath: "/pages/d/index",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})