<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* vant组件样式覆盖 \(^o^)/~ */
.van-swipe__indicator{
  width: 6Px;
  height: 6Px;
}
</style>
