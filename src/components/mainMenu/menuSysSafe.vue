<template>
	<div class="menuDiv">
		<div class="param">
			<label for="">RTSP认证</label>
			<select v-model="useData.RtspAuth" name="">
				<option value="basic">Basic</option>
				<option value="none">禁用</option>
			</select>
		</div>
		<div class="btns">
			<button @click="clickSave" class="saveBtn">提交</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sysSafe',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.sysSafe,
    }
  },
  computed: {
  },
  methods:{
  	//点击保存
  	clickSave(){
  		this.msgData["Security-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "SafetySet",
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
  	//获取参数-回调
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Security-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "SafetySet"
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
	text-align: left;
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 12vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.btns{
	margin-left: 7.6vw;
	margin-top: 63.9vh;
	text-align: left;
}
</style>
