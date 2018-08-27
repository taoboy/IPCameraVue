<template>
	<div class="menuDiv">
		<div class="param">
			<label for="">码流类型</label>
			<select name="" v-model="stream" @change="selectStream()">
				<option value="main">主码流(定时)</option>
				<option value="sub">子码流(网传)</option>
			</select>
		</div>
		<div class="param">
			<label for="">分辨率</label>
			<select v-if="useData.StreamIdx=='main'" name="" v-model="useData.StreamResolution">
				<option value="PIX_1920_1080">1920*1080</option>
				<option value="PIX_1280_960">1280*960</option>
		        <option value="PIX_1280_720">1280*720</option>
			</select>
			<select v-else="" name="" v-model="useData.StreamResolution">
				<option value="PIX_704_576">704*576</option>
				<option value="PIX_640_480">640*480</option>
			</select>
		</div>
		<div class="param">
			<label for="">码率类型</label>
			<select name="" v-model="useData.StreamType">
				<option value="cbr">定码率</option>
				<option value="vbr">变码率</option>
			</select>
		</div>
		<div class="param">
			<label for="">图像质量</label>
			<select name="" v-model="useData.Quality" :disabled="useData.StreamType=='cbr'">
				<option value="high">高</option>
				<option value="mid">中</option>
				<option value="low">低</option>
			</select>
		</div>
		<div class="param">
			<label for="">视频帧率</label>
			<select name="" v-model="useData.FPS">
				<option v-for="n in fps" :value="n">{{n}}</option>
			</select>
		</div>
		<div class="param">
			<label for="">码率</label>
			<input type="number" name="" id="" v-model.number="useData.BitRate" />
			Kbps
		</div>
		<div class="param">
			<label for="">编码类型</label>
			<select name="" v-model="useData.EncoderType">
				<option value="H264">H.264</option>
		        <!--<option value="">H.265</option>
		        <option value="">MJPEG</option>-->
			</select>
		</div>
		<div class="param">
			<label for="">帧间隔</label>
			<select name="" v-model="useData.IdrInterval">
				<option v-for="n in 250" :value="n">{{n}}</option>
			</select>
		</div>
		<div class="param">
			<label for="">视频压缩</label>
			<select name="" v-model="useData.ProfileType">
				<!--根据H264和H265设置,H265只支持main profiles-->
		        <option value="main">main profile</option>
		        <option value="base">baseline</option>
		        <option value="high">high profile</option>
			</select>
		</div>
		<!--<div class="param">
			<label for="">码流平滑</label>
			<input type="range" v-model.number="useData.Smoothness" />
			<span class="rangeVal">{{useData.Smoothness}}</span>
			清晰 - 平滑
		</div>-->
		<div class="btns">
			<button @click="clickSave" class="saveBtn">保存</button>
			<button @click="clickRecover" class="recoverBtn">恢复默认设置</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'videoEncode',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.videoEncode,		
    	stream: "main",		//码流
    	fps:30,				//主、子码流下的FPS
    }	
  },
  watch:{
  },
  methods:{
	//监听主、子码流切换
  	selectStream(e){
  		if(this.stream == "main"){
  			this.useData = this.msgData["Stream-Properties"][0];
  			this.fps = 60;
  		}else{
  			this.useData = this.msgData["Stream-Properties"][1];
  			this.fps = 30;
  		}
  	},
  	//点击保存
  	clickSave(){
  		/***表单验证start****/
		var rate = this.validate.testBitRate(this.useData.BitRate);
		if(rate){
			this.$emit("warnAlert",rate);
			return;
		}
		/***表单验证end****/
  		this.transJsondata(this.useData);
  		if(this.useData["StreamIdx"] == "main"){
  			this.msgData["Stream-Properties"][0] = this.useData;
  		}else{
  			this.msgData["Stream-Properties"][1] = this.useData;
  		}
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "Stream",
		  	"Message" : this.msgData
		}
		console.log("全部数据:"+JSON.stringify(this.msgData));
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
  	//点击恢复默认设置
  	clickRecover(){
  		var sendObj={
		  	"Method" : "RestoreConfig",
			"Page" : "Stream"
	    }
		this.socketApi.sendSock(sendObj,this.recoverResult);
  	},
  	//恢复默认设置-回调函数
  	recoverResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Stream-Properties"][0];
    		this.$emit("successAlert","恢复默认设置成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//获取默认数据的回调
    getConfigResult(redata){
    	if(redata["RetCode"] == 0){
    		this.msgData = JSON.parse(redata["Message"]);
    		this.useData = this.msgData["Stream-Properties"][0];
        }else{
        	this.$emit("errorAlert",redata["Message"]);
        }
    }
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "Stream"
    };
  	this.socketApi.sendSock(agentData,this.getConfigResult);
  },
  created(){
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
	color: #4A4A4A;
}
.param label{
	display: inline-block;
	width: 11.5vw;
	text-align: right;
	margin-right: 4.4vw;
	font-size: 1.1vw;
}
.btns{
	text-align: left;
}
.btns .saveBtn{
	margin: 14.2vh  8.3vw 0 7.6vw;
}
.rangeVal{
	margin-left: 0.8vw;
}

</style>
