<template>
	<div class="menuDiv2">
		<div class="param">
			<label for="">波特率</label>
			<select v-model.number="useData.BaudRate" name="">
				<option value="1200">1200bps</option>
				<option value="2400">2400bps</option>
				<option value="4800">4800bps</option>
				<option value="9600">9600bps</option>
				<option value="19200">19200bps</option>
				<option value="38400">38400bps</option>
			</select>
		</div>
		<!--<div class="param">
			<label for="">传输方式</label>
			<select name="">
				<option value="">异步串行</option>
				<option value="">半双工</option>
			</select>
		</div>-->
		<div class="param">
			<label for="">数据位</label>
			<input v-model.number="useData.DataBit" type="text" name="" value="" />
		</div>
		<div class="param">
			<label for="">停止位</label>
			<input v-model.number="useData.StopBit" type="text" name="" value="" />
		</div>
		<div class="param">
			<label for="">校验</label>
			<select v-model="useData.Parity" name="">
				<option value="none">无校验</option>
				<option value="odd">奇校验</option>
				<option value="even">偶校验</option>
			</select>
		</div>
		<div class="param">
			<label for="">流控</label>
			<select v-model="useData.FlowCtrl" name="">
				<option value="false">无</option>
			</select>
		</div>
		<div class="btns">
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'alarmRS485',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.alarmRS485
    }
  },
  computed: {
  },
  methods:{
  	//点击保存
  	clickSave(){
  		this.transJsondata(this.useData);
  		this.msgData["RS485-Properties"] = this.useData
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "Rs485Set",
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
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["RS485-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "Rs485Set"
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
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 3.9vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.btns{
	text-align: left;
}
.saveBtn{
	position: absolute;
	left: 0;
	top: 72vh;
}
</style>
