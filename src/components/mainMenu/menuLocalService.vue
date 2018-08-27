<template>
	<div class="menuDiv">
		<p>设备重启</p>
		<div>
			<button @click="clickRestart" class="saveBtn restart">重启</button>
			<span>重启后需刷新网页重新登录</span>
		</div>
		<p>恢复出厂设置</p>
		<div>
			<button @click="clickRestore" class="saveBtn">恢复出厂设置</button>
		</div>
		<p>参数导出</p>
		<div>
			<a :href="exportUrl"><button class="saveBtn">导出</button></a>
		</div>
		<p>参数导入</p>
		<div class="btnDiv">
			<span>设备参数</span>
			<!--<form id="form1" enctype="multipart/form-data" style="display: inline-block;">-->
				<input readonly="readonly" type="text" :value="expFileName"/>
				<div style="position: relative; display: inline-block;">
					<input @change="getExpFile($event)" id="expFile" class="fileInput" type="file" name="" value="" />
					<button class="testBtn">浏览</button>
				</div>
			<!--</form>-->
			<button @click="clickImport" class="testBtn">导入</button>
		</div>
		<p>系统升级</p>
		<div class="btnDiv">
			<span>升级文件</span>
			<!--<form style="display: inline-block;">-->
				<input readonly="readonly" type="text" :value="proFileName"/>
				<div style="position: relative; display: inline-block;">
					<input @change="getProFile($event)" id="fileField" class="fileInput" type="file" name="" value="" />
					<button class="testBtn">浏览</button>
				</div>
			<!--</form>-->
			<button @click="clickPromotion" class="testBtn">升级</button>
		</div>
		
		
		<!--弹框-->
		<div class="shadow" v-show="dialogFlag">
			<div class="dialog">
				<p class="title">温馨提示</p>
				<p class="tips">{{dialogTips}}</p>
				<div v-show="gressFlag" class="progress">
					<div class="sGress" :style="{width: gressWidth+'%'}">
						<p style="">{{gressWidth}}%</p>
					</div>
				</div>
			</div>
		</div>
		
		<!--弹框，需要确认的框-->
		<div class="shadow" v-show="dialog2Flag">
			<div class="dialog2">
				<p class="title">提示</p>
				<p class="tips" v-html="dialog2Tips"></p>
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
  name: 'localLog',
  components: {
  },
  data () {
    return {
//  	sendUrl:"10.58.122.108",		//请求的地址
    	sendUrl:'',		//请求的地址
    	dialogFlag: false,				//弹框是否显示
    	dialogTips: "",	//弹框的提示语
    	gressFlag: false,		//进度条是否显示
    	gressWidth: 0,			//进度条长度
    	exportUrl: "",	//导出文件的地址
    	proFile: '',			//升级文件包
    	proFileName: '',		//升级文件名	
    	expFile: '',			//导出文件
    	expFileName: '',			//导出文件名
    	dialog2Flag: false,				//弹框是否显示
    	dialog2Tips: "",	//弹框的提示语
    	dialog2Type: ''		//弹框的类型，根据弹框类型，判断是哪个功能来调对应方法
    }
  },
  computed: {
  },
  methods:{
  	//点击弹框的取消
  	clickCancel(){
  		this.dialog2Flag = false;
  	},
  	//点击弹框的确定
  	clickSure(){
  		this.dialog2Flag = false;
  		if(this.dialog2Type == "restart"){
  			console.log("重启");
			this.restartFun();
  		}else if(this.dialog2Type == "restore"){
  			console.log("恢复出厂设置");
			this.restoreFun();
  		}
  	},
  	//点击重启
  	clickRestart(){
  		this.dialog2Tips = "重启后需刷新网页重新登录<br>请确认是否重启？";
  		this.dialog2Flag = true;
  		this.dialog2Type = "restart";
  	},
  	//点击恢复出厂设置
  	clickRestore(){
  		this.dialog2Tips = "系统将完全恢复成出厂原始状态<br>确认请点击确认按钮？";
  		this.dialog2Flag = true;
  		this.dialog2Type = "restore";
  	},
  	//重启
  	restartFun(){
  		var _this = this;
  		$.ajax({
			type:"get",
			url:"http://"+this.sendUrl+"/device.php?action=reboot",
			async:true,
			success:function(data){
				console.log("重启成功："+JSON.stringify(data));
				if(data == "True"){
					window.location.href = "http://"+_this.getPageAddr();
				}else{
					_this.$emit("errorAlert","重启失败");
				}
			},
			error:function(info){
				_this.$emit("errorAlert","重启失败"+JSON.stringify(info));
				console.log("重启失败："+JSON.stringify(info));
			}
		});
  	},
  	//恢复出厂设置
  	restoreFun(){
  		var _this = this;
  		$.ajax({
			type:"get",
			url:"http://"+this.sendUrl+"/device.php?action=restore",
			async:true,
			success:function(data){
				console.log("恢复出厂设置成功："+JSON.stringify(data));
				if(data == "True"){
					_this.$emit("successAlert","恢复出厂设置成功,请输入原始IP进行登录");
				}else{
					_this.$emit("errorAlert","很抱歉，恢复出厂设置失败");
				}
			},
			error:function(info){
				console.log("恢复出厂设置失败："+JSON.stringify(info));
				_this.$emit("errorAlert","很抱歉，恢复出厂设置失败");
			}
		});
  	},
  	//选择导入文件
  	getExpFile(event){
  		this.expFile = event.target.files[0];
        this.expFileName = event.target.value;
        console.log(this.expFile);
  	},
  	//点击导入
  	clickImport(){
  		var _this = this;
  		var files = document.getElementById("expFile").files;
		if(files.length < 1){
			this.$emit("warnAlert","请选择导入文件");
			return;
		}
		_this.dialogTips = "正在导入...";
		_this.dialogFlag = true;
		let formData = new FormData();
		formData.append('file', this.expFile);
		let config = {
         	 headers: {
            	'Content-Type': 'multipart/form-data'
            }
        }
        this.$http.post('http://'+_this.sendUrl+'/device.php?action=loadparams', formData, config)
	        .then(function (res) {
	        	if(res["data"] == "True"){
	        		console.log("导入成功");
	        		_this.dialogTips = "导入成功，正在重启...";
	        	}else{
	        		console.log("导入失败");
	        		_this.dialogTips = "导入失败。";
	        		_this.dialogFlag = false;
                }
	        })
	        .catch(function(err){
	        	console.log("导入catch："+JSON.stringify(err));
	        	_this.dialogTips = "导入失败。";
            	_this.dialogFlag = false;
	        })
	        
	    var timer2 = 0;
	    if(timer2){
	    	clearTimeout(timer2);
	    }
	    timer2 = setTimeout(function(){
	    	_this.dialogFlag = false;
	    	window.location.href = "http://"+_this.getPageAddr();
	    },60000)
  	},
  	//获取升级包
  	getProFile(event) {
        this.proFile = event.target.files[0];
        this.proFileName = event.target.value;
        console.log(this.proFile);
    },
  	//点击升级
  	clickPromotion(){
  		var _this = this;
  		var files = document.getElementById("fileField").files;
		if(files.length < 1){
			this.$emit("warnAlert","请选择升级文件。");
			return;
		}else{
			var nameArr = files[0].name.split(".");
			var nameSuffix = nameArr[nameArr.length-1];
			if(nameSuffix != "tar"){
				this.$emit("warnAlert","文件格式有误，请重新上传。");
				return;
			}
		}
		this.dialogTips = "正在上传升级包...";
		this.dialogFlag = true;
		let formData = new FormData();
		formData.append('file', this.proFile);
		let config = {
          headers: {
            	'Content-Type': 'multipart/form-data'
            }
        }
        this.$http.post('http://'+this.sendUrl+'/upgrade.php?action=upload', formData, config)
	        .then(function (res) {
	        	if(res["data"] == "True"){
	        		_this.dialogTips = "升级中，请勿关闭页面...";
                	_this.upgradeFile();
	        	}else{
	        		_this.$emit("errorAlert","上传失败");
                	_this.dialogFlag = false;
                }
	        })
	        .catch(function(err){
	        	_this.$emit("errorAlert","上传失败");
            	_this.dialogFlag = false;
	        	console.log("错误："+JSON.stringify(err));
	        })
  	},
  	//文件开始升级
  	upgradeFile(){
  		var _this = this;
  		var files = document.getElementById("fileField").files;
		var fileName = files[0].name;
		$.ajax({
			type:"get",
			url:"http://"+this.sendUrl+"/upgrade.php?action=start&file="+fileName,
			async:true,
			success:function(data){
				console.log("开始升级完成："+JSON.stringify(data));
				if(data == "True"){
					_this.upgradeProgress();
				}else{
					_this.dialogFlag = false;
					_this.$emit("errorAlert",_this.allTips(data));
				}
			},
			error:function(info){
				console.log("开始升级失败："+JSON.stringify(info));
				_this.dialogFlag = false;
				_this.$emit("errorAlert",_this.allTips(data));
			}
		});
  	},
  	//请求文件升级进度
	upgradeProgress(){
		var _this = this;
		var timer0 = 0;
		$.ajax({
			type:"get",
			url:"http://"+this.sendUrl+"/upgrade.php?action=getpace&"+Math.random(),
			async:true,
			success:function(data){
				console.log("success进度："+JSON.stringify(data));
				_this.gressFlag = true;
				if(data.indexOf("1_1") > -1){
					//还未开始升级
					_this.gressWidth = 0;
				}else{
					_this.gressWidth = data.substring(0,data.length-1);	//data的最后有\n
				}
				if(_this.gressWidth == 100){
					clearTimeout(timer0);
					_this.dialogTips = "升级完成，正在重启...";
					if(timer1){
						clearTimeout(timer1);
					}
					var timer1 = setTimeout(function(){
						_this.dialogFlag = false;
						window.location.href = "http://"+_this.sendUrl;
					},60000);
				}
			},
			error:function(info){
				console.log("error进度："+JSON.stringify(info));
			}
		});
		if(timer0){
			clearTimeout(timer0);
		}
		timer0 = setTimeout(_this.upgradeProgress,1000);
	}
 },
  mounted: function(){
  	this.sendUrl = this.getPageAddr();
  	console.log("跳转页面地址："+this.sendUrl);
  	this.exportUrl = "http://"+this.getPageAddr()+"/device.php?action=exportparams";
  
  	if(this.$route.query.state){
  		//如果有参数，就是从登陆页面跳转的，正在升级中，获取升级进度
  		this.upgradeProgress();
  		this.dialogTips = "升级中，请勿关闭页面...";
		this.dialogFlag = true;
  	}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.shadow{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(230,239,251,0.5);
}
.dialog{
	width: 25vw;
	height: 25vh;
	background: #fff;
	position: absolute;
	top: 30vh;
	left: 40vw;
}
.dialog .title{
	height: 4.5vh;
	line-height: 4.5vh;
	text-align: center; 
	font-size: 1.3vw;	
	font-weight: normal;
	background: #61A5FF;
	color: #fff;
}
.dialog .tips{
	margin-top: 8vh;
	text-align: center;
}

.dialog2{
	width: 32.1vw;
	height: 24.7vh;
	background: #fff;
	position: absolute;
	top: 30vh;
	left: 40vw;
}
.dialog2 .title{
	text-align: center;
	margin-top: 4.4vh;
	margin-bottom: 2.2vh;
}
.dialog2 .tips{
	height: 5.5vh;
	padding: 0 1vw;
	font-weight: normal;
	text-align: center;
	line-height: 3vh;
}
.dialog2 .btns .saveBtn{
	margin-left: 2.7vw;
	margin-right: 5.7vw;
}
.dialog2 .btns button{
	border-radius: 5px;
}

/*进度条*/
.progress{
	position: relative; 
	width: 23vw; 
	height: 2.5vh; 
	margin: 0 auto; 
	z-index: 0;
	border-radius: 10px; 
	background: #555;
}
.sGress{
	width: 20%; 
	height: 2.5vh; 
	position: absolute;
	left: 0; 
	top: 0; 
	background: #0062B2; 
	z-index: 2; 
	border-radius: 10px;
}
.sGress p{
	line-height: 2.5vh; 
	color: #fff; 
	font-size: 0.9vw;
	margin-left: 1vw;
}

.menuDiv{
	margin-left: 10vw;
	text-align: left;
}
p{
	font-size: 1.1vw;
	font-weight: bold;
	margin-bottom: 2.2vh;
}
span{
	font-size: 0.97vw;
}
.btnDiv span{
	font-size: 1.1vw;
}
.menuDiv>div{
	margin-bottom: 4.4vh;
}
.restart{
	margin-right: 1.4vw;
}
.btnDiv input{
	margin-left:4.4vw;
	margin-right: 1.4vw;
}
.btnDiv button{
	margin-right: 2.7vw;
}
.btnDiv .fileInput{
	width: 5.5vw;
	border-radius: 5px;
	filter: alpha(opacity:0);
	opacity: 0;
	position: absolute;
	left: 0;
	top: 0;
	margin: 0;
}
</style>
