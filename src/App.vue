<template>
  <div id="app">
    <Header />
    <Tab />
    <div class="content">我是内容</div>
  </div>
</template>

<script>
import Header from './components/header/header'
import Tab from './components/tab/tab'

export default {
  name: 'App',
  components: { Header, Tab }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
