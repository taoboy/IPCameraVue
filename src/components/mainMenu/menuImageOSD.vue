<template>
	<div class="menuDiv">
		<!--左边的视频显示区域-->
		<div class="videoShow lt">
			<p v-if="!isIEBorwser">亲，您的视频插件出现异常，不妨换成Internet Explorer浏览器试试~</p>
			<p v-else-if="!isHavePlug">
				亲，您的视频插件尚未安装，请点击<a :href="plugAddr">下载</a>
				<br />请安装完成后，刷新浏览器重试。
			</p>
			<OBJECT v-show="plug" ID="XgPlayAct2" WIDTH="100%" HEIGHT="100%" classid="CLSID:60B238EA-BA74-431F-9F07-F100DFA4BAE3">
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
				<label for="">通道名称</label>
				<input type="text" v-model="useData.ChnProperties.Content" />
			</div>
			<div class="param">
				<label for="">时间格式</label>
				<select v-model="useData.TimeProperties.Is24Hour" name="">
					<option value="true">24小时制</option>
					<option value="false">12小时制</option>
				</select>
			</div>
			<div class="param">
				<label for="">日期格式</label>
				<select v-model.number="useData.TimeProperties.TimeFormat" name="">
					<option value="0">xxxx-xx-xx（年月日）</option>
			        <option value="1">xx-xx-xxxx（日月年）</option>
			        <option value="2">xx-xx-xxxx（月日年）</option>
				</select>
			</div>
			<div class="param">
				<ul class="format">
					<li>
						<input v-model="useData.ChnProperties.Enable" type="checkbox" id="name" />
						<label for="name">显示名称</label>
					</li>
					<li>
						<input v-model="useData.TimeProperties.ShowTime" type="checkbox" id="date" />
						<label for="date">显示日期</label>
					</li>
					<li>
						<input v-model="useData.TimeProperties.ShowWeek" type="checkbox" id="week" />
						<label for="week">显示星期</label>
					</li>
					<li>
						<input v-model="useData.ShowLogo" type="checkbox" id="logo" />
						<label for="logo">显示LOGO</label>
					</li>
				</ul>
			</div>
			<div class="param">
				<label for="">OSD属性</label>
				<select v-model.number="useData.Pellucidity" name="">
					<option value="0">不透明</option>
			        <option value="1">半透明</option>
				</select>
			</div>
			<div class="param">
				<label for="">OSD字号</label>
				<select v-model="useData.FontSize" name="">
					<option value="max">大</option>
			        <option value="mid">中</option>
			        <option value="min">小</option>
				</select>
			</div>
			<div class="buttons">
				<button @click="clickSave" class="saveBtn">保存</button>
				<button @click="clickRecover" class="recoverBtn">恢复默认设置</button>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {GET_USERNAME,GET_USERPWD} from '../../store/mutation-types.js'

export default {
  name: 'imageOSD',
  components: {
  },
  data () {
    return {
    	isIEBorwser: false,
    	isHavePlug: false,
    	plug: false,
    	plugAddr: '',
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.imageOSD
    }
  },
  computed:{
	...mapGetters({		//取值
		GET_USERNAME,
		GET_USERPWD
	})
  },
  methods:{
  	//点击保存
  	clickSave(){
  		/***表单验证start****/
		var name = this.validate.passway(this.useData.ChnProperties.Content);
		if(name){
			this.$emit("warnAlert",name);
			return;
		}
		/***表单验证end****/
  		this.transJsondata(this.useData);
  		this.msgData["OSD-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "ImageOSD",
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
			"Page" : "ImageOSD"
	    }
		this.socketApi.sendSock(sendObj,this.recoverResult);
  	},
  	//恢复默认设置-回调函数
  	recoverResult(data){
  		console.log("恢复默认："+JSON.stringify(data));
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["OSD-Properties"];
    		this.$emit("successAlert","恢复默认设置成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["OSD-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
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
			this.socketApi.playVideo("main",XgPlayAct2,this.GET_USERNAME,this.GET_USERPWD);
  	}
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "ImageOSD"
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
	margin-left: 2.7vw;
}
.param{
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 5.2vw;
	text-align: left;
	font-size: 1.1vw;
}
.format li{
	margin-bottom: 0.8vw;
	text-align: left;
}
.format li label{
	width: 8vw;
	margin-left: 7vw;
	font-size: 0.97vw;
}
.buttons{
	margin-top: 30vh;
	text-align: left;
}
.buttons .saveBtn{
	margin-right: 5vw;
}
</style>
