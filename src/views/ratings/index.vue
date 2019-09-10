<template>
  <div class="ratings">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Ratings',
  data () {
    return {
      msg: '评价页面'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ratings
  margin-top: 20px
  text-align: center
</style>
