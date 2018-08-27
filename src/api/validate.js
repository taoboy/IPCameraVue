 //1.IP地址，判断是否被禁用，没禁用才需要校验
function testIPAddr(value) {
	if(! value){
		return "请输入IP地址";
	}else{
		var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
	    var reg = value.match(exp); 
	    if(reg==null){
	        return "请输入合法的IP地址";
	    }
	}
}

 //2.子网掩码
function mask(value, item){
	if(! value){
		return "请输入子网掩码";
	}else{
		/* 有效性校验 */  
	    var IPPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/  
	    if(!IPPattern.test(value))return "请输入有效的子网掩码";  
	  
	    /* 检查域值 */  
	    var IPArray = value.split(".");  
	    var ip1 = parseInt(IPArray[0]);  
	    var ip2 = parseInt(IPArray[1]);  
	    var ip3 = parseInt(IPArray[2]);  
	    var ip4 = parseInt(IPArray[3]);  
	    /* 每个域值范围0-255 */  
	    if ( ip1<0 || ip1>255   
	       || ip2<0 || ip2>255  
	       || ip3<0 || ip3>255  
	       || ip4<0 || ip4>255 )  {
	       return "请输入合法的子网掩码";  
	    }  
	}
}

//3.网关
function gateway(value, item){
	if(! value){
		return "请输入网关";
	}else{
		
	}
}

//4.首选Dns
function firstDns(value, item){
	if(! value){
		return "请输入DNS";
	}else{
//			    var exp = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9])$/;
//			    var reg = value.match(exp);
//			    if(reg==null){
//			        return "请输入合法的DNS";//不合法
//			    }
	}
}

//5.备选Dns
function Dns(value, item){
//	if(! $(item).is(":disabled")){
//		if(value){
//			var exp = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9])$/;
//		    var reg = value.match(exp);
//		    if(reg==null){
//		        return "请输入合法的DNS";//不合法
//		    }
//		}
//	}
}
  //6.阈值
function threshold(value, item){
  	if(!value){
  		return "请输入有效阈值";
}
	if(Number(value)<0 || Number(value)>1){
		return "请输入0-1的小数";
  	}
}

//7.端口号
function port(value, item){
  	var parten=/^(\d)+$/g;  
 	if(!(parten.test(value)&&parseInt(value)<=65535&&parseInt(value)>=0)){  
        return "请输入正确格式的端口号";  
    } 
}
  //8.密码
  function pwd(value, item){
    //6-20位英文字母、数字或者符号，至少同时包含字母和数字，字母区分大小写		
//	  	   var middle = /(^[a-zA-Z]{6,16}$)|(^[a-z\d]{6,16}$)|(^[A-Z\d]{6,16}$)|(^[A-Z_]{6,16}$)|(^[_\d]{6,16}$)|(^[a-z_]{6,16}$)|(^[A-Z\d]{6,16}$)/g;
  }
  
  //9.目录名
  function catalog(value, item){
  	//64个字符
	if(! value){
		return "请输入目录名";
	}
	if(getStrLength(value) > 64){
		return "目录名过长";
	}
  }
  
  //10.图片名
  function picName(value, item){
  	//64个字符	
	if(! value){
		return "请输入图片名";
	}
	if(getStrLength(value) > 64){
		return "图片名过长";
	}
  }
  
  //11.码率 200-16000
  function testBitRate(value, item){
  	if(! value){
  		return "请输入200~16000的码率值";  
  	}
  	if(value<200 || value>16000){
  		return "请输入200~16000的码率值";  
  	}
  }
  //12.通道名称(摄像机名称) 2）	可输入大小写英文，中文，符号，下划线等。字符长度不得超过24字符。
  function passway(value, item){
  	if(! value){
  		return "请输入通道名称";  
  	}
  	if(getStrLength(value) > 24){
  		return "通道名称过长";  
  	}
  }
  
  function username(value, item){ //value：表单的值、item：表单的DOM对象
    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
      return '用户名不能有特殊字符';
    }
    if(/(^\_)|(\__)|(\_+$)/.test(value)){
      return '用户名首尾不能出现下划线\'_\'';
    }
    if(/^\d+\d+\d$/.test(value)){
      return '用户名不能全为数字';
    }
  }
  //获取字符长度
function getStrLength(str){
	var realLength = 0, len = str.length, charCode = -1;
	for (var i = 0; i < len; i++) {
	    charCode = str.charCodeAt(i);
	    if (charCode >= 0 && charCode <= 128) 
	       realLength += 1;
	    else
	       realLength += 2;
	}
	return realLength;
}
	  
export{testIPAddr,mask,gateway,firstDns,Dns,threshold,port,pwd,catalog,picName,testBitRate,passway,username}

