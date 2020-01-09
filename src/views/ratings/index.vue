<template>
  <div class="ratings">
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="拼命加载中"
      finished-text="没有更多评价了"
      @load="onLoading">
      <van-cell v-for="v in list" :key="v" :title="v" />
    </van-list>
  </div>
</template>

<script>

export default {
  name: 'Ratings',
  data () {
    return {
      msg: '评价页面',
      loading: false,
      finished: false,
      list: []
    }
  },
  created () {
    // 使用axios获取mock的模拟数据
    this.$axios.get('/user').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(`调用失败：${err}`)
    })
  },
  methods: {
    onLoading () {
      // 异步更新数据
      setTimeout(() => {
        for (let index = 0; index < 20; index++) {
          this.list.push(`我是评价${this.list.length + 1}`)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完毕
        if (this.list.length >= 200) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ratings
  // margin-top: 20px
  text-align: center
</style>
