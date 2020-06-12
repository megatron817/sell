<template>
  <div class="header">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: '头部'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.header
  background: skyblue
  color: #fff
  height: 40px
  line-height: 40px
  text-align: center
</style>
