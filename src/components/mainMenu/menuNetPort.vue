<template>
	<div class="menuDiv2">
		<button
		    v-for="tab in tabs"
		    v-bind:class="['tab-button', { active: currentTab === tab.tabName }]"
		    v-on:click="currentTab = tab.tabName"
		  >{{ tab.name }}</button>
		
		  <component
		    v-bind:is="currentTabComponent"
		    class="tab"
		  >
		  </component>
	</div>
</template>

<script>
import portCur from "./menuNetPortCur";
import portShine from "./menuNetPortShine";
	
export default {
  name: 'netPort',
  components: {
  	"tab-port": portCur,
  	"tab-portShine": portShine
  },
  data () {
    return {
    	currentTab: 'port',
    	tabs: [{"name":"端口","tabName":"port"}, {"name":'端口映射',"tabName":"portShine"}]
    }
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.tab-button {
	width: 8.3vw;
	height: 4.4vh;
	line-height: 4.4vh;
	text-align: center;
  	cursor: pointer;
  	border: 1px solid #509EFE;
  	color: #509EFE;
 	background: #fff;
 	font-size: 1.1vw;
}
.tab-button.active {
  background: #509EFE;
  color: #fff;
}
</style>
