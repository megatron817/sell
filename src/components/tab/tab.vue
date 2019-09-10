<template>
  <div class="tab">
    <router-link to="/goods">商品</router-link>
    <router-link to="/ratings">评论</router-link>
    <router-link to="/seller">商家</router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      msg: '我是导航'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  & > a
    flex: 1
    text-align: center
    color: #000
    &.router-link-active
      color: red
      font-weight: bold
</style>
