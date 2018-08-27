<template>
	<div class="params">
		<div class="paramSec">
			<input v-model="useData.Enable" type="checkbox" name="" id="ddns" value="" />
			<label for="ddns">启用UPNP</label>
		</div>
		<div class="upnpMain" v-show="useData.Enable">
			<div class="param">
				<label for="">别名</label>
				<input v-model="useData.NickName" type="text" name="" id="" value="" />
			</div>
			<div class="param">
				<label for="">端口映射方式</label>
				<select @change="changeUpnpType" v-model="useData.MapType" name="">
					<option value="auto">自动</option>
					<option value="manual">手动</option>
				</select>
			</div>
			<div class="detail">
				<ul>
					<li>端口类型</li>
					<li>外部端口</li>
					<li>外部IP地址</li>
					<li>内部端口</li>
					<li>状态</li>
				</ul>
				<ul v-for="item in useData.PortMap">
					<li>{{item.Type | getTypeName}}</li>
					<li><input :readonly="isInput" type="tel" v-model="item.Mapped" /></li>
					<li>0.0.0.0</li>
					<li>{{item.Inner}}</li>
					<li>{{item.Status==true? "生效" : "未生效"}}</li>
				</ul>
			</div>
		</div>
		
		<div>
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'netPortShine',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.netUpnp,	//页面上显示的数据，包括发送的数据
    	upnpData: this.CONFIGS.netUpnp,	//保持原有的数据
    	isInput: false,		//输入框是否可以输入，在手动的时候可以输入
    	portData: {}
    }
  },
  computed: {
  },
  methods:{
  	//点击切换端口映射类型
  	changeUpnpType(event){
  		if(event.target.value == "auto"){
  			//自动-外部端口和内部端口一样，和端口设置一样
  			this.isInput = true;
  			this.useData.PortMap.forEach(function(item){
				item.Mapped = item.Inner;
			})
  		}else if(event.target.value == "manual"){
  			//手动，外部端口可修改
  			this.isInput = false;
  			for(var i=0;i<this.useData.PortMap.length;i++){
    			if(this.useData.PortMap[i].Type == "http"){
    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
    			}else if(this.useData.PortMap[i].Type == "rtsp"){
    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
    			}else if(this.useData.PortMap[i].Type == "https"){
    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
    			}else if(this.useData.PortMap[i].Type == "service"){
    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
    			}
    		}
  		}
  	},
  	//点击保存
  	clickSave(){
  		this.transJsondata(this.useData);
  		this.msgData["Upnp-Properties"] = this.useData
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "NetworkUpnp",
		  	"Message" : this.msgData
		}
		console.log("发送数据："+JSON.stringify(this.msgData));
		this.socketApi.sendSock(sendObj,this.setConfigResult);
  	},
  	//设置参数-回调函数
  	setConfigResult(data){
  		if(data["RetCode"] == 0){
  			this.$message.success("保存成功");
        	this.upnpData = this.msgData["Upnp-Properties"];
        }else{
        	this.$message.error(data["Message"]);
        }
  	},
  	getConfigResult(data){
  		console.log(JSON.stringify(data));
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Upnp-Properties"];
    		this.upnpData = this.msgData["Upnp-Properties"];
    		for(var i=0;i<this.useData.PortMap.length;i++){
    			if(this.useData.PortMap[i].Type == "http"){
    				this.useData.PortMap[i].Inner = this.portData.Http;
    			}else if(this.useData.PortMap[i].Type == "rtsp"){
    				this.useData.PortMap[i].Inner = this.portData.Rtsp;
    			}else if(this.useData.PortMap[i].Type == "https"){
    				this.useData.PortMap[i].Inner = this.portData.Https;
    			}else if(this.useData.PortMap[i].Type == "service"){
    				this.useData.PortMap[i].Inner = this.portData.Service;
    			}
    		}
    		if(this.useData.MapType == "auto"){
    			this.isInput = true;
    			this.useData.PortMap.forEach(function(item){
    				item.Mapped = item.Inner;
    			})
    		}else if(this.useData.MapType == "manual"){
    			this.isInput = false;
    			for(var i=0;i<this.useData.PortMap.length;i++){
	    			if(this.useData.PortMap[i].Type == "http"){
	    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
	    			}else if(this.useData.PortMap[i].Type == "rtsp"){
	    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
	    			}else if(this.useData.PortMap[i].Type == "https"){
	    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
	    			}else if(this.useData.PortMap[i].Type == "service"){
	    				this.useData.PortMap[i].Mapped = this.upnpData.PortMap[i].Mapped;
	    			}
	    		}
    		}
        }else{
        	this.$message.error(data["Message"]);
        }
  	},
  	//获取端口配置
  	getPortData(){
  		const agentData = {
		  	"Method" : "GetConfig",
			"Page" : "NetworkPort"
	    }
	  	this.socketApi.sendSock(agentData,this.getPortDataResult);
  	},
  	//获取端口配置-回调
  	getPortDataResult(data){
  		if(data["RetCode"] == 0){
    		var tempData = JSON.parse(data["Message"]);
    		this.portData = tempData["Port-Properties"];
        }else{
        	this.$message.error("获取端口失败");
        }
  		this.getUpnpData();
  	},
  	getUpnpData(){
  		const agentData = {
		  	"Method" : "GetConfig",
			"Page" : "NetworkUpnp"
	    }
	  	this.socketApi.sendSock(agentData,this.getConfigResult);
  	}
  },
  mounted: function(){
  	this.getPortData();
  	
  },
  filters: {
	getTypeName: function (type) {
	  	var typeName = "";
	  	switch(type){
	  		case "http":{typeName = "HTTP";}break;
	  		case "rtsp":{typeName = "RTSP";}break;
	  		case "https":{typeName = "HTTPS";}break;
	  		case "service":{typeName = "服务端口";}break;
	  		default : {typeName = "";}
	  	}
	  	return typeName;
	}
	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.params{
	margin-top: 4.4vh;
	text-align: left;
	margin-left: 0;
}
.param{
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 7vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.paramSec{
	margin-bottom: 2.2vh;
	font-size: 1.1vw;
}
.detail{
	border-left: 1px solid #D3D9E2;;
}
.detail ul{
	overflow: hidden;
}
.detail ul li{
	float: left;
	width: 10.4vw;
	height: 4.4vh;
	line-height: 4.4vh;
	font-size: 0.97vw;
	text-align: center;
	border-right: 1px solid #D3D9E2;
}
.detail ul:nth-child(odd) li{
	background:#E6EFFB ;
}
.detail ul:first-child li{
	border-top: 1px solid #D3D9E2;
}
.detail ul:last-child li{
	border-bottom: 1px solid #D3D9E2;
}
.detail input{
	width: 10.4vw;
	border: none;
	background: none;
	text-align: center;
	padding: 0;
}
.saveBtn{
	position: absolute;
	left: 0;
	top: 71.4vh;
}
</style>
