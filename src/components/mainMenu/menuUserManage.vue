<template>
	<div class="menuDiv">
		<div class="users">
			<ul class="title">
				<li>编号</li>
				<li>用户名</li>
				<li>用户类型</li>
				<li>操作</li>
			</ul>
			<!--<ul>
				<li>1</li>
				<li>啦啦啦啦</li>
				<li>超级管理员</li>
				<li>
					<button @click="clickCreate" class="operateBtn">创建</button>
					<button class="operateBtn update">修改</button>
					<button class="operateBtn">删除</button>
				</li>
			</ul>-->
			<ul class="content" v-for="(item,index) in useData.Users">
				<li>{{index+1}}</li>
				<li>{{item.UserName}}</li>
				<li>{{item.UserType | transUserType}}</li>
				<li>
					<button @click="clickCreate(item)" :disabled="curUserType!='super'" class="operateBtn">创建</button>
					<button @click="clickUpdate(item)" class="operateBtn update">修改</button>
					<button @click="clickDelete(item)" :disabled="curUserType!='super' && curUserType!='admin'" class="operateBtn">删除</button>
				</li>
			</ul>
		</div>
		<!--创建用户弹框-->
		<div class="shadow" v-show="showDialog">
			<div class="dialog">
				<p>创建用户</p>
				<div class="params">
					<div class="param">
						<label for="">用户名</label>
						<input v-model="userName" type="text" name="" value="" />
					</div>
					<div class="param">
						<label for="">用户类型</label>
						<select v-model="userType" name="">
							<option value="operator">操作员</option>
							<option value="admin">管理员</option>
						</select>
					</div>
					<div class="param">
						<label for="">密码</label>
						<input v-model="pwd" type="password" name="" value="" />
					</div>
					<div class="param">
						<label for="">确认密码</label>
						<input v-model="confirmPwd" type="password" name="" value="" />
					</div>
				</div>
				<button @click="clickSaveUser" class="saveBtn">保存</button>
				<button @click="cancelSave" class="recoverBtn recoverBtn2">取消</button>
			</div>
		</div>
		<!--修改用户弹框-->
		<div class="shadow" v-show="showDialog2">
			<div class="dialog dialog2">
				<p>修改用户</p>
				<div class="params">
					<div class="param">
						<label for="">用户名</label>
						<input :readonly="updateFlag" v-model="updataName" type="text" name="" value="" />
					</div>
					<div class="param">
						<label for="">用户类型</label>
						<select :disabled="updateFlag" v-model="updateType" name="">
							<option value="operator">操作员</option>
							<option value="admin">管理员</option>
							<option v-show="superFlag" value="super">超级管理员</option>
						</select>
					</div>
					<div class="param">
						<label for="">旧密码</label>
						<input v-model="updatePwd" type="password" name="" value="" />
					</div>
					<div class="param">
						<label for="">新密码</label>
						<input v-model="updataNewPwd" type="password" name="" value="" />
					</div>
					<div class="param">
						<label for="">确认密码</label>
						<input v-model="updataConPwd" type="password" name="" value="" />
					</div>
				</div>
				<button @click="clickUpdateUser" class="saveBtn">保存</button>
				<button @click="cancelUpdate" class="recoverBtn recoverBtn2">取消</button>
			</div>
		</div>
		<!--删除用户弹框-->
		<div class="shadow" v-show="showDialog3">
			<div class="dialog2 dialog3">
				<p class="title">提示</p>
				<p class="tips">是否删除用户？</p>
				<div class="btns">
					<button @click="sureDelete" class="saveBtn">确定</button>
					<button @click="cancelDelete" class="recoverBtn">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'userManage',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.users,
    	curUserType: '',		//当前登录用户的类型
		// 弹框
    	showDialog: false,		//创建用户弹框
    	showDialog2: false,		//修改用户弹框
    	showDialog3: false,		//删除用户弹框
    	//创建用户字段
    	userName: '',		//用户名
    	userType: '',		//用户类型
    	pwd: '',			//密码
    	confirmPwd: '',		//确认密码
    	//修改用户字段
    	updataName: '',		//用户名(用于修改功能)
    	updateType: '',		//用户类型(用于修改功能)
    	updatePwd: '',		//密码(用于修改功能)
    	updataConPwd: '',	//确认密码(用于修改功能)
		updataNewPwd: '',	//新密码(用于修改功能)
		updateFlag: false,	//是否设置为disabled,同一等级的用户不能修改名字、类型
		operateUser: '',		//当前操作的用户信息
		superFlag: false	//下拉框中是否显示超级管理员
    }
  },
  computed: {
  },
  methods:{
  	//点击创建用户
  	clickCreate(data){
  		this.clearUserParam();
  		this.showDialog = true;
  	},
  	//点击修改
  	clickUpdate(item){
  		this.operateUser = item;
  		this.clearUpdateParam();
  		if(item.UserType == "super"){
  			this.superFlag = true;
  		}else{
  			this.superFlag = false;
  		}
  		if(this.curUserType == "operator"){
			//操作员不能修改其他用户
  			if(!item.Current){
				this.$emit("errorAlert","很抱歉，您没有修改权限");
	  			return;
  			}
  		}else if(this.curUserType == "admin"){
  			//管理员可以修改自身或者操作员
  			if(item.UserType != "operator" && !item.Current){
  				this.$emit("errorAlert","很抱歉，您没有修改权限");
  				return;
  			}
  		}
  		if(this.curUserType == "operator"){
  			//操作员不能修改用户名
			this.updateFlag = true;
  		}else if(this.curUserType == "admin"){
  			//管理员可以修改操作员的用户名
  			if(item.UserType == "operator"){
  				this.updateFlag = false;
  			}else{
  				this.updateFlag = true;
  			}
  		}else if(this.curUserType == "super"){
  			//超级管理员可以修改，管理员和操作员的用户名
  			if(item.UserType == "super"){
  				this.updateFlag = true;
  			}else{
  				this.updateFlag = false;
  			}
  		}
  		
  		this.clearUpdateParam();
  		this.showDialog2 = true;
  		this.updataName = item.UserName;
  		this.updateType = item.UserType;
  	},
  	//点击删除
  	clickDelete(item){
  		if(item.UserType == "super"){
  			this.$emit("errorAlert","很抱歉，超级管理员无法删除");
  			return;
  		}
  		if(this.curUserType == "operator"){
  			//操作员不能删除用户
			this.$emit("errorAlert","很抱歉，您没有删除权限");
  			return;
  		}else if(this.curUserType == "admin"){
  			//管理员可以修改操作员的用户名
  			if(item.UserType != "operator"){
  				this.$emit("errorAlert","很抱歉，您没有删除权限");
  				return;
  			}
  		}
  		this.operateUser = item;
  		this.showDialog3 = true;
  	},
  	//点击保存---创建用户时保存
  	clickSaveUser(){
  		if(this.pwd != this.confirmPwd) {
  			this.$emit("errorAlert","两次输入密码不一致，请重新输入");
  			return;
  		}
  		var param = {
  			"UserAdd-Properties":{
				"UserName": this.userName, 
				"Password": this.secretApi.Encrypt(this.pwd),
				"UserType": this.userType
			} 
  		}
  		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "UserAdd",
		  	"Message" : param
		}
  		console.log(JSON.stringify(sendObj));
		this.socketApi.sendSock(sendObj,this.saveUserResult);
  	},
  	//保存用户-回调
  	saveUserResult(data){
  		this.showDialog = false;
  		if(data["RetCode"] == 0){
    		this.$emit("successAlert","保存成功");
    		this.getAllUserInfo();
        }else{
        	this.$emit("errorAlert","创建用户失败"+data["Message"]);
        }
  	},
  	//取消修改用户
  	cancelSave(){
  		this.showDialog = false;
  	},
  	//点击保存---修改用户时保存
  	clickUpdateUser(){
  		if(this.updatePwd){
  			if(this.secretApi.Encrypt(this.updatePwd) != this.operateUser.Password){
  				this.$emit("errorAlert","原始密码输入有误，请重新输入");
  				return;
  			}
  		}
  		if(this.updataConPwd != this.updataNewPwd) {
  			this.$emit("errorAlert","两次输入密码不一致，请重新输入");
  			return;
  		}
  		var obj = {
  			"OldName": this.operateUser.UserName, 
			"NewName": this.updataName,
			"OldUserType": this.operateUser.UserType,
			"NewUserType": this.updateType,
			"OldPasswd": this.operateUser.Password,
			"NewPasswd": this.secretApi.Encrypt(this.updataNewPwd)
  		}
  		if(!obj["NewName"]){
  			obj["NewName"] = this.operateUser.UserName;
  		}
  		if(!obj["NewUserType"]){
  			obj["NewUserType"] = this.operateUser.UserType;
  		}
  		if(!obj["NewPasswd"]){
  			obj["NewPasswd"] = this.operateUser.Password;
  		}
  		var param = {
  			"UserModify-Properties": obj
  		}
  		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "UserModify",
		  	"Message" : param
		}
  		console.log("修改用户信息："+JSON.stringify(sendObj));
		this.socketApi.sendSock(sendObj,this.updateUserResult);
  	},
  	//修改用户-回调
  	updateUserResult(data){
  		this.showDialog2 = false;
  		if(data["RetCode"] == 0){
    		this.$emit("successAlert","保存成功");
    		this.getAllUserInfo();
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//取消修改用户
  	cancelUpdate(){
  		this.showDialog2 = false;
  	},
  	//删除用户-确定
  	sureDelete(){
  		var param = {
  			"UserDelete-Properties":{
				"UserName": this.operateUser.UserName
			} 
  		};
  		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "UserDelete",
		  	"Message" : param
		}
  		console.log("删除用户："+JSON.stringify(sendObj));
		this.socketApi.sendSock(sendObj,this.delUserResult);
  	},
  	//确定删除用户-回调
  	delUserResult(data){
  		this.showDialog3 = false;
  		if(data["RetCode"] == 0){
    		this.$emit("successAlert","删除成功");
    		this.getAllUserInfo();
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//删除用户-取消
  	cancelDelete(){
  		this.showDialog3 = false;
  	},
  	//获取用户信息-回调
  	getConfigResult(data){
  		console.log(JSON.stringify(data));
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["UsersInfo-Properties"];
    		this.getCurUserType();
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//获取所有用户信息
  	getAllUserInfo(){
  		const agentData = {
		  	"Method" : "GetConfig",
			"Page" : "UserManage"
	    }
	  	this.socketApi.sendSock(agentData,this.getConfigResult);
  	},
  	//获取当前用户的用户类型
  	getCurUserType(){
  		var _this = this;
  		this.useData.Users.forEach(function(item){
  			if(item.Current){
  				_this.curUserType = item.UserType;
  				return;
  			}
  		})
  	},
  	//清空创建用户字段
  	clearUserParam(){
  		this.userName = '';
  		this.userType = '';	
  		this.pwd = '';	
  		this.confirmPwd = '';	
  	},
  	//清空修改用户字段
  	clearUpdateParam(){
  		this.updataName = '';
  		this.updateType = '';	
  		this.updatePwd = '';	
  		this.updataConPwd = '';	
  		this.updataNewPwd = '';	
  	},
  },
  mounted: function(){
  	this.getAllUserInfo();
  },
  filters: {
	transUserType: function (value) {
		if(value == "super"){
			return "超级管理员";
		}else if(value == "admin"){
			return "管理员";
		}else if(value == "operator"){
			return "操作员";
		}
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.menuDiv{
	margin-left: 10.4vw;
}
.users{
	width: auto;
	height: auto;
	font-size: 0.97vw;
}
.users .title{
	font-size:1.1vw;
}
.users .content{
	font-size:0.97vw;
}
ul{
	overflow: hidden;
}
.users ul:nth-child(odd) li{
	background: #E6EFFB;
}
ul li{
	float: left;
	width: 10.4vw;
	height: 6.6vh;
	line-height: 6.6vh;
	border-right: 1px solid #999999;
	color: #4A4A4A;
}
.users ul:first-child li{
	height: 4.4vh;
	line-height: 4.4vh;
	border-top: 1px solid #999999;
}
.users ul:last-child li{
	border-bottom: 1px solid #999999;
}
ul li:last-child{
	width: 25vw;
}
ul li:first-child{
	border-left: 1px solid #999999;
}
ul li button.update{
	margin: 0 2.7vw;
}
/*创建用户的弹框*/
.shadow{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(230,239,251,0.5);
}
.dialog{
	width: 33vw;
	height: 42.4vh;
	background: #fff;
	position: absolute;
	left: 33.4vw;
	top: 28.8vh;
	text-align: left;
}
.dialog2{
	height: 45.5vh;
}
.dialog3{
	height: 25.5vh;
}
.dialog p,.dialog .params,.dialog .saveBtn{
	margin-left: 2.7vw;
}
.dialog p {
	margin-top: 4.4vh;
	font-size: 1.1vw;
	font-weight: bold;
}
.dialog .param label{
	display: inline-block;
	width: 4vw;
	text-align: right;
	font-size: 0.9vw;
	margin-right: 2.7vw;
}
.dialog .params{
	margin-top: 2.2vh;
	margin-bottom: 4.4vh;
}
.dialog .param{
	margin-bottom: 2.2vh;
}
.saveBtn{
	border-radius: 5px;
}
.recoverBtn2{
	border-radius: 5px;
	margin-left: 5vw;
}
</style>
