<template>
  <div class="view">
  	<div class="view_main">
  		<header class="header">
  			<!--puppy logo-->
  			<div class="h_left lt">
  				<img src="~assets/preview/puppyLogo.png" alt="" />
  			</div>
  			<!--右侧菜单栏-->
  			<div class="h_right rt">
  				<span class="r_view_on"><i></i>预览</span>
  				<span class="menu" @click="toMainMenu"><i></i>主菜单</span>
  				<span class="secede" @click="clickWithdraw"><i></i>退出</span>
  			</div>
  		</header>
  		<!--视频显示区域-->
  		<div class="videoContent">
				<p v-if="!isIEBorwser">亲，您的视频插件出现异常，不妨换成Internet Explorer浏览器试试~</p>
				<p v-else-if="!isHavePlug">
					亲，您的视频插件尚未安装，请点击<a :href="plugAddr">下载</a>
					<br />请安装完成后，刷新浏览器重试。
				</p>
				<OBJECT v-show="plug" ID="XgPlayAct" WIDTH="100%" HEIGHT="100%" classid="CLSID:60B238EA-BA74-431F-9F07-F100DFA4BAE3">
			    <PARAM NAME="_Version" VALUE="65536"></PARAM>
			    <PARAM NAME="_ExtentX" VALUE="12806"></PARAM>
			    <PARAM NAME="_ExtentY" VALUE="1747"></PARAM>
			    <PARAM NAME="_StockProps" VALUE="0"></PARAM>
				</OBJECT>
  			<!--<img src="~assets/preview/bofang.png"/>-->
  		</div>
  		<footer class="footer">
  			<!--码流类型选择-->
  			<div class="f_left">
  				<div class="main">
  					<input id="main" type="radio" name="stream" v-model="streamName" value="main">
  					<label for="main">主码流</label> 
  				</div>
  				<div class="sub">
  					<input id="sub" type="radio" name="stream" v-model="streamName" value="sub">
						<label for="sub">子码流</label>
  				</div>
  			</div>
  			<!--视频功能-->
  			<div class="f_right rt">
  				<img src="~assets/preview/jieping.png" alt="" />
  				<img src="~assets/preview/luzhi.png" alt="" />
  				<img src="~assets/preview/yinliang.png" alt="" />
  			</div>
  		</footer>
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
import {mapGetters} from 'vuex'
import {GET_USERNAME,GET_USERPWD} from '../../store/mutation-types.js'
export default {
  name: 'priview',
  data () {
    return {
    	dialogVisible: true,
    	isIEBorwser: false,
    	isHavePlug: false,
    	plug: false,
    	plugAddr: '',
      msg: 'Welcome to Your priview',
      streamName: 'main',
      dialogFlag: false
    }
  },
	computed:{
		...mapGetters({		//取值
				GET_USERNAME,
				GET_USERPWD
		})
	},
  watch:{
  	streamName:function(val){
			this.socketApi.playVideo(val,XgPlayAct,this.GET_USERNAME,this.GET_USERPWD);
  	}
  },
  methods:{
  	//点击主菜单
  	toMainMenu:function(){
  		this.$router.push({ path: '/menu/imageBasic'})  
  	},
  	//点击退出
  	clickWithdraw(){
  		this.stopPlayVideo(XgPlayAct);
  		this.$router.push({ path: '/login'})
//			this.dialogFlag = true;
  	},
  	//点击弹框中的取消
  	clickCancel(){
  		this.dialogFlag = false;
  	},
  	//点击弹框中的确定
  	clickSure(){
  		this.dialogFlag = false;
  		this.$router.push({ path: '/login'})
  	},
  },
  mounted: function(){
  	this.plugAddr = this.loadVideoPlug();
  	if(this.getBrowser() == "IE"){
  		this.isIEBorwser = true;
  	}else{
  		this.isIEBorwser = false;
  	}
  	this.isHavePlug = this.testVideoPlugin();
//	if(this.isHavePlug && this.isIEBorwser){
  		this.plug = true;
			this.socketApi.playVideo("main",XgPlayAct,this.GET_USERNAME,this.GET_USERPWD);
//	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../../assets/css/commonEle.css");
	@import url("../../assets/css/widget.css");
.view{
	width: 97vw;
	height: 95vh;
	padding: 2.5vh 1.5vw;
	background: #F5F5F5;
	overflow: hidden;
}
.view_main{
	width: 100%;
	height: 100%;
	margin: 0 auto;
	background: #fff;
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
.h_right .r_view_on{
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
.videoContent{
	width: 88.9vw;
	height: 80vh;
	border: 1px dotted #333;
	margin: 2.2vh auto 0;
	background: #F5F5F5;
	line-height: 80vh;
	text-align: center;
}
.videoContent img{
	width: 4.8vw;
}
.videoContent p{
	font-size: 1vw;
	margin-top: 35vh;
	line-height: 4vh;
}
.footer{
	height: 7vh;
	line-height: 7vh;
}
.f_left{
	margin-left: 6.9vw;
}
.f_left>div{
	position: relative;
	float: left;
	width: 10vw;
	font-size: 0.97vw;
	color: #4A4A4A;
}
.f_right{
	margin-right: 6.9vw;
}
.f_right img{
	width: 1.5vw;
	vertical-align: middle;
	margin: 0 1vw;
}
.view{
	min-width: 1000px;
}
</style>
