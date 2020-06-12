<template>
  <div class="seller">
    <van-cell
      title="开始时间"
      is-link
      :value-class="className"
      :value="timeValue"
      @click="showPopup" />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择时间"
        :loading="isLoadingShow"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="show = false"
        @confirm="confirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Seller',
  data () {
    return {
      msg: '商家页面',
      timeValue: '请选择时间',
      show: false,
      isLoadingShow: true,
      currentDate: new Date(),
      minDate: new Date(),
      maxDate: new Date(2020, 12, 31),
      className: ''
    }
  },
  created () {
    this.$store.commit('showName', '幸运熊🐻')
    console.log(this.$store)
  },
  methods: {
    // 显示弹窗
    showPopup () {
      this.show = true
      this.isLoadingShow = true
      setTimeout(() => {
        this.isLoadingShow = false
      }, 500)
    },
    // 确认选择的时间
    confirmPicker (val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) { month = `0${month}` }
      if (day >= 1 && day <= 9) { day = `0${day}` }
      if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
      if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
      this.className = 'timeClass'
      this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`
      this.show = false
    },
    // 选项格式化函数
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      } else if (type === 'second') {
        return `${value}秒`
      }
      return value
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.seller
  .timeClass {
    color: #333;
  }
</style>
