//import ajax from '../config/ajax'

export default{
	//定义一个函数，当被触发时，给函数传递参数给mutations处理
	
    addNum({commit,state},id){
        commit('ADD_ITEMNUM',id)
    },
   
    accountLogin({commit}){
        commit('accountLogin01')
    },
    loginStatus({commit,state},loginStatus){
        // commit('setLoginStatus',true)
        state.account.loginStatus = loginStatus
    },
    setSocketParam({commit,state},SocketParam){
        // commit('setSocketParam',SocketParam)
        state.SocketParam = SocketParam
    },
    startUpInitConnSignalr({commit,state}){
        // commit('initConnSignalr')
        let msg = {}
		if (!state.account.loginStatus) { //判断是否为登录状态
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
            // commit('setUpdataSocketData', newData);
            state.market.updataSocketData = newData
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
    
    setPath({commit},Path){
        commit('setPath',Path)
    },
    aCChanpinInfo({commit},chanpinInfo){
        commit('setChanpinInfo',chanpinInfo)
    },
    computedFdyk({
        commit,
        state
    }) {
        // console.log('动态权益计算中');
        var totalFdyk = 0;
        var uInfo = JSON.parse(localStorage.getItem(state.localStorageUid));
        var msg = JSON.stringify({
            userID: uInfo.userId
        })
        var quoteData = state.market.quoteData;
        var _chicangList = {
            list:[]
        }
        if(JSON.stringify(state.market.initChicangList) != '{}'){
            _chicangList = JSON.parse(state.market.initChicangList);
            var exchangeList = JSON.parse(state.exchange.exchangeList);
            for (let key in _chicangList.list) {
                if (_chicangList.list[key].futures_code == quoteData.code) {
                    _chicangList.list[key].point = quoteData.point;
                    if (_chicangList.list[key].updown == 1) {
                        _chicangList.list[key].private_yk = parseFloat(((quoteData.point - _chicangList.list[key].futures_price) * _chicangList.list[key].cs) / _chicangList.list[key].currencyRate).toFixed(0)*_chicangList.list[key].futures_num
                    } else {
                        _chicangList.list[key].private_yk = parseFloat(((_chicangList.list[key].futures_price - quoteData.point) * _chicangList.list[key].cs) / _chicangList.list[key].currencyRate).toFixed(0)*_chicangList.list[key].futures_num
                    }
                    if(_chicangList.list[key].currencyFlag == 'CNY'){
                        _chicangList.list[key].private_yk_rmb = _chicangList.list[key].private_yk
                    }else{
                        _chicangList.list[key].private_yk_rmb = _chicangList.list[key].private_yk * exchangeList[_chicangList.list[key].currencyFlag]
                    }	
                }
                totalFdyk += parseFloat(_chicangList.list[key].private_yk_rmb);
            }
            _chicangList.fdyk = totalFdyk;
        }
        commit('setChicangList', JSON.stringify(_chicangList));
    },
    connectSocket({state}){
        Vue.prototype.$initExchange(); //初始化汇率
        if (state.account.loginStatus) {
            Vue.prototype.$initHangqing(); //初始化行情列表
            setTimeout(function(){
                Vue.prototype.$initChicang(); //初始化持仓列表
            },500)
        } else {
            Vue.prototype.$initHangqing(); //初始化行情列表
        }
    }


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