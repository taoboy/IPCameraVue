const globalConfig = {
	videoEncode:{ 
		"StreamIdx": "",
		"EncoderType": "",
		"StreamResolution": "",
		"StreamType": "",
		"Quality": "",
		"ProfileType": "",
		"BitRate": 0,
		"FPS": 0,
		"IdrInterval": 0,
		"Smoothness": 0
	},	
	imageBasic:{
		"SceneMode" : "",  //场景模式  indoor outdoor
   		"WdrMode" : "disable",
	  	 "BasicSet" : {
			"Luminance" : 0,   //亮度
			"Saturation" : 0,  //饱和度
			"Chroma" : 0,      //色度
			"Contrast" : 0,    //对比度
			"Sharpness" : 0    //锐度
		 },	
		 "WhiteBalance" : {    //白平衡
			"Mode" : "auto",   //自动-auto	手动-manul   自然光-natural  白炽灯-incandescent
			"RValue" : 0,
			"BValue" : 0
		 },
		 "ExposureSet" : {    //曝光
		 	"Mode" : "auto",
			"ManualParam" : {
				"ShutterTime" : 0,
				"AGain" : 0,
				"DGain" : 0
			},
			"AutoParam" : {
				"ShutterTimeMax" : 0,
				"AGainMax" : 0,
				"DGainMax" : 0
			}
		 },
		 "DenoiseSet" : {
			"2DEnable" : false,
			"2DValue" : 0,
			"3DEnable" : false,
			"3DSpace" : 0,
			"3DTime" : 0
		 },
		 "AdvanceSet" : {
			"BLCEnable" : false,  //背光补偿
			"BLCPos" : 1,
			"HLCEnable" : false,  //强光抑制
			"HLCPos" : 2,
			"DefogEnable" : false,  //去雾
			"DisEnable" : false,    //防抖
			"RotateType" : "none",  //旋转  mirror vertical horizontal
			"LdcEnable" : false,    //畸变矫正
			"CorridorMode" : false   //走廊模式
		 },	
		 "DayNightSet" : {
			"Mode" : "day",		//白天-day	定时-fixed  自动-auto 夜晚-night
			"Start" : 1900,
			"End" : 700,
			"Sensibility" : 3
		 }
	},
	imageOSD: {
        "ChnProperties": {
            "Content" : "",	//是否显示名称
            "Position" : {
                "xrat" : 0,
                "yrat" : 0
                }
            },
		 "Pellucidity" : 0,		//透明度	0-不透明	1-半透明
         "FontSize" : "",		//字号     max  mid  min
         "TimeProperties" : {
            "Is24Hour" : false,		//是否24小时制
            "ShowTime" : false,		//是否显示日期
            "ShowWeek" : false,		//是否显示星期
            "TimeFormat" : 0,		//日期格式
			"Position" : {
               "xrat" : 0,
               "yrat" : 0
            },
         }
    },
    netDDNS: {
		"Enable": false,
		"User": "",
		"Type": "",		//NOIP	DYNDNS
		"Pwd":	"",
		"Alias": ""
	},
    netTCP: {
	 	"DeviceType" : "",			//网卡类型auto
     	"Dhcp" : false,					//是否自动获取IP地址,勾选后下面为灰色
     	"Address" : "",		//地址
    	"Mask" : "",		//子网掩码
	 	"Gateway" : "",		//网关
    	"MainDns" : "",			//首选DNS
    	"SubDns" : ""					//备选DNS
    },
    netPort: {
		"Http" : '',
		"Rtsp" : '',
		"Https" :	'',
		"Service": ''
	},
	netUpnp: {
		"Enable" :	false,
		"NickName" : "",
		"MapType" : "", //manual,auto
		"PortMap" : [
			{
				"Type" : "http",
				"Inner" : '',
				"Mapped" : '',
				"Status" : false
			},
			{
				"Type" : "rtsp",
				"Inner" : '',
				"Mapped" : '',
				"Status" : false
			},
			{
				"Type" : "https",
				"Inner" : '',
				"Mapped" : '',
				"Status" : false
			},
			{
				"Type" : "service",
				"Inner" : '',
				"Mapped" : '',
				"Status" : false
			}
		]
	},
    intelCheck:{
    	"FaceDetect": {
		    "Enable" : false,		//是否启用
			"PicType" : "",		//图片格式
			"PicSize" : "",	//图片尺寸   0 1 2
			"PicQuality" : "",	//图像质量
			"ScoreThrd" : ""		//阈值   小数后一位
        },
        "BodyDetect": {
		    "Enable" : false,
			"PicType" : "",
			"PicSize" : "",
			"PicQuality" : "",
			"ScoreThrd" : ""	
        }
    },
    intelProto:{
		"Enable" : false,		//是否上传图片
		"Policy" : "",
        "FtpParam": {
		    "Server" : "",
			"Port" : '',
			"User" : "",
			"Password" : "",
			"PathPloicy" : 2,	//图片目录结构
			"FirstLevel" : "",
			"SecondLevel" : "",
			"ArchiveDuration" : 1,	//图片归档间隔
			"NamePolicy" : 1,			//图片名 默认0 自定义1
			"PicturePrefix" : "puppy"	//自定义图片名
        },
        "PrivateParam": {
		    "Server" : "10.10.10.10",
			"Port" : '',
			"PrivateKey" : "",
			"NamePolicy" : 1,
			"PicturePrefix" : ""
        }
    },
    sysDevice: {
		"DevName": "", 
		"DevModel": "",
		"DevSN" : "",
		"DevHW" : "",
		"DevFW" : "",
		"DevMAC" : ""
	},
	sysTime: {
		"Timezone": 0, 
		"TimeCheck": {
			"TimeCheckType": "", 	//manual
			"ManualCheck": {
				"TimeDevice": 0,		//返回和发送都是这个字段
				"SyncPC": true,
			}, 
			"NtpCheck": {
				"ServerIp": "***", 
				"ServerPort": 0, 
				"CheckInterval": 0
			}
		}
	},
	sysSafe: {
		"RtspAuth":	"none", //basic
	},
	audioParam: {
		"CodecType" : 0, //0-g711 1-g726 2-aac
		"InputType" : "", //"linein" "micin"
		"BitRate" : 0,   //0-16K, 1-32K, 2-48K 3-64K
		"InVolume" : 0,
		"SampleRate" : 0, //16000
		"AnrEnable" : false
	},
	alarmRS485: {
		"BaudRate" :	0, //0-1200bps	波特率
		"DataBit" : 0,		//数据位
		"StopBit" :	0,		//停止位
		"Parity": "",  //odd even none		校验
		"FlowCtrl" : false	//流控
	},
	alarmUnusual: [
		{
			"Type" : "NetDisconnect",
			"Enable" : false,
			"Linkage" : [
				{
				   "Type" : "Alarmout",
				   "Enable" : false
				}
			]
		},
		{
			"Type" : "IpCollision",
			"Enable" : false,
			"Linkage" : [
				{
				   "Type" : "Alarmout",
				   "Enable" : false
				}
			]
		},
		{
			"Type" : "IllegalAccess",
			"Enable" : false,
			"Linkage" : [
				{
				   "Type" : "Alarmout",
				   "Enable" : false
				},
				{
				   "Type" : "SendFtp",
				   "Enable" : false
				}
			]
		}		
	],
	alarmPerson: {
		"Enable" : false,
		"TimeSets" : [
			{
				"Dayofw" : 1,
				"TimeDurs" : []
			},
			{
				"Dayofw" : 2,
				"TimeDurs" : []
			},
			{
				"Dayofw" : 3,
				"TimeDurs" : []
			},
			{
				"Dayofw" : 4,
				"TimeDurs" : []
			},
			{
				"Dayofw" : 5,
				"TimeDurs" : []
			},	
			{
				"Dayofw" : 6,
				"TimeDurs" : []
			},
			{
				"Dayofw" : 7,
				"TimeDurs" : []
			},				
		]
	},
	users: {
		"Users" : [
		]
	}
}

export default globalConfig