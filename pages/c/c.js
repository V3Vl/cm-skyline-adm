// import { GestureState } from '../../uitl'
const { shared, timing } = wx.worklet
const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}

Component({
  // pageLifetimes: {
  //   show() {
  //     if (typeof this.getTabBar === 'function') {
  //       this.getTabBar((tabBar) => {
  //         tabBar.setData({
  //           selected: 2
  //         })
  //       })
  //     }
  //   }
  // },
  lifetimes: {
    created() {
      this.transY = shared(1000)  //pan弹窗的顶点y坐标(高度）
      this.scrollTop = shared(0)
      this.startPan = shared(true)  //pan弹窗是否可以下拉
      this.commentHeight = shared(1000)
    },
    attached() {
      const query = this.createSelectorQuery()
      query.select('.comment-container').boundingClientRect()
      query.exec((res) => {
        this.transY.value = this.commentHeight.value = res[0].height
      })
      this.applyAnimatedStyle('.comment-container', () => {
        'worklet'
        return { transform: `translateY(${this.transY.value}px)` }
      })
    },
  },
  methods: {
    setTabBarBadge() {
      console.log('666');
      wx.setTabBarBadge({
        index: 2,
        text: '6'
      })
    },
    removeTabBarBadge() {
      wx.removeTabBarBadge({
        index: 2
      })
      console.log('666');
    },
    jumpTo() {
      console.log('666');
      wx.navigateTo({
        url: '/pages/demo-negotiation/index',
        // routeType: 'customRoute'
      })
    },
    jumpTo2() {
      console.log('666');
      wx.navigateTo({
        url: '/pages/index2/index',
        // routeType: 'customRoute'
      })
    },
    onTapOpenComment() {
      this.openComment(300)
    },
    openComment(duration) {
      'worklet'
      this.transY.value = timing(0, { duration })
    },
    // 手势识别成功的回调
    handlePan(evt) {
      'worklet'
      if (evt.state === GestureState.ACTIVE) {
        const currPosition = this.transY.value
        const destination = Math.max(0, currPosition + evt.deltaY)
        // if(this.transY.value === Math.max(0, currPosition + evt.deltaY))
        if (currPosition === destination) return
        this.transY.value = destination
      }
      // 文档：https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/gesture.html#%E6%89%8B%E5%8A%BF%E7%BB%84%E4%BB%B6
      if (evt.state === GestureState.END || evt.state === GestureState.CANCELLED) {
        if (evt.velocityY > 500 && this.transY.value > 50) {
          this.closeComment()
        } else if (this.transY.value > this.commentHeight.value / 2) {
          this.closeComment()
        } else {
          this.openComment(100)
        }
      }
    },
    onTapCloseComment() {
      this.closeComment()
    },
    closeComment() {
      'worklet'
      this.transY.value = timing(this.commentHeight.value, { duration: 200 })
    },
    // pan手势和scrollview滚动的协商1 --- 半屏下拉时
    shouldPanResponse() {
      'worklet'
      return this.startPan.value
    },
    // pan手势和scrollview滚动的协商2 --- 滚动时
    shouldScrollViewResponse(pointerEvent) {
      'worklet'
      if (this.transY.value > 0) return false
      const scrollTop = this.scrollTop.value
      const { deltaY } = pointerEvent
      // scorllview滚动在最顶部时，才可以通过滑动scollview区域下拉pan弹窗 --- 以此作为判断依据
      const result = scrollTop <= 0 && deltaY > 0
      this.startPan.value = result
      return !result
    },
    adjustDecelerationVelocity(velocity) {
      'worklet'
      const scrollTop = this.scrollTop.value
      return scrollTop <= 0 ? 0 : velocity
    },
    // scrollview滚动时触发
    handleScroll(evt) {
      'worklet'
      this.scrollTop.value = evt.detail.scrollTop
    },
  },
  onLoad(options) { }

})
