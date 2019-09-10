<template>
  <div class="seller">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Seller',
  data () {
    return {
      msg: '商家页面'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.seller
  margin-top: 20px
  text-align: center
</style>
