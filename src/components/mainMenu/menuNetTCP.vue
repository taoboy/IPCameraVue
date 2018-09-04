<template>
	<div class="menuDiv2">
		<div class="netType">
			<label for="">网卡类型</label>
			<select v-model="useData.DeviceType" name="">
				<option value="auto">自适应</option>
			</select>
			<!--<input readonly="" type="text" name="" id="" value="自适应" />-->
		</div>	
		<div class="paramSec">
			<input v-model="useData.Dhcp" type="checkbox" id="dhcp" />
			<label for="dhcp">自动获取IP地址</label>
		</div>
		<div>
			<p class="pTitle">手动获取IP地址</p>
			<div class="param">
				<label for="">IPV4地址</label>
				<input :disabled="useData.Dhcp" v-model="useData.Address" type="text" />
				<button :disabled="useData.Dhcp" @click="clickTest" class="testBtn">检测</button>
			</div>
			<div class="param">
				<label for="">子网掩码</label>
				<input :disabled="useData.Dhcp" v-model="useData.Mask" type="text" />
			</div>
			<div class="param">
				<label for="">默认网关</label>
				<input :disabled="useData.Dhcp" v-model="useData.Gateway" type="text" />
			</div>
			<p class="pTitle">DNS服务器配置</p>
			<div class="param">
				<label for="">首选DNS</label>
				<input :disabled="useData.Dhcp" v-model="useData.MainDns" type="text" />
			</div>
			<div class="param">
				<label for="">备选DNS</label>
				<input :disabled="useData.Dhcp" v-model="useData.SubDns" type="text" />
			</div>
		</div>
		<button @click="clickSave" class="saveBtn">保存</button>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
  name: 'netTCP',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.netTCP,
    	oldIP: '',
    	loading: 0			//点击测试的加载框
    }
  },
  methods:{
  	//点击保存
  	clickSave(){
  		/***表单验证start****/
  		if(!this.useData.Dhcp){
			var ip = this.validate.testIPAddr(this.useData.Address);
			if(ip){
				this.$emit("warnAlert",ip);
				return;
			}
			var mask = this.validate.mask(this.useData.Mask);
			if(mask){
				this.$emit("warnAlert",mask);
				return;
			}
			var gate = this.validate.gateway(this.useData.Gateway);
			if(gate){
				this.$emit("warnAlert",gate);
				return;
			}
			var firstDns = this.validate.firstDns(this.useData.MainDns);
			if(firstDns){
				this.$emit("warnAlert",firstDns);
				return;
			}
  		}
		/***表单验证end****/
  		this.transJsondata(this.useData);
  		this.msgData["LAN-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "NetworkLAN",
		  	"Message" : this.msgData
		}
		if(this.oldIP != this.useData.Address){
  			this.$emit("successAlert","IP地址变更，请输入变更后的IP地址登陆");
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
  	//点击检测
  	clickTest(){
  		this.loading = this.$loading({
		  lock: true,
		  text: '检测中',
		  spinner: 'el-icon-loading',
		  background: 'rgba(0, 0, 0, 0.7)'
		});
  		this.transJsondata(this.useData);
  		this.msgData["LAN-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "TestConfig",
		  	"Page" : "NetworkLAN",
		  	"Message" : this.msgData
		}
		console.log("发送测试数据："+JSON.stringify(this.msgData));
		this.socketApi.sendSock(sendObj,this.testConfigResult);
  	},
  	//设置参数-回调函数
  	testConfigResult(data){
  		this.loading.close();
  		if(data["RetCode"] == 0){
        	this.$emit("testAlert","检测成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["LAN-Properties"];
    		this.oldIP = this.useData.Address;
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "NetworkLAN"
    }
  	this.socketApi.sendSock(agentData,this.getConfigResult);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.param{
	margin-left: 2.7vw;
	margin-bottom: 2.2vh;
}
.netType{
	margin-bottom: 2.2vh;
	font-size: 1.1vw;
}
.netType select{
	margin-left: 3.7vw;
}
.param label{
	display: inline-block;
	width: 5.2vw;
	text-align: left;
	font-size: 1.1vw;
}
.pTitle{
	font-size: 1.1vw;
	margin: 2vw 0 1vw;
	font-weight: 600;
}
.saveBtn{
	position: absolute;
	left: 0;
	top: 71.4vh;
}
.paramSec label{
	margin-left: 0;
	text-align: left;
}
</style>
