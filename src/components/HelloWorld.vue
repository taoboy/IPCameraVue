<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>这是参数id {{$route.params.id}}</div>
    <router-view></router-view>
    <!-- app.vue中的<router-view>是最顶层的出口，渲染最高级路由匹配到的组件 -->
    <!-- 一个被渲染组件同样可以包含自己的嵌套<router-view> -->
    <!-- 要在嵌套的出口中渲染组件，需要在VueRouter的参数中使用children配置 -->
    <!-- 要在嵌套的出口中渲染组件，需要在VueRouter的参数中使用children配置 -->
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
