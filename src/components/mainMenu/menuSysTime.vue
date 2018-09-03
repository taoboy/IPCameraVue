<template>
	<div class="menuDiv">
		<div class="param timezone">
			<label for="">时区</label>
			<select v-model="useData.Timezone" name="">
				<option v-for="(item,index) in timeZone" :value="index">{{item}}</option>
			</select>
		</div>
		<p>手动校时</p>
		<div class="paramSec">
			<input v-model="useData.TimeCheck.TimeCheckType" type="radio" name="timing" id="manual" value="manual" />
			<label for="manual">手动校时</label>
		</div>
		<div class="params">
			<div class="param">
				<label for="">设备时间</label>
				<el-date-picker
					readonly
			      v-model="deviceTime"
			      type="datetime"
			      placeholder="请选择日期时间">
			    </el-date-picker>
				<!--<input readonly="readonly" v-model="deviceTime" type="text" name="" id="" value="" />-->
			</div>
			<div class="param">
				<label for="">设置时间</label>
				<el-date-picker
				 :disabled="useData.TimeCheck.TimeCheckType=='ntp'"
			      v-model="pcTime"
			      type="datetime"
			      placeholder="选择日期时间">
			    </el-date-picker>
				<!--<input :disabled="useData.TimeCheck.TimeCheckType=='ntp'" type="date" name="" id="" value="" />-->
			</div>
			<div class="paramSync">
				<input @change="syncPcTime" v-model="useData.TimeCheck.ManualCheck.SyncPC" :disabled="useData.TimeCheck.TimeCheckType=='ntp'" type="checkbox" name="sync" id="computer" />
				<label for="computer">与计算机时间同步</label>
			</div>
		</div>
		<p>NTP校时</p>
		<div class="paramSec">
			<input v-model="useData.TimeCheck.TimeCheckType" type="radio" name="timing" id="ntp" value="ntp" />
			<label for="ntp">NTP校时</label>
		</div>
		<div class="params">
			<div class="param">
				<label for="">服务器地址</label>
				<input v-model="useData.TimeCheck.NtpCheck.ServerIp" :disabled="useData.TimeCheck.TimeCheckType=='manual'" type="text" name="" id="" value="" />
			</div>
			<div class="param">
				<label for="">NTP端口</label>
				<input v-model="useData.TimeCheck.NtpCheck.ServerPort" :disabled="useData.TimeCheck.TimeCheckType=='manual'" type="number" name="" id="" value="" />
				<button @click="clickTest" class="testBtn" :disabled="useData.TimeCheck.TimeCheckType=='manual'">测试</button>
			</div>	
			<div class="param">
				<label for="">校时时间间隔</label>
				<input v-model="useData.TimeCheck.NtpCheck.CheckInterval" :disabled="useData.TimeCheck.TimeCheckType=='manual'" type="text" name="" id="" value="" />
				<span>分钟</span>
			</div>
		</div>
		<div class="btns">
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'sysTime',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.sysTime,
    	deviceTime: '',
    	deviceTimeStamp: 0,
    	pcTime: '',
    	timer0: 0,			//计算机时间
    	timer1: 0,			//设备时间
    	timer2: 0,			//两个时间同步
    	timeZone: [
			'（UTC-12:00）国际日期变更线西',
			'（UTC-11:00）中途岛，萨摩亚群岛',
			'（UTC-10:00）夏威夷，阿留申群岛',
			'（UTC-09:30）马克萨斯群岛',
			'（UTC-09:00）阿拉斯加',
			'（UTC-08:00）太平洋时间（美国和加拿大）',
			'（UTC-07:00）山地时间（美国和加拿大）,亚利桑那',
			'（UTC-06:00）中部时间（美国和加拿大),复活节岛',
			'（UTC-05:00）东部时间（美国和加拿大）',
			'（UTC-04:00）大西洋时间（加拿大）',
			'（UTC-03:30）纽芬兰',
			'（UTC-03:00）阿拉瓜伊纳，巴西利亚',
			'（UTC-02:00）协调世界时-02',
			'（UTC-01:00）佛得角群岛，亚速尔群岛',
			'（UTC）协调世界时',
			'（UTC+00:00）都柏林，爱丁堡，里斯本，伦敦',
			'（UTC+01:00）阿姆斯特丹，柏林，伯尔尼',
			'（UTC+02:00）雅典，开罗，的黎波里，哈拉雷',
			'（UTC+03:00）巴格达，科威特，明斯克',
			'（UTC+03:30）德黑兰',
			'（UTC+04:00）阿布扎比，路易港',
			'（UTC+04:30）喀布尔',
			'（UTC+05:00）伊斯兰堡，卡拉奇',
			'（UTC+05:30）加尔各答，孟买，新德里',
			'（UTC+05:45）加德满都',
			'（UTC+06:00）阿斯塔纳，达卡',
			'（UTC+07:00）科步多，曼谷，河内',
			'（UTC+08:00）北京，重庆，香港特别行政区',
			'（UTC+09:00）大阪，首尔，雅库茨克',
			'（UTC+09:30）阿德莱德，达尔文',
			'（UTC+10:00）布里斯班',
			'（UTC+10:30）豪勋爵岛',
			'（UTC+11:00）布干维尔岛，马加丹，所罗门群岛',
			'（UTC+12:00）斐济，阿纳德尔，奥克兰',
			'（UTC+12:45）查塔姆群岛',
			'（UTC+13:00）努库阿洛法',
			'（UTC+14:00）圣诞岛'
		]
    }
  },
  computed: {
  },
  methods:{
  	//点击与计算机时间同步
  	syncPcTime(event){
  		var _this = this;
  		if(this.useData.TimeCheck.ManualCheck.SyncPC){
  			this.pcTime = new Date();
	  		if(_this.timer0){
	  			clearTimeout(_this.timer0);
	  		}
	  		_this.timer0 = setTimeout(function(){
	  			_this.syncPcTime();
	  		},1000)
  		}else{
  			if(_this.timer0){
	  			clearTimeout(_this.timer0);
	  		}
  			if(_this.timer2){
	  			clearTimeout(_this.timer2);
	  			_this.useData.TimeCheck.ManualCheck.TimeDevice = new Date().getTime()/1000;
	  			_this.setDeviceTime();
	  		}
  		}
  	},
  	//设置设备时间的计时
  	setDeviceTime(){
  		var _this = this;
  		this.useData.TimeCheck.ManualCheck.TimeDevice ++;
  		_this.deviceTime = _this.transStampToTime(_this.useData.TimeCheck.ManualCheck.TimeDevice);
  		if(_this.timer1){
  			clearTimeout(_this.timer1);
  		}
		_this.timer1 = setTimeout(function(){
			_this.setDeviceTime();
		},1000)
  		
  	},
  	//设置设备时间和计算机时间同步
  	setSyncTime(){
  		var _this = this;
  		this.pcTime = new Date();
  		this.deviceTime = new Date();
  		if(_this.timer2){
  			clearTimeout(_this.timer2);
  		}
  		_this.timer2 = setTimeout(function(){
  			_this.setSyncTime();
  		},1000)
  	},
  	//如果进入页面勾选了与计算机时间同步，则发送请求，保存当前时间
  	setCurTime(data){
  		data["Time-Properties"]["TimeCheck"]["ManualCheck"]["TimeDevice"] = new Date().getTime()/1000;
  		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "TimeSet",
		  	"Message" : data
		}
  		this.socketApi.sendSock(sendObj,this.setCurTimeResult);
  	},
  	//设置当前时间-回调
  	setCurTimeResult(data){
  		if(data["RetCode"] == 0){
        	console.log("设置当前时间成功");
        }else{
        	console.log(data["Message"]);
        }
  	},
  	//点击测试
  	clickTest(){
  		this.transJsondata(this.useData);
  		if(this.useData.TimeCheck.TimeCheckType == "manual"){
  			this.useData.TimeCheck.ManualCheck.TimeDevice = this.transStandardTime(this.pcTime);
  		}
  		this.msgData["Time-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "TestConfig",
		  	"Page" : "TimeSet",
		  	"Message" : this.msgData
		}
		console.log("发送测试数据："+JSON.stringify(this.msgData));
		this.socketApi.sendSock(sendObj,this.testConfigResult);
  	},
  	//测试-回调
  	testConfigResult(data){
  		if(data["RetCode"] == 0){
        	this.$emit("testAlert","测试成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//点击保存
  	clickSave(){
  		this.transJsondata(this.useData);
  		if(this.useData.TimeCheck.TimeCheckType == "manual"){
  			this.useData.TimeCheck.ManualCheck.TimeDevice = this.transStandardTime(this.pcTime);
  		}
  		this.msgData["Time-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "TimeSet",
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
  	//获取参数回调
  	getConfigResult(data){
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Time-Properties"];
    		if(this.useData.TimeCheck.ManualCheck.SyncPC){
    			this.setSyncTime();
    		}else{
    			this.setDeviceTime();
    		}
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "TimeSet"
    }
	this.socketApi.sendSock(agentData,this.getConfigResult);
  },
  filters: {
  	transStampToTime:function(timestamp){
		var date = new Date(timestamp*1000);
		var year = date.getFullYear();
		var mon = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		return year+"-"+pad(mon,2)+"-"+pad(day,2)+" "+ pad(hour,2)+":"+pad(min,2)+":"+pad(sec,2);
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.menuDiv{
	text-align: left;
	margin-left: 10vw;
}
p{
	font-weight: bold;
	margin-bottom: 2.2vh;
	margin-top: 4.4vh;
	font-size: 1.1vw;
}
.params{
	margin-bottom: 4.4vh;
}
.param,.paramSec{
	margin-bottom: 2.2vh;
}
.paramSync{
	margin-left: 2.8vw;
}
.param label{
	display: inline-block;
	width: 7vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.param input{
	margin-right: 1vw;
}
.btns{
	/*margin-left: 2.7vw;*/
	margin-top: 13.2vh;
	text-align: left;
}
select{
	padding-left: 0.2vw;
}
.timezone select{
	width: 25.4vw;
	background-position: 24vw center;
}
.testBtn:disabled{
	background: #CDCDCD;
}
.testBtn[disabled]{
	background: #CDCDCD;
}
</style>
