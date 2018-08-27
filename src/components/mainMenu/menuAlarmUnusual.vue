<template>
	<div class="menuDiv2">
		<div class="param">
			<ul class="unusual">
				<li>异常类型</li>
				<li>
					<input v-model="alarmSet.NetDisconnect.Enable" id="netDiscon" type="checkbox" name="" value="" />
					<label for="netDiscon">网络断开</label>
				</li>
				<li>
					<input v-model="alarmSet.IpCollision.Enable" id="ipCol" type="checkbox" name="" value="" />
					<label for="ipCol">IP地址冲突</label>
				</li>
				<li>
					<input v-model="alarmSet.IllegalAccess.Enable" id="illegal" type="checkbox" name="" value="" />
					<label for="illegal">非法访问</label>
				</li>
			</ul>
		</div>
		<div class="param">
			<div>常规联动</div>
			<div>
				<input v-model="alarmSet.NetDisconnect.Linkage.Alarmout" id="touch1" type="checkbox" name="" value="" />
				<label for="touch1">触发报警</label>
			</div>
			<div>
				<input v-model="alarmSet.IpCollision.Linkage.Alarmout" id="touch2" type="checkbox" name="" value="" />
				<label for="touch2">触发报警</label>
			</div>
			<div>
				<input v-model="alarmSet.IllegalAccess.Linkage.Alarmout" id="touch3" type="checkbox" name="" value="" />
				<label for="touch3">触发报警</label>
				<input v-model="alarmSet.IllegalAccess.Linkage.SendFtp" id="sendFtp" type="checkbox" name="" value="" />
				<label for="sendFtp">上传FTP</label>	
			</div>
		</div>
		<div>
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'alarmUnusual',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.alarmUnusual,
    	alarmSet: {
    		"NetDisconnect": {
    			"Enable" : true,
    			"Linkage": {
    				"Alarmout": false
    			}
    		},
    		"IpCollision": {
    			"Enable" : false,
    			"Linkage": {
    				"Alarmout": false
    			}
    		},
    		"IllegalAccess": {
    			"Enable" : false,
    			"Linkage": {
    				"Alarmout": false,
    				"SendFtp": false,
    			}
    		},
    	}
    }
  },
  computed: {
  	
  },
  methods:{
  	//点击保存
  	clickSave(){
  		console.log("自己的数据："+JSON.stringify(this.alarmSet));
  		var _this = this;
  		this.useData.forEach(function(item,index){
  			if(item.Type == "NetDisconnect"){
  				item.Enable = _this.alarmSet.NetDisconnect.Enable
  			}else if(item.Type == "IpCollision"){
  				item.Enable = _this.alarmSet.IpCollision.Enable;
  			}else if(item.Type == "IllegalAccess"){
  				item.Enable = _this.alarmSet.IllegalAccess.Enable;
  			}
  			for(var i=0;i<item.Linkage.length;i++){
  				if(item.Type == "NetDisconnect" && item.Linkage[i].Type == "Alarmout"){
  					item.Linkage[i].Enable = _this.alarmSet.NetDisconnect.Linkage.Alarmout;
  				}else if(item.Type == "IpCollision" && item.Linkage[i].Type == "Alarmout"){
  					item.Linkage[i].Enable = _this.alarmSet.IpCollision.Linkage.Alarmout ;
  				}else if(item.Type == "IllegalAccess" && item.Linkage[i].Type == "Alarmout"){
  					item.Linkage[i].Enable = _this.alarmSet.IllegalAccess.Linkage.Alarmout;
  				}else if(item.Type == "IllegalAccess" && item.Linkage[i].Type == "SendFtp"){
  					item.Linkage[i].Enable = _this.alarmSet.IllegalAccess.Linkage.SendFtp ;
  				}
  			}
  		})
		this.transJsondata(this.useData);
		this.msgData["Abnormal-Properties"]["AlarmSets"] = this.useData
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "AbnormalDet",
		  	"Message" : this.msgData
		}
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
  	//转换返回过来的数据
  	transResponseData(data){
  		var _this = this;
  		data.forEach(function(item,index){
  			console.log(item);
  			if(item.Type == "NetDisconnect"){
  				_this.alarmSet.NetDisconnect.Enable = item.Enable;
  			}else if(item.Type == "IpCollision"){
  				_this.alarmSet.IpCollision.Enable = item.Enable;
  			}else if(item.Type == "IllegalAccess"){
  				_this.alarmSet.IllegalAccess.Enable = item.Enable;
  			}
  			for(var i=0;i<item.Linkage.length;i++){
  				if(item.Type == "NetDisconnect" && item.Linkage[i].Type == "Alarmout"){
  					_this.alarmSet.NetDisconnect.Linkage.Alarmout = item.Linkage[i].Enable;
  				}else if(item.Type == "IpCollision" && item.Linkage[i].Type == "Alarmout"){
  					_this.alarmSet.IpCollision.Linkage.Alarmout = item.Linkage[i].Enable;
  				}else if(item.Type == "IllegalAccess" && item.Linkage[i].Type == "Alarmout"){
  					_this.alarmSet.IllegalAccess.Linkage.Alarmout = item.Linkage[i].Enable;
  				}else if(item.Type == "IllegalAccess" && item.Linkage[i].Type == "SendFtp"){
  					_this.alarmSet.IllegalAccess.Linkage.SendFtp = item.Linkage[i].Enable;
  				}
  			}
  		})
  	},
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Abnormal-Properties"]["AlarmSets"];
    		this.transResponseData(this.useData);
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "AbnormalDet"
    }
  	this.socketApi.sendSock(agentData,this.getConfigResult);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.param label{
	display: inline-block;
	width: 8.3vw;
	text-align: left;
	font-size: 0.97vw;
}
.param p{
	font-size:1.1vw;
	color: #4A4A4A;
	font-weight: bold;
}
.unusual{
	height: 4.4vh;
	line-height: 4.4vh;
}
.param ul{
	overflow: hidden;
}
.param ul li{
	float: left;
	font-size: 1.1vw;
	color: #4A4A4A;
	width: 10.4vw;
	text-align: center;
	border: 1px solid #CDCDCD;
	border-left: none;
	height: 100%;
}
.param ul li:first-child{
	border-left: 1px solid #CDCDCD;	
	background: #E6EFFB;
}
.saveBtn{
	position: absolute;
	left: 0;
	top: 72vh;
}

.param>div{
	float: left;
	width: 10.4vw;
	border: 1px solid #CDCDCD;
	border-left: none;
	height: 11.2vh;
	text-align: center;
	font-size: 1.1vw;
	color: #4A4A4A;
}
.param>div:not(:last-child){
	line-height: 11.2vh;
}
.param>div:first-child{
	border-left: 1px solid #CDCDCD;
	background: #E6EFFB;
}
.param>div:last-child label{
	margin-top: 2.5vh;
}
</style>
