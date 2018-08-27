<template>
	<div class="mainContent">
		<div class="left_menu lt">
			<div class="menuLogo">
				<img src="~assets/menu/menuLogo.png"/>
			</div>
			<Tree-view></Tree-view>
		</div>
		<div class="right_content rt">
			<div class="content">
				<header class="header">
		  			<div class="h_right rt">
		  				<span @click="toPreview" class="r_view"><i></i>预览</span>
		  				<span class="menu_on"><i></i>主菜单</span>
		  				<span @click="clickWithdraw" class="secede"><i></i>退出</span>
		  			</div>
		  		</header>
		  		<div class="continer">
		            <router-view 
		            	v-on:successAlert="successFun"  
		            	v-on:errorAlert="errorFun"
		            	v-on:testAlert="testFun" 
		            	v-on:warnAlert="warnFun">
		            </router-view>
		  		</div>
			</div>
		</div>
		<!--确认弹框-->
		<div class="shadow" v-show="dialogFlag">
			<div class="dialog2">
				<p class="title">退出登录</p>
				<p class="tips">是否退出登录？</p>
				<div class="btns">
					<button @click="clickSure" class="saveBtn">确定</button>
					<button @click="clickCancel" class="recoverBtn">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TreeView from "./TreeView";

export default {
  name: 'menuHome',
  components: {
  	"Tree-view":TreeView,
  },
  data () {
    return {
    	dialogFlag: false
//  	dialogTitle: "",
//  	dialogTips: ''
    }
  },
  methods:{
  	//点击预览
  	toPreview:function(){
  		this.$router.push({ path: '/preview'})
  	},
  	//点击退出
  	clickWithdraw(){
  		this.$router.push({ path: '/login'});
//		this.dialogFlag = true;
  	},
  	//点击弹框中的取消
  	clickCancel(){
  		this.dialogFlag = false;
  	},
  	//点击弹框中的确定
  	clickSure(){
  		this.dialogFlag = false;
  		this.$router.push({ path: '/login'});
  	},
  	//成功提示框
  	successFun(data){
  		this.$message.success(data);
  	},
  	//失败提示框
  	errorFun(data){
  		this.$message.error(data);
  	},
  	//测试提示框
  	testFun(data){
  		this.$message.success(data);
  	},
  	//警告提示框
  	warnFun(data){
  		this.$message.warning(data);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
.mainContent{
	width: 100%;
	height: 100%;
}
.left_menu{
	width: 16.7%;
	height: 100%;
	background: url(~assets/menu/menuBG.png) no-repeat;
	background-size: 100%;
	background-position: bottom;
}
.right_content{
	width: 80.5%;
	height: 95vh;
	padding: 2.5vh 1.4%;
	background: #F5F5F5;
}
.content{
	width: 100%;
	height: 100%;
	margin: 0 auto;
	background: #fff;
}
.continer{
	height: auto;
}
.menuLogo{
	height: 8.3vh;
	line-height: 8.3vh;
	margin-bottom: 2.2vh;
	background: #252F52;
}
.menuLogo img{
	width: 50%;
	vertical-align: middle;
}
.header{
	height: 6.1vh;
	border-bottom: 2px solid #F5F5F5;
}
.h_left{
	margin-left: 1vw;
	height: 6.1vh;
	line-height: 6.1vh;
}
.h_left img{
	width: 8vw;
	vertical-align: middle;
}
.h_right{
	margin-right: 1vw;
}
.h_right span{
	display: inline-block;
	width: 8.3vw;
	color: #4A4A4A;
	font-size: 1.1vw;
	height: 6.1vh;
	line-height: 6.1vh;
	text-align: center;
}
.h_right span i{
	display: inline-block;
	width: 2vw;
	height: 6.1vh;
	vertical-align: middle;
	margin-right: 0.3vw;
	background-repeat: no-repeat;
	background-size: 65%;
	background-position: center  center;
}
.h_right .r_view_on, .h_right .menu_on{
	background: #E6EFFB;
	height: 5.7vh;
	border-bottom: 0.4vh solid #61A5FF;
}
.h_right .r_view i{
	background-image: url(~assets/preview/yulan.png);
}
.h_right .r_view_on i{
	background-image: url(~assets/preview/yulan_on.png);
}
.h_right .menu i{
	background: url(~assets/preview/caidan.png);
}
.h_right .menu_on i{
	background: url(~assets/preview/caidan_on.png);
	background-repeat: no-repeat;
	background-size: 65%;
	background-position: center  center;
}
.h_right .secede i{
	background: url(~assets/preview/tuichu.png);
	background-repeat: no-repeat;
	background-size: 65%;
	background-position: center  center;
}

</style>
