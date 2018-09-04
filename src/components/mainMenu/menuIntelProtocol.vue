<template>
	<div class="menuDiv">
		<div class="params">
			<div class="param">
				<label for="">传输协议类型</label>
				<select v-model="useData.Policy" name="">
					<option value="private">私有协议</option>
			        <option value="ftp">FTP</option>
				</select>
			</div>
			<!--私有协议-->
			<div v-if="useData.Policy == 'private'">
				<div class="param">
					<label for="">服务器地址</label>
					<input v-model="useData.PrivateParam.Server" type="text" name="" value="" />
				</div>
				<div class="param">
					<label for="">端口号</label>
					<input v-model.number="useData.PrivateParam.Port" type="text" name="" value="" />
				</div>
				<div class="param">
					<label for="">密钥</label>
					<input v-model="useData.PrivateParam.PrivateKey" type="password" name="" value="" />
				</div>
				<div class="param">
					<label for="">图片名</label>
					<select v-model.number="useData.PrivateParam.NamePolicy" type="text" name="">
						<option value="0">默认</option>
				        <option value="1">自定义</option>
					</select>
				</div>
				<div class="param" v-show="useData.PrivateParam.NamePolicy == 1">
					<label for=""></label>
					<input v-model="useData.PrivateParam.PicturePrefix"  placeholder="请输入图片名" type="text" name="" id="" value="" />
				</div>
			</div>
			<!--ftp-->
			<div v-else="">
				<div class="param">
					<label for="">服务器地址</label>
					<input v-model="useData.FtpParam.Server" type="text" name="" value="" />
				</div>
				<div class="param">
					<label for="">端口号</label>
					<input v-model.number="useData.FtpParam.Port" type="text" name="" value="" />
				</div>
				<div class="param">
					<label for="">用户名</label>
					<input v-model="useData.FtpParam.User" type="text" name="" value="" />
				</div>
				<div class="param">
					<label for="">密码</label>
					<input v-model="useData.FtpParam.Password" type="password" name="" value="" />
				</div>
				<div class="param">
					<label for="">图片目录结构</label>
					<select v-model.number="useData.FtpParam.PathPloicy" name="">
				        <option value="0">保存在根目录</option>
				        <option value="1">一级目录</option>
				        <option value="2">二级目录</option>
				    </select>
				</div>
				<div v-show="useData.FtpParam.PathPloicy == 1 || useData.FtpParam.PathPloicy == 2" class="param">
					<label for="">一级目录</label>
					<select v-model.number="useData.FtpParam.FirstLevelType" name="">
						<option value="0">设备IP</option>
				        <option value="1">设备名称</option>
				        <option value="2">自定义</option>
			        </select>
	
				</div>
				<div class="param" v-show="useData.FtpParam.FirstLevelType == 2">
					<label for=""></label>
			        <input v-model="useData.FtpParam.FirstLevelName" type="text" placeholder="请输入一级目录名" />
				</div>
				<div v-show="useData.FtpParam.PathPloicy == 2" class="param">
					<label for="">二级目录</label>
					<select v-model="useData.FtpParam.SecondLevelType" name="">
				        <option value="0">通道名</option>
				        <option value="1">通道号</option>
				        <option value="2">自定义</option>
				    </select>
				</div>
				<div v-show="useData.FtpParam.SecondLevelType == 2" class="param">
					<label for=""></label>
			        <input v-model="useData.FtpParam.SecondLevelName" type="text" placeholder="请输入二级目录名" />
				</div>
				<div class="param">
					<label for="">图片归档间隔</label>
				    <input v-model="useData.FtpParam.ArchiveDuration" type="text" name="" placeholder="">
				</div>
				<div class="param">
					<label for="">图片名</label>
					<select v-model.number="useData.FtpParam.NamePolicy" name="">
				        <option value="0">默认</option>
				        <option value="1">自定义</option>
				    </select>
				</div>
				<div v-show="useData.FtpParam.NamePolicy == 1" class="param">
					<label for=""></label>
			        <input v-model="useData.FtpParam.PicturePrefix" type="text" placeholder="请输入图片名" />
				</div>
			</div>
			<div class="upload">
				<input v-model="useData.Enable" type="checkbox" name="" id="upload " value="" />
				<label for="upload ">上传图片</label>
				<button @click="clickTest" class="testBtn">测试</button>
			</div>
		</div>
		
		<div class="buttons">
			<button @click="clickSave" class="saveBtn">保存</button>
		</div>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
  name: 'intelProtocol',
  components: {
  },
  data () {
    return {
    	msgData: null,		//所有的message数据
    	useData: this.CONFIGS.intelProto,
    	loading: 0		//点击测试的加载框
    }
  },
  computed: {
  },
  methods:{
  	//点击测试
  	clickTest(){
  		this.loading = this.$loading({
		  lock: true,
		  text: '测试中',
		  spinner: 'el-icon-loading',
		  background: 'rgba(0, 0, 0, 0.7)'
		});
  		this.transJsondata(this.useData);
  		this.msgData["DetectTrans-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "TestConfig",
		  	"Page" : "DetectTrans",
		  	"Message" : this.msgData
		}
		console.log("发送测试数据："+JSON.stringify(this.msgData));
		this.socketApi.sendSock(sendObj,this.testConfigResult);
  	},
  	//设置参数-回调函数
  	testConfigResult(data){
  		this.loading.close();
  		if(data["RetCode"] == 0){
        	this.$emit("testAlert","测试成功");
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	},
  	//点击保存
  	clickSave(){
  		/***表单验证start****/
  		if(this.useData.Policy == 'private'){
			var port1 = this.validate.port(this.useData.PrivateParam.Port);
  			if(port1){
				this.$emit("warnAlert",port1);
				return;
			}
  			if(this.useData.PrivateParam.NamePolicy == 1){
  				var pic = this.validate.picName(this.useData.PrivateParam.PicturePrefix);
  				if(pic){
					this.$emit("warnAlert",pic);
					return;
				}
  			}
  		}else{
  			var port2 = this.validate.port(this.useData.FtpParam.Port);
  			if(port2){
				this.$emit("warnAlert",port2);
				return;
			}
  		}
		/***表单验证end****/
  		this.transJsondata(this.useData);
  		this.msgData["DetectTrans-Properties"] = this.useData;
		var sendObj={
		  	"Method" : "SetConfig",
		  	"Page" : "DetectTrans",
		  	"Message" : this.msgData
		}
		console.log("发送保存数据："+JSON.stringify(this.msgData));
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
    		this.useData = this.msgData["DetectTrans-Properties"];
        }else{
        	this.$emit("errorAlert",data["Message"]);
        }
  	}
  },
  mounted: function(){
  	const agentData = {
	  	"Method" : "GetConfig",
		"Page" : "DetectTrans"
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
	position: relative;
	
}
.params{
	height: 63.7vh;
	overflow-x: hidden;
	overflow-y: auto;
}
.param{
	margin-bottom: 2.2vh;
	margin-left: 7.6vw;
}
.param label{
	display: inline-block;
	width: 7vw;
	text-align: right;
	font-size: 1.1vw;
	margin-right: 2vw;
}
.upload{
	margin-left: 7.6vw;
}
.testBtn{
	margin-left: 2.3vw;
}
.saveBtn{
	position: absolute;
	left: 10vw;
	top: 72vh;
}
</style>
