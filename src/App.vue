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
@font-face {
    /* font-properties */
    font-family: pictos;
    src:url('assets/fonts/NeutraText-Book.otf');
    /*url('assets/fonts/chinese/NotoSansCJKsc-Bold.otf'),*/  
    /*url('assets/fonts/chinese/NotoSansCJKsc-Medium.otf'); /* IE9 */
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  font-family: pictos;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
