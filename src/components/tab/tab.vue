<template>
  <div class="tab">
    <div class="tab-item">商品</div>
    <div class="tab-item">评论</div>
    <div class="tab-item">商家</div>
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
  .tab-item
    flex: 1
    text-align: center
</style>
