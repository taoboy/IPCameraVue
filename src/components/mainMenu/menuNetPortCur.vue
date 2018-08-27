<template>
	<div class="params">
		<div class="param">
			<label for="">HTTP端口</label>
			<input v-model.number="useData.Http" type="number" />
		</div>
		<div class="param">
			<label for="">RTSP端口</label>
			<input v-model.number="useData.Rtsp" type="number" />
		</div>
		<div class="param">
			<label for="">HTTPS端口</label>
			<input v-model.number="useData.Https" type="number" />
		</div>
		<div class="param">
			<label for="">服务端口</label>
			<input v-model.number="useData.Service" type="number" />
		</div>
		<div class="buttons">
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
		<!--确认弹框-->
		<div class="shadow" v-show="dialogFlag">
			<div class="dialog2">
				<p class="title">提示</p>
				<p class="tips">设备即将重启,是否保存？</p>
				<div class="btns">
					<button @click="clickSure" class="saveBtn">确定</button>
					<button @click="clickCancel" class="recoverBtn">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'netPortCur',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.netPort,
    	dialogFlag: false
    }
  },
  computed: {
  },
  methods:{
  	//点击弹框中的取消
  	clickCancel(){
  		this.dialogFlag = false;
  	},
  	//点击弹框中的确定
  	clickSure(){
  		this.dialogFlag = false;
  		this.$router.push({ path: '/login'})
  	},
  	//点击保存
  	clickSave(){
  		this.dialogFlag = true;
  	},
  	//保存端口
  	savePort(){
  		this.transJsondata(this.useData);
  		this.msgData["Port-Properties"] = this.useData
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "NetworkPort",
		  	"Message" : this.msgData
		}
		console.log("发送数据："+JSON.stringify(this.msgData));
		this.socketApi.sendSock(sendObj,this.setConfigResult);
  	},
  	//设置参数-回调函数
  	setConfigResult(data){
  		if(data["RetCode"] == 0){
  			this.$message.success("保存成功");
        }else{
        	this.$message.error(data["Message"]);
        }
  	},
  	getConfigResult(data){
  		console.log(JSON.stringify(data));
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Port-Properties"];
        }else{
        	this.$message.error(data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "NetworkPort"
    }
  	this.socketApi.sendSock(agentData,this.getConfigResult);
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
	width: 6vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 3vw;
}
.buttons .saveBtn{
	position: absolute;
	left: 0;
	top: 71.4vh;
}
</style>
