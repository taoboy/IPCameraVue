import * as TYPES from '../mutation-types.js'

// initial state
const state = {
  isIEBrowser: false,		//是否为IE浏览器
  isHavePlug: false,		//是否安装插件
  bodyCheck: false,			//是否开启人体检测
  figureCheck: false,		//是否开启人体检测
  corMode: false,				//是否开启走廊模式
  userName: '',					//登录用户名
  userPwd: ''						//登录密码(加密后的)
}

// getters
const getters = {
	[TYPES.GET_ISIEBROWSER]:({isIEBrowser}) => isIEBrowser,
	[TYPES.GET_ISHAVEPLUG]:({isHavePlug}) => isHavePlug,
	[TYPES.GET_BODYCHECK]:({bodyCheck}) => bodyCheck,
	[TYPES.GET_FIGURECHECK]:({figureCheck}) => figureCheck,
	[TYPES.GET_CORMODE]:({corMode}) => corMode,
	[TYPES.GET_USERNAME]:({userName}) => userName,
	[TYPES.GET_USERPWD]:({userPwd}) => userPwd,
}

// mutations
const mutations = {
	[TYPES.SET_ISIEBROWSER]:(state,isIEBrowser) => state.isIEBrowser = isIEBrowser,
	[TYPES.SET_ISHAVEPLUG]:(state,isHavePlug) => state.isHavePlug = isHavePlug,
	[TYPES.SET_BODYCHECK]:(state,bodyCheck) => state.bodyCheck = bodyCheck,
	[TYPES.SET_FIGURECHECK]:(state,figureCheck) => state.figureCheck = figureCheck,
	[TYPES.SET_CORMODE]:(state,corMode) => state.corMode = corMode,
	[TYPES.SET_USERNAME]:(state,userName) => state.userName = userName,
	[TYPES.SET_USERPWD]:(state,userPwd) => state.userPwd = userPwd,
}

// actions
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}