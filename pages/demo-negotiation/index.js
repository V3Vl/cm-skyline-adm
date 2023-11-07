// demo-negotiation/index.js
import {
  GestureState
} from '../../uitl'

/**
 * Skyline 手势组件介绍
 * https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/gesture.html
 * 
 * 利用手势协商机制实现列表滚动和容器拖动的衔接
 * 1. 上下滑动时，shouldScrollViewResponse 和 shouldPanResponse 会依次触发，由开发者来控制对应的手势在当前 move 过程中是否需要响应；
 * 2. 若一开始向上滑动时，列表区域需要滚动，因此
 *  a. shouldScrollViewResponse 返回 true，
 *  b. shouldPanResponse 返回 false；
 * 3. 若一开始向下滑动时，列表区域需要拖动，因此 
 *  a. shouldScrollViewResponse 返回 false;
 *  b. shouldPanResponse 返回 true；
 * 4. 在拖动列表过程中上下滑动，此时 shouldScrollViewResponse 应当返回 false 阻止 <scroll-view> 滚动
 * 5. 拖动过程中松开手，列表区惯性滚动到初始位置，此时有个特殊情况需要处理
 *  a. 由于滚动过程中 scroll-view 的一些事件被忽略掉了，导致松手时的速度计算错误，需要通过 adjustDecelerationVelocity 进行调整，
 *  b. 当 scrollTop > 0 时，表示正常滚动 scroll-view，直接返回入参中的速度即可
 *  c. 当 scrollTop <=0 时，表示产生回弹效果，此时可指定松手时的速度为 0，避免抖动
 *  d. 通常情况下直接复用这里的判断逻辑即可，如果需要自定义 scroll-view 松手后的滑动效果，可自定义返回值（加快 or 减慢）
 * 
 */

const {
  shared,
  spring,
  timing
} = wx.worklet;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: new Array(40).fill(1),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const transY = shared(0);
    this.applyAnimatedStyle('.list-wrp', () => {
      'worklet';
      return {
        transform: `translateY(${transY.value}px)`
      };
    });
    this.transY = transY;
    this.scrollTop = shared(0);
    this.startPan = shared(false);
  },

  shouldPanResponse() {
    'worklet';
    return this.startPan.value;
  },

  shouldScrollViewResponse(pointerEvent) {
    'worklet';
    if (this.transY.value > 0) return false;
    const scrollTop = this.scrollTop.value;
    const {
      deltaY
    } = pointerEvent;
    const result = !(scrollTop <= 0 && deltaY > 0);
    this.startPan.value = !result;
    return result;
  },

  handlePan(evt) {
    'worklet';
    if (evt.state === GestureState.ACTIVE) {
      const curPosition = this.transY.value;
      const destination = Math.max(0, curPosition + evt.deltaY);
      if (curPosition === destination) return;
      this.transY.value = destination;
    }

    if (evt.state === GestureState.END || evt.state === GestureState.CANCELLED) {
      this.transY.value = timing(0);
      this.startPan.value = false;
    }
  },

  adjustDecelerationVelocity(velocity) {
    'worklet';
    const scrollTop = this.scrollTop.value;
    return scrollTop <= 0 ? 0 : velocity;
  },

  handleScroll(evt) {
    'worklet';
    this.scrollTop.value = evt.detail.scrollTop;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})