<template>
	<div class="menuDiv">
		<p>播放参数</p>
		<div class="params">
			<div class="param">
				<span>协议类型</span>
				<input type="radio" name="proto" id="tcp" value="" />
				<label for="tcp">TCP</label>
				<input type="radio" name="proto" id="udp" value="" />
				<label for="udp">UDP</label>
			</div>
			<div class="param">
				<span>播放性能</span>
				<input type="radio" name="play" id="play1" value="" />
				<label for="play1">实时</label>
				<input type="radio" name="play" id="play2" value="" />
				<label for="play2">均衡</label>
				<input type="radio" name="play" id="play3" value="" />
				<label for="play3">流畅</label>
			</div>
		</div>
		<p class="titleText">录像文件</p>
		<div class="params">
			<div class="param">
				<span>录像文件大小</span>
				<input type="radio" name="videoSize" id="size1" value="" />
				<label for="size1">256M</label>
				<input type="radio" name="videoSize" id="size2" value="" />
				<label for="size2">512M</label>
				<input type="radio" name="videoSize" id="size3" value="" />
				<label for="size3">1G</label>
			</div>
			<div class="param">
				<span>录像文件格式</span>
				<input type="radio" name="videoFormat" id="" value="" />
				<label for="">MP4</label>
			</div>
			<div class="param">
				<span>保存路径</span>
				<input type="text" name="" id="" value="" />
				<button class="testBtn">浏览</button>
			</div>
		</div>
		<p class="titleText">抓图</p>
		<div class="params">
			<div class="param">
				<span>抓图保存路径</span>
				<input type="text" name="" id="" value="" />
				<button class="testBtn">浏览</button>
			</div>
			<div class="param">
				<span>抓图文件格式</span>
				<input type="radio" name="picFormat" id="pic1" value="" />
				<label for="pic1">JPEG</label>
				<input type="radio" name="picFormat" id="pic2" value="" />
				<label for="pic2">BMP</label>
				<button class="testBtn saveBtn">保存</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'localMemory',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods:{
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
p{
	margin-bottom: 2.2vh;
	font-weight: bold;
}
p.titleText{
	margin-top: 4.4vh;
}
.param{
	margin-bottom: 2.2vh;
}
.param span{
	display: inline-block;
	width: 7vw;
	text-align: right;
	margin-right: 2.5vw;
	font-size: 1.1vw;
}
.param button{
	margin-left: 1.4vw;
}
.param label{
	display: inline-block;
	width: 5.8vw;
	font-size: 0.97vw;
	margin-right: 1vw;
	text-align: left;
}
.param .saveBtn{
	margin-left: 7.2vw;
}
</style>
