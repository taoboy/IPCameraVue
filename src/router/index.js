import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

//预览
import preview from '@/components/preview/preview'
//登录
import login from '@/components/login/login'
//菜单
import menuHome from '@/components/mainMenu/menuHome'
//图像设置-基本参数
import imageBasic from '@/components/mainMenu/menuImageBasic'
//图像设置-OSD设置
import imageOSD from '@/components/mainMenu/menuImageOSD'
//视频设置-编码设置
import videoEncode from '@/components/mainMenu/menuVideoEncode'
//音频设置-音频参数设置
import audioParam from '@/components/mainMenu/menuAudioParam'
//网络设置-TCP/IP
import netTCP from '@/components/mainMenu/menuNetTCP'
//网络设置-DDNS
import netDDNS from '@/components/mainMenu/menuNetDDNS'
//网络设置-端口和端口映射
import netPort from '@/components/mainMenu/menuNetPort'
//智能分析-区域
import intelArea from '@/components/mainMenu/menuIntelArea'
//智能分析-检测类型
import intelCheck from '@/components/mainMenu/menuIntelCheck'
//智能分析-传输协议
import intelProtocol from '@/components/mainMenu/menuIntelProtocol'
//报警设置-禁区人员检测
import alarmPerson from '@/components/mainMenu/menuAlarmPerson'
//报警设置-视频遮挡报警
import alarmShelter from '@/components/mainMenu/menuAlarmShelter'
//报警设置-异常报警
import alarmUnusual from '@/components/mainMenu/menuAlarmUnusual'
//报警设置-RS485设置
import alarmRS485 from '@/components/mainMenu/menuAlarmRS485'
//系统管理-设备信息
import sysDevice from '@/components/mainMenu/menuSysDevice'
//系统管理-时间设置
import sysTime from '@/components/mainMenu/menuSysTime'
//系统管理-安全设置
import sysSafe from '@/components/mainMenu/menuSysSafe'
//用户管理-用户管理
import userManage from '@/components/mainMenu/menuUserManage'
//本地设置-系统维护
import localService from '@/components/mainMenu/menuLocalService'
//本地设置-日志 	
import localLog from '@/components/mainMenu/menuLocalLog'
//本地设置-本地存储设置
import localMemory from '@/components/mainMenu/menuLocalMemory'


Vue.use(Router)

export default new Router({
  base: __dirname,
  routes: [
  	{
			path:'/',
			redirect:'/login',
		},
    {
      path: '/preview',
      name: 'preview',
      component: preview
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
			path:'/menu',
			name: 'menuHome',
			component:menuHome,
			children:[
				{path:'/menu/imageBasic',component:imageBasic},
				{path:'/menu/imageOSD',component:imageOSD},
				{path:'/menu/videoEncode',component:videoEncode},
				{path:'/menu/audioParam',component:audioParam},
				{path:'/menu/netTCP',component:netTCP},
				{path:'/menu/netDDNS',component:netDDNS},
				{path:'/menu/netPort',component:netPort},
				{path:'/menu/intelArea',component:intelArea},
				{path:'/menu/intelCheck',component:intelCheck},
				{path:'/menu/intelProtocol',component:intelProtocol},
				{path:'/menu/alarmPerson',component:alarmPerson},
				{path:'/menu/alarmShelter',component:alarmShelter},
				{path:'/menu/alarmUnusual',component:alarmUnusual},
				{path:'/menu/alarmRS485',component:alarmRS485},
				{path:'/menu/sysDevice',component:sysDevice},
				{path:'/menu/sysTime',component:sysTime},
				{path:'/menu/sysSafe',component:sysSafe},
				{path:'/menu/userManage',component:userManage},
				{path:'/menu/localService',component:localService},
				{path:'/menu/localLog',component:localLog},
				{path:'/menu/localMemory',component:localMemory}
			]
		}
  ]
})
