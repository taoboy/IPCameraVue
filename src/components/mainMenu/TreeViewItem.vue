<template>
	<div class="tree-view-item">
		<div v-for="menu in menus">
		  <div v-if="menu.type === 'link'">
		  	<i class="circle" :class="{circle_on: menu.isSelected}"></i>
	        <router-link class="subMenu" :class="{linkSelected: menu.isSelected}" v-bind:to="menu.url" @click.native="toggle(menu)">{{menu.name}}</router-link>
	      </div>
	      <div v-if="menu.type === 'button'">
	      	<div class="mainMenu" :class="{selected: menu.isSelected,expand:menu.isExpanded}" @click="toggle(menu)">
				<img class="iconLeft" :src="menu.iconUrl" alt="" />
				{{menu.name}}
				<img class="iconRight" src="~assets/menu/down.png"/>
	      	</div>
	      	<transition name="fade">
	          <div class="menu-children" v-show="menu.isExpanded" v-if="menu.subMenu">
	            <Tree-view-item :menus='menu.subMenu'></Tree-view-item>
	          </div>
	        </transition>
	      </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'TreeViewItem',
  props: ["menus"],
  data () {
    return {
    }
  },
  created() {
    this.$store.commit("firstInit", { url: this.$route.path });
  },
  methods:{
  	toggle(menu) {
      this.$store.commit("findParents", { menu });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.mainMenu{
	text-align: left;
	width: 16vw;
	height: 4.4vh;
	line-height: 4.4vh;
	margin-bottom: 0.2vh;
	background: #28304E;
	color: #fff;
	font-size: 1.1vw;
	letter-spacing: 1px;
	cursor: pointer;
}
.mainMenu img.iconLeft{
	width: 1.4vw;
	vertical-align: middle;
	margin-left: 2.7vw;
	margin-right: 1.4vw;
}
.mainMenu img.iconRight{
	width: 0.6vw;
	vertical-align: middle;
	margin-left: 2.8vw;
}
.menu-children{
	width: 16vw;
	text-align: left;
	/*display: none;*/
}
.subMenu{
	width: 16vw;
	height: 4.4vh;
	line-height: 4.4vh;
	text-align: left;
	color: #fff;
	font-size: 0.97vw;
}
.menu-children i{
	margin-left: 4.1vw;
	margin-right: 1.5vw;
}
.linkSelected{
	color: #61A5FF;
}
.selected {
  color: #1976d2;
}
.expand {
  display: block;
}
.expand .iconRight {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
/*.link,
.button {
  display: block;
  transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.button {
  position: relative;
}
.link:hover,
.button:hover {
  cursor: pointer;
}
.heading-children {
  overflow: hidden;
}
.collapsed {
  display: none;
}


.fade-enter-active {
  transition: all 0.5s ease 0s;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-to {
  height: 0;
}*/
</style>
