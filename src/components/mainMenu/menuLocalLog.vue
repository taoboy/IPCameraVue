<template>
	<div class="menuDiv">
		<div class="param">
			<label for="">开始时间</label>
			<el-date-picker
		      v-model="startValue"
		      type="date"
		      placeholder="请选择开始时间">
		    </el-date-picker>
		</div>
		<div class="param">
			<label for="">结束时间</label>
			<el-date-picker
		      v-model="endValue"
		      type="date"
		      placeholder="请选择结束时间">
		    </el-date-picker>
		</div>
		<div class="param">
			<label for="">日志类型</label>
			<select v-model="logType" name="">
				<option value="OPERATE">操作日志</option>
				<option value="ERROR">异常日志</option>
				<option value="INFO">服务日志</option>
				<option value="ALARM">报警日志</option>
				<option value="ALL">全部</option>
			</select>
			<button @click="clickSearch" class="testBtn search">查询</button>
		</div>
		<div class="param logList">
			<label for="">日志列表</label>
			<button id="export" @click="clickExport" class="testBtn">导出</button>
		</div>
		<div class="param tableDiv">
			<table id="logTable" cellspacing="" cellpadding="">
				<tr>
					<th>序号</th>
					<th>日志时间</th>
					<th>日志类型</th>
					<th>详细信息</th>
					<th>用户</th>
				</tr>
				<tr v-for="(item,index) in allLogs">
					<td>{{index+1}}</td>
					<td>{{item.Time | transTime}}</td>
					<td>{{item.Type}}</td>
					<td>{{item.Content}}</td>
					<td>{{item.User}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
  name: 'localService',
  components: {
  },
  data () {
    return {
    	startValue: '',		//开始时间
    	endValue: '',		//结束时间
    	logType: 'ALL',		//日志类型
    	msgData: null,
    	allLogs: []			//日志内容
    }
  },
  computed: {
  },
  methods:{
  	//点击查询
  	clickSearch(){
  		var start = this.startValue.getTime()/1000;
  		var end = this.endValue.getTime()/1000;
  		var param = {
			"profile-version": "1.0",
			"Log-Get":{
				"Start" : start,               
				"End" : end,
				"Type" : this.logType  
			}
		}
  		var sendObj = {
			"method" : "GetConfig",
			"page" : "Log",
			"Message" : param
		}
		console.log("发送请求日志数据："+JSON.stringify(sendObj));
		this.socketApi.sendSock(sendObj,this.getConfigResult);
  	},
  	//查询数据-回调
  	getConfigResult(data){
  		console.log("日志返回："+JSON.stringify(data));	
  		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.allLogs = this.msgData["Log-Get"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//点击导出
  	clickExport(){
  		 $("#logTable").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: "log.xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            fileext: ".xls"
        });
  	},
  },
  mounted:function(){
  },
  filters: {
	  transTime: function (timestamp) {
	  	//将标准时间转成 年:月:日
	  	var date = new Date(timestamp*1000);
		var year = date.getFullYear();
		var mon = date.getMonth()+1;
		var day = date.getDate();
		mon = mon<10? ('0'+mon) : mon;
		day = day<10? ('0'+day) : day;
		return year+"-"+mon+"-"+day;
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.menuDiv{
	margin-left: 10vw;
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
	font-size: 1.1vw;
	margin-right: 4.4vw;
}
.search{
	margin-left: 1.4vw;
}
.logList{
	margin-top: 4.4vh;
}
.tableDiv{
	/*width: 56.9vw;*/
	height: 50vh;
	overflow-y: auto;
}
table{
	width: 56.6vw;
	border: 1px solid #CDCDCD;
}
tbody{
	height: 10vh;
	overflow: hidden;
}
table tr td:nth-child(1){
	width: 3vw;
}
table tr td:nth-child(2){
	width: 6vw;
}
table tr td:nth-child(3){
	width: 6vw;
}
table tr td:nth-child(5){
	width: 6vw;
}
table tr td{
	padding: 0.8vw;
	text-align: center;
	font-size: 0.97vw;
}
table tr td,table tr th{
	border-right: 1px solid #C0C4CA;
}
table tr th{
	background: #E6EFFB;
	text-align: center;
	height: 4.4vh;
	line-height: 4.4vh;
	font-size: 1.1vw;
}
table tr:nth-child(odd){
	background: #E6EFFB;
}
</style>
