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
      msg: '我是头部'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
