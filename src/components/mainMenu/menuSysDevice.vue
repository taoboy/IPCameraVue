<template>
	<div class="menuDiv">
		<div class="param">
			<span class="p_left">设备名称</span>
			<span class="p_right">{{useData.DevName}}</span>
		</div>
		<div class="param">
			<span class="p_left">设备型号</span>
			<span class="p_right">{{useData.DevModel}}</span>
		</div>
		<div class="param">
			<span class="p_left">序列号</span>
			<span class="p_right">{{useData.DevSN}}</span>
		</div>
		<div class="param">
			<span class="p_left">MAC地址</span>
			<span class="p_right">{{useData.DevMAC}}</span>
		</div>
		<div class="param">
			<span class="p_left">硬件版本</span>
			<span class="p_right">{{useData.DevHW}}</span>
		</div>
		<div class="param">
			<span class="p_left">软件版本</span>
			<span class="p_right">{{useData.DevFW}}</span>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sysDevice',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.sysDevice
    }
  },
  computed: {
  },
  methods:{
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Device-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "DevInfo"
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
	margin-left: 7.6vw;
	margin-bottom: 4.4vh;
	text-align: left;
	overflow: hidden;
}
.param span{
	float: left;
	background: #E6EFFB;
	border-radius: 5px;
	height: 4.4vh;
	line-height: 4.4vh;
	font-size: 1.1vw;
}
.param span.p_left{
	width: 6.9vw;
	font-weight: bold;
	text-align: center;
	margin-right: 0.7vw;
}
.param span.p_right{
	width: 19.8vw;
	text-align: left;
	padding-left: 1vw;
}
</style>
