
//es2015风格的计算数学命名功能来使用一个常量作为函数名
const ADD_ITEMNUM = 'ADD_ITEMNUM'
const accountLogin01 = 'accountLogin01'
const registerLogin ='registerLogin'
const setKlineTopMsg ='setKlineTopMsg'
const setChanpinInfo ='setChanpinInfo'
export default{
    [ADD_ITEMNUM](state, num) {
		//state.main += num;
	  },
	
	  [accountLogin01](state){
		state.accountState.loginStatus=1
		console.log(state.accountState.loginStatus)
	  },
	  accountLogin02:function(state){
		console.log(state.main)
	  },
	  //初始化数据
	  [registerLogin](state){
		state.accountState.loginStatus=0
		
	  },
	  [setKlineTopMsg](state,str){
		state.klineTopMsg =  str
	  },
	  setSkin(state, skin) {
		state.skin = skin;
	  },
	  setSocketParam(state, socketParam) {
		state.socketParam = socketParam
	  },
	  setWebsockState(state, websockState) {
		state.websockState = websockState
	  },
	  setSocketSubscribe(state, socketSubscribe) {
		// console.log(socketSubscribe);
		state.socketSubscribe = socketSubscribe
	  },
	  setLoginStatus(state, loginStatus) {
  
		state.account.loginStatus = loginStatus
		console.log(state.account.loginStatus)
	  },
	  setExitStatus(state, exitStatus) {
		state.account.exitStatus = exitStatus
	  },
	  setHangqingList(state, setHangqingList) {
		state.market.initHangqingList = setHangqingList
	  },
	  setSocketData(state, initSocketData) {
		// console.log(quoteData);
		state.market.initSocketData = initSocketData
	  },
	  setChicangList(state, initChicangList) {
		// console.log(JSON.parse(initChicangList));
		state.market.initChicangList = initChicangList
	  },
	  setupdataChicangList(state, updataChicangList) {
		state.market.updataChicangList = updataChicangList
	  },
	  setComputedFdyk(state, computedFdyk) {
		state.market.computedFdyk = computedFdyk
	  },
	  setExchangeList(state, exchangeList) {
		// console.log(exchangeList);
		state.exchange.exchangeList = exchangeList
	  },
	  setQuoteStatus(state, quoteStatus) {
		state.account.quoteStatus = quoteStatus
		console.log(state.account.quoteStatus);
	  },
	  setPath(state, path){
		state.path = path
	  },
	  setRequestSate(state,requestSate){
		state.requestSate = requestSate
	  },
	  setNetworkSignal(state,NetworkSignal){
		state.NetworkSignal = NetworkSignal
	  },
	  setOrderId(state,orderId){
		state.orderId = orderId
	  },
	  setUpdataSocketData(state,updataSocketData){
		state.market.updataSocketData = updataSocketData
	  },
	  setQuoteData(state,quoteData){
		state.market.quoteData = quoteData
	  },
	  setConnSignalr(state,connSignalr){
		state.connSignalr = connSignalr
	  },
	  [setChanpinInfo](state,chanpinInfo){
		state.chanpinInfo = chanpinInfo
	  },
	  // setKlineMsg(state,klineMsg){
		
	  //   state.klineMsg = klineMsg
	  // },
	  // setKlineMsgs(state,code){
	  //   for(let i=0;i>state.klineMsg.length;i++){
	  //     if(code == state.klineMsg[i].code){
	  //       state.klineMsgs = state.klineMsg[i]
	  //     }
	  //   }
		
	  // },
	  
	  initConnSignalr(state){
		let msg = {}
		if (!localStorage.getItem('ycxUserLoginState_QXJF')) { //判断是否为登录状态
		  console.log('未登录状态连接websocket开始');
		  let uuid = generateUUID();
		  msg = {
			"userId": uuid,
			"token": uuid
		  }
		} else {
		  console.log('登录状态连接websocket开始');
		  JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId
		  msg = {
			"userId": JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).userId,
			"token": JSON.parse(localStorage.getItem('ycxUserInfo_QXJF')).token
		  }
		}
		// let uuid = generateUUID()
		// // console.log('登录状态连接websocket开始');
		//   msg = {
		//     "userId": 2380,
		//     "token": uuid,
		//   }
		//创建行情连接
		state.connSignalr = null;
		state.connSignalr = $.connection('http://39.100.151.138:8081' + "/myconnection", msg)
		//开始行情连接
		state.connSignalr.start()
		  .done(() => {
			console.log('行情连接成功');
		  })
		  .fail((erro) => {
			console.log(erro);
		  })
		//接受到消息
		state.connSignalr.received((message) => {
		//    console.log(message);
		  let data = JSON.parse(message);
		  if (data.messageType == 1) {
			// console.log(data);
			let dataObject = JSON.parse(data.content);
			// console.log(dataObject);
			state.market.quoteData = dataObject[0]
			// commit('setQuoteData', dataObject[0]);
			// console.log(state.market.quoteData)
			// if (state.market.computedFdyk && state.account.loginStatus) {
			//   dispatch('computedFdyk')
			// }
		  } else if (data.messageType == 2) {
			let newData = data.content + "-" + new Date().getTime() + Math.random();
			commit('setUpdataSocketData', newData);
		  }
		})
		//断开连接
		state.connSignalr.disconnected(() => {
		  // Toast.clear();
		  // state.account.quoteStatus++;
		  console.log('断开连接');
		})
		state.connSignalr.connectionSlow(() => {
		  // Toast({
		  // 	duration: 1000 * 3,
		  // 	message: '行情连接失败,请检查网络',
		  // 	position: 'bottom'
		  // })
		  console.log('网速太差啦');
		})
		state.connSignalr.reconnected(() => {
		  // Toast({
		  // 	duration: 1000 * 3,
		  // 	message: '行情连接失败,请检查网络',
		  // 	position: 'bottom'
		  // })
		  console.log('重新连接啦');
		})
		state.connSignalr.error((error) => {
		  // Toast({
		  // 	duration: 1000 * 3,
		  // 	message: '行情连接失败,请检查网络',
		  // 	position: 'bottom'
		  // })
		  console.log(error);
		})
		state.connSignalr.stateChanged(() => {
		  // Toast({
		  // 	duration: 1000 * 3,
		  // 	message: '行情连接失败,请检查网络',
		  // 	position: 'bottom'
		  // })
		  console.log('连接状态更改啦');
		})
		
	  },
	

}
//随机uuid
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
  }