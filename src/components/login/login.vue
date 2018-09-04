<template>
  <div class="loginDiv">
  	<div class="logo">
  		<img src="~assets/menu/menuLogo.png" alt="" />
  	</div>
  	<div class="params">
  		<div class="input param">
  			<span>用户名</span>
  			<input v-model="UserName" type="text" />
  		</div>
  		<div class="input param">
  			<span>密码</span>
  			<input v-model="Passwd" type="password" />
  		</div>
  		<!--<div class="param">
  			<span class="tipBtn">端口号</span>
  			<select name="">
  				<option value=""></option>
  			</select>
  		</div>-->
  		<div class="param paramSelect">
  			<span class="tipBtn">语言</span>
  			<select name="">
  				<option value="">简体中文</option>
  			</select>
  			<img src="~assets/menu/select.png" alt="" />
  		</div>
  		<div class="btns">
  			<button @click="clickLogin" class="loginBtn">登录</button>
  		</div>
  	</div>
  </div>
</template>

<script>
	import {mapMutations} from 'vuex'
	import {SET_USERNAME,SET_USERPWD} from '../../store/mutation-types.js'
	
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your priview',
      UserName: '',
      Passwd: '',
    }
  },
  methods:{
  	...mapMutations({	//存值
			SET_USERNAME,
			SET_USERPWD
		}),
  	//点击登录
  	clickLogin(){
  		var param = {
  			"Login-Properties":{
					"UserName": this.UserName, 
					"Passwd": this.secretApi.Encrypt(this.Passwd)  
				} 
  		}
  		var sendObj={
			  	"Method" : "Login",
			  	"Page" : "Login",
			  	"Message" : param
			}
  		console.log(JSON.stringify(sendObj));
			this.socketApi.sendSock(sendObj,this.loginResult);
  	},
  	//点击登录回调
  	loginResult(data){
  		if(data["RetCode"] == 0){
  			//存储登录用户名和密码
				this.SET_USERNAME(this.UserName);
  			this.SET_USERPWD(this.Passwd);
  			//获取当前设备是否正在升级中
			  this.getUpgradeRate();
//				this.$router.push({ path: '/preview'});
	    }else{
	    	this.$message.error(data["Message"]);
	    }
  	},
  	//判断是否正在升级中
  	getUpgradeRate(){
  		var _this = this;
  		$.ajax({
				type:"get",
				url:"http://"+this.getPageAddr()+"/device.php?action=getstate",
				async:true,
				cache:false,
				success:function(data){
					//跳转到升级页面
					console.log("获取是否升级失败："+JSON.stringify(data));
					if(data == "yes"){
						//设备未在升级可以正常使用，跳转到预览页面
		    		_this.$router.push({ path: '/preview'});
					}else{
						//no表示设备不可用(升级中),跳转到升级页面
						_this.$router.push({ 
			  			path: '/menu/localService',
				      query: {
				        "state": data
				      }
						});
					}
				},
				error:function(info){
					console.log("获取是否升级失败："+JSON.stringify(info));
					_this.$message.error("获取升级信息失败");
				}
			});
  	}
  },
  mounted: function(){
  	
  },
  created: function(){
  	var _this = this;
  	document.onkeydown = function(e){
  		let key = e.keyCode
	  	if(key == 13){
	  		_this.clickLogin();
	  	}
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/widget.css");
.loginDiv{
	width: 100%;
	height: 100%;
	background: url(~assets/login/loginBG.jpg);
	background-size: 100% 100%;
}
.logo{
	position: absolute;
	left: 3vw;
	top: 3.3vh;
}
.logo img{
	width: 9vw;
}
.params{
	height: 34.4vh;
	position: absolute;
	top: 32.6vh;
	left: 39.4vw;
}
.param{
	margin-bottom: 2.2vh;
	color: #fff;
}
.param span,.param select,button{
	font-size: 1.25vw;
}
.input input,select{
	background: rgba(0,0,0,0.2);
	border: none;
	height: 4.4vh;
	color: #fff;
}
.param .tipBtn{
	display: inline-block;
	width: 6.2vw;
	text-align: center;
	line-height: 4.4vh;
	height: 4.4vh;
	background: rgba(0,0,0,0.2);
	border-radius: 5px;
	margin-right: 0.2vw;
}
.param select{
	width: 13.9vw;
}
.paramSelect{
	position: relative;
}
.paramSelect img{
	width: 0.8vw;
	position: absolute;
	right: 0.8vw;
	top: 0.7vh;
}
.input{
	position: relative;
}
.input span{
	position: absolute;
	left: 0;
	top: 1vh;
	width: 6.2vw;
	text-align: center;
	line-height: 2.4vh;
	height: 2.4vh;
	border-right: 1px solid #fff;
	
}
.input input{
	width: 14.1vw;
	padding-left: 6.5vw;
}
.btns{
	margin-top: 4.4vh;
}
.loginBtn{
	width: 20.8vw;
	height: 4.4vh;
	line-height: 4.4vh;
	text-align: center;
	border: none;
	background: #61A5FF;
	border-radius: 5px;
	color: #fff;
}
</style>
