let menus = [
  { id: 1, 
  	level: 1, 
  	name: '图像设置', 
  	type: "button", 
  	isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_img.png") ,
    subMenu: [
    	{ id: 11, level: 2, name: '基本参数',isSelected: false, type: "link", url: "/menu/imageBasic" },
    	{ id: 12, level: 2, name: 'OSD设置',isSelected: false, type: "link", url: "/menu/imageOSD" }
      
    ]
  },
  {
    id: 2,
    level: 1,
    name: '视频设置',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_video.png") ,
    subMenu: [
      { id: 21, level: 2, name: '编码设置',isSelected: false, type: "link", url: "/menu/videoEncode" }
    ]
  },
  {
    id: 3,
    level: 1,
    name: '音频设置',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_audio.png") ,
    subMenu: [
      { id: 31, level: 2, name: '音频参数设置',isSelected: false, type: "link", url: "/menu/audioParam" }
		]
  },
  {
    id: 4,
    level: 1,
    name: '网络设置',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_net.png") ,
    subMenu: [
      { id: 41, level: 2, name: 'TCP/IP',isSelected: false, type: "link", url: "/menu/netTCP" },
      { id: 42, level: 2, name: 'DDNS',isSelected: false, type: "link", url: "/menu/netDDNS" },
      { id: 43, level: 2, name: '端口和端口映射',isSelected: false, type: "link", url: "/menu/netPort" }
    ]
  },
  {
    id: 5,
    level: 1,
    name: '智能分析',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_ai.png") ,
    subMenu: [
      { id: 41, level: 2, name: '区域',isSelected: false, type: "link", url: "/menu/intelArea" },
      { id: 42, level: 2, name: '检测类型	',isSelected: false, type: "link", url: "/menu/intelCheck" },
      { id: 43, level: 2, name: '传输协议',isSelected: false, type: "link", url: "/menu/intelProtocol" }
    ]
  },
  {
    id: 6,
    level: 1,
    name: '报警设置',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_alarm.png") ,
    subMenu: [
      { id: 41, level: 2, name: '禁区人员检测',isSelected: false, type: "link", url: "/menu/alarmPerson" },
      { id: 42, level: 2, name: '视频遮挡报警',isSelected: false, type: "link", url: "/menu/alarmShelter" },
      { id: 43, level: 2, name: '异常报警',isSelected: false, type: "link", url: "/menu/alarmUnusual" },
      { id: 44, level: 2, name: 'RS485设置',isSelected: false, type: "link", url: "/menu/alarmRS485" }
    ]
  },
  {
    id: 7,
    level: 1,
    name: '系统管理',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_sys.png") ,
    subMenu: [
      { id: 41, level: 2, name: '设备信息',isSelected: false, type: "link", url: "/menu/sysDevice" },
      { id: 42, level: 2, name: '时间设置',isSelected: false, type: "link", url: "/menu/sysTime" },
      { id: 43, level: 2, name: '安全设置',isSelected: false, type: "link", url: "/menu/sysSafe" }
    ]
  },
  {
    id: 8,
    level: 1,
    name: '用户管理',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_user.png") ,
    subMenu: [
      { id: 41, level: 2, name: '用户管理',isSelected: false, type: "link", url: "/menu/userManage" },
    ]
  },
  {
    id: 9,
    level: 1,
    name: '本地设置',
    type: "button",
    isExpanded: false,
    isSelected: false,
    iconUrl: require("@/assets/menu/menu_local.png") ,
    subMenu: [
      { id: 41, level: 2, name: '系统维护',isSelected: false, type: "link", url: "/menu/localService" },
      { id: 42, level: 2, name: '日志',isSelected: false, type: "link", url: "/menu/localLog" },
      { id: 43, level: 2, name: '本地存储设置',isSelected: false, type: "link", url: "/menu/localMemory" }
    ]
  }
];
let levelNum = 1;
let startExpand = []; // 保存刷新后当前要展开的菜单项
function setExpand(source, url) {
//	console.log("source:"+JSON.stringify(source));
//	console.log("url:"+url);
  let sourceItem = '';
  for (let i = 0; i < source.length; i++) {
    sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
    if (sourceItem.indexOf(url) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
      if (source[i].type === 'button') { // 导航菜单为按钮
//      source[i].isSelected = true; // 设置选中高亮
        source[i].isExpanded = true; // 设置为展开
        startExpand.push(source[i]);
        // 递归下一级菜单，以此类推
        setExpand(source[i].subMenu, url);
      }else if(source[i].type === 'link'){
      	source[i].isSelected = true;
      }
//    if (source[i].type === 'link') { // 导航菜单为按钮
//      source[i].isSelected = true; // 设置选中高亮
////      source[i].isExpanded = true; // 设置为展开
//      startExpand.push(source[i]);
//      // 递归下一级菜单，以此类推
//      setExpand(source[i].subMenu, url);
//    }
      break;
    }
  }
}
const state = {
  menus,
  levelNum
};
const mutations = {
  findParents(state, payload) {
  	//payload.menu:当前的菜单对象
    if (payload.menu.type === "button") {
    	for(let a=0;a<menus.length;a++){
    		if(menus[a].id != payload.menu.id){
    			//除了当前点击的菜单，将其他所有菜单的展开项置为false
    			menus[a].isExpanded = false;	
    		}
    	}
      payload.menu.isExpanded = !payload.menu.isExpanded;
    } else if (payload.menu.type === "link") {
//  	console.log("啦啦啦："+JSON.stringify(startExpand));
      if (startExpand.length > 0) {
        for (let i = 0; i < startExpand.length; i++) {
        	for(let a=0;a<startExpand[i].subMenu.length;a++){
        		startExpand[i].subMenu[a].isSelected = false;
        	}
//        startExpand[i].isSelected = false;
        }
      }
      startExpand = []; // 清空展开菜单记录项
      setExpand(state.menus, payload.menu.url);
    };
  },
  firstInit(state, payload) {
    setExpand(state.menus, payload.url);
  }
}
export default {
  state,
  mutations
};