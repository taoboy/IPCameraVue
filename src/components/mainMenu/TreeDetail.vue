<template>
	<div>
		这是{{currentRoute}}导航详情
	</div>
</template>

<script>
export default {
  name: 'TreeViewDetail',
  data () {
    return {
    	currentRoute: this.$route.path
    }
  },
  methods:{
  },
  watch: {
    //监听路由，只要路由有变化(路径，参数等变化)都有执行下面的函数
    $route: {
      handler: function(val, oldVal) {
        this.currentRoute = val.name;
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
