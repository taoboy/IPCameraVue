<template>
	<div class="menuDiv">
		<div class="videoShow lt">
			<p v-if="!isIEBorwser">亲，您的视频插件出现异常，不妨换成Internet Explorer浏览器试试~</p>
			<p v-else-if="!isHavePlug">
				亲，您的视频插件尚未安装，请点击<a :href="plugAddr">下载</a>
				<br />请安装完成后，刷新浏览器重试。
			</p>
			<OBJECT v-show="plug" ID="XgPlayAct3" WIDTH="100%" HEIGHT="100%" classid="CLSID:60B238EA-BA74-431F-9F07-F100DFA4BAE3">
			    <PARAM NAME="_Version" VALUE="65536"></PARAM>
			    <PARAM NAME="_ExtentX" VALUE="12806"></PARAM>
			    <PARAM NAME="_ExtentY" VALUE="1747"></PARAM>
			    <PARAM NAME="_StockProps" VALUE="0"></PARAM>
			</OBJECT>
			<!--<img src="~assets/preview/bofang.png" alt="" />-->
		</div>
		<div class="btns lt">
			<div>
				<button class="commonBtn checkBtn">检测区域</button>
				<button class="commonBtn">屏蔽区域</button>
			</div>
			<div>
				<button class="commonBtn del">删除区域</button>
				<button class="saveBtn">保存</button>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import {GET_USERNAME,GET_USERPWD} from '../../store/mutation-types.js'

export default {
  name: 'intelArea',
  components: {
  },
  data () {
    return {
    	isIEBorwser: false,
    	isHavePlug: false,
    	plug: false,
    	plugAddr: ''
    }
  },
  computed: {
	...mapGetters({		//取值
		GET_USERNAME,
		GET_USERPWD
	})
  },
  methods:{
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
			this.socketApi.playVideo("main",XgPlayAct3,this.GET_USERNAME,this.GET_USERPWD);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/commonEle.css");
@import url("../../assets/css/widget.css");
.btns{
	margin-left: 2.7vw;
	margin-top: 8.9vh;
	text-align: left;
}
.checkBtn{
	margin-right: 6.9vw;
	margin-bottom: 11.1vh;
}
.del{
	margin-right: 6.9vw;
}
</style>
