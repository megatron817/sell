<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count" @click="reduceCart">
        <span class="inner iconfont icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{ food.count }}</div>
    <div class="cart-add iconfont icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script>
export default {
  name: 'Cartcontrol',
  props: {
    food: {
      type: Object,
      default: () => []
    }
  },
  created () {
  },
  data () {
    return {
      msg: '控制按钮'
    }
  },
  methods: {
    // 增加商品
    addCart (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cartAdd', event.target)
    },
    // 减少商品
    reduceCart () {
      if (this.food.count) this.food.count--
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartcontrol
  font-size: 0
  & > div
    display: inline-block
  .cart-decrease
    padding: 6px
    transition: all .3s linear
    .inner
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: #00A0DC
      transition: all .3s linear
    &.move-enter-to, &.move-leave-to
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        transform: rotate(0)
    &.move-enter-active, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
  .cart-count
    width: 12px
    padding-top: 6px
    line-height: 24px
    font-size: 10px
    text-align: center
    vertical-align: top
    color: rgb(147, 153, 159)
  .cart-add
    padding: 6px
    font-size: 24px
    line-height: 24px
    color: #00A0DC
</style>
