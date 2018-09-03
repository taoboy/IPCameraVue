export default{
	install(Vue){
		//获取页面地址的IP
		Vue.prototype.getPageAddr = () =>{
			var addr = "";
			var curAddr = window.location.href.split(":")[1];	
			var curIP = curAddr.substring(2).split("/")[0];
			return curIP;
//			return "10.58.122.105";
		}
		
		//停止播放视频
		Vue.prototype.stopPlayVideo = (videoID) =>{
			try{
				videoID.StopPlay();
			}catch(e){
				console.log("不支持视频插件停止播放");
			}
		}
		
		//下载视频插件地址
		Vue.prototype.loadVideoPlug = () =>{
			return "http://"+ Vue.prototype.getPageAddr()+"/ocx/setup.exe"; 
		}
		
		//获取浏览器是否安装视频插件
		Vue.prototype.testVideoPlugin = () =>{
			var a = false;
			try {
		        var obj = new ActiveXObject("XGPLAYACT.XgPlayActCtrl.1");
		        a = true;
		    } catch (e) {
		        a = false;    
		    };
		    return a
		}
		
		//将json数据中的"true" 转成布尔类型  true
		Vue.prototype.transJsondata = (jsonData) =>{
			for(var key in jsonData){
				if(typeof(jsonData[key]) == "object" && (!(jsonData[key] instanceof Array))){
					Vue.prototype.transJsondata(jsonData[key]);
				}else{
					if(jsonData[key] == "true"){
						jsonData[key] = true;
					}else if(jsonData[key] == "false"){
						jsonData[key] = false;
					}
				}
			}
		}
		
		//获取浏览器类型
		Vue.prototype.getBrowser = () =>{
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		    var isOpera = userAgent.indexOf("Opera") > -1;
		    if (isOpera) {
		        return "Opera"
		    }; //判断是否Opera浏览器
		    if (userAgent.indexOf("Firefox") > -1) {
		        return "FF";
		    } //判断是否Firefox浏览器
		    if (userAgent.indexOf("Chrome") > -1){
			  return "Chrome";
			}
		    if (userAgent.indexOf("Safari") > -1) {
		        return "Safari";
		    } //判断是否Safari浏览器
		    if (!!window.ActiveXObject || "ActiveXObject" in window){
		    	return "IE";
		    }
		    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		        return "IE";
		    }; //判断是否IE浏览器
		}
		
		//将时间戳转换为显示的时间格式
		Vue.prototype.transStampToTime = (timestamp) =>{
			var date = new Date(timestamp*1000);
			var year = date.getFullYear();
			var mon = date.getMonth()+1;
			var day = date.getDate();
			var hour = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();
			return year+"-"+Vue.prototype.pad(mon,2)+"-"+Vue.prototype.pad(day,2)+" "+ Vue.prototype.pad(hour,2)+":"+Vue.prototype.pad(min,2)+":"+Vue.prototype.pad(sec,2);
		}
		
		//将时间格式yyyy-MM-DD HH:mm:ss转为时间戳
		Vue.prototype.transTimeToStamp = (time) =>{
			var date = new Date(time.replace(/-/g, '/'));
			return date.getTime()/1000;
		}
		
		//将标准时间格式【Mon Aug 06 2018 00:00:00 GMT+0800 (中国标准时间)】转为时间戳
		Vue.prototype.transStandardTime = (time) =>{
			var date = new Date(time);
			return Math.floor(date.getTime()/1000);
		}
		
		//将标准格式【Mon Aug 06 2018 00:00:00 GMT+0800 (中国标准时间)】转换为时间格式【19:00:30】
		Vue.prototype.transStandard = (time) =>{
			var date = new Date(time);
			var hour = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();
			return Vue.prototype.pad(hour,2)+":"+Vue.prototype.pad(min,2)+":"+Vue.prototype.pad(sec,2);
		}
		
		//将页面的时间转换成发送的格式  例如：19:00:30--->6840030
		Vue.prototype.transTimeToSecs = (time) =>{
			var timeArr = time.split(":");
			var hour = parseInt(timeArr[0]);
			var min = parseInt(timeArr[1]);
			var sec = parseInt(timeArr[2]);
			return hour*3600+min*60+sec;
		}
		
		//将服务器传过来的时间，转换成显示在页面上的，
		//服务器时间格式为 小时*3600+分钟*60+秒 ----->小时:分钟:秒
		Vue.prototype.transSecsToTime = (secs) =>{
			var sec =  secs%60;
			var min = (secs-sec)%3600/60;
			var hour = (secs-sec-min*60)/3600;
			return Vue.prototype.pad(hour,2)+":"+Vue.prototype.pad(min,2)+":"+Vue.prototype.pad(sec,2);
		}
		
		//数字前补0   num---传入数字		n---数字的位数，不够的在数字前面补0
		Vue.prototype.pad = (num, n) =>{
			if(n == undefined){
				n = 2;
			}
		    var len = num.toString().length;  
		    while(len < n) {  
		        num = "0" + num;  
		        len++;  
		    }  
		    return num+"";  
		}
		
		//返回升级提示语
		Vue.prototype.allTips = (tipCode) =>{
			var tips = '';
			switch (tipCode){
				case "-1":{tips = "升级包格式错误";}break;
				case "-2":{tips = "硬件版本不匹配";}break;
				case "-3":{tips = "产品型号不匹配";}break;
				case "-4":{tips = "升级包版本过低";}break;
				case "-5":{tips = "获取产品信息错误";}break;
				case "-6":{tips = "设置产品信息错误";}break;
				case "-7":{tips = "设备操作冲突";}break;
				case "-10":{tips = "升级包为空";}break;
				case "-14":{tips = "升级包文件错误";}break;
				case "-15":{tips = "升级包校验错误";}break;
				case "-16":{tips = "升级包不包含有效固件版本信息";}break;
				case "-25":{tips = "升级包上传失败";}break;
				case "0":{tips = "升级结束";}break;
				case "1":{tips = "设备正在升级";}break;
				default:{tips = tipCode;}
					break;
			}
			return tips;
		}
		
		//获取是否为手机
		Vue.prototype.getPhone = () =>{
		    var sUserAgent = navigator.userAgent.toLowerCase();
		    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		    var bIsAndroid = sUserAgent.match(/android/i) == "android";
		    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		        return "phone";
		    } else {
		        return "pc";
		    }
		}
		
		// 从网页地址上获取请求参数
		Vue.prototype.getLocationString = (name) =>{
			name = decodeURI(decodeURI(name));
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		}

		/**
	   	* 自动补0前缀(1->01)，(示例：formatNum(1, 3)->001)
	   	* @param num 要被处理的数字
	   	* @param n 补0的位数
	     */
	    Vue.prototype.formatNum = (num, n) => {
		    if(n == undefined){
				n = 2;
			}
		    var len = num.toString().length;  
		    while(len < n) {  
		        num = "0" + num;  
		        len++;  
		    }  
		    return num; 
		}


		// 生成随机字符串加时间戳
		Vue.prototype.randomChar = (l) => {
			var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
			var  tmp="";
			var timestamp = new Date().getTime();
			for(var  i=0;i<  l;i++)  {
				tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
			}
			return  timestamp+tmp;
		}

		/*排列算法arrangement*/
		Vue.prototype.arrangement = (function f(n, m){
		    if (m <= 0) {
		      return 1
		    }
		    if (m == 1) {
		      return n
		    } else {
		      return n * f(n - 1, m -1)
		    }
		})

		/*组合算法combination */
		Vue.prototype.combination = (n, m) => {
		    if ((n - m) < 0) {
		      return 0
		    }
		    m = (n - m) > m ? m : (n - m)
		    let a = Vue.prototype.$A(n, m)
		    let b = Vue.prototype.$A(m, m)
		    let suan = a / b
		    return suan
		}

		/**
		   * 随机一个数字（指定最小值，最大值）
		   * @param min 最小值
		   * @param max 最大值
		*/
		Vue.prototype.randomNum = (min, max) => {
		  return (Math.round(Math.random() * (max - min)) + min)
		}

		/**
		   * 随机获得指定长度的不相同整数
		   * @param min 最小值
		   * @param max 最大值
		   * @param length 数组长度
		   * @param repeat 是否有重复数字
		   * @returns {Array}
		*/
		Vue.prototype.randomNumArr = (min, max, length, repeat) => {
		    let num = new Array()
		    if (min >= 0) {
		      for (let i = 0; i < length; i++) {
		        let val = Vue.prototype.randomNum(min, max)

		        if (val < 10) {
		          val = '0' + val;
		        }else{
		          val = ''+val;
		        }

		        if (!repeat) {
		          let isEqu = false
		          for (let index in num) {
		            if (num[index] == val) {isEqu = true; break}
		          }
		          if (isEqu) {
		            i--
		          } else {
		            num[num.length] = val
		          }
		        } else {
		          num[num.length] = val
		        }
		      }
		    }
		    return num
		}
	}
}

	
