var websock = null;
var global_callback = null;
var serverPort = '';	//webSocket连接端口
var rtspPort = '';		//视频播放端口
//var serverPort = '8000';	//webSocket连接端口
//var rtspPort = '8554';		//视频播放端口
//initWebSocket();

function getWebIP(){
	var addr = "";
	var curAddr = window.location.href.split(":")[1];	
	var curIP = curAddr.substring(2).split("/")[0];
	return curIP;
//	return "10.58.123.222";
}

//从指定文件目录中获取端口		根目录/port.json
function getCameraPort(){
  	//在指定位置获取json文件中的端口号
  	$.ajax({
		type:"get",
		url:"http://"+getWebIP()+"/port.json",
		async:true,
		success:function(data){
			var message = JSON.parse(data);
			serverPort = message["Port-Properties"]["Service"];
			rtspPort = message["Port-Properties"]["Rtsp"];
			initWebSocket();	//初始化webSocket
		},
		error:function(info){
			console.log("端口失败："+JSON.stringify(info));
		}
	});
}

//播放视频
function playVideo(stream,videoID,name,pwd){
	//格式：rtsp://admin:admin@10.58.122.109:8554/MainStream
	var addr = "";
	if(stream == "main"){
		addr += "rtsp://"+name+":"+pwd+"@" + getWebIP() + ":" + rtspPort + "/MainStream";
	}else{
		addr += "rtsp://"+name+":"+pwd+"@" + getWebIP() + ":" + rtspPort + "/SubStream1";
	}
	try{
		videoID.StartPlay(addr);
	}catch(e){
		console.log("不支持视频插件播放");
	}
}

function initWebSocket(){ //初始化weosocket
    //ws地址
    var wsuri = "ws://" +getWebIP()+ ":" + serverPort;
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
    	websocketonmessage(e);
    } 
    websock.onclose = function(e){
    	websocketclose(e);
    }
    websock.onopen = function () {
	    websocketOpen();
	}
    
    //连接发生错误的回调方法
	websock.onerror = function () {
		console.log("WebSocket连接发生错误");
	}
}

// 实际调用的方法
function sendSock(agentData,callback){  
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
    	//若是ws开启状态
        websocketsend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
    	// 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
        	sendSock(agentData,callback);
        }, 1000);
    }else {
    	// 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}

//数据接收
function websocketonmessage(e){ 
    global_callback(JSON.parse(e.data));
}

//数据发送
function websocketsend(agentData){
    websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e){  
    console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e){
	console.log("连接成功");
}

getCameraPort();

export{sendSock,playVideo}
