<template>
  <div class="goods">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      msg: '商品页面'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.goods
  margin-top: 20px
  text-align: center
</style>
