<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shopcart',
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
    }
  },
  data () {
    return {
      msg: '购物车'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
</style>
