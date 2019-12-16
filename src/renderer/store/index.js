import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {createPersistedState,createSharedMutations} from 'vuex-electron'
import persistedState from 'vuex-persistedstate' //vuex持久化插件
import actions from './action'
import mutations from './mutations'
import getters from './getters'



const account = {
	state: {
		quoteStatus: 1, //行情初始化状态
		loginStatus: false, //账户是否登录
		exitStatus: false, //账户是否退出
	}
}

//行情信息
const market = {
	state: {
		computedFdyk: false, //是否计算浮动盈亏
		quoteData: [],
		initHangqingList: [], //初始化行情列表
		initChicangList: {}, //初始化持仓列表
		updataChicangList: {}, //实时更新持仓列表 浮动盈亏计算
		initSocketData: {}, //初始化行情最后一条数据
		updataSocketData: null ,//监听持仓，指价列表新增
	}
}

const exchange = {
	state: {
		exchangeList: {} //初始化汇率列表
	}
}
//账户信息
// const accountState = {
//   quoteStatus: false, //行情初始化状态
//   loginStatus: 0, //账户是否登录  0未登录 1登录
//   exitStatus: false, //账户是否退出
// },


//es2015风格的计算数学命名功能来使用一个常量作为函数名
const ADD_ITEMNUM = 'ADD_ITEMNUM'
const accountLogin01 = 'accountLogin01'
const registerLogin ='registerLogin'
const setKlineTopMsg ='setKlineTopMsg'
export default new Vuex.Store({
  strict:false,//关闭严格模式
   modules:{
    account,
    market,
		exchange
  },
  state:{
    
    main: 0,
    apiUrl: 'http://39.100.151.138:8082', //axios api 
    imUrl: 'ws://39.100.151.138:6300/Quotation.ashx', //webScoket api 
    imUrlSignalr: 'http://39.100.151.138:8081', //webSocket signalr地址 
    version:'1.0.4', //app版本号 1.2.7
    appName:'期鑫金服', //app名字
    callPhone:'400-900-1466',//客服电话
    skin: 'night', //皮肤设置
    localStorageSkin: 'ycxSkin_QXJF', //本地缓存皮肤
    localStorageUid: 'ycxUserInfo_QXJF', //本地用户信息缓存key
    localStorageHq: 'ycxHq_QXJF', //本地行情缓存key
    klineType: 'ycxKlineType_QXJF', //本地K线样式缓存key 0实心 1空心
    localStorageLogin: 'ycxUserLoginState_QXJF', //本地缓存登录状态key
    localStorageInstall:'ycxInstall_QXJF', //本地缓存版本更新信息key
    quoteSocket: null, //行情Socket
    socketParam: null, //Socket链接传参
    socketSubscribe: [], //Socket发送消息msg
    websockState: 0,
    path:null ,//储存页面当前地址
    requestSate:false ,//接口请求状态
    NetworkSignal:null ,//当前网络状态
    connect:null, //行情链接
    connectSetTime:null,//重连定时器
    heartBeatTime:null, //检测心跳定时器
    heartBeatSendTime:null, //发送心跳包定时器
    connectTime:0 ,//重连次数
    heartBeatTimeNow:0,
    orderId:null ,//订单号
    connSignalr:null,
    chanpinInfo:'FDAX1912',		//产品编号(默认德指)
    realTimeData:'',
    isDataChange:false,
    equityData:null,
    klineMsg:null,//K线页面右侧详情信息
    klineMsgs:null,//K线页面右侧详情信息
    klineTopMsg:{
      High:"",
      Open:"",
      Low:"",
      YClose:"",
      Close:""
    }//K线插件顶部数据信息栏
  
  },
  mutations,
  actions,
  // 返回改变后的数值
	getters,
  plugins:[
    createPersistedState(),

    // persistedState() //vuex持久化插件
    
    // createSharedMutations()  //不建议使用此插件 [Vuex Electron] Please, don't use direct commit's, use dispatch instead of this.
  ],
  // strict: process.env.NODE_ENV !== 'production',
})
// export default store

