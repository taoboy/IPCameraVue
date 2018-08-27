<template>
	<div class="menuDiv">
		<!--左边的视频显示区域-->
		<div class="videoShow lt">
			<p v-if="!isIEBorwser">亲，您的视频插件出现异常，不妨换成Internet Explorer浏览器试试~</p>
			<p v-else-if="!isHavePlug">
				亲，您的视频插件尚未安装，请点击<a :href="plugAddr">下载</a>
				<br />请安装完成后，刷新浏览器重试。
			</p>
			<OBJECT v-show="plug" ID="XgPlayAct1" WIDTH="100%" HEIGHT="100%" classid="CLSID:60B238EA-BA74-431F-9F07-F100DFA4BAE3">
			    <PARAM NAME="_Version" VALUE="65536"></PARAM>
			    <PARAM NAME="_ExtentX" VALUE="12806"></PARAM>
			    <PARAM NAME="_ExtentY" VALUE="1747"></PARAM>
			    <PARAM NAME="_StockProps" VALUE="0"></PARAM>
			</OBJECT>
			<!--<img src="~assets/preview/bofang.png" alt="" />-->
		</div>
		<!--右边的参数配置-->
		<div class="params lt">
			<div class="param">
				<span @click="clickMenus('0')">
					图像调节
					<img :class="fold['0'].className" :src="fold['0'].imgUrl" alt="" />
				</span>
				<div v-show="fold['0'].show">
					<ul>
						<li>
						  <label>亮度</label>
					      <input v-model.number="useData.BasicSet.Luminance" type="range" name="Luminance" min="1" max="100" value="50">
					      <span>{{useData.BasicSet.Luminance}}</span>
						</li>
						<li>
						  <label>对比度</label>
					      <input v-model.number="useData.BasicSet.Contrast" type="range" name="Contrast" min="1" max="100" value="50">
					      <span>{{useData.BasicSet.Contrast}}</span>
						</li>
						<li>
						  <label>色度</label>
					      <input v-model.number="useData.BasicSet.Chroma" type="range" name="Chroma" min="1" max="100" value="50">
					      <span>{{useData.BasicSet.Chroma}}</span>
						</li>
						<li>
						  <label>饱和度</label>
					      <input v-model.number="useData.BasicSet.Saturation" type="range" name="Saturation" min="1" max="100" value="50">
					      <span>{{useData.BasicSet.Saturation}}</span>
						</li>
						<li>
						  <label>锐度</label>
					      <input v-model.number="useData.BasicSet.Sharpness" type="range" name="Sharpness" min="1" max="100" value="50">
					      <span>{{useData.BasicSet.Sharpness}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('1')">
					白平衡
					<img :class="fold['1'].className" :src="fold['1'].imgUrl" alt="" />
				</span>
				<div v-show="fold['1'].show">
					<select class="balance" name="" v-model="useData.WhiteBalance.Mode">
						<option value="auto">自动白平衡</option>
				        <option value="manual">手动白平衡</option>
				        <option value="natural">自然光</option>
				        <option value="incandescent">白炽灯</option>
					</select>
					<ul v-show="useData.WhiteBalance.Mode == 'manual'">
						<li>
						  <label>B增益</label>
					      <input v-model.number="useData.WhiteBalance.BValue" type="range" name="BValue" min="1" max="100" value="50">
					      <span>{{useData.WhiteBalance.BValue}}</span>
						</li>
						<li>
						  <label>R增益</label>
					      <input v-model.number="useData.WhiteBalance.RValue" type="range" name="RValue" min="1" max="100" value="50">
					      <span>{{useData.WhiteBalance.RValue}}</span>
						</li>
					</ul>	
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('2')">
					曝光
					<img :class="fold['2'].className" :src="fold['2'].imgUrl" alt="" />
				</span>
				<div v-show="fold['2'].show">
					<ul>
						<li>
							<label>曝光模式</label>
							<select v-model="useData.ExposureSet.Mode">
								<option value="auto">自动模式</option>
								<option value="manual">手动模式</option>
							</select>
						</li>
					</ul>
					<div>
						<ul v-if="useData.ExposureSet.Mode=='auto'">
							<li>
								<label>曝光时间</label>
								<select v-model="useData.ExposureSet.AutoParam.ShutterTimeMax">
									<option v-for="(time,index) in ShutterTime" :value="index">{{time}}</option>
								</select>
							</li>
							<li>
							  <label>模拟增益</label>
						      <input v-model.number="useData.ExposureSet.AutoParam.AGainMax" type="range" name="AGainMax" min="1" max="100" value="50">
						      <span>{{useData.ExposureSet.AutoParam.AGainMax}}</span>
							</li>
							<li>
							  <label>数字增益</label>
						      <input v-model.number="useData.ExposureSet.AutoParam.DGainMax" type="range" name="DGainMax" min="1" max="100" value="50">
						      <span>{{useData.ExposureSet.AutoParam.DGainMax}}</span>
							</li>
						</ul>
						<ul v-else="">
							<li>
								<label>曝光时间</label>
								<select v-model="useData.ExposureSet.ManualParam.ShutterTime">
									<option v-for="(time,index) in ShutterTime" :value="index">{{time}}</option>
								</select>
							</li>
							<li>
							  <label>模拟增益</label>
						      <input v-model.number="useData.ExposureSet.ManualParam.AGain" type="range" name="AGain" min="1" max="100" value="50">
						      <span>{{useData.ExposureSet.ManualParam.AGain}}</span>
							</li>
							<li>
							  <label>数字增益</label>
						      <input v-model.number="useData.ExposureSet.ManualParam.DGain" type="range" name="DGain" min="1" max="100" value="50">
						      <span>{{useData.ExposureSet.ManualParam.DGain}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('3')">
					宽动态
					<img :class="fold['3'].className" :src="fold['3'].imgUrl" alt="" />
				</span>
				<div v-show="fold['3'].show">
					<ul>
						<li>
							<label>宽动态设置</label>
							<select v-model="useData.WdrMode">
								<option value="disable">关闭</option>
								<option value="digital">数字宽动态</option>
								<option value="sensor">宽动态</option>
							</select>
						</li>
					</ul>
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('4')">
					降噪
					<img :class="fold['4'].className" :src="fold['4'].imgUrl" alt="" />
				</span>
				<div v-show="fold['4'].show">
					<ul>
						<li>
							<label>2D降噪</label>
							<select name="" v-model="useData.DenoiseSet['2DEnable']">
								<option value="false">关闭</option>
								<option value="true">开启</option>
							</select>
						</li>
						<!--开启时显示-->
						<li v-show="useData.DenoiseSet['2DEnable'] == 'true' || useData.DenoiseSet['2DEnable']">
							<label>2D降噪设置</label>
							<input v-model.number="useData.DenoiseSet['2DValue']" type="range" name="" min="1" max="100">
					      	<span>{{useData.DenoiseSet['2DValue']}}</span>
						</li>
						<li>
							<label>3D降噪</label>
							<select name="" v-model="useData.DenoiseSet['3DEnable']">
								<option value="false">关闭</option>
								<option value="true">开启</option>
							</select>
						</li>
						<!--开启时显示-->
						<li v-show="useData.DenoiseSet['3DEnable'] == 'true' || useData.DenoiseSet['3DEnable']">
							<label>时域设置</label>
							<input v-model.number="useData.DenoiseSet['3DTime']" type="range" name="" min="1" max="100" value="50">
					      	<span>{{useData.DenoiseSet['3DTime']}}</span>
						</li>
						<li v-show="useData.DenoiseSet['3DEnable'] == 'true' || useData.DenoiseSet['3DEnable']">
							<label>空域设置</label>
							<input v-model.number="useData.DenoiseSet['3DSpace']" type="range" name="" min="1" max="100" value="50">
					      	<span>{{useData.DenoiseSet['3DSpace']}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('5')">
					场景模式
					<img :class="fold['5'].className" :src="fold['5'].imgUrl" alt="" />
				</span>
				<div v-show="fold['5'].show">
					<ul>
						<li>
							<label>模式设置</label>
							<select name="" v-model="useData.SceneMode">
								<option value="indoor">室内模式</option>
								<option value="outdoor">室外模式</option>
							</select>	
						</li>
					</ul>
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('6')">
					图像增强
					<img :class="fold['6'].className" :src="fold['6'].imgUrl" alt="" />
				</span>
				<div v-show="fold['6'].show">
					<ul>
						<li>
							<label>背光补偿</label>
							<select v-model="useData.AdvanceSet.BLCEnable" name="">
								<option value="false">关闭</option>
								<option value="true">启动</option>
							</select>	
						</li>
						<li v-show="useData.AdvanceSet.BLCEnable == 'true' || useData.AdvanceSet.BLCEnable">
							<label>背光补偿位置</label>
							<select v-model.number="useData.AdvanceSet.BLCPos" name="">
								<option value="0">上</option>
								<option value="1">下</option>
								<option value="2">左</option>
								<option value="3">右</option>
								<option value="4">居中</option>
							</select>	
						</li>
						<li>
							<label>强光抑制</label>
							<select v-model="useData.AdvanceSet.HLCEnable" name="">
								<option value="false">关闭</option>
								<option value="true">启动</option>	
							</select>	
						</li>
						<li>
							<label>去雾</label>
							<select v-model="useData.AdvanceSet.DefogEnable" name="">
								<option value="false">关闭</option>
								<option value="true">启动</option>
							</select>	
						</li>
						<li>
							<label>电子防抖</label>
							<select v-model="useData.AdvanceSet.DisEnable" name="">
								<option value="false">关闭</option>
								<option value="true">启动</option>
							</select>	
						</li>
						<li>
							<label>图像翻转</label>
							<select v-model="useData.AdvanceSet.RotateType" name="">
								<option value="none">不翻转</option>
								<option value="vertical">上下</option>
								<option value="horizontal">左右</option>
								<option value="mirror">镜像</option>
							</select>	
						</li>
						<li>
							<label>畸变校正</label>
							<select v-model="useData.AdvanceSet.LdcEnable" name="">
								<option value="false">关闭</option>
								<option value="true">启动</option>
							</select>	
						</li>
						<li>
							<label>走廊模式</label>
							<select v-model="useData.AdvanceSet.CorridorMode" name="">
								<option value="false">关闭</option>
								<option value="true">启动</option>
							</select>	
						</li>
					</ul>
				</div>
			</div>
			<div class="param">
				<span @click="clickMenus('7')">
					日夜切换
					<img :class="fold['7'].className" :src="fold['7'].imgUrl" alt="" />
				</span>
				<div v-show="fold['7'].show">
					<ul>
						<li>
							<label>模式设置</label>
							<select v-model="useData.DayNightSet.Mode" name="">
								<option value="auto">自动</option>
								<option value="fixed">定时</option>
								<option value="day">白天</option>
								<option value="night">夜晚</option>
							</select>
						</li>
						<li v-show="useData.DayNightSet.Mode == 'auto'">
							<label>灵敏度</label>
							<select v-model="useData.DayNightSet.Sensibility" name="">
								<option v-for="n in 7" :value="n">{{n}}</option>
							</select>
						</li>
						<li class="setTime" v-show="useData.DayNightSet.Mode == 'fixed'">
							<label>开始时间</label>
							<el-time-picker v-model="startValue">
							</el-time-picker>
							<!--<input type="date" name="" id="" value="" />-->
						</li>
						<li class="setTime" v-show="useData.DayNightSet.Mode == 'fixed'">
							<label>结束时间</label>
							<el-time-picker v-model="endValue">
							</el-time-picker>
							<!--<input type="date" name="" id="" value="" />-->
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="btns">
			<button @click="clickSave" class="saveBtn">保存</button>
			<button @click="clickRecover" class="recoverBtn">恢复默认设置</button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {GET_USERNAME,GET_USERPWD} from '../../store/mutation-types.js'

export default {
  name: 'imageBasic',
  components: {
  },
  data () {
    return {
    	isIEBorwser: false,
    	isHavePlug: false,
    	plug: false,
    	plugAddr: '',
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.imageBasic,	
    	ShutterTime:["1/25","1/50","1/100","1/200","1/500","1/1000","1/2000","1/5000","1/10000"],
    	startValue: '0',
    	endValue: '0',
    	fold: {
    		0:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		1:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		2:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		3:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		4:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		5:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		6:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"},
    		7:{"show":false,"imgUrl":require("@/assets/menu/right_blue.png"),"className":"right"}
    	}
    }
  },
  computed:{
	...mapGetters({		//取值
			GET_USERNAME,
			GET_USERPWD
	})
  },
  methods:{
  	//点击小菜单
  	clickMenus(index){
  		for(var key in this.fold){
  			if(key != index){
  				this.fold[key].show = false;
	  			this.fold[key].imgUrl = require("@/assets/menu/right_blue.png");
	  			this.fold[key].className = "right";
  			}
  		}
  		
  		this.fold[index].show = ! this.fold[index].show;
  		if(this.fold[index].show){
  			this.fold[index].imgUrl = require("@/assets/menu/down_blue.png");
			this.fold[index].className = "down";
  		}else{
  			this.fold[index].imgUrl = require("@/assets/menu/right_blue.png");
			this.fold[index].className = "right";
  		}
  	},
  	//点击保存
  	clickSave(){
		this.transJsondata(this.useData);
		if(this.useData.AdvanceSet.CorridorMode){
			this.getIntelCheck();
		}else{
			this.saveConfig();
		}
  	},
  	//获取智能分析检测类型数据
  	getIntelCheck(){
  		const agentData = {
		  	"Method" : "GetConfig",
			"Page" : "DetectStrate"
	    }
	  	this.socketApi.sendSock(agentData,this.getIntelCheckResult);
  	},
  	//获取智能分析检测类型数据---回调
  	getIntelCheckResult(data){
  		if(data["RetCode"] == 0){
  			var message = JSON.parse(data["Message"]);
  			if(message["DetectStrate-Properties"]["FaceDetect"]["Enable"]){
  				this.$emit("warnAlert","您已启用智能分析的人脸检测，无法启用走廊模式。");
  			}else if(message["DetectStrate-Properties"]["BodyDetect"]["Enable"]){
  				this.$emit("warnAlert","您已启用智能分析的人形检测，无法启用走廊模式。");
  			}else{
  				this.saveConfig();
  			}
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	saveConfig(){
  		this.transPageTime();
  		this.msgData["Image-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "ImageBasic",
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
  	//点击恢复默认设置
  	clickRecover(){
  		var sendObj={
		  	"Method" : "RestoreConfig",
			"Page" : "ImageBasic"
	    }
		this.socketApi.sendSock(sendObj,this.recoverResult);
  	},
  	//恢复默认设置-回调函数
  	recoverResult(data){
  		console.log(JSON.stringify(data));
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Image-Properties"];
    		this.$emit("successAlert","恢复默认设置成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//获取默认配置-回调函数
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Image-Properties"];
    		this.transResponse();
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//将请求返回的数据 转换 成显示到页面的数据
  	transResponse(){
  		this.startValue = this.transSecsToTime(this.useData.DayNightSet.Start);
  		this.endValue = this.transSecsToTime(this.useData.DayNightSet.End);
  	},
  	//将页面显示的数据 转换 成发送的数据
  	transPageTime(){
  		var timeStart = this.transStandard(this.startValue);
  		var timeEnd = this.transStandard(this.endValue);
  		this.useData.DayNightSet.Start = this.transTimeToSecs(timeStart);
  		this.useData.DayNightSet.End = this.transTimeToSecs(timeEnd);
  	}
  },
  mounted: function(){
  	this.plugAddr = this.loadVideoPlug();
  	if(this.getBrowser() == "IE"){
  		this.isIEBorwser = true;
  	}else{
  		this.isIEBorwser = false;
  	}
  	this.isHavePlug = this.testVideoPlugin();
  	if(this.isHavePlug && this.isIEBorwser){
  		this.plug = true;
			this.socketApi.playVideo("main",XgPlayAct1,this.GET_USERNAME,this.GET_USERPWD);
  	}
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "ImageBasic"
    }
  	this.socketApi.sendSock(agentData,this.getConfigResult);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.param .el-date-editor.el-input, .el-date-editor.el-input__inner{
	width: 19.4vw!important;
}
.menuDiv{
	position: relative;
}
.params{
	margin-left: 2.7vw;
	height: 61.1vh;
	overflow-x: hidden;
	overflow-y: auto;
}
.param{
	width: 27.7vw;
	margin-bottom: 2.2vh;
}
.param>span{
	display: inline-block;
	width: 26.4vw;
	height: 3.3vh;
	line-height: 3.3vh;
	padding-left: 1.4vw;
	background: #E6EFFB;
	border-radius: 5px;
	text-align: left;
	font-size: 1.1vw;
}
.param>span img.right{
	width: 0.4vw;
	float: right;
	margin-right: 2vw;
	margin-top: 0.4vw;
}
.param>span img.down{
	width: 0.8vw;
	float: right;
	margin-right: 1.9vw;
	margin-top: 0.7vw;
}
.param ul{
	width: 26.4vw;
	padding-left: 1.4vw;
	text-align: left;
}
.param ul li{
	height: 3.3vh;
	line-height: 3.3vh;
	color: #509EFE;
}
.param ul li{
	margin-top: 1vw;
}
.param ul li label{
	display: inline-block;
	width: 5.5vw;
	font-size: 0.97vw;
}
.param ul li span{
	display: inline-block;
	width: 2.4vw;
	height: 3.3vh;
	line-height: 3.3vh;
	border: 1px solid #999999;
	border-radius: 5px;
	text-align: center;
	margin-left: 1vw;
	font-size: 0.97vw;
}
.balance{
	margin-left: 5vw;
	margin-top: 1vw;
}
.btns{
	margin-left: 2.7vw;
	left: 44.7vw;
	top: 67vh;
	position: absolute;
}
.btns .saveBtn{
 	margin-right: 6.5vw;
}
.param ul li.setTime{
	line-height: 5.4vh;
	height: 5.4vh;
}
</style>
