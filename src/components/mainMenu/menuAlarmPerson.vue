<template>
	<div class="menuDiv2">
		<div class="param1">
			<input type="checkbox" v-model="useData.Enable" name="" id="person" value="" />
			<label for="person">启用禁区人员检测</label>
		</div>
		<div class="personMain" v-show="useData.Enable">
			<p class="param">布防时间</p>
			<div class="param">
				<button @click="deleteCur" class="delBtn">删除</button>
				<button @click="deleteAll" class="delBtn">删除全部</button>
			</div>
			<div class="checkTime">
				<p class="scale">
					<span v-for="n in timeScale">{{n}}</span>
					24
				</p>
				<div class="scaleDiv" v-for="(item,index) in line">
					<span class="weekBtn">{{item.weekName}}</span>
					<div @mousedown.left="mouseDownTime(item)" class="timeLine" id="timeLine">
						<!--<div @mousedown.prevent="mouseDownTimeLine(scale)" v-for="scale in item.scaleLine" @click="selectScale(scale)" class="scaleLine" v-bind:class="{scaleLineSele: scale.select}" :style="{width:scale.width+'px',left:scale.start+'px'}">
						</div>-->
						<div v-for="scale in item.scaleLine" @click="selectScale(scale)" class="scaleLine" v-bind:class="{scaleLineSele: scale.select}" :style="{width:scale.width+'px',left:scale.start+'px'}">
						</div>
					</div>
					<button @click="clickCopy(index)" class="copy"></button>
				</div>
			</div>
		</div>
		<div class="btns">
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
		
		<div class="shadow" v-show="showDialog">
			<div class="dialog">
				<p>复制至</p>
				<ul class="weeks">
					<li v-for="item in copy">
						<input type="checkbox" name="weeks" value="" :id="item.idName" v-model="item.checked" :disabled="item.disabled"/>
						<label :for="item.idName">{{item.weekName}}</label>
					</li>
					<li>
						<input @click="clickAllWeek" type="checkbox" name="" value="" id="allWeek"/>
						<label for="allWeek">全选</label>
					</li>
				</ul>
				<div class="dialogBtns">
					<button @click="saveCopy" class="saveBtn">保存</button>
					<button @click="clickCancel" class="recoverBtn">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'alarmPerson',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.alarmPerson,
    	timeScale: [0,2,4,6,8,10,12,14,16,18,20,22],
    	line: [
    		{
    			"id": 1,
    			"weekName": "星期一",
    			scaleLine: []
//  			{"start":0,"width":0,"select":false}	scaleLine内元素的格式
    		},
    		{
    			"id": 2,
    			"weekName": "星期二",
    			scaleLine: []
    		},
    		{
    			"id": 3,
    			"weekName": "星期三",
    			"scaleLine": []
    		},
    		{
    			"id": 4,
    			"weekName": "星期四",
    			"scaleLine": []
    		},
    		{
    			"id": 5,
    			"weekName": "星期五",
    			"scaleLine": []
    		},
    		{
    			"id": 6,
    			"weekName": "星期六",
    			"scaleLine": []
    		},
    		{
    			"id": 7,
    			"weekName": "星期日",
    			"scaleLine": []
    		},
    	],
    	copy: [
    		{
    			"id": 1,
    			"idName": "week1",
    			"weekName": "星期一",
    			"disabled": false,
    			"checked": false
    		},
    		{
    			"id": 2,
    			"idName": "week2",
    			"weekName": "星期二",
    			"disabled": false,
    			"checked": false
    		},
    		{
    			"id": 3,
    			"idName": "week3",
    			"weekName": "星期三",
    			"disabled": false,
    			"checked": false
    		},
    		{
    			"id": 4,
    			"idName": "week4",
    			"weekName": "星期四",
    			"disabled": false,
    			"checked": false
    		},
    		{
    			"id": 5,
    			"idName": "week5",
    			"weekName": "星期五",
    			"disabled": false,
    			"checked": false
    		},
    		{
    			"id": 6,
    			"idName": "week6",
    			"weekName": "星期六",
    			"disabled": false,
    			"checked": false
    		},
    		{
    			"id": 7,
    			"idName": "week7",
    			"weekName": "星期日",
    			"disabled": false,
    			"checked": false
    		},
    	],
    	showDialog: false,
    	copyIndex: '',		//点击复制的元素index
    	timeLineWidth: 0
    }
  },
  computed: {
  },
  methods:{
  	//点击拖动选择时间段
  	mouseDownTime(item,event){
		//时间段距离左边的距离
		var menuDiv2 = document.getElementsByClassName("menuDiv2")[0];
		var timeLine = document.getElementsByClassName("timeLine")[0];
		var leftNum = menuDiv2.offsetLeft + timeLine.offsetLeft;
		//时间段的长度
		var width = timeLine.offsetWidth;
		//鼠标在时间段上的x值
		var oEv=event||window.event;
		var disX=oEv.clientX - leftNum;
		//创建对象
		var obj = {
			"start": disX,
			"select":false,
			"width": 0
		}
		if(item.scaleLine.length < 4){
			item.scaleLine.push(obj);
		}
		document.onmousemove=function(ev){
			var oEv=ev||window.event;
			var x=oEv.clientX - leftNum - disX;
			if(x<0){
				x= 0 ;	
			}else if(x>(width - disX)){
				x= (width - disX);
			}
			obj["width"] = x;
		}
		document.onmouseup=function(ev){
			//如果只是点击，没有拖动时间块，删除对象
			if(item.scaleLine[item.scaleLine.length-1]["width"] <= 0){
				item.scaleLine.pop();
			}
			document.onmousemove = null;
			document.onmouseup = null;
		}
  	},
  	//点击选中当前时间段
  	selectScale(scale){
  		console.log("点击选中的时间段："+JSON.stringify(scale));
  		//将其他时间段改为false 
  		this.line.forEach(function(item){
  			item["scaleLine"].forEach(function(scaleItem){
  				scaleItem.select = false;
  			})
  		})
  		//将当前选中的时间块 改为true
  		scale.select = true;
  		console.log(JSON.stringify(this.line));
  	},
  	//移动时间段
  	mouseDownTimeLine(scale,event){
  		//时间段距离左边的距离
		var menuDiv2 = document.getElementsByClassName("menuDiv2")[0];
		var timeLine = document.getElementsByClassName("timeLine")[0];
		var leftNum = menuDiv2.offsetLeft + timeLine.offsetLeft;
		//时间段的长度
		var width = timeLine.offsetWidth;
		//鼠标在时间段上的x值
		var oEv=event||window.event;
		var disX=oEv.clientX - leftNum;
		//left的最大值
		var leftMax = timeLine = scale["width"];
		document.onmousemove=function(ev){
			console.log("111");
			var oEv=ev||window.event;
			var left=oEv.clientX - leftNum;
			if(left<0){
				left = 0 ;	
			}else if(left>leftMax){
				left = leftMax;
			}
			scale["start"] = leftMax;
		}
		document.onmouseup=function(ev){
			document.onmousemove = null;
			document.onmouseup = null;
		}
  	},
  	//点击全选
  	clickAllWeek(event){
  		var check = event.target.checked;
  		this.copy.forEach(function(val,index){
  			val.checked = check;
  		})
  	},
  	//点击复制
  	clickCopy(index){
  		this.showDialog = true;
  		this.copy[index]["disabled"] = true;	//当前的星期几不用勾选
  		//点击复制一次，初始化copy数组一次
  		this.copy.forEach(function(item){
  			item.disabled = false;
  			item.checked = false;
  		})
  		this.copyIndex = index;
  	},
  	//点击弹框中的保存
  	saveCopy(){
  		var _this = this;
  		//将当前天的scaleLine复制到其他天中
  		this.line.forEach(function(item,index){
  			if(_this.copy[index]["checked"]){
  				var tempArr = _this.line[_this.copyIndex]["scaleLine"].slice(0);
  				console.log("中间数组："+_this.line[_this.copyIndex]["scaleLine"].slice(0));
  				console.log("中间数组2："+JSON.stringify(tempArr));
  				tempArr.forEach(function(temp,tempIndex){
  					item.scaleLine[tempIndex] = JSON.parse(JSON.stringify(temp));
				})
//				item.scaleLine = _this.line[_this.copyIndex]["scaleLine"].slice(0);
  			}
  		})
  		this.showDialog = false;
  	},
  	//点击弹框中的取消
  	clickCancel(){
  		//将弹框隐藏
  		this.showDialog = false;
  	},
  	//点击删除
  	deleteCur(){
  		this.line.forEach(function(item){
  			//删除当前数组中的当前对象
  			item["scaleLine"].forEach(function(scaleItem,index){
  				if(scaleItem["select"]){
  					item["scaleLine"].splice(index,1);
  				}
  			});
  		})
  	},
  	//点击删除全部
  	deleteAll(){
  		this.line.forEach(function(item){
  			item["scaleLine"].splice(0);
  		})
  	},
  	//点击保存
  	clickSave(){
  		//将页面的数据转换成可以发送的
  		for(var i=0;i<this.useData.TimeSets.length;i++){
  			var index = this.useData.TimeSets[i].Dayofw-1;
  			var newArr = this.transPageArr(this.line[index].scaleLine).slice(0);
  			this.useData.TimeSets[index].TimeDurs = newArr;
  		}
  		this.msgData["Restrict-Properties"] = this.useData;
  		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "RestrictDet",
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
  	//获取数据回调
  	getConfigResult(data){
  		console.log(JSON.stringify(data));
		if(data["RetCode"] == 0){
    		this.msgData = JSON.parse(data["Message"]);
    		this.useData = this.msgData["Restrict-Properties"];
			this.transUseData(this.useData);
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//将获取到的数据，转换为页面需要的格式
  	transUseData(useData){
  		var _this = this;
  		var data = useData["TimeSets"];
  		for(var i=0;i<data.length;i++){
  			var timeArr = data[data[i].Dayofw-1].TimeDurs;
  			_this.line[data[i].Dayofw-1].scaleLine = this.transTimeArr(timeArr).slice(0);
  		}
  	},
  	//将返回的数组转换成页面需要的{"Start": ,"End": } --- {"start":0,"width":0,"select":false}
  	transTimeArr(arr){
  		var allSecs = 24 *3600;
  		var newArr = [];
  		for(var i=0;i<arr.length;i++){
  			var obj = {};
  			obj["start"] = Math.floor(arr[i].Start/allSecs*this.timeLineWidth);
  			obj["width"] = Math.floor((arr[i].End - arr[i].Start)/allSecs*this.timeLineWidth);
  			obj["select"] = false;
  			newArr.push(obj);
  		}
  		return newArr;
  	},
  	//将页面数据转换为发送的数组 {"start":0,"width":0,"select":false}---{"Start": ,"End": }
  	transPageArr(arr){
  		var allSecs = 24 *3600;
  		var newArr = [];
  		for(var i=0;i<arr.length;i++){
  			var obj = {};
  			obj["Start"] =  Math.floor(arr[i].start/this.timeLineWidth*allSecs) ;
  			obj["End"] = Math.floor((arr[i].start + arr[i].width)/this.timeLineWidth*allSecs) ;
  			newArr.push(obj);
  		}
  		return newArr;
  	}
  },
  mounted: function(){
  	this.timeLineWidth = document.body.clientWidth*42.8/100;
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "RestrictDet"
    }
	this.socketApi.sendSock(agentData,this.getConfigResult);
  },
  filters: {
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
p.param{
	font-size: 1.1vw;
	font-weight: 600;
	margin-top: 4.4vh;
	margin-bottom: 2.2vh;
}
.param label{
	display: inline-block;
	width: 5.2vw;
	text-align: left;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.param1{
	margin-bottom: 2.2vh;
}
.btns .saveBtn{
	position: absolute;
	left: 0;
	top: 72vh;
}
.checkTime{
	width: 57.3vw;
	height: 44.3vh;
	border: 1px solid rgba(153,153,153,1);
}
.checkTime .scale{
	width: 42.8vw;
	margin: 0.5vw 0 0 6.2vw;
}
.scale span{
	display: inline-block;
	width:3.4vw;
	text-align: left;
	color: #4A4A4A;
}
.checkTime .timeLine{
	width: 42.8vw;
	height: 2.2vh;
	background: #E6EFFB;
	position: relative;
}
.timeLine .scaleLine{
	height: 2.2vh;
	background: #61A5FF;
	position: absolute;
	top: 0;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
}
.timeLine .scaleLineSele{
	border-left: 1px solid #000;
	border-right: 1px solid #000;
}
.checkTime .copy{
	width: 5.5vw;
	height: 3.3vh;
	text-align: center;
	line-height: 3.3vh;
	border-radius: 5px;
	border: none;
	background: url(~assets/menu/copy.png) no-repeat center;
}
.checkTime .copy:visited{
	border: none;
}
.scaleDiv span,.scaleDiv div{
	float: left;
}
.scaleDiv{
	margin-top: 2.2vh;
	margin-left: 1.4vw;
	overflow: hidden;
}
.scaleDiv .timeLine{
	margin: 0.5vh 1.4vw 0.5vh 0.7vw;
}
/*弹框样式*/
.shadow{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(230,239,251,0.5);
}
.dialog{
	width: 33.9vw;
	height: 29.1vh;
	border: 1px solid #61A5FF;
	background: rgba(255,255,255,1);
	margin: 35.4vh auto 0;
}
.dialog p{
	margin-top: 4.4vh;
	margin-left: 2.7vw;
	text-align: left;
	font-size: 1.1vw;
	font-weight: bold;
}
.dialog .weeks{
	margin-left: 2.7vw;
	margin-top: 2.2vh;
	font-size: 0.97vw;
	overflow: hidden;
}
.dialog .weeks li{
	float: left;
	margin-right: 2.7vw;
	margin-bottom: 2.2vh;
}
.dialog .weeks li label{
	font-size: 0.97vw;
}
.dialog .dialogBtns{
	margin-left: 2.7vw;
	margin-top: 4.4vh;
}
.dialog .dialogBtns button{
	border-radius: 5px;
}
.dialog .dialogBtns .recoverBtn{
	margin-left: 7.5vw;
}

.delBtn{
	margin-right: 2.7vw;
	font-size: 0.97vw;
}
</style>
