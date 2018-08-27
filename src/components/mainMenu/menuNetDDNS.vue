<template>
	<div class="menuDiv2">
		<div class="enable">
			<input v-model="useData.Enable" type="checkbox" name="" id="ddns" value="" />
			<label for="ddns">启用DDNS</label>
		</div>
		<div class="params" v-show="useData.Enable">
			<div class="param">
				<label for="">DDNS类型</label>
				<select v-model="useData.Type" name="">
					<option value="DYNDNS">DynDNS</option>
					<option value="NOIP">NO-IP</option>
				</select>
			</div>
			<!--<div class="param">
				<label for="">服务器地址</label>
				<input type="text" />
			</div>-->
			<div class="param">
				<label for="">设备域名</label>
				<input v-model="useData.Alias" type="text" />
			</div>
			<!--<div class="param">
				<label for="">端口</label>
				<input type="text" />
			</div>-->
			<div class="param">
				<label for="">用户名</label>
				<input v-model="useData.User" type="text" />
			</div>
			<div class="param">
				<label for="">密码</label>
				<input v-model="useData.Pwd" type="password" />
			</div>
		</div>
		<div>
			<button @click="saveDdns" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'netDDNS',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.netDDNS,
    }
  },
  methods:{
  	//保存DDNS
  	saveDdns(){
  		this.transJsondata(this.useData);
  		this.msgData["Ddns-Properties"] = this.useData
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "NetworkDDNS",
		  	"Message" : this.msgData
		}
		console.log("发送数据："+JSON.stringify(this.msgData));
		this.socketApi.sendSock(sendObj,this.setConfigResult);
  	},
  	//设置参数-回调函数
  	setConfigResult(data){
  		if(data["RetCode"] == 0){
        	this.$emit("successAlert","保存成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	getConfigResult(data){
  		console.log(JSON.stringify(data));
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Ddns-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "NetworkDDNS"
    }
  	this.socketApi.sendSock(agentData,this.getConfigResult);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.enable{
	margin-left: 1vw;
	margin-bottom: 2.2vh;
	font-size: 1.1vw;
}
/*.params{
	margin-left: 2.7vw;
}*/
.param{
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 6.2vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.saveBtn{
	position: absolute;
	left: 0;
	top: 71.4vh;
}
</style>
