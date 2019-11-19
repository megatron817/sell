<template>
  <div class="seller">
    <!-- 邮政编码 -->
    <van-divider>输入邮政编码</van-divider>
    <van-field
      readonly
      clickable
      placeholder="点此输入邮政编码"
      style="margin-bottom:20px;"
      :value="value"
      @touchstart.native.stop="show = true"
    />
    <van-number-keyboard
      v-model="value"
      title="数字键盘"
      :show="show"
      :maxlength="6"
      @blur="show = false"
    />
    <!-- 密码 -->
    <van-divider>输入密码</van-divider>
    <van-password-input
      :value="passwordVal"
      info="密码为6位数字"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <van-number-keyboard
      :show="showKeyboard"
      title="密码键盘"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
export default {
  name: 'Seller',
  data () {
    return {
      msg: '商家页面',
      show: false,
      value: '',
      showKeyboard: false,
      passwordVal: ''
    }
  },
  methods: {
    onInput (value) {
      this.passwordVal = (this.passwordVal + value).slice(0, 6)
    },
    onDelete () {
      this.passwordVal = this.passwordVal.slice(0, this.passwordVal.length - 1)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.seller
  // margin-top: 20px
  // text-align: center
</style>
