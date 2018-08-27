<template>
	<div class="menuDiv">
		<div class="param">
			<label for="">音频编码类型</label>
			<select v-model.number="useData.CodecType" name="">
				<option value="0">G.711</option>
				<option value="1">G.726</option>
				<option value="2">AAC</option>
			</select>
		</div>
		<div class="param">
			<label for="">音频输入方式</label>
			<select v-model="useData.InputType" name="">
				<option value="linein">LineIn</option>
				<option value="micin">MicIn</option>
			</select>
		</div>
		<div class="param">
			<label for="">音频码率</label>
			<select v-model.number="useData.BitRate" v-if="useData.CodecType==1" name="">
				<option value="16000">16Kbps</option>
			</select>
			<select v-model.number="useData.BitRate" v-else-if="useData.CodecType==0" name="">
				<option value="64000">64Kbps</option>
			</select>
			<select v-model.number="useData.BitRate" v-else="" name="">
				<option value="16000">16Kbps</option>
				<option value="32000">32Kbps</option>
				<option value="48000">48Kbps</option>
				<option value="64000">64Kbps</option>
			</select>
		</div>
		<div class="param">
			<label for="">采样率</label>
			<select v-model.number="useData.SampleRate" name="">
				<option v-if="useData.CodecType==2" value="16000">16000</option>
				<option v-else="" value="8000">8000</option>
			</select>
		</div>
		<div class="param">
			<label for="">环境噪声过滤</label>
			<select v-model.number="useData.AnrEnable" name="">
				<option value="false">关闭</option>
				<option value="true">开启</option>
			</select>
		</div>
		<div class="param">
			<label for="">音量</label>
			<input type="range" v-model.number="useData.InVolume" />
			<span class="rangeVal">{{useData.InVolume}}</span>
		</div>
		<div class="btns">
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'audioParam',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.audioParam
    }
  },
  methods:{
  	//点击保存
  	clickSave(){
  		this.transJsondata(this.useData);
  		this.msgData["Audio-Properties"] = this.useData
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "Audio",
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
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Audio-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "Audio"
    }
  	this.socketApi.sendSock(agentData,this.getConfigResult);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.menuDiv{
	position: relative;
	text-align: left;
}
.params{
	margin-left: 2.7vw;
}
.param{
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 13.5vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2.5vw;
}
.format li{
	margin-bottom: 0.8vw;
}
.btns .saveBtn{
	position: absolute;
	left: 7.6vw;
	top: 71.4vh;
}
</style>
