<template>
	<div class="menuDiv">
		<p class="titleText">检测类型:</p>
		<div>
			<div class="paramSec">
				<input checked="" v-model="useData.FaceDetect.Enable" id="face" type="checkbox" />
				<label for="face">启用人脸检测</label>
			</div>
			<div class="divParam">	
				<ul class="param" v-show="useData.FaceDetect.Enable">
					<li>
						<label for="">抓拍图片格式</label>
						<select v-model="useData.FaceDetect.PicType" name="">
							<option value="JPEG">JPEG</option>
						</select>
					</li>
					<li>
						<label for="">最小抓拍图片尺寸</label>
						<select v-model.number="useData.FaceDetect.PicSize" name="">
							<option value="0">30*30</option>
							<option value="1">60*60</option>
							<option value="2">100*100</option>
						</select>
					</li>
					<li>
						<label for="">抓拍图像质量</label>
						<select v-model="useData.FaceDetect.PicQuality" name="">
							<option value="low">低</option>
							<option value="mid">中</option>
							<option value="high">高</option>
						</select>
					</li>
					<li class="score">
						<label for="">阈值</label>
						<input v-model="useData.FaceDetect.ScoreThrd" type="number" name="" id="" value="" />
						<span>0-1</span>
					</li>
				</ul>
			</div>
		</div>
		<span class="line"></span>
		<div>
			<div class="paramSec">
				<input v-model="useData.BodyDetect.Enable" id="body" type="checkbox" />
				<label for="body">启用人形检测</label>
			</div>
			<div class="divParam">
				<ul class="param" v-show="useData.BodyDetect.Enable">
					<li>
						<label for="">抓拍图片格式</label>
						<select v-model="useData.BodyDetect.PicType" name="">
							<option value="JPEG">JPEG</option>
						</select>
					</li>
					<li>
						<label for="">最小抓拍图片尺寸</label>
						<select v-model.number="useData.BodyDetect.PicSize" name="">
							<option value="0">30*30</option>
							<option value="1">60*60</option>
							<option value="2">100*100</option>
						</select>
					</li>
					<li>
						<label for="">抓拍图像质量</label>
						<select v-model="useData.BodyDetect.PicQuality" name="">
							<option value="low">低</option>
							<option value="mid">中</option>
							<option value="high">高</option>
						</select>
					</li>
					<li class="score">
						<label for="">阈值</label>
						<input v-model="useData.BodyDetect.ScoreThrd" type="number" name="" id="" value="" />
						<span>0-1</span>
					</li>
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
  name: 'intelCheck',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.intelCheck
    }
  },
  computed: {
  },
  methods:{
  	//点击保存
  	clickSave(){
  		/***表单验证start****/
  		if(this.useData.BodyDetect.Enable){
			var thrd1 = this.validate.threshold(this.useData.BodyDetect.ScoreThrd);
  			if(thrd1){
				this.$emit("warnAlert",thrd1);
				return;
			}
  		}
  		if(this.useData.FaceDetect.Enable){
			var thrd2 = this.validate.threshold(this.useData.FaceDetect.ScoreThrd);
  			if(thrd2){
				this.$emit("warnAlert",thrd2);
				return;
			}
  		}
		/***表单验证end****/
  		this.transJsondata(this.useData);
  		if(this.useData.BodyDetect.Enable || this.useData.FaceDetect.Enable){
  			this.getImageBasic();
  		}else{
  			this.saveConfig();
  		}
  	},
  	//获取图像设置-基本参数
  	getImageBasic(){
  		const agentData = {
		  	"Method" : "GetConfig",
			"Page" : "ImageBasic"
	    }
	  	this.socketApi.sendSock(agentData,this.getImageBasicResult);
  	},
  	//获取图像设置-基本参数--回调
  	getImageBasicResult(data){
  		if(data["RetCode"] == 0){
  			var message = JSON.parse(data["Message"]);
  			if(message["Image-Properties"]["AdvanceSet"]["CorridorMode"]){
  				this.$emit("warnAlert","您当前处于走廊模式,无法启用检测。");
  			}else{
  				this.saveConfig();
  			}
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//保存设置
  	saveConfig(){
  		this.msgData["DetectStrate-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "DetectStrate",
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
    		this.useData = this.msgData["DetectStrate-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "DetectStrate"
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
	text-align: left;
	font-size: 1.1vw;
}
.menuDiv>div{
	margin-left: 10vw;
}
.paramSec{
	margin-bottom: 2.2vh;
}
.params{
	margin-left: 2.7vw;
}
.param li{
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 9vw;
	text-align: right;
	margin-right: 0.7vw;
}
.saveBtn{
	margin-top: 4.4vh;
}
.menuDiv .titleText{
	font-weight: 600;
	margin-bottom: 4.4vh;
	margin-left: 10vw;
}
.line{
	display: block;
	width: 80.2vw;
	height: 0.5px;
	background: #999;
	margin: 4.4vh 0 4.4vh -2.7vw;
}
.score input{
	width: 6.9vw;
	margin-right: 0.5vw;
}
.divParam{
	height: 22.6vh ;
}
</style>
