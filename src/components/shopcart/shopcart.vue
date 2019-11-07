<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'highlight': totalCount > 0 }">
            <i class="iconfont icon-shopping_cart" :class="{ 'highlight': totalCount > 0 }"></i>
          </div>
          <div v-show="totalCount > 0" class="num">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{ 'highlight': totalPrice > 0 }">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right" @click.stop="pay">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <!-- 购物车小球 -->
    <div class="ball-container" v-for="(v, i) in balls" :key="i">
      <transition
        name="drop"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="v.show">
          <!-- inner是一个小球 -->
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <!-- 购物车列表 -->
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow" :class="{ 'up': listShow }">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(v, i) in selectFoods" :key="i">
              <span class="name">{{ v.name }}</span>
              <div class="price">
                <span>￥{{ v.price * v.count }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :food="v"></Cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 蒙层 -->
    <transition name="fade">
      <div class="list-mask" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Cartcontrol from '@/components/cartcontrol/cartcontrol'

export default {
  name: 'Shopcart',
  components: { Cartcontrol },
  props: {
    selectFoods: {
      type: Array,
      default: () => [{ price: 0, count: 0 }]
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 总价格
    totalPrice () {
      let total = 0
      this.selectFoods.forEach(v => {
        total += v.price * v.count
      })
      return total
    },
    // 总数量
    totalCount () {
      let count = 0
      this.selectFoods.forEach(v => {
        count += v.count
      })
      return count
    },
    // 结算按钮的描述
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diffPrice = this.minPrice - this.totalPrice
        return `还差￥${diffPrice}起送`
      } else {
        return '去结算'
      }
    },
    // 结算按钮的背景色
    payClass () {
      if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else if (this.totalPrice >= this.minPrice) {
        return 'enough'
      }
    },
    // 购物车列表是否可见
    listShow: {
      get () {
        return !this.fold
      },
      set () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new Bscroll(this.$refs.listContent, {
                click: true
              })
            })
          } else {
            this.scroll.refresh()
          }
        }
        return show
      }
    }
  },
  data () {
    return {
      msg: '购物车',
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      fold: true
    }
  },
  methods: {
    // goods父组件传递的el的值
    drop (el) {
      this.balls.forEach(v => {
        if (!v.show) {
          v.show = true
          v.el = el
          this.dropBalls.push(v)
          return false
        }
      })
    },
    /* 小球下落动画 */
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // 返回元素的大小及其相对于视口的位置的对象
          let rect = ball.el.getBoundingClientRect()
          // 水平和竖直方向的偏移量
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22) // window.innerHeight => 视图窗口高度
          // 外层做一个纵向的变化
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          // 内层做一个横向的变化
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight /* 触发浏览器重绘 */
      this.$nextTick(() => {
        // 当下降的时候，重写外部和内部的translate3d()
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
    },
    afterEnter (el) {
      // 当降落完一个ball时，就将该ball从dropBalls数组中取出来
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    // 点击购物车
    toggleList () {
      if (!this.totalCount) {
        return false
      }
      this.fold = !this.fold
    },
    // 清空购物车
    empty () {
      this.selectFoods.forEach(v => {
        v.count = 0
      })
      this.fold = true
    },
    // 去结算
    pay () {
      if (this.totalPrice < this.minPrice) return false
      window.alert(`您需要支付${this.totalPrice}元`)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'

.shopcart
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    .content-left
      flex: 1
      display: flex
      .logo-wrapper
        background: #141d27
        border-radius: 50%
        text-align: center
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 105px
          font-size: 9px
          font-weight: 400
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
        .logo
          background: #2B343C
          width: 100%
          height: 100%
          border-radius: 50%
          &.highlight
            background: #00A0DC
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
            color: rgba(255, 255, 255, .4)
            &.highlight
              color: #fff
      .price
        font-size: 16px
        color: #919396
        font-weight: 700
        margin: 12px 0 20px
        line-height: 24px
        padding-right: 12px
        border-right: 1px solid #2B333C
        &.highlight
          color: #fff
      .desc
        padding-left: 12px
        font-size: 10px
        color: rgba(255, 255, 255, .4)
        font-weight: 700
        line-height: 50px
    .content-right
      flex: 0 0 105px
      width: 105px
      background: #2B343C
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        color: rgba(255, 255, 255, .4)
        &.not-enough
          color: #fff
          background: #b3b0b0
        &.enough
          color: #fff
          background: #00b43c

  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all .4s linear

  .shopcart-list
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    &.up
      transform: translate(0, -100%)
    &.fold-enter-active, &.fold-leave-active
      transition: all .5s
      transform: translate3d(0, -100%, 0)
    &.fold-enter, &.fold-leave-active
      transform: translate3d(0, 0, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, .1)
      .title
        float: left
        font-size: 17px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0 18px
      max-height: 217px
      background: #fff
      overflow hidden
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, .1))
        .name
          line-height 24px
          font-size 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height 24px
          font-weight 700
          font-size: 14px
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right: 0
          bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width 100%
    height 100%
    z-index: -2
    filter: blur(6px)
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all .5s
      opacity: 1
      background: rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0.6)
</style>
